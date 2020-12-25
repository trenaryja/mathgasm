import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#9266cc",
		},
	},
	props: {
		MuiButton: {
			variant: "outlined",
		},
		MuiTextField: {
			fullWidth: true,
			variant: "outlined",
		},
	},
});

const font = (size) => `${size}px Roboto`;

export default {
	filename: "mathgasm.png",
	brushColor: theme.palette.primary.main,
	brushWidth: 1,
	size: 500,
	font: font,
	theme: theme,
	variant: "outlined",
};
