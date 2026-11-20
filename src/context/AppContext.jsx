/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react';
import { appReducer, ACTION_TYPES } from './AppReducer';

// Storage keys for persistent localStorage
export const STORAGE_KEYS = {
  USER: 'richfield_connect_user',
  POSTS: 'richfield_connect_posts',
};

// Seed posts providing initial institutional context on clean launch
const INITIAL_DEMO_POSTS = [
  {
    id: 'seed-post-1',
    username: 'Dr. Karabo Sithole',
    timestamp: '20 Sep 2026, 09:00',
    content:
      'Welcome to Richfield Connect for the new semester! Please ensure your project groups for Web Technology 512 are finalized by Friday afternoon. Office hours are open at the Midrand campus library.',
    likes: 12,
    liked: false,
  },
  {
    id: 'seed-post-2',
    username: 'Thabo Mokoena',
    timestamp: '20 Sep 2026, 11:30',
    content:
      'Exploring React Hooks and Context API for client-side state management today. The performance gains and component decoupling make SPAs significantly cleaner to architect.',
    likes: 7,
    liked: false,
  },
  {
    id: 'seed-post-3',
    username: 'Ayanda Khumalo',
    timestamp: '20 Sep 2026, 13:15',
    content:
      'Study group forming for Cloud Architecture and Database Systems! Anyone at the Musgrave or Midrand campus interested in peer review sessions, leave a reply or reach out via student email.',
    likes: 5,
    liked: false,
  },
];

// Context creation
export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Initial state lazy initialization from localStorage
  const [state, dispatch] = useReducer(
    appReducer,
    {
      user: null,
      posts: INITIAL_DEMO_POSTS,
    },
    (defaultState) => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const storedPosts = localStorage.getItem(STORAGE_KEYS.POSTS);

        return {
          user: storedUser ? JSON.parse(storedUser) : defaultState.user,
          posts: storedPosts ? JSON.parse(storedPosts) : defaultState.posts,
        };
      } catch (err) {
        console.error('Failed to parse state from localStorage:', err);
        return defaultState;
      }
    }
  );

  // Synchronise registered user with localStorage whenever state.user changes
  useEffect(() => {
    try {
      if (state.user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (err) {
      console.error('Error synchronizing user to localStorage:', err);
    }
  }, [state.user]);

  // Synchronise feed posts with localStorage whenever state.posts changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(state.posts));
    } catch (err) {
      console.error('Error synchronizing posts to localStorage:', err);
    }
  }, [state.posts]);

  // Convenient helper dispatchers matching required action names
  const registerUser = (profileData) => {
    dispatch({
      type: ACTION_TYPES.REGISTER_USER,
      payload: profileData,
    });
  };

  const addPost = (newPost) => {
    dispatch({
      type: ACTION_TYPES.ADD_POST,
      payload: newPost,
    });
  };

  const toggleLike = (postId) => {
    dispatch({
      type: ACTION_TYPES.TOGGLE_LIKE,
      payload: postId,
    });
  };

  const deletePost = (postId) => {
    dispatch({
      type: ACTION_TYPES.DELETE_POST,
      payload: postId,
    });
  };

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        posts: state.posts,
        dispatch,
        registerUser,
        addPost,
        toggleLike,
        deletePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom consumer hook with defensive guard
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
