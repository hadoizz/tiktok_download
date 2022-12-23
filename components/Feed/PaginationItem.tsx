import React, { useEffect, useState } from 'react';

const PaginationItem = ({
	number,
	active,
	onClick,
}: {
	number: number;
	active?: number;
	onClick: any;
}) => {
	const [isActive, setActive] = useState(false);

	useEffect(() => {
		if (active === number) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [active]);

	return (
		<div
			className={`w-9 h-9 text-lg hover:opacity-75 text-gray-700 rounded-full flex items-center justify-center cursor-pointer ${
				isActive ? 'bg-yellow-300' : 'bg-white'
			}`}
			onClick={() => {
				onClick(number);
			}}
		>
			{number}
		</div>
	);
};

export default PaginationItem;
