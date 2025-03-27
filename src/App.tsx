import { ProfileProvider } from './context/ProfileContext';
import { ProfileLayout } from './components/layout/ProfileLayout';

function App() {
  return (
    <div className="min-h-[600px] w-[800px] bg-gray-50">
      <ProfileProvider>
        <ProfileLayout />
      </ProfileProvider>
    </div>
  );
}

export default App;
