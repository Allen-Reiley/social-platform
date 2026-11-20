/**
 * Richfield Connect — Academic Social Engagement Platform
 * Global State Reducer handling REGISTER_USER, ADD_POST, TOGGLE_LIKE, DELETE_POST
 */

export const ACTION_TYPES = {
  REGISTER_USER: 'REGISTER_USER',
  ADD_POST: 'ADD_POST',
  TOGGLE_LIKE: 'TOGGLE_LIKE',
  DELETE_POST: 'DELETE_POST',
  HYDRATE_STATE: 'HYDRATE_STATE',
};

export const appReducer = (state, action) => {
  switch (action.type) {
    // Stores the newly registered student's profile object
    case ACTION_TYPES.REGISTER_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    // Prepends a newly composed post to the posts feed
    case ACTION_TYPES.ADD_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }

    // Toggles like status and increments/decrements like counter
    case ACTION_TYPES.TOGGLE_LIKE: {
      const postId = action.payload;
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === postId) {
            const isLiked = !post.liked;
            return {
              ...post,
              liked: isLiked,
              // Prevent negative likes
              likes: isLiked ? post.likes + 1 : Math.max(0, post.likes - 1),
            };
          }
          return post;
        }),
      };
    }

    // Removes an existing post by unique identifier
    case ACTION_TYPES.DELETE_POST: {
      const postId = action.payload;
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== postId),
      };
    }

    // Hydrates global state from localStorage on initial mount
    case ACTION_TYPES.HYDRATE_STATE: {
      return {
        ...state,
        ...(action.payload.user !== undefined && { user: action.payload.user }),
        ...(action.payload.posts !== undefined && { posts: action.payload.posts }),
      };
    }

    default:
      return state;
  }
};
