import React from 'react';
import { 
  Search as SearchIcon,
  Camera as CameraIcon,
  Mic as MicIcon,
  MapPin as LocationIcon,
  ChevronDown as ChevronDownIcon,
  ArrowLeft as ArrowLeftIcon,
  Home as HomeIcon,
  User as UserIcon,
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Trash2 as TrashIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  CheckCircle as CheckCircleIcon,
  CheckSquare as CheckSquareIcon,
  Clock as ClockIcon,
  X as CloseIcon,
  Image as PhotoLayerIcon,
  CreditCard as CreditCardIcon,
  Settings as SettingsIcon
} from 'lucide-react';

export const BottomHomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 10.5L12 3.5l9 7" />
    <path d="M5 10.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9.5" />
    <path d="M9 21v-6h6v6" />
  </svg>
);

export const BottomUserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const BottomCartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="19" cy="20" r="1.5" />
    <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export const BottomMenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const SparkleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11 21.5C15.6944 21.5 19.5 17.6944 19.5 13C19.5 8.30558 15.6944 4.5 11 4.5C6.30558 4.5 2.5 8.30558 2.5 13C2.5 14.9348 3.14545 16.7188 4.22557 18.1565L3.32832 21.0504C3.25052 21.3013 3.48624 21.5222 3.73812 21.4339L6.87702 20.3343C8.11874 21.0825 9.51683 21.5 11 21.5Z" fill="#ff9900" />
    <path d="M19 0.528434C19.2605 3.3253 20.6747 4.73949 23.4716 5.00001C20.6747 5.26053 19.2605 6.67471 19 9.47158C18.7395 6.67471 17.3253 5.26053 14.5284 5.00001C17.3253 4.73949 18.7395 3.3253 19 0.528434Z" fill="#008296" />
  </svg>
);

export {
  SearchIcon,
  CameraIcon,
  MicIcon,
  LocationIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  HomeIcon,
  UserIcon,
  CartIcon,
  MenuIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  CheckCircleIcon,
  CheckSquareIcon,
  ClockIcon,
  CloseIcon,
  PhotoLayerIcon,
  CreditCardIcon,
  SettingsIcon
};
