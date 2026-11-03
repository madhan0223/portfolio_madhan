import { profileData } from '../data/profile';

/**
 * Storage key for user profile
 */
const STORAGE_KEY = 'portfolio_user_profile_v2';

/**
 * Default initial profile structure based on verified candidate data
 */
export const DEFAULT_PROFILE = {
  fullName: profileData.name || 'Madhan S',
  profilePhoto: '/images/profile/madhan.jpg',
  dob: '2005-09-02',
  gender: 'Male', // 'Male' | 'Female' | 'Other' | 'Prefer not to say'
  email: profileData.email || 'madhansridharmd@gmail.com',
  phone: profileData.phone || '+91 8248358213',
  permanentAddress: '2/331, North Street, Vadasiruvallur, Sankarapuram (TK), Kallakurichi (DT) - 606402',
  currentAddress: 'No.394, 10th Street, MMDA Colony, 1st Main Road, Maduravoyal, Chennai - 600095',
  sameAsPermanent: false,
  updatedAt: new Date().toISOString()
};

export const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Other',
  'Prefer not to say'
];

/**
 * Validation rules for profile form
 */
export const validateProfile = (data) => {
  const errors = {};

  // Full Name validation
  if (!data.fullName || !data.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  // Date of Birth validation
  if (!data.dob) {
    errors.dob = 'Date of birth is required';
  } else {
    const dobDate = new Date(data.dob);
    const today = new Date();
    if (isNaN(dobDate.getTime())) {
      errors.dob = 'Invalid date format';
    } else if (dobDate >= today) {
      errors.dob = 'Date of birth must be in the past';
    }
  }

  // Gender validation
  if (!data.gender || !GENDER_OPTIONS.includes(data.gender)) {
    errors.gender = 'Please select a valid gender option';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !data.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation (optional, but validate format if entered)
  if (data.phone && data.phone.trim()) {
    const phoneClean = data.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!/^\d{7,15}$/.test(phoneClean)) {
      errors.phone = 'Please enter a valid phone number (7-15 digits)';
    }
  }

  // Permanent Address validation
  if (!data.permanentAddress || !data.permanentAddress.trim()) {
    errors.permanentAddress = 'Permanent address is required';
  } else if (data.permanentAddress.trim().length < 5) {
    errors.permanentAddress = 'Please enter a complete address (min 5 characters)';
  }

  // Current Address validation (if not same as permanent)
  if (!data.sameAsPermanent) {
    if (!data.currentAddress || !data.currentAddress.trim()) {
      errors.currentAddress = 'Current address is required when different from permanent';
    } else if (data.currentAddress.trim().length < 5) {
      errors.currentAddress = 'Please enter a complete current address (min 5 characters)';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Storage service abstraction
 * Separates local client-side storage from production API adapter
 */
export const profileStorage = {
  /**
   * Load profile from local storage, falling back to default profile
   */
  loadProfile: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_PROFILE,
          ...parsed
        };
      }
    } catch (err) {
      console.warn('Failed to load profile from localStorage:', err);
    }
    return { ...DEFAULT_PROFILE };
  },

  /**
   * Save profile to local storage (production contract: returns Promise)
   */
  saveProfile: async (profileDataToSave) => {
    const validation = validateProfile(profileDataToSave);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      throw new Error(firstError || 'Profile validation failed');
    }

    const payload = {
      ...profileDataToSave,
      currentAddress: profileDataToSave.sameAsPermanent 
        ? profileDataToSave.permanentAddress 
        : profileDataToSave.currentAddress,
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return payload;
    } catch (err) {
      console.error('Failed to save profile to localStorage:', err);
      // Handle quota exceeded gracefully
      if (err.name === 'QuotaExceededError') {
        throw new Error('Storage limit reached. Try using a smaller profile photo.');
      }
      throw new Error('Failed to save profile. Please try again.');
    }
  },

  /**
   * Reset profile back to initial defaults
   */
  resetProfile: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to clear profile storage:', err);
    }
    return { ...DEFAULT_PROFILE };
  }
};
