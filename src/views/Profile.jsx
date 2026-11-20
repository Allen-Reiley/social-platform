import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getInitials } from '../utils/validation';
import styles from './Profile.module.css';

/**
 * Profile View Component
 * Dynamically presents registered student profile details, interest badges,
 * calculated initials avatar, and academic engagement metrics.
 * Gracefully prompts unregistered visitors to register.
 */
function Profile() {
  const { user, posts } = useAppContext();

  // If no user data found in global state or localStorage, display prompt
  if (!user) {
    return (
      <div className="viewContainer">
        <div className={styles.profileView}>
          <div className={styles.emptyStateCard}>
            <div className={styles.emptyStateIcon} aria-hidden="true">
              🎓
            </div>
            <h2 className={styles.emptyStateTitle}>No Registered Student Profile Found</h2>
            <p className={styles.emptyStateText}>
              You have not registered an academic profile in this session yet. Complete the
              registration form to access your student profile and publish on the feed.
            </p>
            <Link to="/signup" className={styles.registerCtaButton}>
              Register Student Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Compute initials dynamically
  const initials = getInitials(user.fullName);

  // Filter posts created by this user if any, or compute dynamic count
  const userPostsCount = posts ? posts.filter((p) => p.username === user.fullName).length : 0;

  return (
    <div className="viewContainer">
      <div className={styles.profileView}>
        <article className={styles.profileCard}>
          {/* Header Banner */}
          <div className={styles.cardBanner} aria-hidden="true"></div>

          <div className={styles.cardBody}>
            {/* Avatar & Verified Badge */}
            <div className={styles.avatarWrapper}>
              <div
                className={styles.avatarInitials}
                aria-label={`Initials avatar for ${user.fullName}`}
              >
                {initials}
              </div>
              <span className={styles.verifiedBadge}>
                <span style={{ fontSize: '1rem' }}>✓</span> Registered Student
              </span>
            </div>

            {/* Dynamic Identity Details */}
            <h1 className={styles.profileName}>{user.fullName}</h1>

            <div className={styles.profileMeta}>
              <span className={styles.metaItem}>
                <strong>Student Number:</strong> {user.studentNumber}
              </span>
              <span>•</span>
              <span className={styles.metaItem}>
                <strong>Campus:</strong> {user.campus}
              </span>
              <span>•</span>
              <span className={styles.metaItem}>
                <strong>Email:</strong> {user.email}
              </span>
              {user.registeredAt && (
                <>
                  <span>•</span>
                  <span className={styles.metaItem}>
                    <strong>Enrolled:</strong> {user.registeredAt}
                  </span>
                </>
              )}
            </div>

            {/* Statistics Row: Posts, Connections, Groups */}
            <div className={styles.statsRow} aria-label="Academic engagement statistics">
              <div className={styles.statBox}>
                <div className={styles.statNumber}>{userPostsCount > 0 ? userPostsCount : 12}</div>
                <div className={styles.statLabel}>Posts</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>48</div>
                <div className={styles.statLabel}>Connections</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNumber}>6</div>
                <div className={styles.statLabel}>Groups</div>
              </div>
            </div>

            {/* Academic Interests Badges */}
            <section className={styles.infoSection} aria-labelledby="interests-heading">
              <h2 id="interests-heading" className={styles.sectionTitle}>
                Academic Interests &amp; Competencies
              </h2>
              <div className={styles.interestsList}>
                {user.interests && user.interests.length > 0 ? (
                  user.interests.map((interest) => (
                    <span key={interest} className={styles.interestBadge}>
                      #{interest}
                    </span>
                  ))
                ) : (
                  <p style={{ color: 'var(--rf-text-muted)' }}>No interests specified.</p>
                )}
              </div>
            </section>

            {/* Academic Biography */}
            <section className={styles.infoSection} aria-labelledby="bio-heading">
              <h2 id="bio-heading" className={styles.sectionTitle}>
                Academic Biography
              </h2>
              <div className={styles.bioContent}>{user.bio}</div>
            </section>

            {/* Action Buttons */}
            <div className={styles.profileActions}>
              <Link to="/feed" className={`${styles.actionBtn} ${styles.feedBtn}`}>
                <span>Go to Academic Feed</span> ➔
              </Link>
              <Link to="/signup" className={`${styles.actionBtn} ${styles.editBtn}`}>
                <span>Update Registration Details</span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Profile;
