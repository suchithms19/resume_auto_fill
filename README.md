# Job Application Assistant Chrome Extension

A Chrome extension to store and manage job application information for quick form filling and reference.

## Features

- Modern dual-panel design with sidebar categories and main content display
- Store and manage:
  - Personal Information
  - Education History
  - Work Experience
  - Skills
  - Other Custom Categories
- One-click copy functionality for any stored information
- Visual feedback when information is copied
- Comes with example data to demonstrate usage
- Data persistence using Chrome storage sync
- Cross-device synchronization when signed into Chrome

## Installation

### For Development

1. Clone this repository:
   ```
   git clone https://github.com/suchithms19/fillio
   cd fillio
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

1. Click the extension icon in your Chrome toolbar
2. Navigate through categories using the left sidebar
3. Click any field to copy its content to your clipboard
4. Add new information using the "Add New Field" button
5. Customize field labels and values as needed
6. All data is automatically saved and synced across devices

## Project Structure

```
job-application-assistant/
├── public/                # Static assets
│   ├── icons/            # Extension icons
│   └── manifest.json     # Extension manifest
├── src/
│   ├── components/       # React components
│   │   └── layout/      # UI layout components
│   ├── context/         # Context for state management
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Entry point
├── package.json        # Dependencies and scripts
└── README.md          # Documentation
```

## Development

This project uses:
- React
- TypeScript
- TailwindCSS
- Vite

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
