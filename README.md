# Job Application Assistant Chrome Extension

A Chrome extension to store and manage job application information for quick form filling and reference.

## Features

- Modern dual-panel design with sidebar categories and profile display
- Store personal information, education, experience, skills, and references
- Organize information into categories
- Quickly copy information to clipboard by clicking on any field
- Visual feedback with highlighted items when copied
- Comes with preset example data to get started quickly
- Data is synced across devices using Chrome storage

## Installation

### For Development

1. Clone this repository:
   ```
   git clone <repository-url>
   cd job-application-assistant
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build the extension:
   ```
   npm run build
   ```

5. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder from this project

### For Users

1. Download the extension from the Chrome Web Store (coming soon)
2. Click "Add to Chrome" to install

## Usage

1. Click on the extension icon in your Chrome toolbar to open the extension
2. Browse different categories in the left sidebar (Personal, Education, Experience, etc.)
3. Click any field in the right panel to copy its value to your clipboard
4. Add new fields by clicking "Add New Field" at the bottom of the sidebar
5. Fill in the field label, value, and keep or change the current category
6. All data is automatically saved and synced if you're signed into Chrome

## Project Structure

```
job-application-assistant/
├── public/                # Static assets
│   ├── icons/             # Extension icons
│   └── manifest.json      # Extension manifest
├── src/
│   ├── components/        # React components
│   │   └── layout/        # UI layout components
│   ├── context/           # Context for state management
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main App component
│   └── main.tsx           # Entry point
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Development

This project uses:
- React 19
- TypeScript
- TailwindCSS for styling
- Vite for building and development

## Building for Production

```
npm run build
```

The built extension will be in the `dist` folder.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
