import fs from 'fs';

const SUPABASE_URL = "https://jphvgqbqvzlbyoqbnwsd.supabase.co";
const PROJECT_REF = "jphvgqbqvzlbyoqbnwsd";
const ACCESS_TOKEN = "sbp_fd7aa7c92f1cc7c43cf07573e49ca7f524fc465a";

const sql = `
  -- Create custom types
  CREATE TYPE order_status AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

  -- Create public.profiles table (extends auth.users)
  CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    stripe_customer_id TEXT,
    prime_is_active BOOLEAN DEFAULT false,
    prime_renewal_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Create addresses table
  CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    line1 TEXT NOT NULL,
    line2 TEXT,
    city TEXT NOT NULL,
    state TEXT,
    zip TEXT NOT NULL,
    country TEXT NOT NULL DEFAUlT 'UK',
    is_default BOOLEAN DEFAULT false,
    delivery_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Create products table
  CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category TEXT,
    image_url TEXT,
    stock_count INTEGER DEFAULT 1000,
    brand TEXT,
    is_prime_eligible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Create orders table
  CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status order_status DEFAULT 'PENDING',
    total_amount DECIMAL(10,2) NOT NULL,
    delivery_address JSONB NOT NULL,
    tracking_events JSONB DEFAULT '[]'::jsonb,
    estimated_delivery_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Create order_items table
  CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10,2) NOT NULL,
    title TEXT NOT NULL,
    image_url TEXT
  );

  -- RLS setup
  ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

  -- Policies
  CREATE POLICY "Public profiles are viewable by users" ON public.profiles FOR SELECT USING ( auth.uid() = id );
  CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ( auth.uid() = id );
  CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING ( auth.uid() = id );

  CREATE POLICY "Users view own addresses" ON public.addresses FOR SELECT USING ( auth.uid() = user_id );
  CREATE POLICY "Users insert own addresses" ON public.addresses FOR INSERT WITH CHECK ( auth.uid() = user_id );
  CREATE POLICY "Users update own addresses" ON public.addresses FOR UPDATE USING ( auth.uid() = user_id );
  CREATE POLICY "Users delete own addresses" ON public.addresses FOR DELETE USING ( auth.uid() = user_id );

  CREATE POLICY "Products are public" ON public.products FOR SELECT USING ( true );
  
  CREATE POLICY "Users view own orders" ON public.orders FOR SELECT USING ( auth.uid() = user_id );
  CREATE POLICY "Users insert own orders" ON public.orders FOR INSERT WITH CHECK ( auth.uid() = user_id );

  CREATE POLICY "Users view own order items" ON public.order_items FOR SELECT USING ( 
    EXISTS (SELECT 1 FROM public.orders WHERE public.orders.id = public.order_items.order_id AND public.orders.user_id = auth.uid())
  );
  CREATE POLICY "Users insert own order items" ON public.order_items FOR INSERT WITH CHECK ( 
    EXISTS (SELECT 1 FROM public.orders WHERE public.orders.id = public.order_items.order_id AND public.orders.user_id = auth.uid())
  );

  -- Triggers to auto-create profiles
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.profiles (id, email, first_name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'first_name');
    RETURN new;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

  -- Clear products and seed initial products
  TRUNCATE TABLE public.products CASCADE;
  INSERT INTO public.products (title, price, image_url, category) VALUES 
  ('Apple iPhone 15 Pro, 256GB, Natural Titanium', 1199.00, 'https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg', 'Electronics'),
  ('Mechanical Gaming Keyboard with RGB LED Backlit', 45.99, 'https://m.media-amazon.com/images/I/71Y88S45W6L._AC_SX679_.jpg', 'Electronics'),
  ('Adjustable Dumbbells Set for Home Gym', 199.99, 'https://m.media-amazon.com/images/I/61k1qY2B52L._AC_SX679_.jpg', 'Sports'),
  ('One Piece Swimsuit for Women', 29.99, 'https://m.media-amazon.com/images/I/81fH+uVp-cL._AC_SX679_.jpg', 'Clothing'),
  ('SmallRig Camera Cage setup', 89.00, 'https://m.media-amazon.com/images/I/61mQd0T0BTL._AC_SX679_.jpg', 'Electronics'),
  ('Amazon Echo Dot (5th Gen) | Smart speaker with Alexa', 49.99, 'https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SX679_.jpg', 'Smart Home'),
  ('Voluminous Makeup Lash Paradise Mascara', 8.98, 'https://m.media-amazon.com/images/I/61aK0bW0s8L._AC_SX679_.jpg', 'Beauty');
`;

async function run() {
  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });

  if (!res.ok) {
    console.error("Error executing SQL:", await res.text());
    process.exit(1);
  } else {
    console.log("SQL schema and initial data successfully deployed!");
  }
}

run();
