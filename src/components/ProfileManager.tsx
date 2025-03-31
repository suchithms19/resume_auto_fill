import { useMemo, useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { ProfileCategorySection } from './ProfileCategory';
import { AddProfileField } from './AddProfileField';
import { ProfileCategory } from '../types';

export function ProfileManager() {
  const { state } = useProfile();
  const [searchTerm, setSearchTerm] = useState('');

  // Group fields by category
  const categorizedFields = useMemo(() => {
    const filtered = searchTerm.trim() 
      ? state.fields.filter(field => 
          field.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
          field.value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : state.fields;

    return filtered.reduce((acc, field) => {
      if (!acc[field.category]) {
        acc[field.category] = [];
      }
      acc[field.category].push(field);
      return acc;
    }, {} as Record<ProfileCategory, typeof state.fields>);
  }, [state.fields, searchTerm]);

  // Order of categories
  const categoryOrder: ProfileCategory[] = [
    'personal',
    'education',
    'experience',
    'skills',
    'custom'
  ];

  if (state.loading) {
    return <div className="text-center py-6">Loading profile data...</div>;
  }

  if (state.error) {
    return <div className="text-center py-6 text-red-600">{state.error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Application Profile</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search fields..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <AddProfileField />

      {state.fields.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No profile fields added yet. Add your first field to get started!
        </div>
      ) : (
        <>
          {categoryOrder.map(category => (
            categorizedFields[category] && categorizedFields[category].length > 0 && (
              <ProfileCategorySection 
                key={category} 
                category={category} 
                fields={categorizedFields[category]} 
              />
            )
          ))}

          {searchTerm && Object.values(categorizedFields).flat().length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No fields match your search.
            </div>
          )}
        </>
      )}
    </div>
  );
} 