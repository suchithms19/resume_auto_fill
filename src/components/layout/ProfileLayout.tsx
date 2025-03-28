import { useProfile } from '../../context/ProfileContext';
import { copyToClipboard } from '../../utils/clipboard';
import { useState } from 'react';

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

  return (
    <div className="h-[calc(500px-48px)] overflow-auto">
      <div className="p-4 space-y-6">
        {CATEGORIES.map(category => {
          const fields = state.fields.filter(f => f.category === category.id);
          if (fields.length === 0) return null;

          return (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{category.icon}</span>
                <h2 className="text-sm font-semibold text-gray-900">{category.label}</h2>
              </div>
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
                      <span className="text-xs text-gray-500">
                        {copiedId === field.id ? 'Copied!' : 'Click to copy'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{field.value}</p>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 