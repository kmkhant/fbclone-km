import {
	collection,
	getDocs,
	orderBy,
	query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Post from "./Post";
import { useEffect, useState } from "react";

function Posts({ posts }) {
	// const [docs, setDocs] = useState([]);

	// useEffect(() => {
	// 	const postRef = collection(db, "posts");
	// 	const q = query(postRef, orderBy("timestamp", "desc"));
	// 	getDocs(q).then((snapshot) => {
	// 		setDocs(snapshot.docs);
	// 	});
	// }, []);

	return (
		<div>
			{posts ? (
				posts.map((postData) => (
					<Post
						key={postData.id}
						name={postData.name}
						message={postData.message}
						email={postData.email}
						timestamp={postData.timestamp}
						image={postData.image}
						postImage={postData.postImage}
					/>
				))
			) : (
				<p>No Posts</p>
			)}

			{}
		</div>
	);
}

export default Posts;
