import React, { useState } from 'react';
import { ArrowLeftIcon } from '../components/Icons';
import { Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const Checkout = ({ 
   onBack, 
   onComplete, 
   savedCards,
   cartItems = [],
   deliveryInfo
}: { 
   onBack: () => void, 
   onComplete: () => void, 
   savedCards?: any[],
   cartItems?: any[],
   deliveryInfo?: any
}) => {
  const [loading, setLoading] = useState(false);
  const { user, signIn } = useAuth();

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login first to place order.");
      signIn();
      return;
    }
    setLoading(true);
    
    // Insert order
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        status: 'PENDING',
        delivery_address: deliveryInfo || { name: 'Default Delivery' },
      })
      .select()
      .single();

    if (orderError) {
      alert("Error placing order: " + orderError.message);
      setLoading(false);
      return;
    }

    // Insert order items
    const itemsToInsert = cartItems.map(item => ({
      order_id: orderData.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price,
      title: item.title,
      image_url: item.imageUrl
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(itemsToInsert);

    if (itemsError) {
       console.error("Error inserting items:", itemsError);
    }

    setLoading(false);
    onComplete(); // clears cart and navigates and shows success
  };

  const defaultCard = savedCards && savedCards.length > 0 ? savedCards[0] : { brand: 'Visa', last4: '9906' };
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col h-full bg-[#EAEDED] overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] px-3 py-3 flex items-center shadow-sm border-b border-[#cca73d]">
        <button onClick={onBack} className="mr-3 text-[#0f1111]">
          <ArrowLeftIcon className="w-7 h-7" />
        </button>
        <span className="text-[20px] font-medium text-[#0f1111] truncate">Place Your Order - Amazon.com...</span>
      </div>

      <div className="bg-white px-4 py-3 mb-2 shadow-sm border-b border-gray-200">
         <div className="text-[14px]">Order totals include VAT. <span className="text-[#007185] cursor-pointer hover:underline">See details</span></div>
      </div>

      <div className="bg-white px-4 py-4 mb-2 shadow-sm border-y border-gray-200">
          <div className="border-[2px] border-[#007185] rounded-[8px] p-4 flex items-start mb-4">
              <input type="checkbox" className="w-[18px] h-[18px] mt-[2px] mr-3 border-gray-400 rounded-sm text-[#007185] focus:ring-[#007185]" />
              <div className="text-[15px] text-[#0f1111] leading-snug">
                  Tick this box to default to these delivery and payment options in the future.
              </div>
          </div>
          
          <div className="border-l-4 border-[#ff9900] bg-white border-y border-r border-y-gray-200 border-r-gray-200 rounded-r-[8px] p-3 flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
              <h3 className="text-[15px] font-medium text-[#007185] underline line-clamp-1">
                  Signature or one-time password required at time of delivery
              </h3>
          </div>
      </div>

      <div className="bg-white px-4 py-4 mb-2 shadow-sm border-y border-gray-200 flex flex-col gap-2">
          <h2 className="text-[18px] font-bold text-[#0f1111]">Paying with {defaultCard.brand} {defaultCard.last4}</h2>
          <div className="text-[#007185] text-[15px] hover:underline cursor-pointer">Change payment method</div>
          <div className="text-[#007185] text-[15px] hover:underline cursor-pointer">Use a gift card, voucher or promo code</div>
      </div>

      <div className="bg-white px-4 py-4 mb-2 shadow-sm border-y border-gray-200 flex flex-col gap-2">
          <h2 className="text-[18px] font-bold text-[#0f1111]">Delivering to {deliveryInfo?.name || 'NICOLAS K THEATO'}</h2>
          <div className="text-[15px] text-[#0f1111] leading-snug">
             {deliveryInfo?.addressLine1 || '20, LIMES AVENUE'}, {deliveryInfo?.addressLine2 || 'LONDON, SW13 0HF'},<br />
             {deliveryInfo?.country || 'United Kingdom'}
          </div>
          
          <div className="text-[#007185] text-[15px] mt-1 hover:underline cursor-pointer">Change delivery address</div>
          <div className="text-[#007185] text-[15px] hover:underline cursor-pointer">Add delivery instructions</div>
          
          <div className="text-[#0f1111] text-[15px] flex items-center justify-between font-medium mt-1">
             Pickup near this address
             <span className="text-[12px]">▲</span>
          </div>
          <div className="text-[14px]">
             Collect White • 0.8 mi <span className="text-[#007185]">See details</span><br/>
             <span className="text-[#007185]">Pickup here</span>
          </div>

          <div className="border-l-4 border-[#ff9900] bg-white border-y border-r border-y-gray-200 border-r-gray-200 rounded-r-[8px] p-3 flex flex-col shadow-[0_1px_2px_rgba(0,0,0,0.1)] mt-4">
              <h3 className="text-[15px] font-bold text-[#0f1111] mb-1">
                  Where should the driver leave your package?
              </h3>
              <p className="text-[14px]">
                 To deliver the order to your address even if no one is available, simply select a preferred delivery location from the list below
              </p>
              <div className="text-[#007185] text-[15px] mt-3 hover:underline cursor-pointer">Add a preferred delivery location</div>
          </div>
      </div>

      <div className="bg-white px-4 py-4 mb-4 shadow-sm border-y border-gray-200">
         <h2 className="text-[18px] font-bold text-[#0f1111] mb-1">Arriving 29 Apr 2026</h2>
         <p className="text-[15px] mb-3">If you order in the next 2 hours and 9 minutes</p>

         <div className="flex flex-col gap-3 mb-6">
            <label className="flex items-start gap-3">
               <input type="radio" name="delivery" className="mt-1 w-[18px] h-[18px] text-[#007185]" />
               <div>
                  <div className="font-bold text-[15px]">Monday 27 Apr</div>
                  <div className="border border-green-600 rounded p-1.5 mt-1 text-[15px] text-[#0f1111]">
                     <span className="text-[#058265] font-bold">Fast, FREE delivery with Prime. </span>
                       select to learn more <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Amazon_Prime_Logo.svg/3840px-Amazon_Prime_Logo.svg.png" className="h-[14px] ml-1 inline-block object-contain" alt="prime" />
                  </div>
               </div>
            </label>
            <label className="flex items-start gap-3">
               <input type="radio" name="delivery" defaultChecked className="mt-1 w-[18px] h-[18px] text-[#007185]" />
               <div className="leading-tight">
                  <div className="font-bold text-[15px]">Wednesday 29 Apr</div>
                  <div className="text-[15px] text-gray-700">FREE Standard Delivery</div>
               </div>
            </label>
            <label className="flex items-start gap-3">
               <input type="radio" name="delivery" className="mt-1 w-[18px] h-[18px] text-[#007185]" />
               <div className="leading-tight">
                  <div className="font-bold text-[15px]">Tomorrow, 27 Apr</div>
                  <div className="text-[15px] text-gray-700">£4.99 Premium Delivery</div>
               </div>
            </label>
         </div>

         {cartItems.map((item: any, index: number) => (
             <div key={index} className="flex gap-4 p-4 bg-gray-50 border border-gray-200 rounded-[8px] mb-4">
                <div className="w-[100px] shrink-0">
                  {item.imageUrl ? <img src={item.imageUrl} className="w-[100px] h-[100px] object-contain mix-blend-multiply" /> : <div className="w-[100px] h-[100px] bg-white rounded"></div>}
                </div>
                <div className="flex-1 flex flex-col">
                   <div className="text-[14px] text-[#0f1111] leading-tight font-medium line-clamp-4">
                      {item.title}
                   </div>
                   <div className="text-[12px] text-gray-500 mt-1">300+ bought in past month</div>
                   <div className="flex items-center gap-2 mt-1">
                      <span className="bg-[#cc0c39] text-white text-[12px] px-1.5 py-0.5 rounded-sm font-bold">29% off</span>
                      <span className="text-[#cc0c39] text-[12px] font-bold">Limited time deal</span>
                   </div>
                   <div className="text-[18px] font-bold text-[#0f1111] mt-1 mb-2">
                       £{item.price.toFixed(2)}
                   </div>
                   <div className="text-[14px] text-gray-700">Ships from Amazon EU Sarl</div>
                   <div className="text-[14px] text-[#007185]">Sold by Amazon.co.uk</div>
                   
                   <div className="mt-3 flex items-center">
                     <div className="border border-gray-300 rounded-full py-1.5 flex items-center gap-0 bg-white shadow-sm inline-flex divide-x divide-gray-300">
                        <span className="text-[18px] px-3"><Trash2 className="w-5 h-5 text-[#007185]"/></span>
                        <span className="text-[16px] px-4 font-bold">{item.quantity}</span>
                        <span className="text-[20px] px-3 font-light leading-none">+</span>
                     </div>
                   </div>
                   
                   <div className="text-[#007185] mt-3">Add gift options</div>
                </div>
             </div>
         ))}

         <div className="mt-4 text-[14px]">
            To reduce packaging, the item is often dispatched in manufacturer's box, which reveals what's inside. To change, click below.
         </div>
         <div className="mt-2 border border-black rounded-[8px] p-3 text-[15px] flex justify-between items-center shadow-sm">
            Reduce packaging, dispatch in manufacturer's container
            <span>▼</span>
         </div>
      </div>

      <div className="bg-white px-4 py-4 mb-2 shadow-sm border-t border-gray-200">
          <button 
             onClick={handlePlaceOrder}
             disabled={loading}
             className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[#0f1111] py-3 rounded-full font-medium text-[16px] shadow-sm disabled:opacity-70"
          >
            {loading ? 'Processing...' : 'Buy now'}
          </button>
          
          <div className="text-[13px] text-[#565959] leading-snug mt-4">
             By placing your order you agree to Amazon's <span className="text-[#007185] hover:underline cursor-pointer">Conditions of Use & Sale</span>. 
             Please see our <span className="text-[#007185] hover:underline cursor-pointer">Privacy Notice</span>, 
             our <span className="text-[#007185] hover:underline cursor-pointer">Cookies Notice</span> and our <span className="text-[#007185] hover:underline cursor-pointer">Interest-Based Ads Notice</span>.
          </div>
      </div>

    </div>
  );
};
