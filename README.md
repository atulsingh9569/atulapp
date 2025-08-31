
# Technical Assessment Project: Voice Command Shopping Assistant

## Overview
This project is a voice-based shopping list manager with smart suggestions, built for the Software Engineering position technical assessment. It is a modern web app using React, Vite, Tailwind CSS, and Firebase Hosting. Voice recognition is handled via the browser's SpeechRecognition API (with Google Cloud Speech-to-Text integration possible).

## Features
### 1. Voice Input
- **Voice Command Recognition:** Add items using voice ("Add milk", "I need apples").
- **NLP:** Flexible phrase handling ("I want to buy bananas", "Add bananas to my list").
- **Multilingual Support:** Easily extendable for multiple languages (currently English).

### 2. Smart Suggestions
- **Product Recommendations:** Suggests items based on history and preferences.
- **Seasonal Recommendations:** Suggests in-season items.
- **Substitutes:** Offers alternatives if a product is unavailable.

### 3. Shopping List Management
- **Add/Remove/Modify Items:** By voice or text ("Remove milk from my list").
- **Categorize Items:** Auto-categorizes (dairy, produce, snacks, etc.).
- **Quantity Management:** Specify quantities by voice ("Add 2 bottles of water").

### 4. Voice-Activated Search
- **Item Search:** Search for items by voice, including brand, size, or price ("Find me organic apples").
- **Price Range Filtering:** Voice-based filter ("Find toothpaste under $5").

### 5. UI/UX
- **Minimalist Interface:** Simple, clean shopping list display.
- **Visual Feedback:** Real-time display of recognized items and actions.
- **Mobile/Voice-Only Optimized:** Responsive and touch-friendly.

### 6. Hosting
- **Firebase Hosting:** Reliable, fast deployment.

## Technical Approach (200 words max)
The app uses React for UI, Vite for fast development, and Tailwind CSS for styling. Voice commands are processed using the browser’s SpeechRecognition API, with NLP logic to parse varied phrases and extract item names, quantities, and actions (add/remove/search). Smart suggestions are generated based on season and simulated shopping history, with easy extension for real user data. Items are auto-categorized and can be managed by voice or text. The UI is minimalist, with real-time feedback and mobile optimization. For deployment, Firebase Hosting is used for reliability and speed. The code is modular, clean, and includes error handling and loading states for a smooth user experience. Multilingual support and Google Cloud Speech-to-Text integration can be added as needed.

## Getting Started
### Prerequisites
- Node.js (v18+ recommended)
- npm
- Firebase CLI (`npm install -g firebase-tools`)

### Installation
1. Clone the repository:
  ```
  git clone https://github.com/yourusername/atul-app.git
  cd atul-app/atul-app
  ```
2. Install dependencies:
  ```
  npm install
  ```

### Development
Start the development server:
```
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build & Deploy
1. Build for production:
  ```
  npm run build
  ```
2. Deploy to Firebase Hosting:
  ```
  firebase deploy
  ```

## Deliverables
1. Working application URL (Firebase Hosting)
2. GitHub repository with source code and README
3. Brief write-up of approach (see above)

## License
MIT
