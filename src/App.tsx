import React, { useState } from 'react';
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
  const [products, setProducts] = useState([
     { id: '1', title: 'Apple iPhone 15 Pro, 256GB, Natural Titanium', price: 1199.00, imageUrl: 'https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg' },
     { id: '2', title: 'Mechanical Gaming Keyboard with RGB LED Backlit', price: 45.99, imageUrl: 'https://m.media-amazon.com/images/I/71Y88S45W6L._AC_SX679_.jpg' },
     { id: '3', title: 'Adjustable Dumbbells Set for Home Gym', price: 199.99, imageUrl: 'https://m.media-amazon.com/images/I/61k1qY2B52L._AC_SX679_.jpg' },
     { id: '4', title: 'One Piece Swimsuit for Women', price: 29.99, imageUrl: 'https://m.media-amazon.com/images/I/81fH+uVp-cL._AC_SX679_.jpg' },
     { id: '5', title: 'SmallRig Camera Cage setup', price: 89.00, imageUrl: 'https://m.media-amazon.com/images/I/61mQd0T0BTL._AC_SX679_.jpg' },
     { id: '6', title: 'Amazon Echo Dot (5th Gen) | Smart speaker with Alexa', price: 49.99, imageUrl: 'https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SX679_.jpg' },
     { id: '7', title: 'Voluminous Makeup Lash Paradise Mascara', price: 8.98, imageUrl: 'https://m.media-amazon.com/images/I/61aK0bW0s8L._AC_SX679_.jpg' },
     { id: '8', title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', price: 348.00, imageUrl: 'https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg' },
     { id: '9', title: 'MacBook Air M2 Chip 13.6-inch Liquid Retina Display', price: 1099.00, imageUrl: 'https://m.media-amazon.com/images/I/71Y88S45W6L._AC_SX679_.jpg' },
     { id: '10', title: 'Canon EOS Rebel T7 DSLR Camera with 18-55mm Lens', price: 479.00, imageUrl: 'https://m.media-amazon.com/images/I/61k1qY2B52L._AC_SX679_.jpg' },
     { id: '11', title: 'Logitech G PRO X Superlight Wireless Gaming Mouse', price: 129.99, imageUrl: 'https://m.media-amazon.com/images/I/81fH+uVp-cL._AC_SX679_.jpg' },
     { id: '12', title: 'Keurig K-Classic Coffee Maker, Single Serve', price: 99.99, imageUrl: 'https://m.media-amazon.com/images/I/61mQd0T0BTL._AC_SX679_.jpg' },
     { id: '13', title: 'Dyson V11 Cordless Stick Vacuum Cleaner', price: 499.00, imageUrl: 'https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SX679_.jpg' },
     { id: '14', title: 'Apple Watch Series 9 GPS 45mm', price: 399.00, imageUrl: 'https://m.media-amazon.com/images/I/61aK0bW0s8L._AC_SX679_.jpg' },
     { id: '15', title: 'Bose SoundLink Micro Bluetooth Speaker', price: 99.00, imageUrl: 'https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg' },
     { id: '16', title: 'KitchenAid Artisan Series 5-Qt. Stand Mixer', price: 379.99, imageUrl: 'https://m.media-amazon.com/images/I/71Y88S45W6L._AC_SX679_.jpg' },
     { id: '17', title: 'Nike Men\'s Revolution 5 Running Shoe', price: 55.00, imageUrl: 'https://m.media-amazon.com/images/I/61k1qY2B52L._AC_SX679_.jpg' },
     { id: '18', title: 'LG 27" Ultragear QHD (2560x1440) Gaming Monitor', price: 299.99, imageUrl: 'https://m.media-amazon.com/images/I/81fH+uVp-cL._AC_SX679_.jpg' },
     { id: '19', title: 'Nintendo Switch - OLED Model', price: 349.99, imageUrl: 'https://m.media-amazon.com/images/I/61mQd0T0BTL._AC_SX679_.jpg' },
     { id: '20', title: 'Hydro Flask Standard Mouth Bottle with Flex Cap', price: 34.95, imageUrl: 'https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SX679_.jpg' },
     { id: '21', title: 'PlayStation 5 Console (Disc Edition)', price: 499.99, imageUrl: 'https://m.media-amazon.com/images/I/61aK0bW0s8L._AC_SX679_.jpg' },
     { id: '22', title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker', price: 99.99, imageUrl: 'https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg' },
     { id: '23', title: 'YETI Rambler 20 oz Tumbler', price: 35.00, imageUrl: 'https://m.media-amazon.com/images/I/71Y88S45W6L._AC_SX679_.jpg' },
     { id: '24', title: 'Ninja AF101 Air Fryer', price: 89.95, imageUrl: 'https://m.media-amazon.com/images/I/61k1qY2B52L._AC_SX679_.jpg' },
     { id: '25', title: 'Ring Video Doorbell, 1080p HD video', price: 99.99, imageUrl: 'https://m.media-amazon.com/images/I/81fH+uVp-cL._AC_SX679_.jpg' },
     { id: '26', title: 'Oculus Quest 2 — Advanced All-In-One Virtual Reality', price: 299.00, imageUrl: 'https://m.media-amazon.com/images/I/61mQd0T0BTL._AC_SX679_.jpg' },
     { id: '27', title: 'CeraVe Moisturizing Cream', price: 17.78, imageUrl: 'https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SX679_.jpg' },
     { id: '28', title: 'LEGO Star Wars Millennium Falcon 75257', price: 159.99, imageUrl: 'https://m.media-amazon.com/images/I/61aK0bW0s8L._AC_SX679_.jpg' },
     { id: '29', title: 'Kindle Paperwhite (8 GB) – Now with a 6.8" display', price: 139.99, imageUrl: 'https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg' },
     { id: '30', title: 'Cards Against Humanity: Core Game', price: 29.00, imageUrl: 'https://m.media-amazon.com/images/I/71Y88S45W6L._AC_SX679_.jpg' },
  ]);

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
     ]
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
     name: 'NICOLAS K THEATO',
     addressLine1: '20, LIMES AVENUE',
     addressLine2: 'LONDON, SW13 0HF',
     country: 'United Kingdom',
  });

  const renderContent = () => {
    if (currentView === 'search') {
      return <Search onBack={() => setCurrentView('main')} products={products} onProductClick={handleProductClick} />;
    }
    
    if (currentView === 'checkout') {
      return <Checkout onBack={() => setCurrentView('main')} onComplete={() => setCurrentView('success')} savedCards={savedCards} cartItems={cartItems} deliveryInfo={deliveryInfo} />;
    }

    if (currentView === 'success') {
      return <Success onContinue={() => { setCurrentView('main'); setActiveTab('home'); setCartItems([]); }} onNavigate={(v) => setCurrentView(v)} />;
    }

    if (currentView === 'orders') {
      return <Orders onNavigate={(v) => setCurrentView(v)} onBack={() => setCurrentView('main')} />;
    }

    if (currentView === 'tracking') {
      return <Tracking onBack={() => setCurrentView('orders')} onViewOrderDetails={() => setCurrentView('invoice')} />;
    }

    if (currentView === 'invoice') {
      return <Invoice onBack={() => setCurrentView('tracking')} />;
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
