import React, { useState, useEffect } from 'react';
import { Home } from './views/Home';
import { Search } from './views/Search';
import { Basket } from './views/Basket';
import { Checkout } from './views/Checkout';
import { Success } from './views/Success';
import { Orders } from './views/Orders';
import { Tracking } from './views/Tracking';
import { Profile } from './views/Profile';
import { Admin } from './views/Admin';
import { Menu } from './views/Menu';
import { Product } from './views/Product';
import { Invoice } from './views/Invoice';
import { BottomCartIcon, BottomHomeIcon, BottomMenuIcon, BottomUserIcon, SparkleIcon } from './components/Icons';

type Tab = 'home' | 'profile' | 'cart' | 'menu';
type View = 'main' | 'search' | 'checkout' | 'success' | 'orders' | 'tracking' | 'admin' | 'product' | 'invoice';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [currentView, setCurrentView] = useState<View>('main');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleAddToCart = (product: any, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    // Added but don't navigate
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Shared state for app
  const [savedCards, setSavedCards] = useState([
     { id: '1', brand: 'Visa', last4: '4242', expiry: '12/26' },
     { id: '2', brand: 'Mastercard', last4: '8811', expiry: '09/25' }
  ]);
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      import('./lib/supabase').then(async ({ supabase }) => {
        const { data } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (data && data.length > 0) {
          setProducts(data.map(p => ({
            id: p.id,
            title: p.title,
            price: Number(p.price),
            imageUrl: p.image_url,
            category: p.category
          })));
        } else {
           // fallback to at least some data if empty
           setProducts([
             { id: '1', title: 'Apple iPhone 15 Pro, 256GB, Natural Titanium', price: 1199.00, imageUrl: 'https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg' },
             { id: '2', title: 'Mechanical Gaming Keyboard with RGB LED Backlit', price: 45.99, imageUrl: 'https://m.media-amazon.com/images/I/71Y88S45W6L._AC_SX679_.jpg' },
             { id: '3', title: 'Adjustable Dumbbells Set for Home Gym', price: 199.99, imageUrl: 'https://m.media-amazon.com/images/I/61k1qY2B52L._AC_SX679_.jpg' },
             { id: '4', title: 'One Piece Swimsuit for Women', price: 29.99, imageUrl: 'https://m.media-amazon.com/images/I/81fH+uVp-cL._AC_SX679_.jpg' }
           ]);
        }
        setProductsLoading(false);
      });
    }
    loadProducts();
  }, []);

  const [homepageImages, setHomepageImages] = useState({
     hero: 'https://m.media-amazon.com/images/I/61k1qY2B52L._AC_SX679_.jpg',
     dealsEndingSoon: [
       'https://m.media-amazon.com/images/I/81fH+uVp-cL._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/61mQd0T0BTL._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/61aK0bW0s8L._AC_SX679_.jpg',
     ],
     categories: [
       'https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/71Y88S45W6L._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/61k1qY2B52L._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/81fH+uVp-cL._AC_SX679_.jpg',
     ],
     keepShoppingFor: [
       'https://m.media-amazon.com/images/I/61mQd0T0BTL._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SX679_.jpg',
     ],
     sponsored: [
       'https://m.media-amazon.com/images/I/61aK0bW0s8L._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/71Y88S45W6L._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/61k1qY2B52L._AC_SX679_.jpg',
     ],
     topRated: [
       'https://m.media-amazon.com/images/I/81fH+uVp-cL._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/61mQd0T0BTL._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/61aK0bW0s8L._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/71Y88S45W6L._AC_SX679_.jpg',
     ],
     dealsTailored: [
       'https://m.media-amazon.com/images/I/61k1qY2B52L._AC_SX679_.jpg',
       'https://m.media-amazon.com/images/I/81fH+uVp-cL._AC_SX679_.jpg',
     ],
     orangeCard: ''
  });

  useEffect(() => {
    async function loadHomepageImages() {
      const { supabase } = await import('./lib/supabase');
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'homepage_images')
        .maybeSingle();

      if (data && data.value) {
        setHomepageImages(data.value as any);
      }
    }
    loadHomepageImages();
  }, []);

  const [deliveryInfo, setDeliveryInfo] = useState({
     name: 'NICOLAS K THEATO',
     addressLine1: '20, LIMES AVENUE',
     addressLine2: 'LONDON, SW13 0HF',
     country: 'United Kingdom',
  });

  useEffect(() => {
    async function loadDeliveryInfo() {
      const { supabase } = await import('./lib/supabase');
      const { data } = await supabase
        .from('addresses')
        .select('*')
        .eq('is_default', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setDeliveryInfo({
          name: data.full_name,
          addressLine1: data.line1,
          addressLine2: `${data.city}${data.zip ? ', ' + data.zip : ''}`,
          country: data.country
        });
      }
    }
    loadDeliveryInfo();
  }, []);

  const renderContent = () => {
    if (currentView === 'search') {
      return <Search onBack={() => setCurrentView('main')} products={products} onProductClick={handleProductClick} />;
    }
    
    if (currentView === 'checkout') {
      return <Checkout onBack={() => setCurrentView('main')} onComplete={() => setCurrentView('success')} savedCards={savedCards} cartItems={cartItems} deliveryInfo={deliveryInfo} />;
    }

    if (currentView === 'success') {
      return <Success onContinue={() => { setCurrentView('main'); setActiveTab('home'); setCartItems([]); }} onNavigate={(v) => setCurrentView(v)} deliveryInfo={deliveryInfo} />;
    }

    if (currentView === 'orders') {
      return <Orders onNavigate={(v, data) => { if (data) setSelectedOrder(data); setCurrentView(v); }} onBack={() => setCurrentView('main')} />;
    }

    if (currentView === 'tracking') {
      return <Tracking order={selectedOrder} onBack={() => setCurrentView('orders')} onViewOrderDetails={() => setCurrentView('invoice')} />;
    }

    if (currentView === 'invoice') {
      return <Invoice order={selectedOrder} onBack={() => setCurrentView('tracking')} />;
    }

    if (currentView === 'admin') {
      return <Admin 
               onBack={() => setCurrentView('main')} 
               savedCards={savedCards} setSavedCards={setSavedCards}
               products={products} setProducts={setProducts} 
               homepageImages={homepageImages}
               setHomepageImages={setHomepageImages}
               deliveryInfo={deliveryInfo}
               setDeliveryInfo={setDeliveryInfo}
             />;
    }

    if (currentView === 'product') {
      return <Product 
               product={selectedProduct} 
               onBack={() => setCurrentView('main')} 
               onAddToCart={handleAddToCart}
               cartItems={cartItems}
               onGoToCart={() => { setCurrentView('main'); setActiveTab('cart'); }}
             />;
    }

    // Main views based on activeTab
    if (activeTab === 'home') {
      return <Home onSearchClick={() => setCurrentView('search')} products={products} onProductClick={handleProductClick} homepageImages={homepageImages} />;
    }
    if (activeTab === 'cart') {
      return <Basket onCheckout={() => setCurrentView('checkout')} cartItems={cartItems} setCartItems={setCartItems} onProductClick={handleProductClick} />;
    }
    if (activeTab === 'profile') {
      return <Profile onNavigate={(v) => setCurrentView(v)} />;
    }
    if (activeTab === 'menu') {
      return <Menu onBack={() => setActiveTab('home')} onNavigate={(v) => { setCurrentView(v); setActiveTab('home'); }} />;
    }
    
    return null;
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col font-sans overflow-hidden sm:max-w-md sm:mx-auto sm:border-x sm:border-gray-200 sm:shadow-2xl relative font-medium">
      <div className="flex-1 relative overflow-hidden">
         {renderContent()}
      </div>

      {/* Bottom Navigation */}
      {currentView === 'main' && (
        <div className="bg-white border-t border-gray-200 h-[52px] pb-safe flex justify-between items-center px-4 shrink-0 relative z-40 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
           <button 
             onClick={() => setActiveTab('home')} 
             className={`flex flex-col items-center justify-center relative w-12 h-full ${activeTab === 'home' ? 'text-[#008296]' : 'text-[#0f1111]'}`}
           >
             {activeTab === 'home' && <div className="absolute top-0 w-10 h-[3px] bg-[#008296] rounded-b-sm"></div>}
             <BottomHomeIcon className="w-[26px] h-[26px]" />
           </button>
           
           <button 
             onClick={() => setActiveTab('profile')} 
             className={`flex flex-col items-center justify-center relative w-12 h-full ${activeTab === 'profile' ? 'text-[#008296]' : 'text-[#0f1111]'}`}
           >
             {activeTab === 'profile' && <div className="absolute top-0 w-10 h-[3px] bg-[#008296] rounded-b-sm"></div>}
             <BottomUserIcon className="w-[26px] h-[26px]" />
           </button>

           <button 
             onClick={() => setActiveTab('cart')} 
             className={`flex flex-col items-center justify-center relative w-12 h-full ${activeTab === 'cart' ? 'text-[#008296]' : 'text-[#0f1111]'}`}
           >
             {activeTab === 'cart' && <div className="absolute top-0 w-10 h-[3px] bg-[#008296] rounded-b-sm"></div>}
             <div className="relative flex items-center justify-center mt-[-2px]">
                <BottomCartIcon className="w-[28px] h-[28px]" />
                {cartItemsCount > 0 && (
                   <span className={`absolute top-[1px] left-1/2 transform -translate-x-[45%] flex items-center justify-center text-[13px] font-bold ${activeTab === 'cart' ? 'text-[#008296]' : 'text-[#0f1111]'}`}>
                     {cartItemsCount}
                   </span>
                )}
             </div>
           </button>

           <button 
             onClick={() => setActiveTab('menu')} 
             className={`flex flex-col items-center justify-center relative w-12 h-full ${activeTab === 'menu' ? 'text-[#008296]' : 'text-[#0f1111]'}`}
           >
             {activeTab === 'menu' && <div className="absolute top-0 w-10 h-[3px] bg-[#008296] rounded-b-sm"></div>}
             <BottomMenuIcon className="w-[26px] h-[26px]" />
           </button>

           <button 
             onClick={() => {}} 
             className={`flex flex-col items-center justify-center relative w-12 h-full`}
           >
             <SparkleIcon className="w-[28px] h-[28px]" />
           </button>
        </div>
      )}
      
      {/* Home Indicator line filler */}
      {currentView === 'main' && (
        <div className="h-4 bg-white flex justify-center items-end border-t-0">
          <div className="w-1/3 h-1 bg-black rounded-full mb-1"></div>
        </div>
      )}
      
      {currentView !== 'main' && (
        <div className="absolute bottom-0 w-full h-5 flex justify-center items-end z-50">
          <div className="w-1/3 h-1 bg-black rounded-full mb-1"></div>
        </div>
      )}
    </div>
  );
}
