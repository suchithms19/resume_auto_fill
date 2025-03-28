import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ProfileCategory } from '../../types';

const CATEGORIES: { id: ProfileCategory; label: string; icon: string }[] = [
  { id: 'personal', label: 'Personal Information', icon: '👤' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'experience', label: 'Work Experience', icon: '💼' },
  { id: 'skills', label: 'Skills', icon: '🛠️' },
  { id: 'references', label: 'References', icon: '📞' },
  { id: 'custom', label: 'Custom Fields', icon: '✨' }
];

export function AddDetails() {
  const { dispatch } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState<ProfileCategory>('personal');
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    dispatch({
      type: 'ADD_FIELD',
      payload: {
        id: `field-${Date.now()}`,
        label: label.trim(),
        value: value.trim(),
        category: selectedCategory
      }
    });

    setLabel('');
    setValue('');
  };

  return (
    <div className="h-[calc(500px-48px)] overflow-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Information</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-lg text-left transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-50 border-blue-200 border'
                    : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className="text-xl mb-1">{cat.icon}</span>
                <p className="text-sm font-medium text-gray-900">{cat.label}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
                placeholder="e.g. Full Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Value
              </label>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
                rows={3}
                placeholder="Enter the information"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add Field
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 