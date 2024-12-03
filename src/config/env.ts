interface Env {
  WEBHOOK_API_KEY: string;
  WEBHOOK_URL: string;
}

export const env: Env = {
  WEBHOOK_API_KEY: import.meta.env.VITE_WEBHOOK_API_KEY || '',
  WEBHOOK_URL: import.meta.env.VITE_WEBHOOK_URL || '',
};