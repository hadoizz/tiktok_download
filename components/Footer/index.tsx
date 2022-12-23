import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { setFooterHeight, useDispatch } from '../../redux';

const Footer = () => {
	// set footer height
	const dispatch = useDispatch();
	const footerRef = useRef(null as null | HTMLDivElement);
	useEffect(() => {
		if (footerRef.current) {
			dispatch(setFooterHeight(footerRef.current?.clientHeight));
		}
	}, []);

	return (
		<footer ref={footerRef}>
			<div className="container">
				<div className="flex justify-center items-center gap-4 border-t py-2">
					<Link href={'/'}>Disclaimer</Link>
					<Link href={'/'}>Privacy Policy</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
