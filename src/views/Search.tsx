import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon, ClockIcon, CloseIcon, MicIcon, PhotoLayerIcon, SearchIcon, CameraIcon } from '../components/Icons';

export const Search = ({ onBack, products, onProductClick }: { onBack: () => void, products: any[], onProductClick: (p: any) => void }) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query) return [];
    return products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  }, [query, products]);

  return (
    <div className="flex flex-col h-full bg-white z-50 absolute inset-0">
      {/* Header */}
      <div className="amazon-header-bg px-3 pt-10 pb-3 flex items-center">
        <button onClick={onBack} className="mr-3 text-[#0f1111]">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div className="bg-white rounded-md flex items-center flex-1 py-2 px-3 shadow-sm border border-[#a6a6a6] focus-within:ring-2 focus-within:ring-[#f4aa00] focus-within:border-[#f4aa00]">
          <SearchIcon className="text-gray-500 w-5 h-5 mr-3" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search Amazon" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-[16px] text-black bg-transparent"
          />
          {query ? (
              <button onClick={() => setQuery('')} className="p-1 text-gray-400 hover:text-gray-600">
                 <CloseIcon className="w-4 h-4" />
              </button>
          ) : (
              <MicIcon className="text-gray-500 w-5 h-5 ml-2" />
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          
          {query ? (
            <div className="flex flex-col space-y-4">
              {filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500 py-4">No results found for "{query}"</div>
              ) : (
                filteredProducts.map(p => (
                  <div key={p.id} className="flex gap-4 cursor-pointer" onClick={() => onProductClick(p)}>
                     <div className="w-[80px] h-[80px] shrink-0 bg-[#f0f2f5] rounded flex items-center justify-center p-1">
                        {p.imageUrl ? (
                           <img src={p.imageUrl} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                        ) : null}
                     </div>
                     <div className="flex-1 border-b border-gray-100 pb-4">
                        <div className="text-[15px] text-[#0f1111] line-clamp-2 hover:text-[#007185] transition-colors">{p.title}</div>
                        <div className="font-medium mt-1">£{p.price.toFixed(2)}</div>
                     </div>
                  </div>
                ))
              )}
            </div>
          ) : (
             <>
                <h3 className="text-[13px] font-bold text-[#0f1111] uppercase tracking-wider mb-3">Keep shopping for</h3>
                
                <div className="border border-gray-200 rounded-lg w-[140px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] overflow-hidden mb-4">
                  <div className="bg-[#f7f7f7] flex items-center justify-center p-3 h-[100px]">
                     <div className="h-[70px] w-[70px] bg-[#e5e7eb] rounded-sm"></div>
                  </div>
                  <div className="p-2 border-t border-gray-100">
                     <div className="text-[15px] text-[#0f1111] truncate">Mobile phones ...</div>
                     <div className="text-[13px] text-gray-500">1 viewed</div>
                  </div>
                </div>

                <div className="h-px bg-gray-200 w-[calc(100%+32px)] -mx-4 mb-4"></div>

                <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded" onClick={() => setQuery('iphone')}>
                  <div className="flex items-center space-x-4">
                     <ClockIcon className="w-5 h-5 text-gray-700" />
                     <span className="text-[16px] font-bold text-[#0f1111]">iphone 17</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded" onClick={() => setQuery('macbook')}>
                  <div className="flex items-center space-x-4">
                     <ClockIcon className="w-5 h-5 text-gray-700" />
                     <span className="text-[16px] font-bold text-[#0f1111]">macbook pro</span>
                  </div>
                </div>
             </>
          )}
          
        </div>
      </div>

      {/* Footer before keyboard */}
      <div className="bg-[#f0f2f5] p-2 flex space-x-2 border-t border-gray-200 shadow-[0_-2px_4px_rgba(0,0,0,0.05)] pb-6 shrink-0">
         <button className="flex-1 bg-white border border-gray-300 rounded-[8px] py-3 flex justify-center items-center font-medium shadow-sm active:bg-gray-50 text-[15px]">
            <PhotoLayerIcon className="w-5 h-5 mr-2" />
            Search with photo
         </button>
         <button className="flex-1 bg-white border border-gray-300 rounded-[8px] py-3 flex justify-center items-center font-medium shadow-sm active:bg-gray-50 text-[15px]">
            <CameraIcon className="w-5 h-5 mr-2" />
            Search with camera
         </button>
      </div>
    </div>
  );
};
