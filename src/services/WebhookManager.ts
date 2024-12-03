export class WebhookManager {
  private endpoints: Map<string, string> = new Map();
  private headers: Headers;

  constructor(apiKey: string) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    });
  }

  registerEndpoint(name: string, url: string): void {
    this.endpoints.set(name, url);
  }

  async trigger(name: string, payload: unknown): Promise<Response> {
    const endpoint = this.endpoints.get(name);
    if (!endpoint) {
      throw new Error(`Webhook endpoint "${name}" not found`);
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      console.error('Webhook trigger error:', error);
      throw error;
    }
  }
}