module.exports = {
	plugins: [
		`gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: "mathgasm",
				short_name: "mathgasm",
				start_url: "/",
				background_color: "#9266cc",
				theme_color: "#9266cc",
				display: "standalone",
				icon: "src/images/favicon.png",
			},
		},
		{
			resolve: "gatsby-plugin-material-ui",
			options: {
				pathToTheme: "src/utils/theme.js",
			},
		},
	],
};
