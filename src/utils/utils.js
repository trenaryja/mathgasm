import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
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

const font = (size) => `${size}px Roboto`;

const dec2Hex = (x, padding) => {
	let hex = Math.round(Number(x * 255)).toString(16);
	padding = padding ? 2 : padding;
	while (hex.length < padding) hex = "0" + hex;
	return hex;
};

export const defaults = {
	filename: "mathgasm.png",
	brushColor: theme.palette.primary.main,
	backgroundColor: theme.palette.primary.contrastText,
	showBackground: true,
	brushWidth: 1,
	size: Math.min(window.innerWidth, 500),
	font: font,
	dec2Hex: dec2Hex,
	theme: theme,
	variant: "outlined",
};
