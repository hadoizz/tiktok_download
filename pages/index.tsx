import React from 'react';
import { Feed, Footer, Navigation, SearchInput } from '../components';
import { RootState, useSelector } from '../redux';

const HomePage = () => {
	const siteState = useSelector((state: RootState) => state.site);

	return (
		<div className="bg-[#121314] text-white">
			<Navigation />
			<main
				style={{
					minHeight: `calc(100vh - (${siteState.navHeight}px + ${siteState.footerHeight}px))`,
				}}
			>
				<SearchInput />
				<Feed />
			</main>
			<Footer />
		</div>
	);
};

export default HomePage;
