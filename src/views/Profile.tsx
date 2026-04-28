import React, { useState } from 'react';
import { SearchIcon, CameraIcon, MicIcon, ChevronRight, UserCircle, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Profile = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const { profile, updateProfile, signIn, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    email: profile?.email || ''
  });

  const items = [
     { label: 'Admin Dashboard', onClick: () => onNavigate('admin') },
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

  const handleSave = async () => {
    await updateProfile(editData);
    setIsEditing(false);
  };

  // Update editData when profile loads
  React.useEffect(() => {
    if (profile) {
      setEditData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || ''
      });
    }
  }, [profile]);

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

      <div className="p-4 bg-[#f2f4f8] min-h-screen">
         
         {/* Account Info Card */}
         <div className="bg-white rounded-[8px] p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                     <UserCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                     <h2 className="text-[18px] font-bold text-[#0f1111]">
                        {profile?.first_name} {profile?.last_name}
                     </h2>
                     <p className="text-[13px] text-gray-600">{profile?.email}</p>
                  </div>
               </div>
               <button 
                 onClick={() => {
                   if (isEditing) handleSave();
                   else setIsEditing(true);
                 }}
                 className="text-[#007185] text-[14px] font-medium hover:underline"
               >
                  {isEditing ? 'Save' : 'Edit'}
               </button>
            </div>

            {isEditing && (
               <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-col gap-1">
                     <label className="text-[12px] font-bold text-gray-700">First Name</label>
                     <div className="flex items-center border border-gray-300 rounded p-2 focus-within:ring-1 focus-within:ring-[#f4aa00] focus-within:border-[#f4aa00]">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <input 
                           className="flex-1 outline-none text-[14px]" 
                           value={editData.first_name} 
                           onChange={e => setEditData({...editData, first_name: e.target.value})}
                        />
                     </div>
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[12px] font-bold text-gray-700">Last Name</label>
                     <div className="flex items-center border border-gray-300 rounded p-2 focus-within:ring-1 focus-within:ring-[#f4aa00] focus-within:border-[#f4aa00]">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <input 
                           className="flex-1 outline-none text-[14px]" 
                           value={editData.last_name} 
                           onChange={e => setEditData({...editData, last_name: e.target.value})}
                        />
                     </div>
                  </div>
                  <div className="flex flex-col gap-1">
                     <label className="text-[12px] font-bold text-gray-700">Email Address</label>
                     <div className="flex items-center border border-gray-300 rounded p-2 focus-within:ring-1 focus-within:ring-[#f4aa00] focus-within:border-[#f4aa00]">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <input 
                           className="flex-1 outline-none text-[14px]" 
                           value={editData.email} 
                           onChange={e => setEditData({...editData, email: e.target.value})}
                        />
                     </div>
                  </div>
               </div>
            )}
         </div>

         <div className="mb-4">
            <button onClick={signOut} className="bg-white px-4 py-2 rounded-[8px] font-medium w-full text-center text-[14px] shadow-sm">
              Sign into a different account
            </button>
         </div>

         <div className="rounded-[8px] bg-white overflow-hidden shadow-sm">
            {items.map((item, idx) => (
               <div 
                 key={idx} 
                 className={`flex items-center justify-between p-4 bg-white active:bg-gray-100 cursor-pointer ${idx !== items.length - 1 ? 'border-b border-gray-100' : ''}`}
                 onClick={item.onClick}
               >
                  <span className="text-[15px] text-[#0f1111] font-medium">{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
