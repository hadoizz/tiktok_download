import { configureStore } from '@reduxjs/toolkit';
import siteReducer from './slice/siteSlice';

export const store = configureStore({
	reducer: {
		site: siteReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
