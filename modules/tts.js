import { validate } from '../utils/validator.js';

const MAX_CHARS = 500;

export class TtsModule {
  /** @param {import('../client.js').ClawrainClient} client */
  constructor(client) {
    this._client = client;
  }

  /**
   * Convert text to speech and return a Blob of audio/mpeg.
   * @param {string} text
   * @param {object} [options]
   * @param {number} [options.volume=1.0] — client-side only hint (0.0–1.0)
   * @returns {Promise<Blob>}
   */
  async synthesize(text, { volume = 1.0 } = {}) {
    validate({ text }, { text: 'string:required' });

    if (text.length > MAX_CHARS) {
      throw new RangeError(`Text exceeds maximum length of ${MAX_CHARS} characters`);
    }

    const res = await fetch(`${this._client.baseUrl}/api/tts`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this._client.apiKey}`,
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error ?? `TTS failed: HTTP ${res.status}`);
    }

    return res.blob();
  }

  /**
   * Synthesize text and play it in the browser using Web Audio API.
   * @param {string} text
   * @param {object} [options]
   * @param {number} [options.volume=1.0]
   * @returns {Promise<void>}
   */
  async play(text, { volume = 1.0 } = {}) {
    const blob = await this.synthesize(text, { volume });
    const url  = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.volume = Math.min(1, Math.max(0, volume));

    return new Promise((resolve, reject) => {
      audio.onended = () => { URL.revokeObjectURL(url); resolve(); };
      audio.onerror = reject;
      audio.play();
    });
  }
}
