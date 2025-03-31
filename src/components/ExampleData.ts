import { ProfileField } from '../types';

export const exampleProfileFields: ProfileField[] = [
  // Personal Information
  {
    id: 'personal-1',
    label: 'Full Name',
    value: 'Suchith M S',
    category: 'personal'
  },
  {
    id: 'personal-2',
    label: 'Email',
    value: 'mssuchith4@gmail.com',
    category: 'personal'
  },
  {
    id: 'personal-3',
    label: 'Phone',
    value: '+91-9019526435',
    category: 'personal'
  },
  {
    id: 'personal-4',
    label: 'Location',
    value: 'Bengaluru, KA, India',
    category: 'personal'
  },
  {
    id: 'personal-5',
    label: 'LinkedIn',
    value: 'linkedin.com/in/suchithms',
    category: 'personal'
  },

  // Education
  {
    id: 'education-1',
    label: 'Bachelor\'s, Computer Science',
    value: 'Bachelor\'s, Computer Science\nMVJ college of engineering\n2021 - 2025',
    category: 'education'
  },
  
  // Add another education example
  {
    id: 'education-2',
    label: 'Master\'s, Data Science',
    value: 'Master\'s, Data Science\nTech University\n2025 - 2027',
    category: 'education'
  },

  // Experience
  {
    id: 'experience-1',
    label: 'Software Developer',
    value: 'ABC Technology Inc.\nJan 2023 - Present\n- Led development of frontend applications using React and TypeScript\n- Collaborated with UX team to improve user experience\n- Implemented automated testing with Jest',
    category: 'experience'
  },
  {
    id: 'experience-2',
    label: 'Intern Developer',
    value: 'XYZ Solutions\nMay 2022 - Dec 2022\n- Assisted in developing web applications\n- Created documentation for the codebase\n- Participated in code reviews',
    category: 'experience'
  },

  // Skills
  {
    id: 'skills-1',
    label: 'Programming Languages',
    value: 'JavaScript, TypeScript, Python, Java, C++',
    category: 'skills'
  },
  {
    id: 'skills-2',
    label: 'Frontend',
    value: 'React, Vue.js, Angular, HTML5, CSS3, TailwindCSS',
    category: 'skills'
  },
  {
    id: 'skills-3',
    label: 'Backend',
    value: 'Node.js, Express, Django, Spring Boot',
    category: 'skills'
  },

  // References
  {
    id: 'references-1',
    label: 'Jane Doe',
    value: 'Senior Developer at ABC Technology\njanedoe@example.com\n(555) 987-6543',
    category: 'references'
  }
]; 