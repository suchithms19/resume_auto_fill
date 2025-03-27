import { useState } from 'react';
import { ProfileSidebar } from './ProfileSidebar';
import { ProfileDisplay } from './ProfileDisplay';

export function ProfileLayout() {
  const [activeCategory, setActiveCategory] = useState<string>('personal');

  return (
    <div className="flex h-full">
      {/* Left sidebar for categories and editing */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <ProfileSidebar 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
        />
      </div>
      
      {/* Right panel for profile display */}
      <div className="w-2/3 bg-gray-50 overflow-auto">
        <ProfileDisplay activeCategory={activeCategory} />
      </div>
    </div>
  );
} 