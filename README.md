# Kanban Board App

Sample application to try coding with claude.ai. A Trello-like kanban board application built with Next.js, React, and TypeScript.

## Features

- Create and manage multiple boards
- Add, edit, and delete columns
- Create, edit, delete, and drag-and-drop cards between columns
- Responsive design

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) - Drag and drop functionality
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Project Structure

The project follows the structure recommended in the [Bulletproof React](https://github.com/alan2207/bulletproof-react) guide:

- `/src/components` - Reusable UI components
- `/src/features` - Feature-based modules
- `/src/stores` - Global state management
- `/src/types` - TypeScript type definitions
- `/src/app` - Next.js app router pages

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
npm start
```

## Future Enhancements

- User authentication
- Server-side persistence with a database
- Card attachments and comments
- Team collaboration features
- Custom labels and due dates
