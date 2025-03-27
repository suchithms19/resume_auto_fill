import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ProfileField, ProfileCategory } from '../../types';
import { copyToClipboard } from '../../utils/clipboard';

const CATEGORY_LABELS: Record<ProfileCategory, string> = {
  personal: 'Personal Information',
  education: 'Education',
  experience: 'Work Experience',
  skills: 'Skills',
  references: 'References',
  custom: 'Custom Fields'
};

interface ProfileDisplayProps {
  activeCategory: string;
}

export function ProfileDisplay({ activeCategory }: ProfileDisplayProps) {
  const { state } = useProfile();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Filter fields by active category
  const fields = state.fields.filter(field => field.category === activeCategory);
  
  const handleCopy = async (field: ProfileField) => {
    try {
      await copyToClipboard(field.value);
      setCopiedId(field.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (state.loading) {
    return <div className="flex h-full items-center justify-center">Loading...</div>;
  }

  if (state.error) {
    return <div className="flex h-full items-center justify-center text-red-500">{state.error}</div>;
  }

  return (
    <div className="h-full">
      {/* Profile Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center">
          <div className="bg-blue-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
            {activeCategory.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {CATEGORY_LABELS[activeCategory as ProfileCategory]}
            </h1>
            <p className="text-gray-500 mt-1">
              {fields.length} {fields.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6 overflow-auto max-h-[calc(100%-88px)]">
        {fields.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
            <p>No {CATEGORY_LABELS[activeCategory as ProfileCategory].toLowerCase()} added yet.</p>
            <p className="mt-2">Add information using the form in the sidebar.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {fields.map(field => (
              <div 
                key={field.id} 
                className={`bg-white rounded-lg border p-4 hover:shadow-md transition cursor-pointer ${
                  copiedId === field.id ? 'bg-green-50 border-green-200' : 'border-gray-200'
                }`}
                onClick={() => handleCopy(field)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{field.label}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {copiedId === field.id ? 'Copied!' : 'Click to copy'}
                  </span>
                </div>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {field.value || <span className="text-gray-400 italic">No value</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 