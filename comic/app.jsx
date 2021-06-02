import React, { useState, useEffect } from "react";
import { imgData } from "./loader-data-url";

export default function App() {
	const [data, setData] = useState({});

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("https://xkcd-imgs.herokuapp.com/");
				const result = await response.json();
				setData(result);
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	return <ImageLoader src={data.url} alt={data.title} />;
}

const ImageLoader = React.memo(({ src, alt = "" }) => {
	const [loading, setLoading] = useState(true);
	const [imgURL, setimgURL] = useState(imgData);

	useEffect(() => {
		const imageToLoad = new Image();
		imageToLoad.src = src;
		imageToLoad.onload = () => {
			setLoading(false);
			setimgURL(src);
		};
	}, [src]);

	return (
		<img
			src={imgURL}
			style={{
				opacity: loading ? 0.5 : 1,
				transition: "opacity .15s linear",
			}}
			alt={alt}
		/>
	);
});
