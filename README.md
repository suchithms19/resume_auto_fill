# Job Application Assistant Chrome Extension

A Chrome extension to store and manage job application information for quick form filling and reference.

## Features

- Store personal information, education, experience, skills, and references
- Organize information into categories
- Quickly copy information to clipboard by clicking on fields
- Search functionality to find specific fields
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
2. Add your information by clicking the "Add New Field" button
3. Fill in the field label, value, and select a category
4. To copy any field value to clipboard, click on the "Copy" button or the field value itself
5. Edit or delete fields as needed
6. Use the search bar to find specific information

## Project Structure

```
job-application-assistant/
├── public/                # Static assets
│   ├── icons/             # Extension icons
│   └── manifest.json      # Extension manifest
├── src/
│   ├── components/        # React components
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
