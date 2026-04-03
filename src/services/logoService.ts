// Logo management service
// Stores logo URL in localStorage and Firestore

export const logoService = {
  // Store logo URL
  setLogoUrl(url: string): void {
    localStorage.setItem('company_logo_url', url);
  },

  // Get logo URL
  getLogoUrl(): string | null {
    return localStorage.getItem('company_logo_url');
  },

  // Clear logo
  clearLogoUrl(): void {
    localStorage.removeItem('company_logo_url');
  },

  // Check if logo exists
  hasLogo(): boolean {
    return !!localStorage.getItem('company_logo_url');
  },
};
