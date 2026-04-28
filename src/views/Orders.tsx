import React, { useEffect, useState } from 'react';
import { SearchIcon, ShoppingCart, Menu, ChevronRight, Camera, Mic, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export const Orders = ({ onNavigate, onBack }: { onNavigate: (v: any, data?: any) => void, onBack: () => void }) => {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setLoading(true);

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (data) {
        setOrders(data);
      }
      if (error) {
         console.error(error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [profile]);

  return (
    <div className="flex flex-col h-full bg-white z-50 absolute inset-0 overflow-y-auto pb-10">
      {/* Header (amazon search bar style) */}
      <div className="bg-gradient-to-b from-[#f5d58b] to-[#f0c14b] px-4 pt-12 pb-3 flex items-center shadow-sm">
         <ArrowLeft className="w-6 h-6 text-[#0f1111] mr-3" onClick={onBack} />
         <div className="flex-1 flex items-center bg-white rounded-[8px] px-3 py-2 shadow-sm border border-gray-300">
             <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
             <input type="text" placeholder="Search or ask a question" className="flex-1 outline-none text-[15px]" />
             <Camera className="w-5 h-5 text-gray-400 mx-2" />
             <Mic className="w-5 h-5 text-gray-400" />
         </div>
      </div>

      {/* Title */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
         <h1 className="text-[24px] font-bold text-[#0f1111]">Your Orders</h1>
      </div>

      {/* Search and Filter */}
      <div className="bg-white flex items-center border-b border-gray-200">
         <div className="flex-1 flex items-center px-4 py-3 border-r border-gray-200">
            <SearchIcon className="w-5 h-5 text-[#007185] mr-2" />
            <span className="text-[15px] font-medium text-gray-500">Search all orders</span>
         </div>
         <div className="px-4 py-3 flex items-center text-[15px] font-medium text-[#0f1111]">
            Filter <ChevronRight className="w-4 h-4 ml-1 text-gray-500" />
         </div>
      </div>

      {/* Prime Savings */}
      <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
         <div className="flex items-center gap-3">
             <div className="flex flex-col font-bold text-[16px] leading-tight text-[#0f1111]">
                <span>Your savings with</span>
                <span>Prime this year</span>
             </div>
             <img src="https://m.media-amazon.com/images/G/01/marketing/prime/offers/box._CB423594025_.png" alt="Prime Box" className="w-[45px] h-[45px] object-contain ml-2" />
         </div>
         <div className="bg-gray-100 rounded-[8px] px-4 py-2 flex items-center gap-2">
            <span className="font-bold text-[18px]">£17</span>
            <span className="text-[12px] leading-tight text-[#0f1111]">with Prime<br/>fast delivery</span>
         </div>
      </div>

      {/* Buy again */}
      <div className="bg-white px-4 py-4 border-b-4 border-gray-200">
         <div className="flex justify-between items-center mb-3">
            <h2 className="text-[20px] font-bold text-[#0f1111]">Buy again</h2>
            <span className="text-[#007185] text-[15px] hover:underline cursor-pointer">See more</span>
         </div>
         <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
             <div className="w-[110px] h-[110px] shrink-0 bg-gray-50 rounded-[8px] border border-gray-100 flex items-center justify-center p-2">
                 <img src="https://m.media-amazon.com/images/I/71Y-tWPE7KL._AC_SX679_.jpg" className="w-full h-full object-contain mix-blend-multiply" />
             </div>
             <div className="w-[110px] h-[110px] shrink-0 bg-gray-50 rounded-[8px] border border-gray-100 flex items-center justify-center p-2">
                 <img src="https://m.media-amazon.com/images/I/61k1qY2B52L._AC_SX679_.jpg" className="w-full h-full object-contain mix-blend-multiply" />
             </div>
             <div className="w-[110px] h-[110px] shrink-0 bg-gray-50 rounded-[8px] border border-gray-100 flex items-center justify-center p-2">
                 <img src="https://m.media-amazon.com/images/I/71Y88S45W6L._AC_SX679_.jpg" className="w-full h-full object-contain mix-blend-multiply" />
             </div>
             <div className="w-[110px] h-[110px] shrink-0 bg-gray-50 rounded-[8px] border border-gray-100 flex items-center justify-center p-2">
                 <img src="https://m.media-amazon.com/images/I/61mQd0T0BTL._AC_SX679_.jpg" className="w-full h-full object-contain mix-blend-multiply" />
             </div>
         </div>
      </div>

      {/* Purchase history */}
      <div className="bg-white px-4 py-4 flex flex-col gap-3">
         <h2 className="text-[20px] font-bold text-[#0f1111]">Purchase history</h2>
         
         {!profile && (
            <div className="text-[14px] text-gray-600 mb-2">Please log in to see your orders.</div>
         )}
         
         {profile && loading && (
            <div className="text-[14px] text-gray-600 mb-2">Loading orders...</div>
         )}
 
         {profile && !loading && orders.length === 0 && (
            <div className="text-[14px] text-gray-600 mb-2">You have no orders yet.</div>
         )}

         {orders.map((order, index) => {
            const firstItem = order.order_items?.[0] || {};
            const itemTitle = firstItem.title || 'Unknown Item';
            const imageUrl = firstItem.image_url || 'https://m.media-amazon.com/images/I/6182S7MYC2L._AC_SY200_.jpg';
            const date = new Date(order.created_at).toLocaleDateString();

            return (
               <div key={order.id} className="border border-gray-300 rounded-[8px] p-4 flex gap-4 cursor-pointer" onClick={() => onNavigate('tracking', order)}>
                 <div className="w-[80px] shrink-0 flex items-center justify-center">
                     <img src={imageUrl} className="w-[80px] h-[80px] object-contain mix-blend-multiply" alt="product" />
                 </div>
                 <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-[16px] text-[#0f1111] mb-1">{order.status === 'PENDING' ? 'Processing' : order.status}</h3>
                    <p className="text-[14px] text-gray-800 leading-snug line-clamp-2">
                       {itemTitle}
                    </p>
                    <p className="text-[13px] text-gray-500 mt-1">
                       Placed on {date}
                    </p>
                 </div>
               </div>
            );
         })}
      </div>
    </div>
  )
}
