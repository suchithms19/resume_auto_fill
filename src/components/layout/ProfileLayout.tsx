import { useProfile } from '../../context/ProfileContext';
import { copyToClipboard } from '../../utils/clipboard';
import { useState } from 'react';
import { ProfileField } from '../../types';

const CATEGORIES = [
  { id: 'personal', label: 'Personal Information', icon: '👤' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'experience', label: 'Work Experience', icon: '💼' },
  { id: 'skills', label: 'Skills', icon: '🛠️' },
  { id: 'references', label: 'References', icon: '📞' },
  { id: 'custom', label: 'Custom Fields', icon: '✨' }
];

export function ProfileLayout() {
  const { state } = useProfile();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (value: string, id: string) => {
    await copyToClipboard(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderField = (field: ProfileField) => {
    // For skills, render as tags
    if (field.category === 'skills') {
      const skills = field.value.split(',').map(skill => skill.trim());
      return (
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <div 
              key={index}
              onClick={() => handleCopy(skill, `${field.id}-${index}`)}
              className={`bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-200 ${
                copiedId === `${field.id}-${index}` ? 'bg-blue-100 text-blue-700' : ''
              }`}
            >
              {skill}
            </div>
          ))}
        </div>
      );
    }

    // For other fields, render as normal
    return (
      <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
        {field.value || <span className="text-gray-400 italic">No value</span>}
      </p>
    );
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-4 space-y-6">
        {/* Profile title at the top */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-bold text-gray-900">My Profile</h1>
          <p className="text-xs text-gray-500">Click any item to copy to clipboard</p>
        </div>
        
        {CATEGORIES.map(category => {
          const fields = state.fields.filter(f => f.category === category.id);
          if (fields.length === 0) return null;

          return (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{category.icon}</span>
                <h2 className="text-sm font-semibold text-gray-900">{category.label}</h2>
              </div>

              {category.id === 'skills' ? (
                // Special rendering for skills category
                <div className="flex flex-wrap gap-2 mt-2">
                  {fields.flatMap(field => 
                    field.value.split(',').map(skill => skill.trim())
                  ).map((skill, index) => (
                    <div 
                      key={index}
                      onClick={() => handleCopy(skill, `skill-${index}`)}
                      className={`bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-200 ${
                        copiedId === `skill-${index}` ? 'bg-blue-100 text-blue-700' : ''
                      }`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              ) : (
                // Normal rendering for other categories
                <div className="space-y-2">
                  {fields.map(field => (
                    <button
                      key={field.id}
                      onClick={() => handleCopy(field.value, field.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        copiedId === field.id
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">{field.label}</span>
                        {copiedId === field.id && (
                          <span className="text-xs text-green-600 font-medium">
                            Copied!
                          </span>
                        )}
                      </div>
                      {renderField(field)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 