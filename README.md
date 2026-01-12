# DeutschBuddy

A production-ready AI-powered German language learning chat application built with Next.js 14 (App Router), TypeScript, and OpenAI.

## Features

- **Interactive Chat UI**: Clean, modern chat interface with real-time streaming responses
- **Personalized Learning**: Adjustable CEFR level (A1-C2), learning goals, and correction preferences
- **Smart Settings**:
  - CEFR level selection (A1-C2)
  - Custom learning goals
  - Correction strictness (lenient, moderate, strict)
  - "Correct Me" toggle for error correction
  - "German Only" mode for immersive learning
- **Quick Actions**: Pre-defined German phrases for easy interaction
- **Lesson Summary**: AI-generated summaries with vocabulary, mistakes, and next steps
- **Persistent Storage**: Chat history and settings saved in localStorage
- **Streaming Responses**: Real-time Server-Sent Events for smooth conversation flow

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (GPT-4o-mini)
- **Storage**: localStorage (client-side)

## Prerequisites

- Node.js 18+ installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

## Getting Started

### 1. Clone and Install

```bash
# Navigate to project directory
cd tutor_gpt

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**Important**: Never commit your `.env.local` file. It's already in `.gitignore`.

### 3. Run Locally

```bash
# Development mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
4. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and create a new site
3. Connect your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
6. Deploy

**Note**: For Netlify, you may need to add the `@netlify/plugin-nextjs` plugin.

## Project Structure

```
tutor_gpt/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # OpenAI API route with streaming
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main chat page
├── components/
│   └── SettingsDrawer.tsx        # Settings UI component
├── hooks/
│   └── useLocalStorage.ts        # localStorage hook
├── types/
│   └── index.ts                  # TypeScript type definitions
├── .env.example                  # Environment variable template
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## How It Works

### Architecture

1. **Client-Side**: React components manage UI state and localStorage
2. **API Route**: `/api/chat` handles OpenAI requests server-side (keeps API key secure)
3. **Streaming**: Server-Sent Events deliver AI responses in real-time
4. **System Prompt**: Dynamic prompt construction based on user settings

### Key Files

- **app/page.tsx**: Main chat interface with message list, composer, and quick actions
- **app/api/chat/route.ts**: Server-side OpenAI API integration with streaming
- **components/SettingsDrawer.tsx**: Settings panel with all user preferences
- **hooks/useLocalStorage.ts**: Persistent storage for chat history and settings
- **types/index.ts**: TypeScript interfaces for type safety

### API Security

- OpenAI API key is **only** read server-side from `process.env.OPENAI_API_KEY`
- Never exposed to the client
- All API calls go through `/api/chat` route

## Usage

1. **Start Chatting**: Type a message in German or English
2. **Quick Actions**: Click pre-defined phrases for common questions
3. **Adjust Settings**: Click "Settings" to customize your learning experience
4. **Get Summary**: Click "Lesson Summary" to review what you've learned
5. **Clear History**: Click "Clear" to start a fresh conversation

## Customization

### Change AI Model

Edit `app/api/chat/route.ts`:

```typescript
const stream = await openai.chat.completions.create({
  model: 'gpt-4o', // Change to gpt-4, gpt-4-turbo, etc.
  // ...
});
```

### Add More Quick Actions

Edit `app/page.tsx`:

```typescript
const quickActions = [
  'Wie geht es dir?',
  'Kannst du das erklären?',
  'Your new phrase here',
];
```

### Modify System Prompt

Edit the `buildSystemPrompt` function in `app/api/chat/route.ts`.

## Troubleshooting

### "OpenAI API key not configured" error
- Ensure `.env.local` exists with `OPENAI_API_KEY=sk-...`
- Restart the dev server after adding environment variables

### Messages not persisting
- Check browser console for localStorage errors
- Ensure cookies/localStorage aren't blocked

### Streaming not working
- Check network tab for `/api/chat` response
- Verify OpenAI API key has sufficient credits

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

Built with by Anthropic Claude Code
