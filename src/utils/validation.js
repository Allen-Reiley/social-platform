/**
 * Richfield Connect — Academic Social Engagement Platform
 * Utility functions for form validation, sanitization, and date formatting.
 */

// South African & international institutional email format validator
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  // Requires username, @ symbol, domain name, and valid TLD (e.g., .ac.za, .com, .edu)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

// Student Number: strictly numeric characters and at least 6 digits long
export const validateStudentNumber = (studentNumber) => {
  if (!studentNumber || typeof studentNumber !== 'string') return false;
  const studentNumRegex = /^\d{6,}$/;
  return studentNumRegex.test(studentNumber.trim());
};

// Full Name: non-empty string with at least 2 characters
export const validateFullName = (name) => {
  if (!name || typeof name !== 'string') return false;
  return name.trim().length >= 2;
};

// Campus: must be selected from the valid list
export const CAMPUS_OPTIONS = [
  'Midrand Main Campus',
  'Durban Musgrave Campus',
  'Cape Town Campus',
  'Pretoria Campus',
  'Braamfontein Campus',
  'Polokwane Campus',
];

export const validateCampus = (campus) => {
  return CAMPUS_OPTIONS.includes(campus);
};

// Password: minimum 8 characters in length
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  return password.length >= 8;
};

// Confirm Password: must exactly match the password field
export const validateConfirmPassword = (password, confirmPassword) => {
  return Boolean(password && confirmPassword && password === confirmPassword);
};

// Interests: minimum 5 options available, at least 1 must be checked
export const AVAILABLE_INTERESTS = [
  'Software Engineering',
  'Web Development',
  'Data Science & AI',
  'Cybersecurity & Networks',
  'Cloud Computing',
  'Database Systems',
  'Mobile App Development',
];

export const validateInterests = (interests) => {
  return Array.isArray(interests) && interests.length >= 1;
};

// Short Bio: must not be empty and must contain at least 20 characters
export const validateBio = (bio) => {
  if (!bio || typeof bio !== 'string') return false;
  return bio.trim().length >= 20;
};

// Terms & Conditions: must be checked (boolean true)
export const validateTerms = (terms) => {
  return terms === true;
};

/**
 * Validates a single field by key and value.
 * Returns an error string or empty string if valid.
 */
export const validateField = (fieldName, value, formValues = {}) => {
  switch (fieldName) {
    case 'fullName':
      if (!value || !value.trim()) return 'Full Name is required.';
      if (value.trim().length < 2) return 'Full Name must be at least 2 characters long.';
      return '';

    case 'studentNumber':
      if (!value || !value.trim()) return 'Student Number is required.';
      if (!/^\d+$/.test(value.trim())) return 'Student Number must contain only numeric digits.';
      if (value.trim().length < 6) return 'Student Number must be at least 6 digits long.';
      return '';

    case 'campus':
      if (!value) return 'Please select a registered campus from the dropdown.';
      if (!CAMPUS_OPTIONS.includes(value)) return 'Please select a valid campus.';
      return '';

    case 'email':
      if (!value || !value.trim()) return 'Email address is required.';
      if (!validateEmail(value)) return 'Please enter a valid email address (e.g., student@richfield.ac.za).';
      return '';

    case 'password':
      if (!value) return 'Password is required.';
      if (value.length < 8) return 'Password must be at least 8 characters in length.';
      return '';

    case 'confirmPassword':
      if (!value) return 'Please confirm your password.';
      if (value !== formValues.password) return 'Passwords do not match.';
      return '';

    case 'interests':
      if (!Array.isArray(value) || value.length < 1) return 'Please select at least one academic interest.';
      return '';

    case 'bio':
      if (!value || !value.trim()) return 'Short bio is required.';
      if (value.trim().length < 20) return `Short bio must be at least 20 characters (currently ${value.trim().length}).`;
      return '';

    case 'termsAccepted':
      if (!value) return 'You must accept the Terms and Conditions to register.';
      return '';

    default:
      return '';
  }
};

/**
 * Format a Date object or timestamp into a human-readable string.
 * Example: "20 Sep 2026, 14:50"
 */
export const formatTimestamp = (date = new Date()) => {
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return d.toLocaleString('en-ZA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

/**
 * Generate initials from a student's full name.
 * e.g., "Allen Reiley" -> "AR", "Thabo" -> "T"
 */
export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};
