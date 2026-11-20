import { useAppContext } from '../context/AppContext';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import styles from './Feed.module.css';

/**
 * Feed View Component
 * Coordinates post creation and lists all current posts in global state.
 * Reactively reflects additions, like count toggles, and deletions in real time.
 */
function Feed() {
  const { posts } = useAppContext();

  return (
    <div className="viewContainer">
      <div className={styles.feedView}>
        {/* Feed Header */}
        <header className={styles.feedHeader}>
          <p className={styles.pretitle}>Live Campus Discourse</p>
          <h1 className={styles.title}>Academic Feed</h1>
          <p className={styles.subtitle}>
            Connect, exchange project insights, and engage with posts from your Richfield peers.
          </p>
        </header>

        {/* Post Creation Composer */}
        <CreatePost />

        {/* Posts List Section */}
        <section aria-labelledby="recent-discussions-title">
          <div className={styles.feedDivider}>
            <span id="recent-discussions-title">Recent Academic Posts ({posts ? posts.length : 0})</span>
          </div>

          {posts && posts.length > 0 ? (
            <div className={styles.postsList}>
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon} aria-hidden="true">
                📝
              </div>
              <h3>No Posts Yet</h3>
              <p>Be the first student to publish an academic post on Richfield Connect!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Feed;
