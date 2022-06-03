import StoryCard from "./StoryCard";
import { useSession } from "next-auth/react";

const stories = [
	{
		name: "Khaing Myel Khant",
		src: "https://links.papareact.com/zof",
		profile: "https://links.papareact.com/kxk",
	},
	{
		name: "Elon Musk",
		src: "https://links.papareact.com/4zn",
		profile: "https://links.papareact.com/kxk",
	},
	{
		name: "Jeff Bezoz",
		src: "https://links.papareact.com/k2j",
		profile: "https://links.papareact.com/f0p",
	},
	{
		name: "Mark Zuckerberg",
		src: "https://links.papareact.com/xql",
		profile: "https://links.papareact.com/snf",
	},
	{
		name: "Bill Gates",
		src: "https://links.papareact.com/4u4",
		profile: "https://links.papareact.com/zvy",
	},
];

function Stories() {
	const { data: session, status } = useSession();
	if (session) stories[0].src = session.user.image;
	return (
		<div className="flex justify-center space-x-3 mx-auto">
			{stories.map((story, i) => (
				<StoryCard
					key={i}
					name={story.name}
					src={story.src}
					profile={story.profile}
				/>
			))}
		</div>
	);
}

export default Stories;
