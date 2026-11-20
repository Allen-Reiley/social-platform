import { getInitials } from '../utils/validation';
import styles from './ProfilePreview.module.css';

/**
 * ProfilePreview Component
 * Renders the live profile card preview panel alongside the registration form.
 * Receives all data via props from the parent SignUpForm to eliminate duplicate state.
 * Strictly avoids direct DOM manipulation; updates reflect React state instantly.
 */
function ProfilePreview({ fullName = '', studentNumber = '', campus = '', bio = '', interests = [] }) {
  const initials = getInitials(fullName);

  return (
    <aside className={styles.previewCard} aria-label="Live Profile Preview">
      <div className={styles.previewHeader}>
        <span className={styles.previewLabel}>
          <span className={styles.liveDot} aria-hidden="true"></span> Live Profile Preview
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--rf-text-muted)' }}>Auto-sync</span>
      </div>

      {/* Avatar and Identity */}
      <div className={styles.profileAvatarRow}>
        <div className={styles.avatarCircle} aria-label={`Avatar for ${fullName || 'Student'}`}>
          {initials}
        </div>
        <div className={styles.profileIdentity}>
          <h3>
            {fullName.trim() ? (
              fullName
            ) : (
              <span className={styles.placeholderText}>Student Name</span>
            )}
          </h3>
          {studentNumber.trim() ? (
            <div className={styles.studentNumberDisplay}>ID: {studentNumber}</div>
          ) : (
            <div className={styles.studentNumberDisplay}>ID: 000000</div>
          )}
          <span className={styles.campusBadge}>
            {campus ? campus : 'No Campus Selected'}
          </span>
        </div>
      </div>

      {/* Academic Interests Badges */}
      <div className={styles.detailSection}>
        <div className={styles.detailLabel}>Academic Interests</div>
        {interests && interests.length > 0 ? (
          <div className={styles.tagsList}>
            {interests.map((interest) => (
              <span key={interest} className={styles.tag}>
                #{interest}
              </span>
            ))}
          </div>
        ) : (
          <p className={styles.noInterests}>Select at least one interest to preview badges...</p>
        )}
      </div>

      {/* Student Biography */}
      <div className={styles.detailSection}>
        <div className={styles.detailLabel}>Academic Biography</div>
        <div className={styles.bioBlock}>
          {bio.trim() ? (
            bio
          ) : (
            <span className={styles.placeholderText}>
              Your short academic bio and research interests will appear here in real time...
            </span>
          )}
        </div>
      </div>

      <div className={styles.previewFooterNotice}>
        This card reflects how your profile appears to Richfield faculty and peers upon registration.
      </div>
    </aside>
  );
}

export default ProfilePreview;
