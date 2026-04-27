import React from 'react';
import { ArrowLeft, Check, Reply, Forward, SmilePlus, Lock, Inbox, AlertCircle, Maximize2, MoreHorizontal, Archive, Trash2, Mail } from 'lucide-react';

export const Invoice = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex flex-col h-full bg-white z-50 absolute inset-0 overflow-y-auto">
      {/* App Header (simulating mobile mail client) */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
         <div className="flex items-center gap-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" onClick={onBack} />
         </div>
         <div className="flex items-center gap-6 text-gray-600">
            <Archive className="w-5 h-5" />
            <Trash2 className="w-5 h-5" />
            <Mail className="w-5 h-5" />
            <MoreHorizontal className="w-5 h-5" />
         </div>
      </div>

      <div className="px-4 py-4">
         <div className="flex items-start justify-between mb-2">
            <h1 className="text-[22px] text-gray-900 leading-tight pr-4">
               Ordered: 'Apple iPhone 17 256 GB:...'
            </h1>
            <div className="bg-gray-100 px-2 py-0.5 rounded text-[12px] text-gray-600 font-medium">
               Inbox
            </div>
            {/* Star icon placeholder */}
            <svg className="w-6 h-6 text-gray-400 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
         </div>

         {/* Sender info */}
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center p-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/960px-Amazon_logo.svg.png" className="w-full object-contain" alt="Amazon" />
               </div>
               <div>
                  <div className="flex items-center">
                     <span className="font-bold text-[15px] text-gray-900 mr-1">Amazon.co.uk</span>
                     <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                     <span className="text-gray-500 text-[13px] ml-2">Apr 26</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-[13px]">
                     <span>to me</span>
                     <ChevronDownIcon className="w-3 h-3 ml-1" />
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
               <SmilePlus className="w-5 h-5" />
               <Reply className="w-5 h-5" />
               <MoreHorizontal className="w-5 h-5" />
            </div>
         </div>

         {/* The actual Email body - rendering exactly like the screenshot */}
         <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
            {/* Top dark nav */}
            <div className="bg-[#232f3e] text-white flex justify-between px-6 py-4 text-[15px] font-bold">
               <span>Your Orders</span>
               <span>Your Account</span>
               <span>Buy Again</span>
            </div>

            <div className="p-5 pb-8">
               <h2 className="text-[22px] font-bold text-gray-900 mb-6 bg-white">
                  Thanks for your order, NICOLAS!
               </h2>

               {/* Progress tracker */}
               <div className="relative mb-10 w-[95%] mx-auto">
                   <div className="absolute top-[9px] left-0 right-0 h-[3px] bg-gray-200 rounded-full z-0" />
                   <div className="absolute top-[9px] left-0 w-[15%] h-[3px] bg-[#008296] rounded-l-full z-10" />
                   
                   <div className="relative z-20 flex justify-between items-start">
                       <div className="flex flex-col items-center w-1/4">
                           <div className="w-5 h-5 rounded-full bg-[#008296] text-white flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                           </div>
                           <span className="text-[14px] font-bold text-gray-900 mt-2 text-center">Ordered</span>
                       </div>
                       <div className="flex flex-col items-center w-1/4">
                           <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                           </div>
                           <span className="text-[14px] text-gray-600 mt-2 text-center">Dispatched</span>
                       </div>
                       <div className="flex flex-col items-center w-1/4">
                           <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                           </div>
                           <span className="text-[14px] text-gray-600 mt-2 text-center">Out for<br/>delivery</span>
                       </div>
                       <div className="flex flex-col items-center w-1/4">
                           <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                           </div>
                           <span className="text-[14px] text-gray-600 mt-2 text-center">Delivered</span>
                       </div>
                   </div>
               </div>

               {/* Order Details text */}
               <hr className="border-t border-gray-300 mb-6" />

               <div className="mb-6">
                  <h3 className="text-[18px] font-bold text-gray-900">Arriving Wednesday</h3>
                  <div className="text-[16px] font-bold text-gray-900 mt-1">NICOLAS – LONDON</div>
                  <div className="text-[15px] text-gray-900 mt-1">Order # 202-5371485-8987523</div>
               </div>

               <button className="bg-[#ffd814] text-[#0f1111] px-4 py-2.5 rounded-full font-medium text-[14px] mb-8 shadow-sm">
                  View or edit order
               </button>

               {/* Item row */}
               <div className="flex items-start gap-4 mb-6">
                  <div className="w-[80px] h-[80px] border border-gray-200 flex items-center justify-center p-2 rounded shrink-0">
                     <img src="https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg" className="w-[60px] h-[60px] object-contain" alt="iphone" />
                  </div>
                  <div>
                     <a href="#" className="text-[15px] text-[#007185] hover:underline hover:text-[#C7511F] leading-snug block mb-1">
                        Apple iPhone 17 256 GB: 6.3-inch...
                     </a>
                     <div className="text-[13px] text-gray-600 mb-0.5">Sold by <a href="#" className="text-[#007185]">Amazon.co.uk</a></div>
                     <div className="text-[13px] text-gray-600 mb-0.5">Condition: New</div>
                     <div className="text-[13px] text-gray-600 mb-2">Quantity: 1</div>
                     <div className="text-[18px] font-bold text-gray-900">£799.00</div>
                  </div>
               </div>

               {/* Total */}
               <div className="flex justify-between items-center py-4 border-t border-gray-300 mt-2">
                  <span className="text-[16px] text-gray-900">Total</span>
                  <span className="text-[16px] font-bold text-gray-900">£799.00</span>
               </div>
            </div>
         </div>

         {/* Bottom Actions */}
         <div className="flex gap-4 mt-6 pb-12">
            <button className="flex-1 bg-white border border-gray-300 rounded-full py-3 flex items-center justify-center gap-2 font-medium text-gray-700">
               <Reply className="w-5 h-5" />
               Reply
            </button>
            <button className="flex-1 bg-white border border-gray-300 rounded-full py-3 flex items-center justify-center gap-2 font-medium text-gray-700">
               <Forward className="w-5 h-5" />
               Forward
            </button>
         </div>

      </div>
    </div>
  );
};

function ChevronDownIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
