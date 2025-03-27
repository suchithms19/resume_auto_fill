import { ProfileField } from '../types';

export const exampleProfileFields: ProfileField[] = [
  {
    id: 'personal-1',
    label: 'Full Name',
    value: 'John Smith',
    category: 'personal'
  },
  {
    id: 'personal-2',
    label: 'Email',
    value: 'john.smith@example.com',
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
    label: 'LinkedIn',
    value: 'linkedin.com/in/johnsmith',
    category: 'personal'
  },
  {
    id: 'personal-5',
    label: 'Location',
    value: 'New York, NY',
    category: 'personal'
  },
  {
    id: 'education-1',
    label: 'Bachelor of Science',
    value: 'Computer Science\nNew York University\n2015-2019',
    category: 'education'
  },
  {
    id: 'experience-1',
    label: 'Software Developer',
    value: 'ABC Technology Inc.\nJan 2020 - Present\n- Led development of frontend applications using React and TypeScript\n- Collaborated with UX team to improve user experience\n- Implemented automated testing with Jest',
    category: 'experience'
  },
  {
    id: 'experience-2',
    label: 'Intern Developer',
    value: 'XYZ Solutions\nMay 2019 - Dec 2019\n- Assisted in developing web applications\n- Created documentation for the codebase\n- Participated in code reviews',
    category: 'experience'
  },
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
  {
    id: 'references-1',
    label: 'Jane Doe',
    value: 'Senior Developer at ABC Technology\njanedoe@example.com\n(555) 987-6543',
    category: 'references'
  }
];