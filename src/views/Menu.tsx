import React from 'react';
import { ArrowLeft, X as CloseIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Menu = ({ onBack, onNavigate }: { onBack: () => void, onNavigate: (v: any) => void }) => {
  const { user, signIn, signOut } = useAuth();

  return (
    <div className="flex flex-col h-full bg-white z-50 absolute inset-0 overflow-y-auto pb-20">
      <div className="amazon-header-bg p-4 pt-12 flex justify-between items-center text-white">
         <div className="flex items-center">
             <img src="https://m.media-amazon.com/images/G/01/gc/pvp/amazon_logo_white._CB485933486_.png" alt="Amazon" className="h-[22px] object-contain mb-1" />
         </div>
         <button onClick={onBack}>
           <CloseIcon className="w-6 h-6" />
         </button>
      </div>

      <div className="p-4 bg-gray-100 min-h-screen">
         <h2 className="font-bold text-xl mb-4">
           {user ? `Hello, ${user.email}` : 'Hello, Sign in'}
         </h2>
         <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-4">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-100" onClick={() => onNavigate('orders')}>
               <span className="font-medium">Your Orders</span>
               <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-100">
               <span className="font-medium">Your Lists</span>
               <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-100" onClick={() => onNavigate('admin')}>
               <span className="font-medium">Admin Dashboard</span>
               <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </button>
         </div>

         <h3 className="font-bold text-lg mb-2">Settings</h3>
         <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-4">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-100" onClick={() => onNavigate('profile')}>
               <span className="font-medium">Your Account</span>
               <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </button>
            {user ? (
               <button className="w-full flex items-center justify-between p-4 border-b border-gray-100" onClick={signOut}>
                  <span className="font-medium">Sign Out</span>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
               </button>
            ) : (
               <button className="w-full flex items-center justify-between p-4 border-b border-gray-100" onClick={signIn}>
                  <span className="font-medium">Sign In</span>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400" />
               </button>
            )}
         </div>
      </div>
    </div>
  )
}
