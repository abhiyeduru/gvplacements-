// Payment settings service
// Manages fixed payment amounts set by admin

import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface PaymentSettings {
  amounts: number[];
  selectedAmount: number;
  updatedAt: string;
}

const SETTINGS_DOC = 'payment_settings';
const SETTINGS_COLLECTION = 'admin_settings';

export const paymentSettingsService = {
  // Get current payment settings
  async getSettings(): Promise<PaymentSettings | null> {
    try {
      if (!db) return null;
      const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as PaymentSettings) : null;
    } catch (error) {
      console.error('Error fetching payment settings:', error);
      return null;
    }
  },

  // Update payment settings
  async updateSettings(settings: PaymentSettings): Promise<boolean> {
    try {
      if (!db) return false;
      const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC);
      await setDoc(docRef, {
        ...settings,
        updatedAt: new Date().toISOString(),
      });
      return true;
    } catch (error) {
      console.error('Error updating payment settings:', error);
      return false;
    }
  },

  // Add new amount to list
  async addAmount(amount: number): Promise<boolean> {
    try {
      const settings = await this.getSettings();
      if (!settings) {
        return this.updateSettings({
          amounts: [amount],
          selectedAmount: amount,
          updatedAt: new Date().toISOString(),
        });
      }

      if (!settings.amounts.includes(amount)) {
        settings.amounts.push(amount);
        settings.amounts.sort((a, b) => a - b);
      }

      return this.updateSettings(settings);
    } catch (error) {
      console.error('Error adding amount:', error);
      return false;
    }
  },

  // Remove amount from list
  async removeAmount(amount: number): Promise<boolean> {
    try {
      const settings = await this.getSettings();
      if (!settings) return false;

      settings.amounts = settings.amounts.filter(a => a !== amount);
      if (settings.selectedAmount === amount && settings.amounts.length > 0) {
        settings.selectedAmount = settings.amounts[0];
      }

      return this.updateSettings(settings);
    } catch (error) {
      console.error('Error removing amount:', error);
      return false;
    }
  },

  // Set selected amount
  async setSelectedAmount(amount: number): Promise<boolean> {
    try {
      const settings = await this.getSettings();
      if (!settings) return false;

      settings.selectedAmount = amount;
      return this.updateSettings(settings);
    } catch (error) {
      console.error('Error setting selected amount:', error);
      return false;
    }
  },

  // Get selected amount
  async getSelectedAmount(): Promise<number> {
    try {
      const settings = await this.getSettings();
      return settings?.selectedAmount || 2000;
    } catch (error) {
      console.error('Error getting selected amount:', error);
      return 2000;
    }
  },
};
