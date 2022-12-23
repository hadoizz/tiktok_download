import React, { useEffect, useState } from 'react';
import {
	RootState,
	setPagination,
	useDispatch,
	useSelector,
} from '../../redux';
import { Video } from '../index';
import PaginationItem from './PaginationItem';

const Feed = () => {
	const siteState = useSelector((state: RootState) => state.site);
	const currentPage = siteState.currentPage;
	const perPage = siteState.perPage;

	const calCount = currentPage * perPage;
	var videos = siteState.videos
		? siteState.videos.slice(calCount, calCount + perPage)
		: null;

	const pages = Math.round(siteState.videos?.length / perPage);
	const pagesArray = [];
	for (let i = 1; i < pages; i++) {
		pagesArray.push(i);
	}

	const dispatch = useDispatch();
	const onPaginate = (number: any) => {
		console.log(number);
		dispatch(setPagination({ currentPage: number }));
	};

	console.log('perpage', perPage);
	console.log('current page', currentPage);

	return (
		<div className="py-4">
			<div className="container">
				<div className="grid grid-cols-1 gap-4 sm:mt-4">
					{videos?.map((item: any, i: number) => (
						<Video key={i} videoData={item} />
					))}
				</div>
				<div className="flex gap-2 mt-8 flex-wrap">
					{videos &&
						pagesArray.map((item: number) => (
							<PaginationItem
								active={currentPage}
								key={item}
								number={item}
								onClick={onPaginate}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default Feed;
