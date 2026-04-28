import React from 'react';
import { CheckCircleIcon } from '../components/Icons';
import { SearchIcon, ShoppingCart, Menu, ChevronRight } from 'lucide-react';

export const Success = ({ onContinue, onNavigate, deliveryInfo }: { onContinue: () => void, onNavigate: (v: any) => void, deliveryInfo?: any }) => {
  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] z-50 absolute inset-0 overflow-y-auto">
      {/* Header */}
      <div className="bg-[#232f3e] px-4 pt-12 pb-4 flex items-center justify-between text-white shadow-md">
         <div className="flex items-center gap-4">
             <Menu className="w-7 h-7" />
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
               className="h-5 mt-2 brightness-0 invert" 
               alt="Amazon" 
             />
         </div>
         <div className="flex items-center gap-4">
             <SearchIcon className="w-6 h-6" />
             <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1.5 -right-1.5 text-orange-400 font-bold text-xs">0</span>
             </div>
         </div>
      </div>

      <div className="bg-white p-4 m-3 mt-4 rounded-md shadow-sm border border-gray-200">
         <div className="flex items-center mb-2">
           <CheckCircleIcon className="text-green-700 w-6 h-6 mr-2" />
           <h1 className="text-lg font-bold text-[#058265]">Order placed, thank you!</h1>
         </div>
         <p className="text-[14px] text-gray-700 mb-6">Confirmation will be sent to your email.</p>
         
         <div className="border-t border-gray-200 pt-4 mb-4 text-[14px] text-[#0f1111]">
            <p className="mb-2"><strong>Shipping to</strong><br/>{deliveryInfo?.name || 'NICOLAS K THEATO'}, {deliveryInfo?.addressLine1 || '20, LIMES AVENUE'}...</p>
         </div>

         <div className="border-t border-gray-200 py-4 flex items-center justify-between">
            <div className="flex flex-col">
               <span className="font-bold text-[#0f1111] text-[15px]">Wednesday 29 Apr</span>
               <span className="text-gray-600 text-[13px]">Estimated delivery</span>
            </div>
         </div>

         <div className="border-t border-gray-200 pt-4 flex items-center text-[#007185] text-[15px] cursor-pointer" onClick={() => onNavigate('orders')}>
            Review or edit your recent orders <ChevronRight className="w-4 h-4 mt-0.5" />
         </div>
      </div>

      <div className="px-3">
         <button 
           onClick={onContinue}
           className="w-full bg-[#ffd814] hover:bg-[#f7ca00] py-3 rounded-full font-medium text-[15px] shadow-sm border border-transparent mt-2"
         >
            Continue Shopping
         </button>
      </div>
    </div>
  )
}
