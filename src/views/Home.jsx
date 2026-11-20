import { Link } from 'react-router-dom';
import styles from './Home.module.css';

/**
 * Home View
 * Serves as the landing view for Richfield Connect.
 * Implements an institutional hero banner, platform slogan, feature cards, and CTA link.
 */
function Home() {
  return (
    <div className="viewContainer">
      {/* Hero Section */}
      <section className={styles.heroSection} aria-labelledby="hero-heading">
        <div className={styles.heroContent}>
          {/* Institutional Badge / Crest */}
          <div className={styles.institutionCrest}>
            <span className={styles.crestIcon} aria-hidden="true"></span>
            <span>Richfield Graduate Institute of Technology</span>
          </div>

          <h1 id="hero-heading" className={styles.heroTitle}>
            Richfield <span className={styles.heroTitleHighlight}>Connect</span>
          </h1>

          <p className={styles.heroSlogan}>
            A dedicated academic social engagement platform connecting students across faculties,
            inspiring collaborative discovery, and fostering professional excellence.
          </p>

          <div className={styles.heroActions}>
            {/* React Router Link for client-side navigation without reload */}
            <Link to="/signup" className={styles.primaryCta}>
              Register Now
            </Link>
            <Link to="/feed" className={styles.secondaryCta}>
              Explore Feed
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section (3+ cards) */}
      <section className={styles.featuresSection} aria-labelledby="features-heading">
        <div className={styles.featuresContainer}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionPretitle}>Institutional Community</p>
            <h2 id="features-heading" className={styles.sectionTitle}>
              Engineered for Student Success
            </h2>
            <p className={styles.sectionSubtitle}>
              Unlike public social networks, Richfield Connect focuses strictly on collegiate growth,
              peer collaboration, and academic integrity.
            </p>
          </div>

          <div className={styles.cardsGrid}>
            {/* Feature Card 1 */}
            <article className={styles.featureCard}>
              <div className={styles.cardIcon} aria-hidden="true">
                👥
              </div>
              <h3 className={styles.cardTitle}>Connect with Peers</h3>
              <p className={styles.cardDescription}>
                Build cross-campus academic networks with students across Midrand, Musgrave,
                Cape Town, Pretoria, and Braamfontein. Collaborate across faculties and study groups.
              </p>
            </article>

            {/* Feature Card 2 */}
            <article className={styles.featureCard}>
              <div className={styles.cardIcon} aria-hidden="true">
                💡
              </div>
              <h3 className={styles.cardTitle}>Share Academic Ideas</h3>
              <p className={styles.cardDescription}>
                Post technical queries, discuss lecture material, exchange project tips, and receive
                constructive feedback in a safe, moderated collegiate forum.
              </p>
            </article>

            {/* Feature Card 3 */}
            <article className={styles.featureCard}>
              <div className={styles.cardIcon} aria-hidden="true">
                🎓
              </div>
              <h3 className={styles.cardTitle}>Build Your Profile</h3>
              <p className={styles.cardDescription}>
                Showcase your student credentials, academic interests, faculty bio, and campus affiliation.
                Maintain a professional digital identity for academic and career opportunities.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerContent}>
          <h2 className={styles.ctaBannerTitle}>Ready to join your fellow Richfield students?</h2>
          <p className={styles.ctaBannerText}>
            Registration takes less than two minutes. Create your academic profile today.
          </p>
          <Link to="/signup" className={styles.primaryCta} style={{ backgroundColor: 'var(--rf-blue)', color: 'var(--rf-white)' }}>
            Create Student Profile
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
