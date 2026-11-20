import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {
  CAMPUS_OPTIONS,
  AVAILABLE_INTERESTS,
  validateField,
  formatTimestamp,
} from '../utils/validation';
import ProfilePreview from './ProfilePreview';
import styles from './SignUpForm.module.css';

/**
 * SignUpForm Component
 * Fully controlled form managing registration state with useState.
 * Implements onBlur real-time validation, inline error feedback,
 * and passes live state directly down to ProfilePreview as props.
 */
function SignUpForm() {
  const navigate = useNavigate();
  const { registerUser } = useAppContext();

  // Controlled form state
  const [formData, setFormData] = useState({
    fullName: '',
    studentNumber: '',
    campus: '',
    email: '',
    password: '',
    confirmPassword: '',
    interests: [],
    bio: '',
    termsAccepted: false,
  });

  // Track field blur states to avoid premature errors before interaction
  const [touched, setTouched] = useState({});

  // Inline error messages map
  const [errors, setErrors] = useState({});

  /**
   * Handle text, select, and single checkbox inputs
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const updatedFormData = {
      ...formData,
      [name]: fieldValue,
    };

    setFormData(updatedFormData);

    // Auto-clear error if field now satisfies its validation rule
    if (errors[name]) {
      const errorMsg = validateField(name, fieldValue, updatedFormData);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMsg,
      }));
    }
  };

  /**
   * Handle multi-select interests checkboxes
   */
  const handleInterestToggle = (interest) => {
    const isSelected = formData.interests.includes(interest);
    const updatedInterests = isSelected
      ? formData.interests.filter((item) => item !== interest)
      : [...formData.interests, interest];

    const updatedFormData = {
      ...formData,
      interests: updatedInterests,
    };

    setFormData(updatedFormData);

    // Auto-clear error if valid
    if (errors.interests) {
      const errorMsg = validateField('interests', updatedInterests, updatedFormData);
      setErrors((prevErrors) => ({
        ...prevErrors,
        interests: errorMsg,
      }));
    }
  };

  /**
   * Trigger real-time validation on field blur (onBlur event)
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const errorMsg = validateField(name, formData[name], formData);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  /**
   * Handle form submission
   * Intercepts default submit, runs comprehensive validation, persists to localStorage,
   * updates global state, and navigates programmatically to /profile.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Suppress browser default submission behavior

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const validationErrors = {};
    Object.keys(formData).forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName], formData);
      if (error) {
        validationErrors[fieldName] = error;
      }
    });

    setErrors(validationErrors);

    // If there are validation errors, halt submission
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Construct persistent user profile object
    const userProfile = {
      fullName: formData.fullName.trim(),
      studentNumber: formData.studentNumber.trim(),
      campus: formData.campus,
      email: formData.email.trim(),
      interests: [...formData.interests],
      bio: formData.bio.trim(),
      registeredAt: formatTimestamp(new Date()),
    };

    // 1. Dispatch to global context state
    registerUser(userProfile);

    // 2. Persist directly to localStorage
    try {
      localStorage.setItem('richfield_connect_user', JSON.stringify(userProfile));
    } catch (err) {
      console.error('Failed to save profile to localStorage:', err);
    }

    // 3. Programmatically navigate to /profile view
    navigate('/profile');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)', gap: '2.5rem', alignItems: 'start' }}>
      {/* Left Column: Controlled Registration Form */}
      <section className={styles.formWrapper} aria-labelledby="signup-form-title">
        <header className={styles.formHeader}>
          <h2 id="signup-form-title">Student Registration</h2>
          <p>Complete your academic profile to connect with peers and publish on the feed.</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className={styles.fieldGroup}>
            <label htmlFor="fullName" className={styles.label}>
              <span>
                Full Name <span className={styles.requiredStar}>*</span>
              </span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className={`${styles.input} ${touched.fullName && errors.fullName ? styles.inputError : ''}`}
              placeholder="e.g. Allen Reiley"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.fullName && errors.fullName && (
              <p className={styles.errorMessage} role="alert">
                ⚠ {errors.fullName}
              </p>
            )}
          </div>

          {/* Student Number & Campus in 2-column row */}
          <div className={styles.fieldRow}>
            {/* Student Number */}
            <div className={styles.fieldGroup}>
              <label htmlFor="studentNumber" className={styles.label}>
                <span>
                  Student Number <span className={styles.requiredStar}>*</span>
                </span>
              </label>
              <input
                id="studentNumber"
                name="studentNumber"
                type="text"
                className={`${styles.input} ${touched.studentNumber && errors.studentNumber ? styles.inputError : ''}`}
                placeholder="e.g. 202410889"
                value={formData.studentNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.studentNumber && errors.studentNumber && (
                <p className={styles.errorMessage} role="alert">
                  ⚠ {errors.studentNumber}
                </p>
              )}
            </div>

            {/* Campus Select */}
            <div className={styles.fieldGroup}>
              <label htmlFor="campus" className={styles.label}>
                <span>
                  Campus <span className={styles.requiredStar}>*</span>
                </span>
              </label>
              <select
                id="campus"
                name="campus"
                className={`${styles.select} ${touched.campus && errors.campus ? styles.selectError : ''}`}
                value={formData.campus}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <option value="">Select your campus...</option>
                {CAMPUS_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {touched.campus && errors.campus && (
                <p className={styles.errorMessage} role="alert">
                  ⚠ {errors.campus}
                </p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              <span>
                Email Address <span className={styles.requiredStar}>*</span>
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
              placeholder="e.g. allen@student.richfield.ac.za"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.email && errors.email && (
              <p className={styles.errorMessage} role="alert">
                ⚠ {errors.email}
              </p>
            )}
          </div>

          {/* Password & Confirm Password */}
          <div className={styles.fieldRow}>
            {/* Password */}
            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>
                <span>
                  Password <span className={styles.requiredStar}>*</span>
                </span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`${styles.input} ${touched.password && errors.password ? styles.inputError : ''}`}
                placeholder="Min 8 characters"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.password && errors.password && (
                <p className={styles.errorMessage} role="alert">
                  ⚠ {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className={styles.fieldGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                <span>
                  Confirm Password <span className={styles.requiredStar}>*</span>
                </span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={`${styles.input} ${touched.confirmPassword && errors.confirmPassword ? styles.inputError : ''}`}
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className={styles.errorMessage} role="alert">
                  ⚠ {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Academic Interests (Min 5 checkboxes) */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              <span>
                Academic Interests (Select at least one) <span className={styles.requiredStar}>*</span>
              </span>
            </label>
            <div className={styles.checkboxGrid}>
              {AVAILABLE_INTERESTS.map((interest) => {
                const checked = formData.interests.includes(interest);
                return (
                  <label
                    key={interest}
                    className={`${styles.checkboxLabel} ${checked ? styles.checkboxLabelActive : ''}`}
                  >
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={checked}
                      onChange={() => handleInterestToggle(interest)}
                    />
                    <span>{interest}</span>
                  </label>
                );
              })}
            </div>
            {errors.interests && (
              <p className={styles.errorMessage} role="alert">
                ⚠ {errors.interests}
              </p>
            )}
          </div>

          {/* Short Bio */}
          <div className={styles.fieldGroup}>
            <label htmlFor="bio" className={styles.label}>
              <span>
                Short Bio <span className={styles.requiredStar}>*</span>
              </span>
              <span className={styles.charCount}>
                {formData.bio.trim().length} / 20 min characters
              </span>
            </label>
            <textarea
              id="bio"
              name="bio"
              className={`${styles.textarea} ${touched.bio && errors.bio ? styles.textareaError : ''}`}
              placeholder="Tell your Richfield peers about your study focus, programming interests, and career ambitions (min 20 characters)..."
              value={formData.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            ></textarea>
            {touched.bio && errors.bio && (
              <p className={styles.errorMessage} role="alert">
                ⚠ {errors.bio}
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className={styles.termsWrapper}>
            <label className={styles.termsLabel}>
              <input
                type="checkbox"
                name="termsAccepted"
                className={styles.termsCheckbox}
                checked={formData.termsAccepted}
                onChange={handleChange}
                required
              />
              <span>
                I agree to the <strong>Richfield Connect Community Guidelines</strong>, academic
                integrity policies, and student terms of service.
              </span>
            </label>
            {touched.termsAccepted && errors.termsAccepted && (
              <p className={styles.errorMessage} role="alert">
                ⚠ {errors.termsAccepted}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Complete Registration &amp; View Profile
          </button>
        </form>
      </section>

      {/* Right Column: Live Profile Preview passing props directly */}
      <ProfilePreview
        fullName={formData.fullName}
        studentNumber={formData.studentNumber}
        campus={formData.campus}
        bio={formData.bio}
        interests={formData.interests}
      />
    </div>
  );
}

export default SignUpForm;
