import { useState } from 'react';
import { ProfileField as ProfileFieldType } from '../types';
import { useProfile } from '../context/ProfileContext';
import { copyToClipboard } from '../utils/clipboard';

interface ProfileFieldProps {
  field: ProfileFieldType;
}

export function ProfileField({ field }: ProfileFieldProps) {
  const { dispatch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(field.value);
  const [isCopied, setIsCopied] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { ...field, value }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(field.value);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${field.label}"?`)) {
      dispatch({
        type: 'DELETE_FIELD',
        payload: field.id
      });
    }
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(field.value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900">{field.label}</h3>
        <div className="flex space-x-2">
          {!isEditing ? (
            <>
              <button
                onClick={handleCopy}
                className="text-blue-600 hover:text-blue-800 text-sm"
                title="Copy to clipboard"
              >
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleEdit}
                className="text-gray-600 hover:text-gray-800 text-sm"
                title="Edit field"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 text-sm"
                title="Delete field"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-800 text-sm"
                title="Save changes"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-800 text-sm"
                title="Cancel editing"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="border-t pt-2">
        {isEditing ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={value.split('\n').length > 1 ? Math.min(value.split('\n').length, 5) : 1}
          />
        ) : (
          <p 
            className="text-gray-700 whitespace-pre-wrap cursor-pointer" 
            onClick={handleCopy}
            title="Click to copy"
          >
            {field.value || <span className="text-gray-400 italic">No value</span>}
          </p>
        )}
      </div>
      <div className="mt-1 text-xs text-gray-500 capitalize">
        {field.category}
      </div>
    </div>
  );
} 