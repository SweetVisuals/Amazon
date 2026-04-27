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

      <div className="p-4 flex flex-col gap-6">

        {/* Saved Cards Admin */}
        <div className="bg-white p-4 rounded-[8px] border border-gray-200 shadow-sm">
           <h3 className="font-bold text-[18px] mb-4">Manage Saved Cards</h3>
           <form onSubmit={handleAddCard} className="flex flex-col gap-3">
              <select 
                value={cardBrand} 
                onChange={e => setCardBrand(e.target.value)}
                className="border border-gray-300 rounded p-2 text-[14px]"
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
        <div className="bg-white p-4 rounded-[8px] border border-gray-200 shadow-sm">
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
           </div>
        </div>

        {/* Homepage Images Admin */}
        <div className="bg-white p-4 rounded-[8px] border border-gray-200 shadow-sm">
           <h3 className="font-bold text-[18px] mb-4">Homepage Images</h3>
           <div className="flex flex-col gap-4">
              <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Hero / 7 days of deals</label>
                  <input 
                    type="url" 
                    value={homepageImages?.hero || ''}
                    onChange={e => setHomepageImages({ ...homepageImages, hero: e.target.value })}
                    className="w-full border border-gray-300 rounded p-2 text-[14px]"
                  />
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Shop deals ending soon (4 items)</label>
                 <div className="grid grid-cols-1 gap-2">
                    {[{t: "15% off", i: 0}, {t: "20% off", i: 1}, {t: "15% off", i: 2}, {t: "15% off", i: 3}].map(({t, i}) => (
                        <div key={`deals-${i}`} className="flex flex-col">
                           <span className="text-[11px] text-gray-500 mb-1">{t}</span>
                           <input 
                              type="url" 
                              placeholder={`Image ${i+1}`}
                              value={homepageImages?.dealsEndingSoon?.[i] || ''}
                              onChange={e => {
                                 const newArr = [...(homepageImages?.dealsEndingSoon || ['', '', '', ''])];
                                 newArr[i] = e.target.value;
                                 setHomepageImages({ ...homepageImages, dealsEndingSoon: newArr });
                              }}
                              className="w-full border border-gray-300 rounded p-2 text-[12px]"
                           />
                        </div>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Shop by Category (4 items)</label>
                 <div className="grid grid-cols-1 gap-2">
                    {[{t: "Electronics", i: 0}, {t: "Fashion", i: 1}, {t: "Home & Kitchen", i: 2}, {t: "Beauty", i: 3}].map(({t, i}) => (
                        <div key={`cat-${i}`} className="flex flex-col">
                           <span className="text-[11px] text-gray-500 mb-1">{t}</span>
                           <input 
                              type="url" 
                              placeholder={`Category ${i+1}`}
                              value={homepageImages?.categories?.[i] || ''}
                              onChange={e => {
                                 const newArr = [...(homepageImages?.categories || ['', '', '', ''])];
                                 newArr[i] = e.target.value;
                                 setHomepageImages({ ...homepageImages, categories: newArr });
                              }}
                              className="w-full border border-gray-300 rounded p-2 text-[12px]"
                           />
                        </div>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Keep Shopping For (2 items)</label>
                 <div className="grid grid-cols-1 gap-2">
                    {[{t: "Item 1", i: 0}, {t: "Item 2", i: 1}].map(({t, i}) => (
                        <div key={`keep-${i}`} className="flex flex-col">
                           <span className="text-[11px] text-gray-500 mb-1">{t}</span>
                           <input 
                              type="url" 
                              placeholder={`Item ${i+1}`}
                              value={homepageImages?.keepShoppingFor?.[i] || ''}
                              onChange={e => {
                                 const newArr = [...(homepageImages?.keepShoppingFor || ['', ''])];
                                 newArr[i] = e.target.value;
                                 setHomepageImages({ ...homepageImages, keepShoppingFor: newArr });
                              }}
                              className="w-full border border-gray-300 rounded p-2 text-[12px]"
                           />
                        </div>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Sponsored (4 items)</label>
                 <div className="grid grid-cols-1 gap-2">
                    {[{t: "Sponsored Item 1", i: 0}, {t: "Sponsored Item 2", i: 1}, {t: "Sponsored Item 3", i: 2}, {t: "Sponsored Item 4", i: 3}].map(({t, i}) => (
                        <div key={`spon-${i}`} className="flex flex-col">
                           <span className="text-[11px] text-gray-500 mb-1">{t}</span>
                           <input 
                              type="url" 
                              placeholder={`Sponsored ${i+1}`}
                              value={homepageImages?.sponsored?.[i] || ''}
                              onChange={e => {
                                 const newArr = [...(homepageImages?.sponsored || ['', '', '', ''])];
                                 newArr[i] = e.target.value;
                                 setHomepageImages({ ...homepageImages, sponsored: newArr });
                              }}
                              className="w-full border border-gray-300 rounded p-2 text-[12px]"
                           />
                        </div>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Top Rated (6 items)</label>
                 <div className="grid grid-cols-1 gap-2">
                    {[{t: "Top Rated Item 1", i: 0}, {t: "Top Rated Item 2", i: 1}, {t: "Top Rated Item 3", i: 2}, {t: "Top Rated Item 4", i: 3}, {t: "Top Rated Item 5", i: 4}, {t: "Top Rated Item 6", i: 5}].map(({t, i}) => (
                        <div key={`top-${i}`} className="flex flex-col">
                           <span className="text-[11px] text-gray-500 mb-1">{t}</span>
                           <input 
                              type="url" 
                              placeholder={`Top Rated ${i+1}`}
                              value={homepageImages?.topRated?.[i] || ''}
                              onChange={e => {
                                 const newArr = [...(homepageImages?.topRated || ['', '', '', '', '', ''])];
                                 newArr[i] = e.target.value;
                                 setHomepageImages({ ...homepageImages, topRated: newArr });
                              }}
                              className="w-full border border-gray-300 rounded p-2 text-[12px]"
                           />
                        </div>
                    ))}
                 </div>
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Deals Tailored (2 items)</label>
                 <div className="grid grid-cols-1 gap-2">
                    {[{t: "Deals Tailored 1", i: 0}, {t: "Deals Tailored 2", i: 1}].map(({t, i}) => (
                        <div key={`tailored-${i}`} className="flex flex-col">
                           <span className="text-[11px] text-gray-500 mb-1">{t}</span>
                           <input 
                              type="url" 
                              placeholder={`Deal ${i+1}`}
                              value={homepageImages?.dealsTailored?.[i] || ''}
                              onChange={e => {
                                 const newArr = [...(homepageImages?.dealsTailored || ['', ''])];
                                 newArr[i] = e.target.value;
                                 setHomepageImages({ ...homepageImages, dealsTailored: newArr });
                              }}
                              className="w-full border border-gray-300 rounded p-2 text-[12px]"
                           />
                        </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Products Admin Wizard Grid */}
        <div className="bg-white p-4 rounded-[8px] border border-gray-200 shadow-sm">
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
