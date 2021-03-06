import {
	ChatAltIcon,
	ShareIcon,
	ThumbUpIcon,
} from "@heroicons/react/outline";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";

function Post({
	name,
	email,
	message,
	timestamp,
	image,
	postImage,
}) {
	const tsData = JSON.parse(timestamp);

	timestamp = new Timestamp(
		tsData.seconds,
		tsData.nanoseconds
	)
		.toDate()
		.toLocaleString();

	return (
		<div className="flex flex-col">
			<div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
				<div className="flex items-center space-x-2">
					<Image
						className="rounded-full"
						src={image}
						width={40}
						height={40}
						alt="Profile Picture"
					/>
					<div>
						<p className="font-medium">{name}</p>
						{timestamp ? (
							<p className="text-xs text-gray-400">
								{timestamp}
							</p>
						) : (
							<p className="text-xs text-gray-400">
								Loading
							</p>
						)}
					</div>
				</div>
				<p className="pt-4">{message}</p>
			</div>
			{postImage && (
				<div className="relative h-56 md:h-96 bg-white">
					<Image
						objectFit="cover"
						layout="fill"
						src={postImage}
						alt="post image"
						placeholder="blur"
						blurDataURL={postImage}
					/>
				</div>
			)}

			{/* Footer of the Post */}
			<div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
				<div className="inputIcon rounded-none rounded-b-2xl">
					<ThumbUpIcon className="h-4" />
					<p className="text-xs sm:text-base">Like</p>
				</div>
				<div className="inputIcon rounded-none rounded-b-2xl">
					<ChatAltIcon className="h-4" />
					<p className="text-xs sm:text-base">Comment</p>
				</div>
				<div className="inputIcon rounded-none rounded-b-2xl">
					<ShareIcon className="h-4" />
					<p className="text-xs sm:text-base">Share</p>
				</div>
			</div>
		</div>
	);
}

export default Post;
