import Image from "next/image";
import {
	BellIcon,
	ChatIcon,
	ChevronDownIcon,
	HomeIcon,
	UserGroupIcon,
	ViewGridIcon,
} from "@heroicons/react/solid";

import {
	FlagIcon,
	PlayIcon,
	SearchIcon,
	ShoppingCartIcon,
} from "@heroicons/react/outline";

import HeaderIcon from "./HeaderIcon";
import { signOut, useSession } from "next-auth/react";

function Header() {
	const { data: session } = useSession();

	return (
		<div className="sticky top-0 z-50 bg-white flex items-center justify-between p-2 lg:px-5 shadow-md">
			{/* Left */}
			<div className="flex items-center">
				<Image
					src="https://links.papareact.com/5me"
					width={40}
					height={40}
					layout="fixed"
					alt="facebookLOGO"
				/>

				<div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
					<SearchIcon className="h-6 text-gray-600" />
					<input
						className="hidden lg:inline-flex ml-2 items-center bg-transparent outline-none flex-shrink"
						type="text"
						placeholder="Search Facebook"
					/>
				</div>
			</div>

			{/* Center */}
			<div className="flex justify-center">
				<div className="flex space-x-2 md:space-x-1">
					<HeaderIcon Icon={HomeIcon} active />
					<HeaderIcon Icon={FlagIcon} />
					<HeaderIcon Icon={PlayIcon} />
					<HeaderIcon Icon={ShoppingCartIcon} />
					<HeaderIcon Icon={UserGroupIcon} />
				</div>
			</div>

			{/* Right */}
			<div className="flex items-center sm:space-x-2 justify-end">
				{/* Profile Pic */}
				<Image
					onClick={signOut}
					className="rounded-full cursor-pointer"
					src={session.user.image}
					width="40"
					height={40}
					layout="fixed"
					alt="profile image"
				/>
				<p className="font-semibold pr-3 whitespace-nowrap">
					{session.user.name}
				</p>
				<ViewGridIcon className="icon" />
				<ChatIcon className="icon" />
				<BellIcon className="icon" />
				<ChevronDownIcon className="icon" />
			</div>
		</div>
	);
}

export default Header;
