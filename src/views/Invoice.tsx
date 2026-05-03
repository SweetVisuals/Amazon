import React from 'react';
import { ArrowLeft, Check, Reply, Forward, SmilePlus, Lock, Inbox, AlertCircle, Maximize2, MoreHorizontal, Archive, Trash2, Mail } from 'lucide-react';

export const Invoice = ({ order, onBack }: { order?: any, onBack: () => void }) => {
  const firstItem = order?.order_items?.[0] || { title: 'Order Confirmation' };
  const date = order?.created_at ? new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'May 1';
  const fullName = order?.delivery_address?.name || 'NICOLAS';
  const orderNumber = React.useMemo(() => {
    // Return a random Amazon-style order ID: 3 digits - 7 digits - 7 digits
    const p1 = Math.floor(Math.random() * 900) + 100;
    const p2 = Math.floor(Math.random() * 9000000) + 1000000;
    const p3 = Math.floor(Math.random() * 9000000) + 1000000;
    return `${p1}-${p2}-${p3}`;
  }, []);

  const totalAmount = order?.total_amount || 0;
  
  const estimatedDeliveryDate = order?.estimated_delivery_date ? new Date(order.estimated_delivery_date) : null;
  const formattedEstimatedDate = estimatedDeliveryDate ? estimatedDeliveryDate.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Wed, May 3';
  const arrivingDay = estimatedDeliveryDate ? estimatedDeliveryDate.toLocaleDateString('en-GB', { weekday: 'long' }) : 'Wednesday';

  const randomDeliveryTime = React.useMemo(() => {
    const hours = Math.floor(Math.random() * 4) + 1; // 1 to 4 PM
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${hours}:${minutes} PM`;
  }, []);

  return (
    <div className="flex flex-col h-full bg-white z-50 absolute inset-0 overflow-y-auto">
      {/* App Header (simulating mobile mail client) */}
      <div className="flex items-center justify-between px-4 pt-14 pb-4 border-b border-gray-100 bg-white sticky top-0 z-10">
         <div className="flex items-center gap-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" onClick={onBack} />
         </div>
         <div className="flex items-center gap-6 text-gray-600">
            <div className="w-6 h-6 flex items-center justify-center">
               <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2L12L9.5 9.5L12 2Z"/></svg>
            </div>
            <Archive className="w-5 h-5" />
            <Trash2 className="w-5 h-5" />
            <Mail className="w-5 h-5" />
            <MoreHorizontal className="w-5 h-5" />
         </div>
      </div>

      <div className="px-4 py-4">
         <div className="flex items-start justify-between mb-2">
            <h1 className="text-[22px] text-gray-900 font-normal leading-tight pr-4">
               Ordered: '{firstItem.title?.slice(0, 35)}...'
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
               <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center bg-white p-1.5">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="w-full h-full object-contain" alt="Amazon" />
               </div>
               <div>
                  <div className="flex items-center">
                     <span className="font-bold text-[15px] text-gray-900 mr-1">Amazon.co.uk</span>
                     <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                     <span className="text-gray-500 text-[13px] ml-2">{date}</span>
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

        {/* Gmail Order Widget */}
        <div className="bg-[#e8f0fe] rounded-[24px] p-4 mb-4 flex flex-col gap-3 shadow-sm border border-[#d2e3fc]">
            <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                    <h2 className="text-[16px] font-bold text-[#041e49] line-clamp-2 leading-tight">
                        {firstItem.title}
                    </h2>
                    <span className="text-[13px] text-[#444746] mt-1 block">
                        {order?.order_items?.length || 1} item from Amazon
                    </span>
                </div>
                <div className="w-[52px] h-[52px] bg-white rounded-[12px] flex items-center justify-center p-1 shadow-sm border border-[#e3e3e3] shrink-0 overflow-hidden">
                    <img src={firstItem.image_url || firstItem.imageUrl} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="product" />
                </div>
            </div>

            <div className="mt-4">
                <h1 className="text-[32px] text-[#041e49] leading-tight font-normal">
                    Expected by<br />
                    {formattedEstimatedDate}
                </h1>
            </div>

            <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#444746]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className="text-[14px] text-[#1f1f1f]">Order placed · Estimate from Amazon</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center text-[#444746] font-bold text-[20px]">
                        #
                    </div>
                    <div>
                        <div className="text-[13px] font-bold text-[#1f1f1f]">Order number</div>
                        <div className="text-[14px] text-[#444746]">{orderNumber}</div>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-2">
                <button className="bg-[#0b57d0] text-white px-6 py-2.5 rounded-full font-medium text-[14px] flex-1">
                    View order
                </button>
                <button className="bg-[#c2e7ff] text-[#041e49] px-6 py-2.5 rounded-full font-medium text-[14px] flex-1">
                    View item
                </button>
            </div>
        </div>

        <div className="text-[12px] text-[#444746] flex items-center justify-between mb-6 px-1">
            <span>Based on this email</span>
            <div className="flex items-center gap-4">
                <span>Correct?</span>
                <button className="hover:bg-gray-100 p-1 rounded-full"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg></button>
                <button className="hover:bg-gray-100 p-1 rounded-full"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg></button>
            </div>
        </div>

         {/* The actual Email body - rendering exactly like the screenshot */}
         <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
            {/* Top dark nav */}
            <div className="bg-[#232f3e] text-white flex justify-between items-center px-6 py-4 text-[15px] font-bold">
               <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-5 brightness-0 invert" alt="Amazon" />
               <div className="flex gap-4">
                  <span>Your Orders</span>
                  <span>Your Account</span>
                  <span>Buy Again</span>
               </div>
            </div>

            <div className="p-5 pb-8">
               <h2 className="text-[22px] font-bold text-gray-900 mb-6 bg-white">
                  Thanks for your order, {fullName.split(' ')[0]}!
               </h2>

               {/* Progress tracker */}
                <div className="relative mb-10 w-[95%] mx-auto">
                    <div className="absolute top-[9px] left-0 right-0 h-[3px] bg-gray-200 rounded-full z-0" />
                    <div 
                      className="absolute top-[9px] left-0 h-[3px] bg-[#008296] rounded-l-full z-10 transition-all duration-500" 
                      style={{ 
                        width: order?.status === 'DELIVERED' ? '100%' : 
                               order?.status === 'SHIPPED' ? '66%' : 
                               order?.status === 'PROCESSING' ? '33%' : '20%' 
                      }}
                    />
                    
                    <div className="relative z-20 flex justify-between items-start">
                        <div className="flex flex-col items-center w-1/4">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order?.status) ? 'bg-[#008296] text-white' : 'bg-gray-200'}`}>
                               {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order?.status) && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={`text-[14px] mt-2 text-center transition-colors ${['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order?.status) ? 'font-bold text-gray-900' : 'text-gray-600'}`}>Ordered</span>
                        </div>
                        <div className="flex flex-col items-center w-1/4">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order?.status) ? 'bg-[#008296] text-white' : 'bg-gray-200'}`}>
                               {['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order?.status) && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={`text-[14px] mt-2 text-center transition-colors ${['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order?.status) ? 'font-bold text-gray-900' : 'text-gray-600'}`}>Dispatched</span>
                        </div>
                        <div className="flex flex-col items-center w-1/4">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${['SHIPPED', 'DELIVERED'].includes(order?.status) ? 'bg-[#008296] text-white' : 'bg-gray-200'}`}>
                               {['SHIPPED', 'DELIVERED'].includes(order?.status) && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={`text-[14px] mt-2 text-center transition-colors ${['SHIPPED', 'DELIVERED'].includes(order?.status) ? 'font-bold text-gray-900' : 'text-gray-600'}`}>Out for<br/>delivery</span>
                        </div>
                        <div className="flex flex-col items-center w-1/4">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${order?.status === 'DELIVERED' ? 'bg-[#008296] text-white' : 'bg-gray-200'}`}>
                               {order?.status === 'DELIVERED' && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={`text-[14px] mt-2 text-center transition-colors ${order?.status === 'DELIVERED' ? 'font-bold text-gray-900' : 'text-gray-600'}`}>Delivered</span>
                        </div>
                    </div>
                </div>

               {/* Order Details text */}
               <hr className="border-t border-gray-300 mb-6" />

               <div className="mb-6">
                  <h3 className="text-[18px] font-bold text-gray-900">
                    {order?.status === 'DELIVERED' ? 'Delivered' : 'Arriving'} {arrivingDay}
                  </h3>
                  <div className="text-[16px] font-bold text-gray-900 mt-1">{fullName.toUpperCase()}</div>
                  <div className="text-[15px] text-gray-900 mt-1">Order # {orderNumber}</div>
               </div>

               <button onClick={onBack} className="bg-[#ffd814] text-[#0f1111] px-4 py-2.5 rounded-full font-medium text-[14px] mb-8 shadow-sm">
                  View or edit order
               </button>

               {/* Item rows */}
               {order?.order_items?.map((item: any) => (
                 <div key={item.id} className="flex items-start gap-4 mb-6">
                    <div className="w-[80px] h-[80px] border border-gray-200 flex items-center justify-center p-2 rounded shrink-0">
                       <img src={item.image_url} className="w-[60px] h-[60px] object-contain" alt="product" />
                    </div>
                    <div>
                       <a href="#" className="text-[15px] text-[#007185] hover:underline hover:text-[#C7511F] leading-snug block mb-1">
                          {item.title}
                       </a>
                       <div className="text-[13px] text-gray-600 mb-0.5">Sold by <a href="#" className="text-[#007185]">Amazon.co.uk</a></div>
                       <div className="text-[13px] text-gray-600 mb-0.5">Condition: New</div>
                       <div className="text-[13px] text-gray-600 mb-2">Quantity: {item.quantity}</div>
                       <div className="text-[18px] font-bold text-gray-900">£{item.price_at_purchase.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                 </div>
               ))}

               {/* Total Breakdown */}
               <div className="border-t border-gray-300 mt-2 pt-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[14px] text-gray-600">
                     <span>Items:</span>
                     <span>£{(totalAmount - (order?.shipping_cost || 0)).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center text-[14px] text-gray-600">
                     <span>Shipping & Handling:</span>
                     <span>£{(order?.shipping_cost || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 mt-2 border-t border-gray-100">
                     <span className="text-[16px] font-bold text-[#B12704]">Order Total:</span>
                     <span className="text-[16px] font-bold text-[#B12704]">£{totalAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
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
