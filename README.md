# Skip Selector - WeWantWaste Redesign

A modern, responsive React TypeScript application for selecting skip sizes. This is a complete redesign of the WeWantWaste skip selection page with improved UX/UI, mobile responsiveness, and clean code architecture.

## 🚀 Features

- **Modern UI/UX**: Clean, card-based design with smooth animations and hover effects
- **Fully Responsive**: Optimized for both desktop and mobile devices
- **Progress Tracking**: Visual progress bar showing current step in the booking process
- **Real-time Data**: Fetches live skip data from WeWantWaste API
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Loading States**: Elegant loading spinners and error handling
- **TypeScript**: Fully typed for better development experience and code reliability

## 🛠 Technologies Used

- **React 18** with TypeScript
- **CSS3** with modern features (Grid, Flexbox, CSS Variables)
- **Fetch API** for data retrieval
- **CSS Animations** for smooth interactions

## 📱 Responsive Design

The application is designed to work seamlessly across all devices:

- **Desktop**: Multi-column grid layout with hover effects
- **Mobile**: Single-column layout with touch-friendly interactions

## 🎨 Design Features

### Skip Cards

- Custom CSS illustrations of skip containers
- Feature badges (Road Placement, Heavy Waste OK)
- Price calculation with VAT included
- Interactive selection states
- Smooth hover animations

### Progress Bar

- Visual step indicator
- Current step highlighting
- Completed step tracking
- Mobile-optimized layout

### Action Bar

- Sticky positioning for easy access
- Selection summary
- Back/Continue navigation
- Disabled state handling

## 🏗 Project Structure

```
src/
├── components/
│   ├── SkipCard.tsx          # Individual skip selection card
│   ├── SkipCard.css          # Skip card styling
│   ├── ProgressBar.tsx       # Step progress indicator
│   ├── ProgressBar.css       # Progress bar styling
│   ├── SkipSelector.tsx      # Main container component
│   └── SkipSelector.css      # Main layout styling
├── types/
│   └── index.ts              # TypeScript interfaces
├── App.tsx                   # Root application component
├── App.css                   # Global app styling
├── index.tsx                 # Application entry point
└── index.css                 # Global CSS reset and base styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/NicoAndriamalala/skip-selector.git
cd skip-selector
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Build for Production

```bash
npm run build
```

## 🔧 API Integration

The application fetches skip data from:

```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

### Data Structure

Each skip object contains:

- `id`: Unique identifier
- `size`: Skip size in yards
- `hire_period_days`: Rental duration
- `price_before_vat`: Base price
- `vat`: VAT percentage
- `allowed_on_road`: Road placement permission
- `allows_heavy_waste`: Heavy waste acceptance

## 🎯 Key Improvements Over Original

1. **Modern Design Language**: Clean, minimal interface with consistent spacing
2. **Better Information Hierarchy**: Clear pricing, features, and selection states
3. **Enhanced Mobile Experience**: Touch-friendly interactions and optimized layouts
4. **Improved Accessibility**: Proper semantic HTML, ARIA labels, and keyboard navigation
5. **Performance Optimized**: Efficient rendering and minimal re-renders
6. **Error Handling**: Graceful error states with retry functionality
7. **Loading States**: Smooth loading transitions

## 🔄 State Management

The application uses React's built-in state management:

- `useState` for component state
- `useEffect` for API calls and side effects
- Proper state lifting for shared data

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📦 Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (not recommended)

## 🌟 Best Practices Implemented

- **Component Composition**: Modular, reusable components
- **TypeScript**: Full type safety throughout the application
- **CSS Organization**: Separate CSS files for each component
- **Semantic HTML**: Proper use of HTML5 semantic elements
- **Performance**: Optimized re-renders and efficient DOM updates
- **Accessibility**: WCAG compliance with proper ARIA usage

## 🎨 Customization

The design system uses CSS custom properties for easy theming:

- Color palette defined in CSS variables
- Consistent spacing scale
- Responsive breakpoints
- Animation timing functions

# Sandbox URL

https://codesandbox.io/p/github/NicoAndriamalala/skip-selector/main?import=true
