import { ProfileProvider } from './context/ProfileContext';
import { ProfileManager } from './components/ProfileManager';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileProvider>
        <ProfileManager />
      </ProfileProvider>
    </div>
  );
}

export default App;
