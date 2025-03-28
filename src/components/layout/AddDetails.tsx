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
  const [showSuccess, setShowSuccess] = useState(false);

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

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);

    // Reset form
    setLabel('');
    setValue('');
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-4">
        <div className="space-y-4">
          {/* Category selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3 rounded-lg text-left transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-50 border-blue-300 border'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{cat.icon}</span>
                    <p className="text-sm font-medium text-gray-900">{cat.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-2">
              {selectedCategory === 'skills' ? 'Add Skills' : 'Add Information'}
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {selectedCategory === 'skills' ? 'Skill Type' : 'Label'}
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
                placeholder={selectedCategory === 'skills' ? 'e.g. Programming Languages' : 'e.g. Full Name'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {selectedCategory === 'skills' ? 'Skills' : 'Value'}
              </label>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-2 border rounded-md text-sm"
                rows={3}
                placeholder={selectedCategory === 'skills' 
                  ? 'Enter skills separated by commas (e.g. JavaScript, React, Node.js)'
                  : 'Enter information'}
              />
              {selectedCategory === 'skills' && (
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple skills with commas
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add {selectedCategory === 'skills' ? 'Skills' : 'Information'}
            </button>
            
            {showSuccess && (
              <div className="flex items-center justify-center text-sm text-green-600 font-medium mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Successfully added!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
} 