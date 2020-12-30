module.exports = {
	plugins: [
		`gatsby-plugin-sass`,
		`gatsby-plugin-material-ui`,
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
	],
};
