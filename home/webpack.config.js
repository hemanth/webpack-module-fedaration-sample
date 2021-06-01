const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
	.ModuleFederationPlugin;
const path = require("path");

module.exports = {
	entry: "./index.jsx",
	mode: "development",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 1337,
	},
	output: {
		publicPath: "auto",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: ["@babel/preset-react"],
				},
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "home",
			filename: "remoteEntry.js",
			remotes: {
				comic: `comic@${getRemoteEntryUrl(1338)}`,
			},
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
	],
};

function getRemoteEntryUrl(port) {
	const { CODESANDBOX_SSE, HOSTNAME = "" } = process.env;

	// Check if the example is running on codesandbox
	// https://codesandbox.io/docs/environment
	if (!CODESANDBOX_SSE) {
		return `//localhost:${port}/remoteEntry.js`;
	}

	const parts = HOSTNAME.split("-");
	const codesandboxId = parts[parts.length - 1];

	return `//${codesandboxId}-${port}.sse.codesandbox.io/remoteEntry.js`;
}
