import React, { useState } from 'react';
import { SearchIcon, ArrowLeftIcon, CartIcon } from '../components/Icons';
import { Share as ShareIcon } from 'lucide-react';

export const Product = ({ 
  product, 
  onBack,
  onAddToCart,
  cartItems,
  onGoToCart
}: { 
  product: any; 
  onBack: () => void;
  onAddToCart: (p: any, q: number) => void;
  cartItems: any[];
  onGoToCart: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (!product) return null;

  return (
    <div className="flex flex-col h-full bg-white z-40 absolute inset-0 overflow-y-auto pb-20">
      {/* Header */}
      <div className="amazon-header-bg px-4 pt-10 pb-2 flex items-center justify-between shadow-sm sticky top-0 z-50">
         <button onClick={onBack} className="p-2 -ml-2 text-[#0f1111]">
            <ArrowLeftIcon className="w-6 h-6" />
         </button>
         <div className="flex bg-white rounded-md items-center px-3 py-1.5 flex-1 mx-2 shadow-sm border border-[#a6a6a6]">
            <SearchIcon className="text-gray-500 w-4 h-4 mr-2" />
            <span className="text-gray-500 text-[14px]">Search Amazon</span>
         </div>
         <div className="flex items-center">
            <button className="p-2 text-[#0f1111]">
               <ShareIcon className="w-6 h-6" />
            </button>
            <button onClick={onGoToCart} className="p-2 -mr-2 text-[#0f1111] relative">
               <CartIcon className="w-6 h-6" />
               {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-[-2px] bg-white rounded-full min-w-[18px] px-1 h-[18px] flex items-center justify-center text-[11px] font-bold border-2 border-white text-[#0f1111]">
                     {cartItemsCount}
                  </span>
               )}
            </button>
         </div>
      </div>

      <div className="p-4">
         <div className="flex justify-between items-start mb-2">
            <span className="text-green-700 text-xs font-bold uppercase tracking-wider">Visit the Store</span>
            <div className="flex items-center text-[#007185] text-sm">
               <span className="flex text-[#ffa41c] text-[12px] mr-1">★★★★☆</span>
               4.5
            </div>
         </div>

         <h1 className="text-[16px] text-[#0f1111] leading-snug mb-3 font-medium">
            {product.title}
         </h1>

         <div className="relative w-full aspect-square bg-[#f0f2f5] rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4">
            {product.imageUrl ? (
               <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
            ) : (
               <span className="text-gray-400">No Image Available</span>
            )}
         </div>

         <div className="flex items-start mb-2 mt-4">
            <span className="text-[28px] font-medium leading-none">£{(Math.floor(product.price))}</span>
            <span className="text-[14px] font-medium leading-none mt-[2px]">{(product.price.toFixed(2).split('.')[1] || '00')}</span>
         </div>

         <div className="text-[#007185] text-[14px] mb-4">FREE Returns</div>
         <div className="text-[14px] font-medium mb-1 text-green-700">In stock</div>

         <div className="mb-4">
            <select 
               value={quantity} 
               onChange={e => setQuantity(Number(e.target.value))}
               className="bg-[#f0f2f5] border border-gray-300 text-gray-900 text-sm rounded-[8px] focus:ring-[#f4aa00] focus:border-[#f4aa00] block w-full p-2.5 shadow-sm outline-none"
            >
               {[...Array(10)].map((_, i) => (
                 <option key={i+1} value={i+1}>Qty: {i+1}</option>
               ))}
            </select>
         </div>

         <button 
            onClick={() => onAddToCart(product, quantity)}
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] py-3 rounded-full font-medium text-[15px] shadow-sm mb-3"
         >
            Add to Basket
         </button>

         <button 
            className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-[#0f1111] py-3 rounded-full font-medium text-[15px] shadow-sm mb-4"
         >
            Buy Now
         </button>

         <div className="flex text-sm text-gray-500 gap-4">
            <div className="w-[80px]">Dispatches from</div>
            <div>Amazon</div>
         </div>
         <div className="flex text-sm text-gray-500 gap-4 mt-1">
            <div className="w-[80px]">Sold by</div>
            <div>Amazon</div>
         </div>

         <hr className="my-6 border-gray-200" />
         
         <h2 className="font-bold text-lg mb-3">Product details</h2>
         <p className="text-gray-700 text-sm leading-relaxed mb-4">
            This is a placeholder description for {product.title}. It features excellent quality and provides great value for the price of £{product.price.toFixed(2)}. Suitable for various uses and highly recommended by customers.
         </p>

      </div>
    </div>
  )
}
