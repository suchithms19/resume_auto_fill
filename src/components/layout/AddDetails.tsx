import { useState } from 'react';
import { useProfile } from '../../context/ProfileContext';
import { ProfileCategory } from '../../types';

const CATEGORIES: { id: ProfileCategory; label: string }[] = [
  { id: 'personal', label: 'Personal Information'},
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'references', label: 'References' },
  { id: 'custom', label: 'Custom Fields' }
];

export function AddDetails() {
  const { dispatch } = useProfile();
  const [selectedCategory, setSelectedCategory] = useState<ProfileCategory>('personal');
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  
  // Education specific fields
  const [degree, setDegree] = useState('');
  const [college, setCollege] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCategory === 'education') {
      if (!degree.trim()) return;
      
      // Format the value for education
      const formattedValue = `${degree}\n${college}\n${startDate} - ${endDate}`;
      
      dispatch({
        type: 'ADD_FIELD',
        payload: {
          id: `education-${Date.now()}`,
          label: degree.trim(),
          value: formattedValue,
          category: selectedCategory
        }
      });
      
      // Reset education fields
      setDegree('');
      setCollege('');
      setStartDate('');
      setEndDate('');
    } else {
      // For other categories
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
      
      // Reset general fields
      setLabel('');
      setValue('');
    }

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Render education form
  const renderEducationForm = () => {
    return (
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Degree Name
          </label>
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="e.g. Bachelor's, Computer Science"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            College Name
          </label>
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="e.g. RV College of Engineering"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
              placeholder="e.g. May 2021"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
              placeholder="e.g. June 2025"
              required
            />
          </div>
        </div>
      </div>
    );
  };

  // Render default form
  const renderDefaultForm = () => {
    return (
      <div className="space-y-3">
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
      </div>
    );
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
                    <p className="text-sm font-medium text-gray-900">{cat.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-2">
              {selectedCategory === 'skills' ? 'Add Skills' : 
               selectedCategory === 'education' ? 'Add Education' : 
               'Add Information'}
            </h3>
            
            {selectedCategory === 'education' ? renderEducationForm() : renderDefaultForm()}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Add {selectedCategory === 'skills' ? 'Skills' : 
                  selectedCategory === 'education' ? 'Education' : 
                  'Information'}
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