export function Header() {
	return (
		<header aria-labelledby="header-title" className="grid grid-cols-2 gap-4 place-content-between ">
			<div className=""><h1 id='header-title' className=" text-2xl p-5 font-bold">List of Products</h1></div>
			<div onClick={(e) => handleMenu(e)} className="absolute right-0 p-5">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="hover:cursor-pointer w-7 h-7">
					<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
			</div>
		</header>
	);
};
