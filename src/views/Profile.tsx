import React from 'react';
import { SearchIcon, CameraIcon, MicIcon, ChevronRight } from 'lucide-react';

export const Profile = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const items = [
     { label: 'Admin Dashboard', onClick: () => onNavigate('admin') },
     { label: 'Profile', onClick: () => {} },
     { label: 'Your Recommendations', onClick: () => {} },
     { label: 'Your Essentials', onClick: () => {} },
     { label: 'Your uploaded product videos', onClick: () => {} },
     { label: 'Your Garage', onClick: () => {} },
     { label: 'Your Fanshop', onClick: () => {} },
     { label: 'Your Interests', onClick: () => {} },
     { label: 'Your Pets', onClick: () => {} },
     { label: 'Browsing history', onClick: () => {} },
     { label: 'Review your purchases', onClick: () => onNavigate('orders') },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f2f4f8] overflow-y-auto pb-20">
      {/* Header */}
      <div className="amazon-teal-bg px-3 pt-12 pb-3 flex items-center shadow-sm">
        <div className="bg-white rounded-[6px] flex items-center flex-1 py-1.5 px-3 shadow-sm border border-[#a6a6a6] focus-within:ring-2 focus-within:ring-[#f4aa00] focus-within:border-[#f4aa00]">
          <SearchIcon className="text-gray-400 w-5 h-5 mr-3" />
          <span className="flex-1 text-gray-400 text-[16px]">Search Amazon</span>
          <CameraIcon className="text-gray-400 w-5 h-5 mx-2" />
          <MicIcon className="text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="p-4 bg-white min-h-screen">
         <h2 className="text-[18px] font-bold text-[#0f1111] mb-2">Personalized content</h2>
         <div className="border border-gray-300 rounded-[8px] bg-white overflow-hidden shadow-sm">
            {items.map((item, idx) => (
               <div 
                 key={idx} 
                 className={`flex items-center justify-between p-4 bg-white active:bg-gray-100 cursor-pointer ${idx !== items.length - 1 ? 'border-b border-gray-300' : ''}`}
                 onClick={item.onClick}
               >
                  <span className="text-[15px] text-[#0f1111] font-medium">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-gray-800" />
               </div>
            ))}
         </div>
      </div>
    </div>
  )
}
