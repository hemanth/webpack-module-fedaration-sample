import React, { useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";

const XKCD = lazy(() => import("comic/XKCD"));

const App = () => {
	const [fetchComic, setFetchComic] = useState(0);

	return (
		<>
			<button onClick={() => setFetchComic((currentFetch) => currentFetch + 1)}>
				Fetch Comic from Remote Module
			</button>
			{fetchComic ? (
				<Suspense fallback={() => "Meow"}>
					<div>
						{" "}
						<XKCD />
					</div>
				</Suspense>
			) : null}
		</>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
