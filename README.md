# Persona Chat — Scaler AI Mentors

A persona-based AI chatbot that lets you have real conversations with three Scaler/InterviewBit personalities — **Anshuman Singh**, **Kshitij Mishra**, and **Abhimanyu Saxena**. Each persona has a carefully crafted system prompt with few-shot examples, chain-of-thought reasoning, and personality constraints.

> **Live Demo**: [TODO: Add your deployed URL here]

## Screenshots

<!-- TODO: Add screenshots of your running app here -->

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| AI Model | Google Gemini 2.0 Flash |
| Styling | Vanilla CSS (Glassmorphism dark theme) |

## Features

- 🎭 **Three distinct personas** — each with unique communication styles
- 💬 **Full conversation history** — context-aware multi-turn conversations
- ⚡ **Animated typing indicator** — visual feedback during API calls
- 💡 **Suggestion chips** — quick-start questions per persona
- 🔄 **Persona switching** — resets conversation on switch
- 📱 **Fully responsive** — works on mobile and desktop
- ⚠️ **Graceful error handling** — user-friendly messages with retry
- 🎨 **Per-persona theming** — accent colors change with persona

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API key — get one at [Google AI Studio](https://aistudio.google.com/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/PersonalizedChatbot.git
cd PersonalizedChatbot
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

In a new terminal:

```bash
cd client
npm install
npm run dev
```

The app will open at `http://localhost:5173`.

### 4. (Optional) Configure for deployment

Create a `.env` file in the `client/` directory:

```
VITE_API_URL=https://your-deployed-backend-url.com
```

## Project Structure

```
PersonalizedChatbot/
├── client/                # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx        # Main chat component
│   │   ├── App.css        # Premium glassmorphism theme
│   │   ├── index.css      # Global reset & fonts
│   │   └── main.jsx       # React entry point
│   ├── index.html         # HTML with SEO meta tags
│   └── package.json
├── server/                # Express backend
│   ├── index.js           # API server with Gemini integration
│   ├── .env.example       # Environment variable template
│   └── package.json
├── prompts.md             # All three system prompts (annotated)
├── reflection.md          # 300–500 word reflection
├── README.md              # This file
└── .gitignore
```

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | `server/.env` | Your Google Gemini API key |
| `PORT` | `server/.env` | Server port (default: 5000) |
| `VITE_API_URL` | `client/.env` | Backend URL for production deployment |

## License

MIT
