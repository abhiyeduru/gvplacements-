// API Client for backend communication
// Uses VITE_API_URL environment variable

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = {
  /**
   * Health check - verify backend is running
   */
  async healthCheck() {
    try {
      const response = await fetch(`${API_URL}/api/health`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  /**
   * Send email notification
   */
  async sendEmail(to: string, subject: string, html: string) {
    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, html }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Send email failed:', error);
      throw error;
    }
  },

  /**
   * Send WhatsApp notification
   */
  async sendWhatsApp(phone: string, message: string) {
    try {
      const response = await fetch(`${API_URL}/api/send-whatsapp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, message }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Send WhatsApp failed:', error);
      throw error;
    }
  },
};

export default apiClient;
