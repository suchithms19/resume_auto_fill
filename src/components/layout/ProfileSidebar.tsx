import { useProfile } from '../../context/ProfileContext';
import { ProfileCategory } from '../../types';
import { AddProfileField } from '../AddProfileField';

const CATEGORY_LABELS: Record<ProfileCategory, string> = {
  personal: 'Personal Information',
  education: 'Education',
  experience: 'Work Experience',
  skills: 'Skills',
  custom: 'Custom Fields'
};

const CATEGORY_ICONS: Record<ProfileCategory, string> = {
  personal: '👤',
  education: '🎓',
  experience: '💼',
  skills: '🛠️',
  custom: '✨'
};

interface ProfileSidebarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function ProfileSidebar({ activeCategory, onSelectCategory }: ProfileSidebarProps) {
  const { state } = useProfile();
  
  // Group fields by category
  const categoryCounts = Object.values(state.fields).reduce((acc, field) => {
    acc[field.category] = (acc[field.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Order of categories
  const categoryOrder: ProfileCategory[] = [
    'personal',
    'education',
    'experience',
    'skills',
    'custom'
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Job Application Info</h1>
        <p className="text-sm text-gray-500 mt-1">Add and manage your information</p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-2">
          {categoryOrder.map(category => (
            <div
              key={category}
              className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${
                activeCategory === category ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectCategory(category)}
            >
              <span className="text-xl mr-3">{CATEGORY_ICONS[category]}</span>
              <div className="flex-1">
                <div className="font-medium">{CATEGORY_LABELS[category]}</div>
                <div className="text-xs text-gray-500">
                  {categoryCounts[category] || 0} fields
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <AddProfileField initialCategory={activeCategory as ProfileCategory} />
      </div>
    </div>
  );
} 