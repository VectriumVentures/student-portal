import { VALIDATION_RULES } from '../constants';

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {object} - Validation result
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: VALIDATION_RULES.email.required };
  }
  
  if (!VALIDATION_RULES.email.pattern.value.test(email)) {
    return { isValid: false, message: VALIDATION_RULES.email.pattern.message };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: VALIDATION_RULES.password.required };
  }
  
  if (password.length < VALIDATION_RULES.password.minLength.value) {
    return { isValid: false, message: VALIDATION_RULES.password.minLength.message };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate name format
 * @param {string} name - Name to validate
 * @returns {object} - Validation result
 */
export const validateName = (name) => {
  if (!name || !name.trim()) {
    return { isValid: false, message: VALIDATION_RULES.name.required };
  }
  
  if (name.trim().length < VALIDATION_RULES.name.minLength.value) {
    return { isValid: false, message: VALIDATION_RULES.name.minLength.message };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate phone number
 * @param {string} phone - Phone to validate
 * @returns {object} - Validation result
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, message: VALIDATION_RULES.phone.required };
  }
  
  if (!VALIDATION_RULES.phone.pattern.value.test(phone)) {
    return { isValid: false, message: VALIDATION_RULES.phone.pattern.message };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate password confirmation
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {object} - Validation result
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {object} - Validation result
 */
export const validateRequired = (value, fieldName) => {
  if (!value || !value.toString().trim()) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate registration form
 * @param {object} formData - Form data to validate
 * @returns {object} - Validation result with errors
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  // Validate name
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }
  
  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }
  
  // Validate phone
  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.message;
  }
  
  // Validate password
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }
  
  // Validate password confirmation
  const confirmPasswordValidation = validatePasswordConfirmation(
    formData.password, 
    formData.confirmPassword
  );
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.message;
  }
  
  // Role-specific validation
  if (formData.role === 'student') {
    const studentIdValidation = validateRequired(formData.studentId, 'Student ID');
    if (!studentIdValidation.isValid) {
      errors.studentId = studentIdValidation.message;
    }
  }
  
  if (formData.role === 'counsellor') {
    const organizationValidation = validateRequired(formData.organization, 'Organization');
    if (!organizationValidation.isValid) {
      errors.organization = organizationValidation.message;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate login form
 * @param {object} formData - Form data to validate
 * @returns {object} - Validation result with errors
 */
export const validateLoginForm = (formData) => {
  const errors = {};
  
  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }
  
  // Validate password
  if (!formData.password) {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @param {object} options - Validation options
 * @returns {object} - Validation result
 */
export const validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
    required = true
  } = options;
  
  if (!file) {
    if (required) {
      return { isValid: false, message: 'Please select a file' };
    }
    return { isValid: true, message: '' };
  }
  
  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return { isValid: false, message: `File size must be less than ${maxSizeMB}MB` };
  }
  
  // Check file type
  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!allowedTypes.includes(fileExtension)) {
    return { 
      isValid: false, 
      message: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Sanitize input string
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {object} - Validation result
 */
export const validateURL = (url) => {
  if (!url) {
    return { isValid: false, message: 'URL is required' };
  }
  
  try {
    new URL(url);
    return { isValid: true, message: '' };
  } catch {
    return { isValid: false, message: 'Please enter a valid URL' };
  }
};
