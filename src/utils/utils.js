import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#9266ccff",
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
	overrides: {
		MuiSlider: {
			root: {
				height: 8,
			},
			thumb: {
				height: 24,
				width: 24,
				border: "2px solid",
				marginTop: -8,
				marginLeft: -12,
			},
			active: {},
			valueLabel: {
				left: "calc(-50% + 4px)",
			},
			track: {
				height: 8,
				borderRadius: 4,
			},
			rail: {
				height: 8,
				borderRadius: 4,
			},
		},
	},
});

export const font = (size) => `${size}px Roboto`;

export const defaults = {
	filename: "mathgasm.png",
	brushColor: theme.palette.primary.main,
	backgroundColor: theme.palette.primary.contrastText,
	showBackground: true,
	brushWidth: 1,
	size: 500,
	theme: theme,
	variant: "outlined",
};
