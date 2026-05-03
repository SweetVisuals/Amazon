import React from 'react';
import { SearchIcon, CameraIcon, MicIcon, SquarePen, ArrowLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

export const Tracking = ({ order, onBack, onViewOrderDetails }: { order?: any, onBack: () => void, onViewOrderDetails?: () => void }) => {
  const firstItem = order?.order_items?.[0] || {};
  const imageUrl = firstItem.imageUrl || firstItem.image_url || 'https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SY200_.jpg';
  const address = order?.delivery_address || { name: 'NICOLAS K THEATO', addressLine1: '20, LIMES AVENUE', addressLine2: 'LONDON, SW13 0HF', country: 'United Kingdom' };
  
  const estimatedDeliveryDate = order?.estimated_delivery_date ? new Date(order.estimated_delivery_date) : null;
  const formattedDeliveryDate = estimatedDeliveryDate ? estimatedDeliveryDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }) : 'tomorrow by\n10 PM';

  const randomDeliveryTime = React.useMemo(() => {
    const hours = Math.floor(Math.random() * 4) + 1; // 1 to 4 PM
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${hours}:${minutes} PM`;
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#EAEDED] z-50 absolute inset-0 overflow-y-auto pb-10">
      {/* Header Area */}
      <div className="bg-gradient-to-b from-[#f5d58b] to-[#f0c14b] px-4 pt-16 pb-3 mb-2 flex items-center absolute top-0 w-full z-10 shadow-sm border-b border-[#cca73d]">
        <button onClick={onBack} className="mr-3 text-[#0f1111]">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 flex items-center bg-white rounded-[8px] px-3 py-2 shadow-sm border border-gray-300">
            <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
            <input type="text" placeholder="Search Amazon" className="flex-1 outline-none text-[15px]" />
            <CameraIcon className="w-5 h-5 text-gray-400 mx-2" />
            <MicIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="mt-[84px] w-full">
          <div className="bg-white px-4 py-4 pt-8 mb-2 border-b border-gray-200 flex flex-col items-start gap-2">
               <div className="flex justify-between items-start w-full">
                    <h2 className="text-[22px] font-bold text-[#0f1111] leading-tight">
                        {order?.status === 'DELIVERED' ? `Delivered today at ${randomDeliveryTime}` : order?.status === 'PENDING' ? 'Processing' : `Arriving ${formattedDeliveryDate}`}
                    </h2>
                   <span onClick={onBack} className="text-[#007185] font-medium text-[14px] cursor-pointer hover:underline">See all orders</span>
               </div>
               
               <div className="flex items-center gap-4 w-full mt-2">
                  <div className="w-[100px] h-[100px] bg-gray-50 rounded-lg flex items-center justify-center p-2 shrink-0 border border-gray-100">
                    <img src={imageUrl} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  {order?.status === 'PENDING' && (
                    <div className="flex-1">
                      <div className="text-[15px] font-bold text-[#0f1111] line-clamp-2">{firstItem.title}</div>
                      <div className="text-[13px] text-gray-500 mt-1">Quantity: {firstItem.quantity || 1}</div>
                    </div>
                  )}
               </div>
          </div>

          <div className="bg-white mb-2 border-y border-gray-200 pt-6 pb-6 w-full flex flex-col items-center shadow-sm">
               <h3 className="text-[18px] font-bold text-[#0f1111] mb-6 self-start px-4 w-full">
                 {order?.status === 'DELIVERED' ? 'Delivered' : order?.status === 'CANCELLED' ? 'Cancelled' : 'Track Package'}
               </h3>
               
                <div className="w-[85%] mx-auto relative h-8 flex items-center justify-between z-0 mb-6 mt-2">
                    <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 -mt-0.5 rounded-full z-[-1]" />
                    <div 
                      className="absolute top-1/2 left-0 h-1.5 bg-[#007185] -mt-0.5 rounded-l-full z-[-1] transition-all duration-500" 
                      style={{ 
                        width: order?.status === 'DELIVERED' ? '100%' : 
                               order?.status === 'SHIPPED' ? '66%' : 
                               order?.status === 'PROCESSING' ? '33%' : '20%' 
                      }}
                    />
                   
                   <div className="flex flex-col items-center relative">
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white transition-colors duration-300 ${['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order?.status) ? 'bg-[#007185]' : 'bg-gray-200 border border-gray-300'}`}>
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                       </div>
                       <span className="text-[13px] font-bold text-[#007185] absolute top-7 w-20 text-center">Ordered</span>
                   </div>
                   
                   <div className="flex flex-col items-center relative">
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white transition-colors duration-300 ${['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order?.status) ? 'bg-[#007185]' : 'bg-gray-200 border border-gray-300'}`}>
                          {['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order?.status) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                       </div>
                       <span className={`text-[13px] absolute top-7 w-20 text-center transition-colors ${['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order?.status) ? 'font-bold text-[#007185]' : 'font-medium text-gray-500'}`}>Shipped</span>
                   </div>

                   <div className="flex flex-col items-center relative">
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white transition-colors duration-300 ${['SHIPPED', 'DELIVERED'].includes(order?.status) ? 'bg-[#007185]' : 'bg-gray-200 border border-gray-300'}`}>
                          {['SHIPPED', 'DELIVERED'].includes(order?.status) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                       </div>
                       <span className={`text-[13px] absolute top-7 w-24 text-center transition-colors ${['SHIPPED', 'DELIVERED'].includes(order?.status) ? 'font-bold text-[#007185]' : 'font-medium text-gray-500'}`}>Out for<br/>delivery</span>
                   </div>

                   <div className="flex flex-col items-center relative">
                       <div className={`w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white transition-colors duration-300 ${order?.status === 'DELIVERED' ? 'bg-[#007185]' : 'bg-gray-200 border border-gray-300'}`}>
                          {order?.status === 'DELIVERED' && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                       </div>
                       <span className={`text-[13px] absolute top-7 text-center transition-colors ${order?.status === 'DELIVERED' ? 'font-bold text-[#007185]' : 'font-medium text-gray-500'}`}>Delivered</span>
                   </div>
               </div>

                <div className="w-full px-4 mt-8">
                    <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 py-3 rounded-full shadow-sm font-medium text-[15px] flex items-center justify-center gap-2">
                        <SquarePen className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                        Update delivery instructions
                    </button>
                </div>
           </div>

           <div className="bg-white mb-2 border-y border-gray-200 p-4 w-full flex flex-col shadow-sm">
              <h3 className="text-[18px] font-bold text-[#0f1111] mb-4">Items in this shipment</h3>
              <div className="flex flex-col gap-4">
                  {(order?.order_items || []).map((item: any, i: number) => (
                      <div key={i} className="flex gap-4">
                          <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center p-1 shrink-0">
                              <img src={item.image_url || item.imageUrl} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                          </div>
                          <div className="flex-1 flex flex-col">
                              <span className="text-[14px] text-[#0f1111] line-clamp-2 leading-tight">{item.title}</span>
                              <span className="text-[14px] font-bold text-[#0f1111] mt-1">£{(item.price_at_purchase || item.price || 0).toFixed(2)}</span>
                              <span className="text-[12px] text-gray-500">Qty: {item.quantity}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="bg-white mb-2 border-y border-gray-200 p-4 w-full flex flex-col shadow-sm">
              <h3 className="text-[18px] font-bold text-[#0f1111] mb-2">Delivery Address</h3>
              <p className="text-[15px] text-[#0f1111] leading-snug">
                 {address.name || address.full_name}<br/>
                 {address.addressLine1 || address.line1}<br/>
                 {address.addressLine2 || `${address.city}, ${address.zip}`}<br/>
                 {address.country}
              </p>
          </div>

          <div className="bg-white mb-2 border-y border-gray-200 pt-5 w-full flex flex-col mb-10 shadow-sm">
              <h3 className="text-[18px] font-bold px-4 mb-2 text-[#0f1111]">Order Info</h3>
              <div 
                className="flex justify-between py-4 border-t border-gray-200 px-4 active:bg-gray-50 cursor-pointer"
                onClick={onViewOrderDetails}
              >
                <span className="text-[16px] text-[#0f1111]">View order details</span>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex justify-between py-4 border-t border-gray-200 px-4 active:bg-gray-50 cursor-pointer">
                <span className="text-[16px] text-[#0f1111]">Download Invoice</span>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
          </div>
      </div>
    </div>
  )
}
