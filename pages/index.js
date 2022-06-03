import { getSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

import {
	collection,
	query,
	orderBy,
	getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

export default function Home({ session, posts }) {
	if (!session) return <Login />;

	return (
		<div className="h-screen bg-gray-100 overflow-hidden">
			<Head>
				<title>Facebook</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Header */}
			<Header />

			<main className="flex">
				{/* Sidebar */}
				<Sidebar />
				{/* Feed */}
				<Feed posts={posts} />
				{/* Widgets */}
				<Widgets />
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	// Get the user
	const session = await getSession(context);

	const postRef = collection(db, "posts");
	const q = query(postRef, orderBy("timestamp", "desc"));
	const querySnapshot = await getDocs(q);

	const docs = querySnapshot.docs.map((post) => ({
		id: post.id,
		...post.data(),
		timestamp: JSON.stringify(post.data().timestamp),
	}));

	return {
		props: {
			session,
			posts: docs,
		},
	};
}
