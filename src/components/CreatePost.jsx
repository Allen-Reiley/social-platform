import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatTimestamp, getInitials } from '../utils/validation';
import styles from './CreatePost.module.css';

/**
 * CreatePost Component
 * Controlled post composer allowing students to post thoughts to the global feed.
 * Prevents empty submissions with inline error messages.
 * Prepends the new post object to global state and persists to localStorage.
 */
function CreatePost() {
  const { user, addPost } = useAppContext();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const displayName = user?.fullName || 'Registered Student';
  const displayInitials = getInitials(displayName);

  // Handle textarea text change and clear error once text is typed
  const handleChange = (e) => {
    setContent(e.target.value);
    if (error && e.target.value.trim().length > 0) {
      setError('');
    }
  };

  // Submit new post
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent empty post submissions with inline error feedback
    if (!content.trim()) {
      setError('Post content cannot be empty. Please write something to share.');
      return;
    }

    // Construct required post object
    const newPost = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      username: displayName,
      timestamp: formatTimestamp(new Date()),
      content: content.trim(),
      likes: 0,
      liked: false,
    };

    // Dispatch to global context and trigger localStorage update
    addPost(newPost);

    // Clear textarea and reset error state
    setContent('');
    setError('');
  };

  return (
    <div className={styles.createPostCard}>
      <div className={styles.cardHeader}>
        <div className={styles.authorInitials} aria-hidden="true">
          {displayInitials}
        </div>
        <div className={styles.authorMeta}>
          <h3>{displayName}</h3>
          <p>{user ? `${user.campus} • Student #${user.studentNumber}` : 'Post as Richfield Student'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          className={`${styles.textarea} ${error ? styles.textareaError : ''}`}
          placeholder="Share an academic idea, ask a question about your modules, or start a discussion..."
          value={content}
          onChange={handleChange}
          rows={3}
          aria-label="Compose academic post"
        />

        {error && (
          <p className={styles.errorMessage} role="alert">
            ⚠ {error}
          </p>
        )}

        <div className={styles.cardFooter}>
          <span className={styles.noticeText}>
            Press <strong>Post</strong> to publish instantly to the Richfield academic feed.
          </span>
          <button type="submit" className={styles.postButton}>
            <span>Post</span> ➔
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
