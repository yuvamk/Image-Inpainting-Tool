# Image Inpainting Tool

A powerful web-based image editing tool built with React and Fabric.js that allows users to create masks on images for inpainting purposes.

## Features

- 🎨 Draw masks with customizable brush sizes and shapes
- 🔄 Undo/Redo functionality
- 🧹 Eraser tool
- 💾 Export masked images
- 📱 Responsive design
- 🖼️ Real-time preview
- 🎯 Precise brush control

## Technologies Used

- **React**: Frontend framework
- **TypeScript**: Type safety and better developer experience
- **Fabric.js**: Canvas manipulation and drawing
- **Framer Motion**: Smooth animations
- **Tailwind CSS**: Styling
- **Vite**: Build tool and development server

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
├── constants/          # Constant values and configurations
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
    ├── brush/         # Brush-related utilities
    ├── canvas/        # Canvas manipulation utilities
    └── history/       # Undo/redo functionality
```

## Technical Challenges and Solutions

### Challenge 1: Canvas State Management
**Problem**: Managing canvas state for undo/redo functionality while preserving the background image.
**Solution**: Implemented a custom history system that serializes canvas state and handles background image separately.

### Challenge 2: Custom Brush Implementation
**Problem**: Creating a square brush that works seamlessly with the canvas.
**Solution**: Extended Fabric.js's BaseBrush class to create a custom SquareBrush implementation.

### Challenge 3: Real-time Preview
**Problem**: Generating and updating preview in real-time without affecting performance.
**Solution**: Optimized canvas event handling and implemented efficient canvas-to-image conversion.

### Challenge 4: Eraser Functionality
**Problem**: Implementing eraser that works with both brush types.
**Solution**: Used composite operations to achieve proper erasing behavior while maintaining brush settings.

## Best Practices

- **Component Organization**: Each component is focused on a single responsibility
- **Custom Hooks**: Complex logic is extracted into reusable hooks
- **Type Safety**: Comprehensive TypeScript types for better maintainability
- **Utils Separation**: Utility functions are organized by domain
- **Constants**: Configuration values are centralized
- **Error Handling**: Robust error handling for canvas operations
- **Performance**: Optimized canvas operations and state updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.# Image-Inpainting-Tool
