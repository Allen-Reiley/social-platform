import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

/**
 * Footer Component
 * Renders consistent institutional footer across all views.
 * Adheres strictly to React Router Link components without full-page reloads.
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Institutional Branding & Accreditation */}
        <div className={styles.brandCol}>
          <h3>Richfield Connect</h3>
          <p>
            The dedicated academic social engagement platform designed for Richfield students to
            collaborate, share academic resources, and foster professional peer networks.
          </p>
          <p className={styles.accreditation}>
            Richfield Graduate Institute of Technology (Pty) Ltd is registered with the
            Department of Higher Education &amp; Training as a Private Higher Education Institution
            under the Higher Education Act, 1997, Registration Certificate No. 2000/HE07/008.
          </p>
        </div>

        {/* Client-Side Platform Navigation */}
        <div className={styles.linksCol}>
          <h4>Platform</h4>
          <ul className={styles.linksList}>
            <li>
              <Link to="/" className={styles.footerLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/feed" className={styles.footerLink}>
                Academic Feed
              </Link>
            </li>
            <li>
              <Link to="/signup" className={styles.footerLink}>
                Student Registration
              </Link>
            </li>
            <li>
              <Link to="/profile" className={styles.footerLink}>
                Student Profile
              </Link>
            </li>
            <li>
              <Link to="/about" className={styles.footerLink}>
                About &amp; Guidelines
              </Link>
            </li>
          </ul>
        </div>

        {/* Academic & Campus Information */}
        <div className={styles.linksCol}>
          <h4>Campuses</h4>
          <ul className={styles.linksList}>
            <li>
              <span className={styles.footerLink}>Midrand Main Campus</span>
            </li>
            <li>
              <span className={styles.footerLink}>Durban Musgrave Campus</span>
            </li>
            <li>
              <span className={styles.footerLink}>Cape Town Campus</span>
            </li>
            <li>
              <span className={styles.footerLink}>Pretoria Campus</span>
            </li>
            <li>
              <span className={styles.footerLink}>Braamfontein Campus</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>
          &copy; {currentYear} Richfield Graduate Institute of Technology. Web Technology 512 (WT512).
        </p>
        <p>All institutional rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
