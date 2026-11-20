import { useAppContext } from '../context/AppContext';
import { getInitials } from '../utils/validation';
import styles from './Post.module.css';

/**
 * Post Component
 * Represents an individual post card in the academic feed.
 * Features toggleable likes with counter and visual state shifts,
 * and user confirmation–guarded deletion that removes the post from state & storage.
 */
function Post({ post }) {
  const { toggleLike, deletePost } = useAppContext();
  const { id, username, timestamp, content, likes, liked } = post;

  const initials = getInitials(username);

  // Handle like toggle
  const handleLike = () => {
    toggleLike(id);
  };

  // Handle delete with window.confirm() confirmation guard
  const handleDelete = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this post by ${username}?\n\nThis action cannot be undone.`
    );

    if (isConfirmed) {
      deletePost(id);
    }
  };

  return (
    <article className={styles.postCard} aria-labelledby={`post-author-${id}`}>
      {/* Post Author & Timestamp */}
      <header className={styles.postHeader}>
        <div className={styles.authorSection}>
          <div className={styles.avatarCircle} aria-hidden="true">
            {initials}
          </div>
          <div>
            <h4 id={`post-author-${id}`} className={styles.authorName}>
              {username}
            </h4>
            <time className={styles.timestamp}>{timestamp}</time>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <div className={styles.postContent}>{content}</div>

      {/* Post Actions: Like Button & Delete Button */}
      <footer className={styles.postActions}>
        <button
          type="button"
          className={`${styles.likeButton} ${liked ? styles.likeButtonActive : ''}`}
          onClick={handleLike}
          aria-label={liked ? `Unlike post. Current likes: ${likes}` : `Like post. Current likes: ${likes}`}
        >
          <span className={styles.likeIcon} aria-hidden="true">
            {liked ? '♥' : '♡'}
          </span>
          <span className={styles.likeCount}>{likes}</span>
          <span>{likes === 1 ? 'Like' : 'Likes'}</span>
        </button>

        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDelete}
          aria-label="Delete this post"
        >
          <span aria-hidden="true">🗑</span>
          <span>Delete</span>
        </button>
      </footer>
    </article>
  );
}

export default Post;
