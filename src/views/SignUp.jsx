import SignUpForm from '../components/SignUpForm';
import styles from './SignUp.module.css';

/**
 * SignUp View Component
 * Houses the controlled student registration form alongside the live preview panel.
 */
function SignUp() {
  return (
    <div className="viewContainer">
      <div className={styles.signUpView}>
        <div className={styles.viewHeader}>
          <p className={styles.pretitle}>Join the Academic Network</p>
          <h1 className={styles.title}>Student Registration</h1>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
