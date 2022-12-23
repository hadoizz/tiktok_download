import axios from 'axios';
import React, { useRef, useState } from 'react';
import {
	RootState,
	setPagination,
	setVideoLoading,
	setVidoes,
	useDispatch,
	useSelector,
} from '../../redux';
import { Feed } from '../index';

const SearchInput = () => {
	const [error, setError] = useState<null | string>(null);
	const [videos, setvideos] = useState<any>(null);
	const inputRef = useRef<any>();
	const btnRef = useRef<any>();
	const siteState = useSelector((state: RootState) => state.site);

	// get user post
	const dispatch = useDispatch();
	const getUserPost = (value: string) => {
		var options = null;

		if (value.includes('tiktok.com') && value.includes('/video/')) {
			// get video by url
			options = {
				method: 'GET',
				url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
				params: { url: value, hd: '0', count: '1000' },
				headers: {
					'X-RapidAPI-Key':
						'5efaae8b28msh000d940125a53e3p1dda09jsnd47fd37b864e',
					'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com',
				},
			};
		} else if (!value.includes('tiktok.com') && !value.includes('@')) {
			setError('please enter a correct username with @!');
			dispatch(setVideoLoading(false));
		} else {
			// get user videos by username
			options = {
				method: 'GET',
				url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/user/posts',
				params: {
					unique_id: value,
					count: '1000',
				},
				headers: {
					'X-RapidAPI-Key':
						'5efaae8b28msh000d940125a53e3p1dda09jsnd47fd37b864e',
					'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com',
				},
			};
		}

		if (options) {
			axios
				.request(options)
				.then(function (response) {
					if (response.data.msg === 'success') {
						var videoArray = null;
						var feedTitle = null;
						if (response.data.data.videos) {
							videoArray = response.data.data.videos;
							feedTitle = 'User Vidoes';
						} else {
							videoArray = [response.data.data];
							feedTitle = 'Videso';
						}

						if (videoArray) {
							dispatch(
								setVidoes({
									title: feedTitle,
									videos: videoArray,
								})
							);
							setvideos(videos);
							dispatch(setVideoLoading(false));
						}
					} else {
						setError('username or video url is wrong.');
						dispatch(setVideoLoading(false));
					}
					console.log(response.data);
				})
				.catch(function (error) {
					console.error(error);
					dispatch(setVideoLoading(false));
				});
		}
	};

	// clear error
	const onClickInput = () => {
		setError(null);
		dispatch(setPagination({ currentPage: 0 }));
	};

	// onclick search button
	const onSearch = () => {
		if (inputRef.current.value) {
			dispatch(setVideoLoading(true));
			const searchValue: any = inputRef.current.value;
			getUserPost(searchValue);
		} else {
			setError('search field is required.');
		}
	};

	return (
		<>
			<div className="pt-32 pb-4">
				<div className="container">
					<h2 className="text-lg font-bold text-center">
						Enter Snapchat Username/URL
					</h2>
					<p className="text-center mb-4">
						download tkik video without watermark wih username
					</p>
					<div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-center justify-center">
						<input
							ref={inputRef}
							onClick={onClickInput}
							className="max-w-sm w-full py-2 px-4 outline-0 rounded-md text-gray-700"
							placeholder="Type username or past url"
						/>
						<button
							onClick={onSearch}
							className="inline-block rounded bg-yellow-300 px-6 py-2 uppercase text-gray-700 shadow-md transition duration-150 ease-in-out hover:bg-yellow-400 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg cursor-pointer disabled:opacity-75 disabled:cursor-progress"
							disabled={siteState.videoLoading}
						>
							{siteState.videoLoading ? 'loading...' : 'SEARCH'}
						</button>
					</div>
					<p
						className={`text-red-500 mt-2 transition duration-150 ease-in-out ${
							!error ? 'opacity-0' : 'opacity-1'
						}`}
					>
						error: {error}
					</p>
				</div>
			</div>
		</>
	);
};

export default SearchInput;
