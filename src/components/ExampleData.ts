import { ProfileField } from '../types';

export const exampleProfileFields: ProfileField[] = [
  // Personal Information
  {
    id: 'personal-1',
    label: 'Full Name',
    value: 'John Doe',
    category: 'personal'
  },
  {
    id: 'personal-2',
    label: 'Email',
    value: 'johndoe@example.com',
    category: 'personal'
  },
  {
    id: 'personal-3',
    label: 'Phone',
    value: '(555) 123-4567',
    category: 'personal'
  },
  {
    id: 'personal-4',
    label: 'Location',
    value: 'San Francisco, CA, USA',
    category: 'personal'
  },
  {
    id: 'personal-5',
    label: 'LinkedIn',
    value: 'linkedin.com/in/johndoe',
    category: 'personal'
  },

  // Education
  {
    id: 'education-1',
    label: 'Bachelor\'s, Computer Science',
    value: 'Bachelor\'s in Computer Science\nState University\n2019 - 2023',
    category: 'education'
  },
  
  {
    id: 'education-2',
    label: 'Master\'s, Computer Science',
    value: 'Master\'s in Computer Science\nTech University\n2023 - 2025',
    category: 'education'
  },

  // Experience
  {
    id: 'experience-1',
    label: 'Software Company Inc.',
    value: 'Software Company Inc.\nSoftware Developer\nJan 2023 - Present\nSan Francisco, CA\nDeveloped frontend applications using React and TypeScript. Collaborated with UX team to improve user experience. Implemented automated testing.',
    category: 'experience'
  },
  {
    id: 'experience-2',
    label: 'Tech Solutions LLC',
    value: 'Tech Solutions LLC\nSoftware Engineering Intern\nMay 2022 - Dec 2022\nNew York, NY\nAssisted in developing web applications. Created technical documentation. Participated in code reviews.',
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
  }
]; 