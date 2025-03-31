import { useProfile } from '../../context/ProfileContext';
import { copyToClipboard } from '../../utils/clipboard';
import { useState } from 'react';
import { ProfileField } from '../../types';

const CATEGORIES = [
  { id: 'personal', label: 'Personal Information', emoji: '👤' },
  { id: 'education', label: 'Education', emoji: '🎓' },
  { id: 'experience', label: 'Work Experience', emoji: '💼' },
  { id: 'skills', label: 'Skills', emoji: '🛠️' },
  { id: 'custom', label: 'Custom Fields', emoji: '✨' }
];

export function ProfileLayout() {
  const { state, dispatch } = useProfile();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (value: string, id: string) => {
    await copyToClipboard(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_FIELD', payload: id });
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
  
  // Custom renderer for education category
  const renderEducationCategory = (fields: ProfileField[]) => {
    return (
      <div className="space-y-4 mt-3">
        {fields.map(field => {
          const lines = field.value.split('\n');
          const degree = lines[0] || field.label;
          const college = lines[1] || '';
          const dateRange = lines[2]?.split(' - ') || ['', ''];
          const startDate = dateRange[0] || '';
          const endDate = dateRange[1] || '';
          
          return (
            <div key={field.id} className="relative group">
              <div className={`w-full p-4 rounded-xl border ${
                copiedId?.startsWith(field.id) ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50 group-hover:border-gray-300'
              }`}>
                {/* Degree as headline */}
                <div className="flex justify-between items-center">
                  <h3 
                    onClick={() => handleCopy(degree, `${field.id}-degree`)}
                    className={`text-base font-medium cursor-pointer transition-colors ${
                      copiedId === `${field.id}-degree` ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
                    }`}
                  >
                    {degree}
                  </h3>
                  {copiedId?.startsWith(field.id) && (
                    <span className="text-xs bg-green-100 text-green-600 font-medium px-2 py-1 rounded-full">
                      
                    </span>
                  )}
                </div>
                
                {/* College and dates as separate fields */}
                <div className="mt-3 space-y-2 divide-y divide-gray-100">
                  <div className="pb-2">
                    <div className="text-xs font-medium text-gray-500 mb-1">College Name</div>
                    <div 
                      onClick={() => handleCopy(college, `${field.id}-college`)}
                      className={`text-sm cursor-pointer transition-colors ${
                        copiedId === `${field.id}-college` ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {college}
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">Start Date</div>
                        <div 
                          onClick={() => handleCopy(startDate, `${field.id}-start`)}
                          className={`text-sm cursor-pointer transition-colors ${
                            copiedId === `${field.id}-start` ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                          }`}
                        >
                          {startDate}
                        </div>
                      </div>
                    
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">End Date</div>
                        <div 
                          onClick={() => handleCopy(endDate, `${field.id}-end`)}
                          className={`text-sm cursor-pointer transition-colors ${
                            copiedId === `${field.id}-end` ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                          }`}
                        >
                          {endDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Delete button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(field.id);
                }}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Delete field"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  // Custom renderer for experience category
  const renderExperienceCategory = (fields: ProfileField[]) => {
    return (
      <div className="space-y-4 mt-3">
        {fields.map(field => {
          const lines = field.value.split('\n');
          const company = lines[0] || field.label;
          const role = lines[1] || '';
          const dateRange = lines[2]?.split(' - ') || ['', ''];
          const startDate = dateRange[0] || '';
          const endDate = dateRange[1] || '';
          const location = lines[3] || '';
          const description = lines.slice(4).join('\n') || '';
          
          return (
            <div key={field.id} className="relative group">
              <div className={`w-full p-4 rounded-xl border ${
                copiedId?.startsWith(field.id) ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50 group-hover:border-gray-300'
              }`}>
                {/* Company as headline */}
                <div className="flex justify-between items-center">
                  <h3 
                    onClick={() => handleCopy(company, `${field.id}-company`)}
                    className={`text-base font-medium cursor-pointer transition-colors ${
                      copiedId === `${field.id}-company` ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
                    }`}
                  >
                    {company}
                  </h3>
                  {copiedId?.startsWith(field.id) && (
                    <span className="text-xs bg-green-100 text-green-600 font-medium px-2 py-1 rounded-full">
                      
                    </span>
                  )}
                </div>
                
                {/* Role, dates, location and description as separate fields */}
                <div className="mt-3 space-y-2 divide-y divide-gray-100">
                  <div className="pb-2">
                    <div className="text-xs font-medium text-gray-500 mb-1">Role</div>
                    <div 
                      onClick={() => handleCopy(role, `${field.id}-role`)}
                      className={`text-sm cursor-pointer transition-colors ${
                        copiedId === `${field.id}-role` ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {role}
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">Start Date</div>
                        <div 
                          onClick={() => handleCopy(startDate, `${field.id}-start`)}
                          className={`text-sm cursor-pointer transition-colors ${
                            copiedId === `${field.id}-start` ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                          }`}
                        >
                          {startDate}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">End Date</div>
                        <div 
                          onClick={() => handleCopy(endDate, `${field.id}-end`)}
                          className={`text-sm cursor-pointer transition-colors ${
                            copiedId === `${field.id}-end` ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                          }`}
                        >
                          {endDate}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <div className="text-xs font-medium text-gray-500 mb-1">Location</div>
                    <div 
                      onClick={() => handleCopy(location, `${field.id}-location`)}
                      className={`text-sm cursor-pointer transition-colors ${
                        copiedId === `${field.id}-location` ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {location}
                    </div>
                  </div>
                  
                  {description && (
                    <div className="pt-2">
                      <div className="text-xs font-medium text-gray-500 mb-1">Description</div>
                      <div 
                        onClick={() => handleCopy(description, `${field.id}-description`)}
                        className={`text-sm cursor-pointer transition-colors whitespace-pre-wrap ${
                          copiedId === `${field.id}-description` ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        {description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Delete button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(field.id);
                }}
                className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Delete field"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <div className="max-w-3xl mx-auto p-5 my-4 bg-white rounded-xl shadow-sm space-y-6">
        {/* Profile title at the top */}
        <div className="text-center mb-6">
          <p className="text-sm text-white bg-gradient-to-r from-blue-500 to-indigo-600 p-2.5 rounded-lg shadow-sm">
            Click any item to copy to clipboard
          </p>
        </div>
        
        {CATEGORIES.map(category => {
          const fields = state.fields.filter(f => f.category === category.id);
          if (fields.length === 0) return null;

          return (
            <div key={category.id} className="space-y-3 pb-4 border-b border-gray-100 last:border-0">
              <div className="flex items-center space-x-2">
                <span className="text-xl bg-gray-100 p-1.5 rounded-lg">{category.emoji}</span>
                <h2 className="text-base font-semibold text-gray-900">{category.label}</h2>
              </div>

              {category.id === 'skills' ? (
                // Special rendering for skills category
                <div className="flex flex-wrap gap-2 mt-3">
                  {fields.flatMap(field => 
                    field.value.split(',').map(skill => skill.trim()).map(skill => ({
                      skill,
                      fieldId: field.id
                    }))
                  ).map((item, index) => (
                    <div 
                      key={index}
                      className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all duration-200 flex items-center ${
                        copiedId === `skill-${index}` 
                          ? 'bg-blue-100 text-blue-700 shadow-sm' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span onClick={() => handleCopy(item.skill, `skill-${index}`)}>
                        {item.skill}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          
                          // Find the field that contains this skill
                          const field = fields.find(f => f.id === item.fieldId);
                          if (!field) return;
                          
                          // Get all skills and remove the one that was clicked
                          const skills = field.value.split(',').map(s => s.trim());
                          const updatedSkills = skills.filter(s => s !== item.skill);
                          
                          if (updatedSkills.length === 0) {
                            // If this was the last skill, delete the entire field
                            handleDelete(field.id);
                          } else {
                            // Otherwise, update the field with the remaining skills
                            dispatch({
                              type: 'UPDATE_FIELD',
                              payload: {
                                ...field,
                                value: updatedSkills.join(', ')
                              }
                            });
                          }
                        }}
                        className="ml-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 focus:outline-none"
                        title="Delete skill"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6L6 18"></path>
                          <path d="M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : category.id === 'education' ? (
                // Special rendering for education category
                renderEducationCategory(fields)
              ) : category.id === 'experience' ? (
                // Special rendering for experience category
                renderExperienceCategory(fields)
              ) : (
                // Normal rendering for other categories
                <div className="space-y-3">
                  {fields.map(field => (
                    <div key={field.id} className="relative group">
                      <button
                        onClick={() => handleCopy(field.value, field.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-colors duration-200 ${
                          copiedId === field.id
                            ? 'bg-green-50 border-green-200 shadow-sm'
                            : 'bg-white border-gray-200 hover:bg-gray-50 group-hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{field.label}</span>
                          {copiedId === field.id && (
                            <span className="text-xs bg-green-100 text-green-600 font-medium px-2 py-1 rounded-full">
                              
                            </span>
                          )}
                        </div>
                        {renderField(field)}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(field.id);
                        }}
                        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        title="Delete field"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
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