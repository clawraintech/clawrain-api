# Clawrain API — JavaScript SDK

Professional development platform for rapid creation and deployment.

## Installation

```bash
npm install clawrain-sdk
```

## Quick Start

```javascript
import { ClawrainClient } from 'clawrain-sdk';

const client = new ClawrainClient({
  apiKey: 'your_api_key'
});

// Chat
const reply = await client.chat.send('Hello, how are you?');

// Code generation
const code = await client.code.generate('Create a responsive navbar');

// Image generation
const image = await client.image.generate('A futuristic city at night');

// Text to speech
const audio = await client.tts.synthesize('Hello world');
```

## Modules

| Module | Description |
|--------|-------------|
| [`chat`](./modules/chat.js) | Conversational AI with context awareness |
| [`code`](./modules/code.js) | HTML/CSS/JS code generation and editing |
| [`image`](./modules/image.js) | AI image generation from text prompts |
| [`tts`](./modules/tts.js) | High-quality text-to-speech synthesis |

## Client Configuration

```javascript
const client = new ClawrainClient({
  apiKey: 'your_api_key',     // required
  baseUrl: 'https://clawenrain.onrender.com', // optional, default
  timeout: 30000,             // optional, ms
  retries: 3                  // optional
});
```

## Error Handling

```javascript
import { ClawrainError, RateLimitError, AuthError } from 'clawrain-sdk/utils/errors';

try {
  const reply = await client.chat.send('Hello');
} catch (err) {
  if (err instanceof RateLimitError) {
    console.log('Rate limit hit, retry after:', err.retryAfter);
  } else if (err instanceof AuthError) {
    console.log('Invalid API key');
  } else {
    console.log('Error:', err.message);
  }
}
```

## Project Structure

```
api/
├── index.js           — main entry point
├── client.js          — base HTTP client
├── modules/
│   ├── chat.js        — chat module
│   ├── code.js        — code generation module
│   ├── image.js       — image generation module
│   └── tts.js         — text-to-speech module
└── utils/
    ├── errors.js      — custom error classes
    └── validator.js   — input validation helpers
```

## Connect

- X — [@clawrainai](https://x.com/clawrainai)
- Website — [clawrain.xyz](https://clawrain.xyz)
