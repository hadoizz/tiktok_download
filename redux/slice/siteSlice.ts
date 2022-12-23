import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface siteState {
	navHeight?: number;
	footerHeight?: number;
	feedTitle?: any;
	videos?: any;
	videoLoading?: boolean;
	currentPage: number;
	perPage: number;
}

const initialState: siteState = {
	navHeight: 0,
	footerHeight: 0,
	feedTitle: null,
	videos: null,
	videoLoading: false,
	currentPage: 0,
	perPage: 12,
};

export const themeSlice = createSlice({
	name: 'site',
	initialState,
	reducers: {
		setNavHeight: (state, action: PayloadAction<number>) => {
			state.navHeight = action.payload;
		},
		setFooterHeight: (state, action: PayloadAction<number>) => {
			state.footerHeight = action.payload;
		},
		setVideoLoading: (state, action: PayloadAction<boolean>) => {
			state.videoLoading = action.payload;
		},
		setVidoes: (state, action: PayloadAction<any>) => {
			state.feedTitle = action.payload;
			state.videos = action.payload.videos;
		},
		setPagination: (state, action: PayloadAction<any>) => {
			state.currentPage = action.payload.currentPage
				? action.payload.currentPage
				: state.currentPage;
			state.perPage = action.payload.perPage
				? action.payload.perPage
				: state.perPage;
		},
	},
});

export const {
	setNavHeight,
	setFooterHeight,
	setVidoes,
	setVideoLoading,
	setPagination,
} = themeSlice.actions;

export default themeSlice.reducer;
