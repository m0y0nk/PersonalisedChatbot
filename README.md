# Persona Chat — Scaler AI Mentors

A persona-based AI chatbot that lets you have real conversations with three Scaler/InterviewBit personalities — **Anshuman Singh**, **Kshitij Mishra**, and **Abhimanyu Saxena**. Each persona has a carefully crafted system prompt with few-shot examples, chain-of-thought reasoning, and personality constraints.

> **Live Demo**: [https://personalised-chatbot-ashen.vercel.app](https://personalised-chatbot-ashen.vercel.app)
> **Backend API**: [https://personalisedchatbot.onrender.com](https://personalisedchatbot.onrender.com)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| AI Model | OpenRouter (Auto-routing to best free models) |
| Styling | Vanilla CSS (Glassmorphism dark theme) |
| Deployment | Vercel (Frontend) + Render (Backend) |

## Features

- 🎭 **Three distinct personas** — each with unique communication styles and pedagogical approaches.
- 💬 **Full conversation history** — context-aware multi-turn conversations powered by OpenRouter.
- ⚡ **Animated typing indicator** — visual feedback during API calls for a premium feel.
- 💡 **Suggestion chips** — quick-start questions tailored to each persona's expertise.
- 🔄 **Persona switching** — seamlessly switch between mentors; conversation resets on switch.
- 📱 **Fully responsive** — optimized for mobile and desktop with a sleek dark-mode UI.
- ⚠️ **Robust error handling** — user-friendly messages for rate limits and server availability.
- 🎨 **Per-persona theming** — UI accent colors and themes dynamically change based on the selected persona.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- An OpenRouter API key — get one at [OpenRouter.ai](https://openrouter.ai/)

### 1. Clone the repository

```bash
git clone https://github.com/m0y0nk/PersonalisedChatbot.git
cd PersonalisedChatbot
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` and add your OpenRouter API key:

```
OPENROUTER_API_KEY=your_actual_api_key_here
PORT=3001
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

## Project Structure

```
PersonalisedChatbot/
├── client/                # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx        # Main chat component (OpenRouter integration)
│   │   ├── App.css        # Premium glassmorphism theme
│   │   └── main.jsx       # React entry point
│   ├── index.html         # HTML with SEO meta tags
│   └── package.json
├── server/                # Express backend
│   ├── index.js           # API server with OpenRouter SDK
│   ├── .env.example       # Environment variable template
│   └── package.json
├── prompts.md             # All three system prompts (annotated)
├── README.md              # This file
└── .gitignore
```

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | `server/.env` | Your OpenRouter API key |
| `PORT` | `server/.env` | Server port (default: 3001) |

## License

MIT
