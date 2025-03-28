import { useState } from 'react';
import { ProfileProvider } from './context/ProfileContext';
import { ProfileLayout } from './components/layout/ProfileLayout';
import { AddDetails } from './components/layout/AddDetails';

function App() {
  const [activeTab, setActiveTab] = useState<'add' | 'profile'>('add');

  return (
    <div className="w-[400px] h-[500px] bg-white">
      {/* Navigation Bar */}
      <nav className="flex border-b border-gray-200">
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
        {activeTab === 'add' ? <AddDetails /> : <ProfileLayout />}
      </ProfileProvider>
    </div>
  );
}

export default App;
