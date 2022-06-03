import Image from "next/image";
import { useSession } from "next-auth/react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import {
	CameraIcon,
	VideoCameraIcon,
} from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import {
	collection,
	addDoc,
	serverTimestamp,
	doc,
	setDoc,
} from "firebase/firestore";
import {
	getDownloadURL,
	uploadBytes,
	ref,
	uploadString,
} from "firebase/storage";

function InputBox() {
	const { data: session, status } = useSession();
	const inputRef = useRef(null);
	const filePickerRef = useRef(null);
	const [image, setImage] = useState(null);

	const sendPost = async (e) => {
		e.preventDefault();
		if (!inputRef.current.value) return;

		try {
			await addDoc(collection(db, "posts"), {
				message: inputRef.current.value,
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
				timestamp: serverTimestamp(),
			}).then((postDoc) => {
				// console.log("FINISHED UPLAODING");
				if (image) {
					const storageRef = ref(
						storage,
						`posts/${postDoc.id}`
					);

					uploadString(storageRef, image, "data_url").then(
						(snapshot) => {
							// console.log("Uploaded a data_url string");
							removeImage();
							getDownloadURL(snapshot.ref).then(
								(downloadURL) => {
									const postRef = doc(
										db,
										"posts",
										`${postDoc.id}`
									);
									setDoc(
										postRef,
										{ postImage: downloadURL },
										{ merge: true }
									);
								}
							);
						}
					);
				}
			});
		} catch (e) {
			console.error("Error adding document: ", e);
		}
		inputRef.current.value = "";
	};

	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = (readerEvent) => {
			setImage(readerEvent.target.result);
		};
	};

	const removeImage = () => {
		setImage(null);
	};

	return (
		<div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
			<div className="flex space-x-4 p-4 items-center">
				<Image
					className="rounded-full"
					src={session.user.image}
					width={40}
					height={40}
					layout="fixed"
					alt="profilePic"
				/>
				<form className="flex  flex-1">
					<input
						className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
						type="text"
						ref={inputRef}
						placeholder={`What's on your mind, ${session.user.name}?`}
					/>
					<button hidden type="submit" onClick={sendPost}>
						Submit
					</button>
				</form>

				{image && (
					<div
						onClick={removeImage}
						className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
					>
						<Image
							width={50}
							height={50}
							src={image}
							alt="post image"
						/>
						<p className="text-xs text-red-500 text-center mt-1">
							Remove
						</p>
					</div>
				)}
			</div>

			<div className="flex justify-evenly p-3 border-t">
				<div className="inputIcon">
					<VideoCameraIcon className="h-7 text-red-500" />
					<p className="text-xs sm:text-sm xl:text-base">
						Live Video
					</p>
				</div>
				<div
					onClick={() => filePickerRef.current.click()}
					className="inputIcon"
				>
					<CameraIcon className="h-7 text-green-500" />
					<p className="text-xs sm:text-sm xl:text-base">
						Photo/Video
					</p>
					<input
						onChange={addImageToPost}
						type="file"
						name="postImage"
						ref={filePickerRef}
						hidden
					/>
				</div>
				<div className="inputIcon">
					<EmojiHappyIcon className="h-7 text-yellow-300" />
					<p className="text-xs sm:text-sm xl:text-base">
						Feeling/Activity
					</p>
				</div>
			</div>
		</div>
	);
}

export default InputBox;
