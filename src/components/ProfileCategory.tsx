import { useState } from 'react';
import { ProfileField as ProfileFieldType, ProfileCategory as CategoryType } from '../types';
import { ProfileField } from './ProfileField';

interface ProfileCategoryProps {
  category: CategoryType;
  fields: ProfileFieldType[];
}

export function ProfileCategorySection({ category, fields }: ProfileCategoryProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (fields.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div 
        className="bg-gray-100 px-4 py-2 rounded-md flex justify-between items-center cursor-pointer"
        onClick={toggleCollapse}
      >
        <h2 className="text-xl font-semibold text-gray-800 capitalize">
          {category}
          <span className="text-gray-500 text-sm ml-2">({fields.length})</span>
        </h2>
        <button className="text-gray-600">
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      {!isCollapsed && (
        <div className="mt-3">
          {fields.map(field => (
            <ProfileField key={field.id} field={field} />
          ))}
        </div>
      )}
    </div>
  );
} 