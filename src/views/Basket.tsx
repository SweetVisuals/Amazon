import React from 'react';
import { CameraIcon, CheckCircleIcon, CheckSquareIcon, MicIcon, MinusIcon, PlusIcon, SearchIcon, TrashIcon } from '../components/Icons';

export const Basket = ({ onCheckout, cartItems, setCartItems, onProductClick }: { onCheckout: () => void, cartItems: any[], setCartItems: (items: any[]) => void, onProductClick: (p: any) => void }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQ = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQ };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto pb-20">
      {/* Header Area */}
      <div className="amazon-header-bg px-4 pt-10 pb-0 shadow-sm sticky top-0 z-50">
        {/* Search Bar */}
        <div className="bg-white rounded-md flex items-center px-3 py-2 shadow-sm mb-3">
          <SearchIcon className="text-gray-500 w-5 h-5 mr-2" />
          <span className="text-gray-500 text-[15px] flex-1 truncate">Search Amazon</span>
          <div className="flex items-center space-x-3 text-gray-500">
            <CameraIcon className="w-5 h-5" />
            <MicIcon className="w-5 h-5" />
          </div>
        </div>

        {/* Categories / Tabs */}
        <div className="flex items-center text-[#0f1111] overflow-x-auto no-scrollbar pt-1 pb-0 space-x-6">
          <div className="text-[15px] shrink-0 font-bold pb-2 border-b-[3px] border-black">Basket</div>
          <div className="text-[15px] shrink-0 pb-2">Lists</div>
          <div className="text-[15px] shrink-0 pb-2">Buy Again</div>
          <div className="text-[15px] shrink-0 pb-2">Keep shopping for</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
         <div className="mb-3 flex items-start">
            <span className="text-[20px] text-[#0f1111] leading-none mt-1 mr-1">Subtotal </span>
            <span className="text-[24px] font-bold text-[#0f1111] leading-none">£{Math.floor(subtotal).toLocaleString('en-GB')}</span>
            <span className="text-[13px] font-bold text-[#0f1111] leading-none mt-[2px]">{(subtotal.toFixed(2).split('.')[1] || '00')}</span>
         </div>
         
         <div className="flex items-start mb-2">
            <CheckCircleIcon className="w-5 h-5 mr-1 shrink-0 mt-0.5 text-[#058265]" />
            <div className="text-[14px] leading-snug">
               <span className="text-[#058265]">Your order qualifies for </span>
               <span className="text-[#058265] font-bold">FREE Delivery</span>
               <span className="text-[#058265]"> in the UK. </span>
               <span className="text-[#007185] hover:underline cursor-pointer font-bold">Delivery Details</span>
            </div>
         </div>
         <div className="text-[14px] text-gray-600 mb-4 pl-6">
            Select this option at checkout.
         </div>

         <button 
           onClick={onCheckout}
           disabled={cartItems.length === 0}
           className="w-full bg-[#ffd814] hover:bg-[#f7ca00] disabled:bg-gray-200 disabled:opacity-50 text-[#0f1111] py-3 rounded-full font-medium text-[15px] shadow-sm mb-6"
         >
            Proceed to checkout ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} item{cartItems.length !== 1 ? 's' : ''})
         </button>

         {/* Items List */}
         <div className="border-t border-gray-200 pt-4 relative">
             <div className="text-[#007185] text-[15px] hover:underline cursor-pointer mb-4">
                Deselect all items
             </div>

             {cartItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">Your Amazon Basket is empty</div>
             ) : (
                cartItems.map(item => (
                   <div key={item.id} className="mb-6 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                       <div className="flex gap-4 mb-4">
                          <div className="relative">
                             <div className="absolute -left-1 -top-1 bg-white p-0.5 rounded-md z-10 w-7 h-7 flex items-center justify-center">
                               <CheckSquareIcon className="w-6 h-6 text-[#007185]" />
                             </div>
                             <div className="w-[120px] h-[120px] bg-[#f0f2f5] rounded-sm ml-2 mt-2 flex items-center justify-center p-2 cursor-pointer" onClick={() => onProductClick(item)}>
                                {item.imageUrl ? (
                                   <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                ) : (
                                   <span className="text-gray-400 text-xs">No image</span>
                                )}
                             </div>
                          </div>
                          <div className="flex-1">
                             <h3 className="text-[15px] text-[#0f1111] leading-tight line-clamp-3 mb-1 cursor-pointer hover:text-[#007185] transition-colors" onClick={() => onProductClick(item)}>
                               {item.title}
                             </h3>
                             <div className="flex items-start mb-1">
                                <span className="text-[20px] font-bold text-[#0f1111] leading-none">£{Math.floor(item.price).toLocaleString('en-GB')}</span>
                                <span className="text-[12px] font-bold text-[#0f1111] leading-none pt-[1px]">{(item.price.toFixed(2).split('.')[1] || '00')}</span>
                             </div>
                             <div className="text-[12px] text-gray-500 mb-1">Eligible for FREE Shipping</div>
                             <div className="text-[14px] text-[#058265] mb-2 font-medium">In stock</div>
                          </div>
                       </div>
                       {/* Actions */}
                       <div className="flex flex-col gap-3 pl-[136px]">
                           <div className="flex items-center gap-2">
                               {/* Quantity Pill */}
                               <div className="flex items-center bg-white border-2 border-[#ffd814] rounded-full h-[36px] min-w-[100px] overflow-hidden shadow-sm">
                                  <button onClick={() => updateQuantity(item.id, -1)} className="px-2 h-full flex items-center justify-center bg-[#f0f2f5] hover:bg-gray-200 active:bg-gray-300 relative after:content-[''] after:absolute after:right-0 after:top-1.5 after:bottom-1.5 after:w-[1px] after:bg-gray-300">
                                      {item.quantity === 1 ? <TrashIcon className="w-4 h-4 text-gray-700" /> : <MinusIcon className="w-4 h-4 text-gray-700" />}
                                  </button>
                                  <div className="flex-1 text-center font-bold text-[15px] bg-white h-full flex items-center justify-center text-[#0f1111]">{item.quantity}</div>
                                  <button onClick={() => updateQuantity(item.id, 1)} className="px-2 h-full flex items-center justify-center bg-[#f0f2f5] hover:bg-gray-200 active:bg-gray-300 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[1px] before:bg-gray-300">
                                      <PlusIcon className="w-4 h-4 text-gray-700" />
                                  </button>
                               </div>

                               <button onClick={() => removeItem(item.id)} className="bg-white rounded-full px-3 h-[36px] text-[13px] font-medium shadow-[0_2px_5px_0_rgba(213,217,217,0.5)] hover:bg-gray-50 active:bg-gray-100 transition-colors whitespace-nowrap">
                                   Delete
                               </button>
                               <button className="bg-white rounded-full px-3 h-[36px] text-[13px] font-medium shadow-[0_2px_5px_0_rgba(213,217,217,0.5)] hover:bg-gray-50 active:bg-gray-100 transition-colors whitespace-nowrap">
                                   Save for later
                               </button>
                           </div>
                           
                           <div className="flex gap-2">
                               <button className="bg-white rounded-full px-3 h-[36px] text-[13px] font-medium shadow-[0_2px_5px_0_rgba(213,217,217,0.5)] hover:bg-gray-50 active:bg-gray-100 transition-colors">
                                   Share
                               </button>
                               <button className="bg-white rounded-full px-3 h-[36px] text-[13px] font-medium shadow-[0_2px_5px_0_rgba(213,217,217,0.5)] hover:bg-gray-50 active:bg-gray-100 transition-colors">
                                   See more like this
                               </button>
                           </div>
                       </div>
                   </div>
                ))
             )}

             {/* Ad Card */}
             <div className="border border-gray-200 rounded-lg p-4 flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                 <div className="flex items-start space-x-3 mb-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/3840px-Amazon_Prime_Logo.svg.png" alt="prime" className="h-[22px] mt-2 block" />
                    <div className="text-[15px] font-bold text-[#0f1111] leading-tight flex-1">
                       Get free fast delivery with a 30-day FREE trial.
                    </div>
                 </div>
                 <button className="border border-gray-300 bg-white rounded-full py-2 px-4 shadow-sm w-full font-medium text-[14px]">
                    Try Prime Shipping
                 </button>
             </div>
         </div>

      </div>
    </div>
  );
};
