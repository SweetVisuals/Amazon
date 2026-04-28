import React, { useState } from 'react';
import { CameraIcon, ChevronDownIcon, LocationIcon, MicIcon, SearchIcon, CloseIcon } from '../components/Icons';

export const Home = ({ onSearchClick, products, onProductClick, homepageImages }: { onSearchClick: () => void, products?: any[], onProductClick: (product: any) => void, homepageImages?: any }) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState('SW13 0');

  // fallback empty products
  const homeProducts = products?.length ? products : [...Array(6)].map((_, i) => ({
      id: i,
      title: `Fake Amazon Product Title For Display Purposes ${i+1}`,
      price: (i + 1) * 12.99,
      imageUrl: null
  }));

  return (
    <div className="flex flex-col h-full bg-[#e3e6e6] overflow-y-auto pb-20">
      {/* Header Area */}
      <div className="amazon-header-bg px-4 pt-10 pb-2">
        {/* Search Bar */}
        <div 
          className="bg-white rounded-full flex items-center px-4 py-3 shadow-md mb-2 cursor-text"
          onClick={onSearchClick}
        >
          <SearchIcon className="text-gray-500 w-5 h-5 mr-3" />
          <span className="text-gray-500 text-[17px] flex-1 truncate">Search or ask a question</span>
          <div className="flex items-center space-x-3 text-gray-500">
            <CameraIcon className="w-6 h-6" />
            <MicIcon className="w-6 h-6" />
          </div>
        </div>

        {/* Categories / Location */}
        <div className="flex items-center text-[#0f1111] overflow-x-auto no-scrollbar py-1 space-x-4">
          <div className="flex items-center shrink-0 font-bold ml-[-4px] cursor-pointer" onClick={() => setShowLocationModal(true)}>
             <LocationIcon className="w-5 h-5" />
            <span className="text-[14px]">{location}</span>
            <ChevronDownIcon className="w-4 h-4 ml-0.5" />
          </div>
          <div className="bg-white rounded-full px-3 py-1 text-[14px] font-bold shrink-0 shadow-sm border border-gray-200">
            Join Prime
          </div>
          <div className="text-[14px] shrink-0">Haul</div>
          <div className="text-[14px] shrink-0">Everyday Essentials</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pt-2 pb-2 space-y-2">
        {/* Horizontal Deals Carousel */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar snap-x">
          
          {/* Card 1: Half visible orange card */}
          <div className="w-[120px] shrink-0 bg-[#ff681a] rounded-[16px] snap-start flex flex-col pt-6 pb-2 overflow-hidden relative">
             <div className="bg-white absolute bottom-0 left-0 right-0 h-4/5 rounded-t-full mt-4 flex items-center justify-center shadow-inner overflow-hidden">
               {homepageImages?.orangeCard ? (
                 <img src={homepageImages.orangeCard} className="w-full h-full object-cover" />
               ) : (
                 <span className="font-bold text-4xl block pl-8 pt-10">M</span>
               )}
             </div>
          </div>

          {/* Card 2: Shop deals ending soon */}
          <div className="w-[320px] shrink-0 bg-[#2ee26d] rounded-[16px] p-3 snap-start relative">
            <h2 className="text-[26px] font-extrabold leading-tight tracking-tight text-[#0f1111] mb-2 font-sans w-[240px]">
              Shop deals ending soon
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[15, 20, 15, 15].map((discount, i) => (
                <div key={i} className="bg-white rounded-lg p-2 flex flex-col justify-between h-[140px]">
                  {homepageImages?.dealsEndingSoon?.[i] ? (
                     <img src={homepageImages.dealsEndingSoon[i]} className="w-full h-[80px] object-cover rounded-sm mix-blend-multiply" />
                  ) : (
                     <div className="w-full h-[80px] bg-[#f0f2f5] rounded-sm"></div>
                  )}
                  <div className="bg-[#cc0c39] text-white text-[12px] font-bold px-2 py-1 rounded-[4px] self-start mt-1">{discount}% off</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: 7 days of deals */}
          <div className="w-[320px] shrink-0 bg-[#9887e0] rounded-[16px] p-3 snap-start">
            <h2 className="text-[26px] font-extrabold leading-tight tracking-tight text-white mb-1 font-sans">
              7 days of deals
            </h2>
            <p className="text-white text-[15px] mb-4">Up to 40% off</p>
            <div className="rounded-lg h-[240px] flex items-center justify-center object-cover overflow-hidden mt-6 bg-[#f0f2f5]">
               {homepageImages?.hero ? (
                  <img src={homepageImages.hero} className="w-full h-full object-cover mix-blend-multiply bg-white" />
               ) : null}
            </div>
          </div>
        </div>

        {/* Keep Shopping For Row */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar snap-x mt-2">
          
          <div className="w-[170px] shrink-0 bg-white rounded-[16px] p-3 snap-start shadow-sm border border-gray-100 flex flex-col justify-between min-h-[220px]">
             <div>
                <h3 className="text-[17px] font-bold leading-tight line-clamp-2 mb-2">Keep shopping for Item 1</h3>
             </div>
            <div className="flex-1 flex items-end justify-center pb-2">
              {homepageImages?.keepShoppingFor?.[0] ? <img src={homepageImages.keepShoppingFor[0]} className="w-[120px] h-[120px] object-contain mix-blend-multiply" /> : <div className="w-[120px] h-[120px] bg-[#f0f2f5] rounded-sm"></div>}
            </div>
          </div>

          <div className="w-[170px] shrink-0 bg-white rounded-[16px] p-3 snap-start shadow-sm border border-gray-100 flex flex-col justify-between min-h-[220px]">
             <div>
                <h3 className="text-[17px] font-bold leading-tight line-clamp-2">Keep shopping for Item 2</h3>
                <div className="text-[12px] text-gray-500 mt-0.5 flex items-center">
                    Sponsored <span className="inline-flex items-center justify-center w-3 h-3 rounded-full border border-gray-400 text-[9px] ml-1">i</span>
                </div>
             </div>
            <div className="flex-1 flex items-end justify-center pb-2">
              {homepageImages?.keepShoppingFor?.[1] ? <img src={homepageImages.keepShoppingFor[1]} className="w-[120px] h-[120px] object-contain mix-blend-multiply" /> : <div className="w-[90px] h-[90px] bg-[#f0f2f5] rounded-sm"></div>}
            </div>
          </div>

           <div className="w-[170px] shrink-0 bg-[#ff8134] rounded-[16px] p-3 snap-start shadow-sm flex flex-col justify-between min-h-[220px] overflow-hidden relative">
            <h3 className="text-[19px] font-bold leading-tight z-10">Deals under £15</h3>
            <div className="absolute -bottom-4 right-0 w-full flex justify-end">
                 {/* Decorative graphic for Deals under 15 */}
                 <div className="w-[120px] h-[120px] bg-[#d9effa] rounded-full -mr-8 -mb-4 border-8 border-white flex items-center justify-center">
                     <div className="w-[60px] h-[40px] bg-[#edb893] relative">
                         <div className="absolute w-[30px] h-full bg-[#d09e7c] right-0"></div>
                     </div>
                 </div>
            </div>
          </div>

        </div>

        {/* Categories Grid */}
        <div className="bg-white rounded-[16px] p-3 shadow-sm border border-gray-100 flex flex-col mt-2">
          <h3 className="text-[20px] font-bold leading-tight mb-3">Shop by Category</h3>
          <div className="grid grid-cols-2 gap-3">
             <div className="flex flex-col">
                {homepageImages?.categories?.[0] ? <img src={homepageImages.categories[0]} className="w-full h-[120px] object-cover rounded-md mb-1" /> : <div className="w-full bg-[#f0f2f5] rounded-md h-[120px] mb-1"></div>}
                <span className="text-[14px]">Electronics</span>
             </div>
             <div className="flex flex-col">
                {homepageImages?.categories?.[1] ? <img src={homepageImages.categories[1]} className="w-full h-[120px] object-cover rounded-md mb-1" /> : <div className="w-full bg-[#f0f2f5] rounded-md h-[120px] mb-1"></div>}
                <span className="text-[14px]">Fashion</span>
             </div>
             <div className="flex flex-col">
                {homepageImages?.categories?.[2] ? <img src={homepageImages.categories[2]} className="w-full h-[120px] object-cover rounded-md mb-1" /> : <div className="w-full bg-[#f0f2f5] rounded-md h-[120px] mb-1"></div>}
                <span className="text-[14px]">Home & Kitchen</span>
             </div>
             <div className="flex flex-col">
                {homepageImages?.categories?.[3] ? <img src={homepageImages.categories[3]} className="w-full h-[120px] object-cover rounded-md mb-1" /> : <div className="w-full bg-[#f0f2f5] rounded-md h-[120px] mb-1"></div>}
                <span className="text-[14px]">Beauty</span>
             </div>
          </div>
          <button className="text-[#007185] text-[14px] font-medium mt-4 text-left">See all categories</button>
        </div>

         {/* More products */}
        <div className="bg-white rounded-[16px] p-3 shadow-sm border border-gray-100 flex flex-col mt-2">
           <h3 className="text-[20px] font-bold leading-tight mb-3">More items to consider</h3>
           <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
              {homeProducts.map((p, i) => (
                 <div key={p.id || i} className="w-[140px] shrink-0 flex flex-col cursor-pointer" onClick={() => onProductClick(p)}>
                    {p.imageUrl ? (
                       <img src={p.imageUrl} alt={p.title} className="w-full h-[140px] object-contain rounded-md mb-2 bg-[#f0f2f5] mix-blend-multiply border border-transparent hover:border-gray-200" />
                    ) : (
                       <div className="w-full h-[140px] bg-[#f0f2f5] rounded-md mb-2"></div>
                    )}
                    <div className="text-[14px] text-[#0f1111] line-clamp-2 leading-tight hover:text-[#007185] transition-colors">{p.title}</div>
                    <div className="text-[18px] font-medium mt-1">£{p.price.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-[#007185] text-[12px] mt-1">Prime</div>
                 </div>
              ))}
           </div>
        </div>

        {/* Sponsored Products */}
        <div className="bg-white rounded-[16px] p-3 shadow-sm border border-gray-100 flex flex-col mt-2 mb-2">
           <div className="flex justify-between items-center mb-3">
             <h3 className="text-[20px] font-bold leading-tight">Sponsored</h3>
             <span className="text-[12px] text-gray-500 flex items-center">
                Sponsored <span className="inline-flex items-center justify-center w-3 h-3 rounded-full border border-gray-400 text-[9px] ml-1">i</span>
             </span>
           </div>
           
           <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map(i => (
                 <div key={i} className="flex flex-col">
                    {homepageImages?.sponsored?.[i] ? (
                       <img src={homepageImages.sponsored[i]} className="w-full aspect-square object-contain mix-blend-multiply bg-[#f0f2f5] rounded-md mb-2 p-2" />
                    ) : (
                       <div className="w-full aspect-square bg-[#f0f2f5] rounded-md mb-2"></div>
                    )}
                    <div className="text-[14px] text-[#0f1111] line-clamp-2 leading-tight">Sponsored Item {i+1}</div>
                    <div className="flex items-center mt-1 space-x-1">
                      <div className="flex text-[#ffa41c] text-[12px]">★★★★☆</div>
                      <span className="text-[#007185] text-[12px]">{124 + i * 23}</span>
                    </div>
                    <div className="text-[18px] font-medium mt-1">£{((i + 1) * 29.99).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-[#007185] text-[12px] mt-1">Prime</div>
                 </div>
              ))}
           </div>
        </div>

        {/* Top rated from our brands */}
        <div className="bg-white rounded-[16px] p-3 shadow-sm border border-gray-100 flex flex-col mt-2 mb-2">
           <h3 className="text-[20px] font-bold leading-tight mb-3">Top rated from our brands</h3>
           <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
              {[0, 1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="w-[140px] shrink-0 flex flex-col">
                    {homepageImages?.topRated?.[i] ? (
                       <img src={homepageImages.topRated[i]} className="w-full h-[140px] object-contain mix-blend-multiply bg-[#f0f2f5] rounded-md mb-2 p-2" />
                    ) : (
                       <div className="w-full h-[140px] bg-[#f0f2f5] rounded-md mb-2"></div>
                    )}
                    <div className="text-[14px] text-[#0f1111] line-clamp-2 leading-tight">Amazon Basics Everyday Output Item {i+1}</div>
                    <div className="flex items-center mt-1 space-x-1">
                      <div className="flex text-[#ffa41c] text-[12px]">★★★★★</div>
                      <span className="text-[#007185] text-[12px]">{892 + i * 14}</span>
                    </div>
                    <div className="text-[18px] font-medium mt-1">£{((i + 1) * 8.50).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                 </div>
              ))}
           </div>
        </div>

        {/* Deals tailored for you */}
        <div className="bg-[#ff8134] rounded-[16px] p-3 shadow-sm border border-gray-100 flex flex-col mt-2 mb-2">
           <h3 className="text-[20px] font-bold leading-tight mb-3 text-black">Deals tailored for you</h3>
           <div className="grid grid-cols-2 gap-3">
              {[0, 1].map(i => (
                 <div key={i} className="flex flex-col bg-white rounded-md p-2">
                    {homepageImages?.dealsTailored?.[i] ? (
                       <img src={homepageImages.dealsTailored[i]} className="w-full aspect-square object-contain mix-blend-multiply bg-[#f0f2f5] rounded-md mb-2 p-2" />
                    ) : (
                       <div className="w-full aspect-square bg-[#f0f2f5] rounded-md mb-2"></div>
                    )}
                    <div className="bg-[#cc0c39] text-white text-[12px] font-bold px-2 py-1 rounded-[4px] self-start mb-1">Up to 30% off</div>
                    <div className="text-[14px] text-[#0f1111] line-clamp-1 leading-tight">Limited time deal on Item {i+1}</div>
                 </div>
              ))}
           </div>
        </div>

      </div>

      {showLocationModal && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center">
            <div className="bg-white w-full sm:w-[400px] rounded-t-2xl sm:rounded-2xl shrink-0">
               <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <h2 className="font-bold text-lg">Choose your location</h2>
                  <button onClick={() => setShowLocationModal(false)}>
                     <CloseIcon className="w-6 h-6 text-gray-500" />
                  </button>
               </div>
               <div className="p-4 flex flex-col gap-3 pb-8 sm:pb-4">
                  <p className="text-sm text-gray-500">Delivery options and delivery speeds may vary for different locations</p>
                  
                  <button onClick={() => { setLocation('SW13 0'); setShowLocationModal(false); }} className="w-full text-left p-3 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">
                    <div className="font-bold text-sm">SW13 0</div>
                    <div className="text-sm text-gray-500">London, UK</div>
                  </button>
                  <button onClick={() => { setLocation('NY 10001'); setShowLocationModal(false); }} className="w-full text-left p-3 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">
                    <div className="font-bold text-sm">NY 10001</div>
                    <div className="text-sm text-gray-500">New York, USA</div>
                  </button>
               </div>
            </div>
        </div>
      )}
    </div>
  );
};
