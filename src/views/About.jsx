import styles from './About.module.css';

/**
 * About View
 * Presents institutional purpose, community guidelines (5+ items list),
 * and official campus contact information.
 */
function About() {
  const guidelines = [
    {
      title: 'Uphold Academic Integrity & Honest Attribution',
      desc: 'All shared code, academic papers, research findings, and technical notes must represent original thought or clearly cite the original sources. Plagiarism is strictly prohibited under institutional policy.',
    },
    {
      title: 'Maintain Professional & Collegiate Conduct',
      desc: 'Interact with peers, academic tutors, and lecturers with mutual respect and professional courtesy. Constructive discourse, intellectual curiosity, and collaborative learning are encouraged.',
    },
    {
      title: 'Zero Tolerance for Harassment & Discrimination',
      desc: 'Richfield Connect is an inclusive academic environment. Any form of harassment, discrimination, hate speech, bullying, or abusive behavior will lead to account suspension and disciplinary review.',
    },
    {
      title: 'Share Authentic & Relevant Educational Resources',
      desc: 'Post content that contributes directly to student learning, course modules, faculty projects, software development concepts, and professional development opportunities.',
    },
    {
      title: 'Protect Confidentiality & Personal Privacy',
      desc: 'Do not distribute sensitive student credentials, private assessment answers, examination keys, or personal peer data without authorized institutional consent.',
    },
  ];

  return (
    <div className="viewContainer">
      <div className={styles.aboutPage}>
        {/* Page Header */}
        <header className={styles.pageHeader}>
          <p className={styles.pagePretitle}>Institutional Values</p>
          <h1 className={styles.pageTitle}>About Richfield Connect</h1>
          <p className={styles.pageLead}>
            A collegiate digital environment engineered to support students throughout their academic
            journey at Richfield Graduate Institute of Technology.
          </p>
        </header>

        {/* Statement of Purpose */}
        <section className={styles.sectionBlock} aria-labelledby="purpose-heading">
          <h2 id="purpose-heading" className={styles.sectionHeading}>
            Statement of Purpose
          </h2>
          <p className={styles.sectionParagraph}>
            <strong>Richfield Connect</strong> is an institution-focused academic social engagement
            platform developed exclusively for the student body of Richfield Graduate Institute of
            Technology. Unlike commercial social media platforms driven by algorithmic advertisements
            and distractions, Richfield Connect is architected around foundational institutional values:
            academic integrity, peer collaboration, and collegiate professionalism.
          </p>
          <p className={styles.sectionParagraph}>
            The platform is designed for undergraduate and postgraduate students enrolled across our
            information technology, business, and science faculties. It serves as an interactive
            space to exchange technical solutions, organize study sessions, consult peers on
            challenging modules, and cultivate professional networks that extend beyond graduation.
          </p>
        </section>

        {/* Community Guidelines (List format, min 5 items) */}
        <section className={styles.sectionBlock} aria-labelledby="guidelines-heading">
          <h2 id="guidelines-heading" className={styles.sectionHeading}>
            Community Guidelines
          </h2>
          <p className={styles.sectionParagraph}>
            To preserve a productive, safe, and academically rigorous digital community, all registered
            students must adhere to the following core guidelines:
          </p>

          <ol className={styles.guidelinesList}>
            {guidelines.map((item, index) => (
              <li key={index} className={styles.guidelineItem}>
                <div className={styles.guidelineNumber} aria-hidden="true">
                  {index + 1}
                </div>
                <div className={styles.guidelineContent}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Contact Information */}
        <section className={styles.sectionBlock} aria-labelledby="contact-heading">
          <h2 id="contact-heading" className={styles.sectionHeading}>
            Institutional Contact &amp; Campus Locations
          </h2>
          <p className={styles.sectionParagraph}>
            Have questions regarding Richfield Connect or require student technical support? Reach
            out to the academic computing services desk:
          </p>

          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <h4>Central Academic Support</h4>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@richfield.ac.za">support@richfield.ac.za</a>
              </p>
              <p>
                <strong>Module Desk:</strong>{' '}
                <a href="mailto:webtech512@richfield.ac.za">webtech512@richfield.ac.za</a>
              </p>
              <p>
                <strong>Student ITS Helpline:</strong> 0861 321 321
              </p>
            </div>

            <div className={styles.contactCard}>
              <h4>Midrand Main Campus</h4>
              <p>
                <strong>Address:</strong> 292 16th Road, Midrand, Johannesburg, South Africa
              </p>
              <p>
                <strong>Faculty:</strong> Faculty of Information Technology &amp; Computer Science
              </p>
              <p>
                <strong>Operating Hours:</strong> Monday – Friday: 08:00 – 17:00
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
