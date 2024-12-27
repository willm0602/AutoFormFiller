const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        popup: "./src/Popup.tsx",
        settings: "./src/Settings.tsx",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js", // Use [name] to create unique filenames for popup and settings
    },
    mode: "production",
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    "css-loader", // Resolves CSS imports
                    "postcss-loader", // Processes CSS with PostCSS plugins
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css", // Output separate CSS files
        }),
        new HtmlWebpackPlugin({
            template: "./src/popup.html",
            chunks: ["popup"], // Link popup.js with popup.html
            filename: "popup.html",
        }),
        new HtmlWebpackPlugin({
            template: "./src/settings.html",
            chunks: ["settings"], // Link settings.js with settings.html
            filename: "settings.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "manifest.json",
                    to: ".",
                },
            ],
        }),
    ],
};
