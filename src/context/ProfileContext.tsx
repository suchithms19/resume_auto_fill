import { createContext, ReactNode, useContext, useReducer, useEffect } from 'react';
import { ProfileAction, ProfileState } from '../types';
import { exampleProfileFields } from '../components/ExampleData';

// Declare chrome for TypeScript support
declare global {
  interface Window {
    chrome?: {
      storage: {
        sync: {
          get: (keys: string[], callback: (result: Record<string, any>) => void) => void;
          set: (items: Record<string, any>) => void;
        }
      }
    }
  }
}

// Initial state
const initialState: ProfileState = {
  fields: [],
  loading: true,
  error: null
};

// Create context
const ProfileContext = createContext<{
  state: ProfileState;
  dispatch: React.Dispatch<ProfileAction>;
} | undefined>(undefined);

// Reducer function to handle state updates
function profileReducer(state: ProfileState, action: ProfileAction): ProfileState {
  switch (action.type) {
    case 'LOAD_PROFILE_SUCCESS':
      return {
        ...state,
        fields: action.payload,
        loading: false,
        error: null
      };
    case 'LOAD_PROFILE_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'UPDATE_FIELD':
      return {
        ...state,
        fields: state.fields.map(field => 
          field.id === action.payload.id ? action.payload : field
        )
      };
    case 'ADD_FIELD':
      return {
        ...state,
        fields: [...state.fields, action.payload]
      };
    case 'DELETE_FIELD':
      return {
        ...state,
        fields: state.fields.filter(field => field.id !== action.payload)
      };
    default:
      return state;
  }
}

// Provider component
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  useEffect(() => {
    // Load data from chrome.storage when the component mounts
    const loadProfileData = async () => {
      try {
        // For Chrome extension
        if (window.chrome?.storage) {
          window.chrome.storage.sync.get(['profileFields'], (result) => {
            const storedFields = result.profileFields || [];
            // Load example data if no stored data is found
            if (storedFields.length === 0) {
              dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: exampleProfileFields });
            } else {
              dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: storedFields });
            }
          });
        } else {
          // For development outside of the extension
          const storedFields = JSON.parse(localStorage.getItem('profileFields') || '[]');
          // Load example data if no stored data is found
          if (storedFields.length === 0) {
            dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: exampleProfileFields });
          } else {
            dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: storedFields });
          }
        }
      } catch (error) {
        dispatch({ 
          type: 'LOAD_PROFILE_ERROR', 
          payload: error instanceof Error ? error.message : 'Failed to load profile data' 
        });
      }
    };

    loadProfileData();
  }, []);

  // Save to storage whenever state.fields changes
  useEffect(() => {
    if (!state.loading) {
      try {
        // For Chrome extension
        if (window.chrome?.storage) {
          window.chrome.storage.sync.set({ profileFields: state.fields });
        } else {
          // For development outside of the extension
          localStorage.setItem('profileFields', JSON.stringify(state.fields));
        }
      } catch (error) {
        console.error('Failed to save profile data:', error);
      }
    }
  }, [state.fields, state.loading]);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

// Custom hook to use the context
export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
} 