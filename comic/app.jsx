import React, { useState, useEffect } from "react";
import { imgData } from "./loader-data-url";

export default function App({ shouldFetch }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://xkcd-imgs.herokuapp.com/"
                );
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [shouldFetch]);

    return <ImageLoader src={loading ? imgData : data.url} alt={data.title} />;
}

const ImageLoader = React.memo(({ src, alt = "" }) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const imageToLoad = new Image();
        imageToLoad.src = src;
        imageToLoad.onload = () => {
            setLoading(false);
        };
    }, [src]);

    return (
        <img
            src={loading ? imgData : src}
            style={{
                opacity: loading ? 0.5 : 1,
                transition: "opacity .15s linear",
            }}
            alt={alt}
        />
    );
});
