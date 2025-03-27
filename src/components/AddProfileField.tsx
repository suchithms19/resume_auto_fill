import { useState } from 'react';
import { ProfileCategory } from '../types';
import { useProfile } from '../context/ProfileContext';

export function AddProfileField() {
  const { dispatch } = useProfile();
  const [isAdding, setIsAdding] = useState(false);
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<ProfileCategory>('personal');

  const categories: ProfileCategory[] = [
    'personal',
    'education',
    'experience',
    'skills',
    'references',
    'custom'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;

    const newField = {
      id: `field-${Date.now()}`,
      label: label.trim(),
      value: value.trim(),
      category
    };

    dispatch({
      type: 'ADD_FIELD',
      payload: newField
    });

    // Reset form
    setLabel('');
    setValue('');
    setCategory('personal');
    setIsAdding(false);
  };

  const handleCancel = () => {
    setLabel('');
    setValue('');
    setCategory('personal');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-4"
      >
        Add New Field
      </button>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Add New Field</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">
            Field Label
          </label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Full Name, Phone Number, etc."
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
            Field Value
          </label>
          <textarea
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the value you want to store"
            rows={3}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProfileCategory)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Field
          </button>
        </div>
      </form>
    </div>
  );
} 