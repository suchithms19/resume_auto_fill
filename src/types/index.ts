export interface ProfileField {
  id: string;
  label: string;
  value: string;
  category: ProfileCategory;
}

export type ProfileCategory = 
  | 'personal'
  | 'education'
  | 'experience'
  | 'skills'
  | 'references'
  | 'custom';

export interface ProfileState {
  fields: ProfileField[];
  loading: boolean;
  error: string | null;
}

export type ProfileAction = 
  | { type: 'LOAD_PROFILE_SUCCESS'; payload: ProfileField[] }
  | { type: 'LOAD_PROFILE_ERROR'; payload: string }
  | { type: 'UPDATE_FIELD'; payload: ProfileField }
  | { type: 'ADD_FIELD'; payload: ProfileField }
  | { type: 'DELETE_FIELD'; payload: string }; 