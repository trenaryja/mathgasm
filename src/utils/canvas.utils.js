import defaults from "./defaults";

export const canvas2Png = (canvas, filename) => {
	const a = document.createElement("a");
	a.download = filename || defaults.filename;
	a.href = canvas.toDataURL("image/png;base64");
	a.dispatchEvent(new MouseEvent("click"));
};

export const canvasArray2Png = (canvasArray, filename) => {
	const mainCanvas = document.createElement("canvas");
	mainCanvas.width = defaults.size;
	mainCanvas.height = defaults.size;
	const mainContext = mainCanvas.getContext("2d");

	canvasArray.forEach((canvas) => {
		mainContext.drawImage(canvas, 0, 0);
	});

	canvas2Png(mainCanvas, filename);
};

export const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
	let line = "";
	let height = y;

	text.split(" ").forEach((word) => {
		const stringBuilder = `${line}${word} `;
		const { width } = context.measureText(stringBuilder);
		if (width > maxWidth) {
			context.fillText(line, x, height);
			line = word;
			height += lineHeight;
		} else {
			line = stringBuilder;
		}
	});

	context.fillText(line, x, height);
};
