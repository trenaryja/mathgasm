import theme from "./theme";

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
