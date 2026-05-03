import React, { useState } from 'react';
import { ArrowLeftIcon } from '../components/Icons';
import { Edit2, Plus, X } from 'lucide-react';

export const Admin = ({ 
    onBack, 
    savedCards, 
    setSavedCards, 
    products, 
    setProducts,
    homepageImages,
    setHomepageImages,
    deliveryInfo,
    setDeliveryInfo
}: any) => {
    
  const [cardBrand, setCardBrand] = useState('Visa');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  const [wizardOpen, setWizardOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [imgUrl, setImgUrl] = useState('');
  const [prodTitle, setProdTitle] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [variants, setVariants] = useState<any[]>([]);
  const [showVariantBuilder, setShowVariantBuilder] = useState(false);
  const [newVariantType, setNewVariantType] = useState('Size');
  const [newVariantOptions, setNewVariantOptions] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'content'>('products');
  const [adminOrders, setAdminOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const fetchAllOrders = async () => {
    setOrdersLoading(true);
    const { supabase } = await import('../lib/supabase');
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });

    if (data) setAdminOrders(data);
    setOrdersLoading(false);
  };

  React.useEffect(() => {
    if (activeTab === 'orders') {
      fetchAllOrders();
    }
  }, [activeTab]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { supabase } = await import('../lib/supabase');
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) {
      alert("Error updating order: " + error.message);
    } else {
      setAdminOrders(adminOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber) return;
    const last4 = cardNumber.slice(-4).padStart(4, '0');
    setSavedCards([
       ...savedCards, 
       { id: Date.now().toString(), brand: cardBrand, last4, expiry: cardExpiry }
    ]);
    setCardNumber('');
    setCardExpiry('');
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle) return;
    
    // Import supabase dynamically since we are not importing it at top level yet
    const { supabase } = await import('../lib/supabase');

    if (editingId) {
       // Update in Supabase
       const { error } = await supabase
         .from('products')
         .update({ 
           title: prodTitle, 
           price: parseFloat(prodPrice), 
           image_url: imgUrl 
         })
         .eq('id', editingId);

       if (error) {
         alert("Error updating product: " + error.message);
         return;
       }

       // Update local state
       setProducts(products.map((p: any) => p.id === editingId ? { ...p, title: prodTitle, price: parseFloat(prodPrice), imageUrl: imgUrl } : p));
    } else {
       // Insert into Supabase
       const { data, error } = await supabase
         .from('products')
         .insert({ 
           title: prodTitle, 
           price: parseFloat(prodPrice), 
           image_url: imgUrl 
         })
         .select()
         .single();

       if (error) {
         alert("Error creating product: " + error.message);
         return;
       }

       // Update local state
       setProducts([
         { id: data.id, title: data.title, price: Number(data.price), imageUrl: data.image_url, category: data.category },
         ...products
       ]);
    }
    
    setWizardOpen(false);
  };

  const openWizard = (product?: any) => {
     // product could be an event if clicked carelessly, so check for string id
     if (product && typeof product === 'object' && 'id' in product) {
       setEditingId(product.id);
       setProdTitle(product.title);
       setProdPrice(product.price ? product.price.toString() : '0');
       setImgUrl(product.imageUrl || '');
     } else {
       setEditingId(null);
       setProdTitle('');
       setProdPrice('');
       setImgUrl('');
     }
     setWizardOpen(true);
  };

  const deleteProduct = async (id: string, e: React.MouseEvent) => {
     e.stopPropagation();
     
     const { supabase } = await import('../lib/supabase');
     const { error } = await supabase
       .from('products')
       .delete()
       .eq('id', id);

     if (error) {
       alert("Error deleting product: " + error.message);
       return;
     }

     setProducts(products.filter((p: any) => p.id !== id));
  }

  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-y-auto mb-20 z-50 absolute inset-0">
      {/* Header */}
      <div className="amazon-teal-bg px-3 pt-12 pb-3 mb-2 flex items-center shadow-sm">
        <button onClick={onBack} className="mr-3 text-[#0f1111]">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <span className="text-[18px] font-bold text-[#0f1111]">Admin Dashboard</span>
      </div>

      {/* Tabs */}
      <div className="bg-white flex px-2 sticky top-0 z-20 shadow-sm">
         <button 
           onClick={() => setActiveTab('products')}
           className={`px-4 py-3 text-[14px] font-bold border-b-2 transition-colors ${activeTab === 'products' ? 'border-[#e47911] text-[#e47911]' : 'border-transparent text-gray-600'}`}
         >
           Products
         </button>
         <button 
           onClick={() => setActiveTab('orders')}
           className={`px-4 py-3 text-[14px] font-bold border-b-2 transition-colors ${activeTab === 'orders' ? 'border-[#e47911] text-[#e47911]' : 'border-transparent text-gray-600'}`}
         >
           Orders
         </button>
         <button 
           onClick={() => setActiveTab('content')}
           className={`px-4 py-3 text-[14px] font-bold border-b-2 transition-colors ${activeTab === 'content' ? 'border-[#e47911] text-[#e47911]' : 'border-transparent text-gray-600'}`}
         >
           Content & Info
         </button>
      </div>

      <div className="p-4 flex flex-col gap-6">
        {activeTab === 'products' && (
          <>
            {/* Products Admin Wizard Grid */}
            <div className="bg-white p-4 rounded-[8px] shadow-sm">
               <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-[18px]">Product Wizard</h3>
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                  {/* Add Product Tile */}
                  <div 
                     onClick={() => openWizard()}
                     className="border-2 border-dashed border-[#007185] bg-[#f0f9fa] rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-[#e0f3f5] transition-colors"
                  >
                     <Plus className="w-8 h-8 text-[#007185] mb-2" />
                     <span className="font-medium text-[#007185] text-[14px]">Add Product</span>
                  </div>

                  {/* Existing Products */}
                  {products.map((p: any) => (
                      <div 
                         key={p.id} 
                         onClick={() => openWizard(p)}
                         className="relative border border-gray-200 rounded-lg aspect-square flex flex-col bg-white overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
                      >
                         <button 
                            onClick={(e) => deleteProduct(p.id, e)}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm z-10 w-7 h-7 flex items-center justify-center border border-gray-100 text-red-500 hover:bg-red-50"
                         >
                            <X className="w-4 h-4" />
                         </button>
                         
                         <div className="h-1/2 bg-[#f0f2f5] w-full flex items-center justify-center relative">
                            {p.imageUrl ? (
                               <img src={p.imageUrl} className="max-w-full max-h-full object-contain mix-blend-multiply p-1" />
                            ) : (
                               <span className="text-gray-400 text-xs">No Image</span>
                            )}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Edit2 className="w-6 h-6 text-white" />
                            </div>
                         </div>
                         <div className="p-2 flex flex-col flex-1 border-t border-gray-100">
                             <span className="text-[12px] font-medium line-clamp-2 text-[#0f1111] mb-1">{p.title}</span>
                             <span className="text-[14px] font-bold text-[#0f1111] mt-auto">£{p.price.toFixed(2)}</span>
                         </div>
                      </div>
                  ))}
               </div>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className="flex flex-col gap-4">
             <div className="flex justify-between items-center">
                <h3 className="font-bold text-[18px]">Manage Orders</h3>
                <button onClick={fetchAllOrders} className="text-[#007185] text-[13px] font-medium">Refresh</button>
             </div>

             {ordersLoading && <div className="text-center py-10 text-gray-500">Loading orders...</div>}
             
             {!ordersLoading && adminOrders.length === 0 && (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center text-gray-500">
                   No orders found.
                </div>
             )}

             {adminOrders.map((order) => {
                const firstItem = order.order_items?.[0] || {};
                const date = new Date(order.created_at).toLocaleDateString();
                
                return (
                   <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="bg-gray-50 p-3 flex justify-between items-center">
                         <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-gray-500 uppercase">Order Placed</span>
                            <span className="text-[13px] text-gray-700">{date}</span>
                         </div>
                         <div className="flex flex-col items-end">
                            <span className="text-[11px] font-bold text-gray-500 uppercase">Total</span>
                            <span className="text-[13px] font-bold text-[#0f1111]">£{order.total_amount?.toFixed(2)}</span>
                         </div>
                      </div>
                      
                      <div className="p-3">
                         <div className="flex gap-3 mb-4">
                            <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center p-1">
                               <img src={firstItem.image_url || firstItem.imageUrl} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="flex-1 min-w-0">
                               <h4 className="text-[14px] font-medium text-[#0f1111] line-clamp-1">{firstItem.title}</h4>
                               <p className="text-[12px] text-gray-500 mt-0.5">Order ID: {order.id.slice(0,8).toUpperCase()}</p>
                               <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-blue-50 text-blue-700">
                                  {order.status}
                               </div>
                            </div>
                         </div>

                         <div className="flex flex-col gap-2 pt-3">
                            <label className="text-[12px] font-bold text-gray-700">Update Status</label>
                            <div className="flex gap-2">
                               <select 
                                 value={order.status}
                                 onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                 className="flex-1 rounded p-2 text-[14px] bg-[#F0F2F2] focus:ring-2 focus:ring-[#f4aa00] outline-none"
                               >
                                  <option value="PENDING">PENDING</option>
                                  <option value="PROCESSING">PROCESSING</option>
                                  <option value="SHIPPED">SHIPPED</option>
                                  <option value="DELIVERED">DELIVERED</option>
                                  <option value="CANCELLED">CANCELLED</option>
                               </select>
                            </div>
                         </div>
                      </div>
                   </div>
                );
             })}
          </div>
        )}

        {activeTab === 'content' && (
          <>
            {/* Saved Cards Admin */}
            <div className="bg-white p-4 rounded-[8px] shadow-sm">
               <h3 className="font-bold text-[18px] mb-4">Manage Saved Cards</h3>
           <form onSubmit={handleAddCard} className="flex flex-col gap-3">
              <select 
                value={cardBrand} 
                onChange={e => setCardBrand(e.target.value)}
                className="border border-gray-300 rounded p-2 text-[16px]"
              >
                 <option value="Visa">Visa</option>
                 <option value="Mastercard">Mastercard</option>
                 <option value="American Express">American Express</option>
              </select>
              <input 
                type="text" 
                placeholder="Card Number" 
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                maxLength={16}
                className="border border-gray-300 rounded p-2 text-[14px]"
              />
              <input 
                type="text" 
                placeholder="Expiry (MM/YY)" 
                value={cardExpiry}
                onChange={e => setCardExpiry(e.target.value)}
                className="border border-gray-300 rounded p-2 text-[14px]"
              />
              <button type="submit" className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] py-2 rounded font-medium text-[14px] shadow-sm mt-1">
                 Add Card
              </button>
           </form>

           <div className="mt-4 flex flex-col gap-2">
              <h4 className="font-bold text-[14px] text-gray-700">Existing Cards</h4>
              {savedCards.map((c: any) => (
                  <div key={c.id} className="text-[13px] text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                     <span>{c.brand} ending in {c.last4} ({c.expiry})</span>
                     <button onClick={() => setSavedCards(savedCards.filter((sc: any) => sc.id !== c.id))} className="text-red-500 font-medium hover:underline mt-1 sm:mt-0 self-end sm:self-auto">Remove</button>
                  </div>
              ))}
           </div>
        </div>

        {/* Delivery Info Admin */}
        <div className="bg-white p-4 rounded-[8px] shadow-sm">
           <h3 className="font-bold text-[18px] mb-4">Delivery Information</h3>
           <div className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={deliveryInfo?.name || ''}
                onChange={e => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                className="border border-gray-300 rounded p-2 text-[14px]"
              />
              <input 
                type="text" 
                placeholder="Address Line 1" 
                value={deliveryInfo?.addressLine1 || ''}
                onChange={e => setDeliveryInfo({ ...deliveryInfo, addressLine1: e.target.value })}
                className="border border-gray-300 rounded p-2 text-[14px]"
              />
              <input 
                type="text" 
                placeholder="Address Line 2 (City, Postcode)" 
                value={deliveryInfo?.addressLine2 || ''}
                onChange={e => setDeliveryInfo({ ...deliveryInfo, addressLine2: e.target.value })}
                className="border border-gray-300 rounded p-2 text-[14px]"
              />
              <input 
                type="text" 
                placeholder="Country" 
                value={deliveryInfo?.country || ''}
                onChange={e => setDeliveryInfo({ ...deliveryInfo, country: e.target.value })}
                className="border border-gray-300 rounded p-2 text-[14px]"
              />
              <button 
                onClick={async () => {
                  const { supabase } = await import('../lib/supabase');
                  // Parse addressLine2 into city and zip (heuristic)
                  const parts = deliveryInfo.addressLine2.split(',');
                  const city = parts[0]?.trim() || '';
                  const zip = parts[1]?.trim() || '';

                  const { error } = await supabase
                    .from('addresses')
                    .update({
                      full_name: deliveryInfo.name,
                      line1: deliveryInfo.addressLine1,
                      city: city,
                      zip: zip,
                      country: deliveryInfo.country
                    })
                    .eq('is_default', true);

                  if (error) alert("Error saving address: " + error.message);
                  else alert("Address saved successfully!");
                }}
                className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] py-2 rounded font-medium text-[14px] shadow-sm mt-1"
              >
                 Save Address
              </button>
           </div>
        </div>

        {/* Homepage Images Admin */}
        <div className="bg-white p-4 rounded-[8px] shadow-sm">
           <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[18px]">Homepage Images</h3>
              <button 
                onClick={async () => {
                  const { supabase } = await import('../lib/supabase');
                  const { error } = await supabase
                    .from('site_settings')
                    .upsert({ key: 'homepage_images', value: homepageImages }, { onConflict: 'key' });
                  
                  if (error) alert("Error saving layout: " + error.message);
                  else alert("Homepage layout saved successfully!");
                }}
                className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] px-4 py-1.5 rounded-full font-medium text-[13px] shadow-sm"
              >
                Save Layout
              </button>
           </div>
           
           <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                  <label className="block text-[13px] font-bold text-gray-700">Orange Card (M Placeholder)</label>
                  <div className="flex gap-3">
                    <input 
                      type="url" 
                      placeholder="Replace the 'M' card image"
                      value={homepageImages?.orangeCard || ''}
                      onChange={e => setHomepageImages({ ...homepageImages, orangeCard: e.target.value })}
                      className="flex-1 border border-gray-300 rounded p-2 text-[14px]"
                    />
                    {homepageImages?.orangeCard && (
                      <div className="w-12 h-12 bg-gray-50 rounded border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                        <img src={homepageImages.orangeCard} className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                  </div>
              </div>

              <div className="flex flex-col gap-2">
                  <label className="block text-[13px] font-bold text-gray-700">Hero / 7 days of deals</label>
                  <div className="flex gap-3">
                    <input 
                      type="url" 
                      value={homepageImages?.hero || ''}
                      onChange={e => setHomepageImages({ ...homepageImages, hero: e.target.value })}
                      className="flex-1 border border-gray-300 rounded p-2 text-[14px]"
                    />
                    {homepageImages?.hero && (
                      <div className="w-12 h-12 bg-gray-50 rounded border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                        <img src={homepageImages.hero} className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                  </div>
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Shop deals ending soon (4 items)</label>
                 <div className="grid grid-cols-1 gap-3">
                    {[{t: "8% off", i: 0}, {t: "12% off", i: 1}, {t: "15% off", i: 2}, {t: "25% off", i: 3}].map(({t, i}) => (
                        <div key={`deals-${i}`} className="flex flex-col gap-1">
                           <span className="text-[11px] text-gray-500">{t}</span>
                           <div className="flex gap-2">
                              <input 
                                 type="url" 
                                 placeholder={`Image ${i+1}`}
                                 value={homepageImages?.dealsEndingSoon?.[i] || ''}
                                 onChange={e => {
                                    const newArr = [...(homepageImages?.dealsEndingSoon || ['', '', '', ''])];
                                    newArr[i] = e.target.value;
                                    setHomepageImages({ ...homepageImages, dealsEndingSoon: newArr });
                                 }}
                                 className="flex-1 border border-gray-300 rounded p-2 text-[12px]"
                              />
                              {homepageImages?.dealsEndingSoon?.[i] && (
                                <div className="w-10 h-10 bg-gray-50 rounded border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                                  <img src={homepageImages.dealsEndingSoon[i]} className="max-w-full max-h-full object-contain" />
                                </div>
                              )}
                           </div>
                        </div>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Shop by Category (4 items)</label>
                 <div className="grid grid-cols-1 gap-3">
                    {[{t: "Electronics", i: 0}, {t: "Fashion", i: 1}, {t: "Home & Kitchen", i: 2}, {t: "Beauty", i: 3}].map(({t, i}) => (
                        <div key={`cat-${i}`} className="flex flex-col gap-1">
                           <span className="text-[11px] text-gray-500">{t}</span>
                           <div className="flex gap-2">
                              <input 
                                 type="url" 
                                 placeholder={`Category ${i+1}`}
                                 value={homepageImages?.categories?.[i] || ''}
                                 onChange={e => {
                                    const newArr = [...(homepageImages?.categories || ['', '', '', ''])];
                                    newArr[i] = e.target.value;
                                    setHomepageImages({ ...homepageImages, categories: newArr });
                                 }}
                                 className="flex-1 border border-gray-300 rounded p-2 text-[12px]"
                              />
                              {homepageImages?.categories?.[i] && (
                                <div className="w-10 h-10 bg-gray-50 rounded border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                                  <img src={homepageImages.categories[i]} className="max-w-full max-h-full object-contain" />
                                </div>
                              )}
                           </div>
                        </div>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Keep Shopping For (2 items)</label>
                 <div className="grid grid-cols-1 gap-3">
                    {[{t: "Item 1", i: 0}, {t: "Item 2", i: 1}].map(({t, i}) => (
                        <div key={`keep-${i}`} className="flex flex-col gap-1">
                           <span className="text-[11px] text-gray-500">{t}</span>
                           <div className="flex gap-2">
                              <input 
                                 type="url" 
                                 placeholder={`Item ${i+1}`}
                                 value={homepageImages?.keepShoppingFor?.[i] || ''}
                                 onChange={e => {
                                    const newArr = [...(homepageImages?.keepShoppingFor || ['', ''])];
                                    newArr[i] = e.target.value;
                                    setHomepageImages({ ...homepageImages, keepShoppingFor: newArr });
                                 }}
                                 className="flex-1 border border-gray-300 rounded p-2 text-[12px]"
                              />
                              {homepageImages?.keepShoppingFor?.[i] && (
                                <div className="w-10 h-10 bg-gray-50 rounded border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                                  <img src={homepageImages.keepShoppingFor[i]} className="max-w-full max-h-full object-contain" />
                                </div>
                              )}
                           </div>
                        </div>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Sponsored (4 items)</label>
                 <div className="grid grid-cols-1 gap-3">
                    {[{t: "Sponsored Item 1", i: 0}, {t: "Sponsored Item 2", i: 1}, {t: "Sponsored Item 3", i: 2}, {t: "Sponsored Item 4", i: 3}].map(({t, i}) => (
                        <div key={`spon-${i}`} className="flex flex-col gap-1">
                           <span className="text-[11px] text-gray-500">{t}</span>
                           <div className="flex gap-2">
                              <input 
                                 type="url" 
                                 placeholder={`Sponsored ${i+1}`}
                                 value={homepageImages?.sponsored?.[i] || ''}
                                 onChange={e => {
                                    const newArr = [...(homepageImages?.sponsored || ['', '', '', ''])];
                                    newArr[i] = e.target.value;
                                    setHomepageImages({ ...homepageImages, sponsored: newArr });
                                 }}
                                 className="flex-1 border border-gray-300 rounded p-2 text-[12px]"
                              />
                              {homepageImages?.sponsored?.[i] && (
                                <div className="w-10 h-10 bg-gray-50 rounded border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                                  <img src={homepageImages.sponsored[i]} className="max-w-full max-h-full object-contain" />
                                </div>
                              )}
                           </div>
                        </div>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Top Rated (6 items)</label>
                 <div className="grid grid-cols-1 gap-3">
                    {[{t: "Top Rated Item 1", i: 0}, {t: "Top Rated Item 2", i: 1}, {t: "Top Rated Item 3", i: 2}, {t: "Top Rated Item 4", i: 3}, {t: "Top Rated Item 5", i: 4}, {t: "Top Rated Item 6", i: 5}].map(({t, i}) => (
                        <div key={`top-${i}`} className="flex flex-col gap-1">
                           <span className="text-[11px] text-gray-500">{t}</span>
                           <div className="flex gap-2">
                              <input 
                                 type="url" 
                                 placeholder={`Top Rated ${i+1}`}
                                 value={homepageImages?.topRated?.[i] || ''}
                                 onChange={e => {
                                    const newArr = [...(homepageImages?.topRated || ['', '', '', '', '', ''])];
                                    newArr[i] = e.target.value;
                                    setHomepageImages({ ...homepageImages, topRated: newArr });
                                 }}
                                 className="flex-1 border border-gray-300 rounded p-2 text-[12px]"
                              />
                              {homepageImages?.topRated?.[i] && (
                                <div className="w-10 h-10 bg-gray-50 rounded border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                                  <img src={homepageImages.topRated[i]} className="max-w-full max-h-full object-contain" />
                                </div>
                              )}
                           </div>
                        </div>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Deals Tailored (2 items)</label>
                 <div className="grid grid-cols-1 gap-3">
                    {[{t: "Deals Tailored 1", i: 0}, {t: "Deals Tailored 2", i: 1}].map(({t, i}) => (
                        <div key={`tailored-${i}`} className="flex flex-col gap-1">
                           <span className="text-[11px] text-gray-500">{t}</span>
                           <div className="flex gap-2">
                              <input 
                                 type="url" 
                                 placeholder={`Deal ${i+1}`}
                                 value={homepageImages?.dealsTailored?.[i] || ''}
                                 onChange={e => {
                                    const newArr = [...(homepageImages?.dealsTailored || ['', ''])];
                                    newArr[i] = e.target.value;
                                    setHomepageImages({ ...homepageImages, dealsTailored: newArr });
                                 }}
                                 className="flex-1 border border-gray-300 rounded p-2 text-[12px]"
                              />
                              {homepageImages?.dealsTailored?.[i] && (
                                <div className="w-10 h-10 bg-gray-50 rounded border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                                  <img src={homepageImages.dealsTailored[i]} className="max-w-full max-h-full object-contain" />
                                </div>
                              )}
                           </div>
                        </div>
                    ))}
                 </div>
              </div>
            </div>
         </div>
       </>
     )}

   </div>

      {/* Editor Modal */}
      {wizardOpen && (
         <div className="absolute inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center">
            <div className="bg-white w-full sm:w-[400px] rounded-t-2xl sm:rounded-2xl shrink-0">
               <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <h2 className="font-bold text-lg">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                  <button onClick={() => setWizardOpen(false)}>
                     <X className="w-6 h-6 text-gray-500" />
                  </button>
               </div>
               <form onSubmit={handleSaveProduct} className="p-4 flex flex-col gap-4 pb-8 sm:pb-4">
                  
                  <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-1">Image URL</label>
                      <input 
                        type="url" 
                        placeholder="https://..." 
                        value={imgUrl}
                        onChange={e => setImgUrl(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-[14px] focus:ring-2 focus:ring-[#f4aa00] focus:outline-none"
                      />
                  </div>

                  {imgUrl && (
                      <div className="w-16 h-16 border rounded bg-[#f0f2f5] mx-auto overflow-hidden flex items-center justify-center">
                          <img src={imgUrl} className="max-w-full max-h-full object-contain" />
                      </div>
                  )}

                  <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-1">Product Title</label>
                      <input 
                        type="text" 
                        placeholder="Title..." 
                        value={prodTitle}
                        onChange={e => setProdTitle(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-[14px] focus:ring-2 focus:ring-[#f4aa00] focus:outline-none"
                        required
                      />
                  </div>

                  <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-1">Price (£)</label>
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        step="0.01"
                        value={prodPrice}
                        onChange={e => setProdPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2 text-[14px] focus:ring-2 focus:ring-[#f4aa00] focus:outline-none"
                        required
                      />
                  </div>

                  {/* Variants Section */}
                  <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between items-center mb-3">
                          <label className="text-[13px] font-bold text-gray-700">Variants</label>
                          <button 
                            type="button" 
                            onClick={() => setShowVariantBuilder(true)}
                            className="text-[#007185] text-[13px] font-medium flex items-center gap-1"
                          >
                             <Plus className="w-4 h-4" /> Add Variant
                          </button>
                      </div>

                      {showVariantBuilder && (
                          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-4">
                              <div className="flex flex-col gap-3">
                                  <input 
                                    className="w-full border border-gray-300 rounded p-2 text-[14px]"
                                    placeholder="Variant Type (e.g. Size, Color)"
                                    value={newVariantType}
                                    onChange={e => setNewVariantType(e.target.value)}
                                  />
                                  <input 
                                    className="w-full border border-gray-300 rounded p-2 text-[14px]"
                                    placeholder="Options (comma separated)"
                                    value={newVariantOptions}
                                    onChange={e => setNewVariantOptions(e.target.value)}
                                  />
                                  <div className="flex gap-2">
                                      <button 
                                        type="button"
                                        onClick={() => {
                                            if (!newVariantType || !newVariantOptions) return;
                                            const options = newVariantOptions.split(',').map(s => s.trim()).filter(s => s);
                                            setVariants([...variants, { type: newVariantType, options }]);
                                            setNewVariantType('Size');
                                            setNewVariantOptions('');
                                            setShowVariantBuilder(false);
                                        }}
                                        className="flex-1 bg-[#007185] text-white py-2 rounded text-[13px] font-medium"
                                      >
                                          Add
                                      </button>
                                      <button 
                                        type="button"
                                        onClick={() => setShowVariantBuilder(false)}
                                        className="flex-1 bg-white border border-gray-300 py-2 rounded text-[13px] font-medium"
                                      >
                                          Cancel
                                      </button>
                                  </div>
                              </div>
                          </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                          {variants.map((v, idx) => (
                              <div key={idx} className="bg-white border border-gray-300 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                                  <span className="text-[12px] font-bold">{v.type}:</span>
                                  <span className="text-[12px] text-gray-600 truncate max-w-[100px]">{v.options.join(', ')}</span>
                                  <button type="button" onClick={() => setVariants(variants.filter((_, i) => i !== idx))}>
                                      <X className="w-3.5 h-3.5 text-gray-400" />
                                  </button>
                              </div>
                          ))}
                      </div>
                  </div>

                  <button type="submit" className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] py-3 rounded-full font-medium text-[15px] shadow-sm mt-2">
                     {editingId ? 'Save Changes' : 'Create Product'}
                  </button>
               </form>
            </div>
         </div>
      )}
    </div>
  );
};
