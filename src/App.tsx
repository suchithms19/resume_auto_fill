import { useState } from 'react';
import { ProfileProvider } from './context/ProfileContext';
import { ProfileLayout } from './components/layout/ProfileLayout';
import { AddDetails } from './components/layout/AddDetails';

function App() {
  const [activeTab, setActiveTab] = useState<'add' | 'profile'>('add');

  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex border-b border-gray-200 bg-white">
        <button
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'add'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('add')}
        >
          Add Details
        </button>
        <button
          className={`flex-1 py-3 px-4 text-sm font-medium ${
            activeTab === 'profile'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </nav>

      <ProfileProvider>
        <div className="flex-1 overflow-auto">
          {activeTab === 'add' ? <AddDetails /> : <ProfileLayout />}
        </div>
      </ProfileProvider>
    </div>
  );
}

export default App;
