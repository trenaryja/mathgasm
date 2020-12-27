import { defaults } from "./utils";

export const canvas2Png = (canvas, filename) => {
	const a = document.createElement("a");
	a.download = filename || defaults.filename;
	a.href = canvas.toDataURL("image/png;base64");
	a.dispatchEvent(new MouseEvent("click"));
};

export const canvasArray2Png = (canvasArray, showBackground, filename) => {
	const mainCanvas = document.createElement("canvas");
	mainCanvas.width = defaults.size;
	mainCanvas.height = defaults.size;
	const mainContext = mainCanvas.getContext("2d");
	if (showBackground) {
		mainContext.fillStyle = defaults.backgroundColor;
		mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
	}

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
			context.fillText(line.trim(), x, height);
			line = `${word} `;
			height += lineHeight;
		} else {
			line = stringBuilder;
		}
	});

	context.fillText(line.trim(), x, height);
};

export const drawPositiveXY = (
	ctx,
	chartTitle,
	xAxisTitle,
	yAxisTitle,
	xAxisMaxLabel,
	yAxisMaxLabel,
) => {
	const axisOffset = defaults.size / 7.5;
	const tickOffset = defaults.size / 50;
	const bottom = defaults.size - axisOffset;
	const middle = defaults.size / 2;
	const chartTitleFontSize = defaults.size / 15;
	const axisTitleFontSize = defaults.size / 20;
	const axisTitleMaxLength = defaults.size - axisOffset * 2;
	const axisMaxLabelFontSize = defaults.size / 40;
	const axisMaxLabelMaxLength = axisOffset * 2;
	ctx.textAlign = "center";

	ctx.beginPath();
	ctx.moveTo(axisOffset - tickOffset, axisOffset);
	ctx.lineTo(axisOffset + tickOffset, axisOffset);
	ctx.moveTo(axisOffset, axisOffset);
	ctx.lineTo(axisOffset, bottom);
	ctx.lineTo(bottom, bottom);
	ctx.moveTo(bottom, bottom - tickOffset);
	ctx.lineTo(bottom, bottom + tickOffset);
	ctx.stroke();

	ctx.font = defaults.font(chartTitleFontSize);
	wrapText(
		ctx,
		chartTitle,
		middle,
		chartTitleFontSize,
		defaults.size - axisOffset * 2,
		chartTitleFontSize,
	);

	ctx.font = defaults.font(axisTitleFontSize);
	ctx.fillText(
		xAxisTitle,
		middle,
		defaults.size - tickOffset,
		axisTitleMaxLength,
	);

	ctx.font = defaults.font(axisMaxLabelFontSize);
	ctx.fillText(
		xAxisMaxLabel,
		bottom,
		bottom + tickOffset * 2.5,
		axisMaxLabelMaxLength,
	);

	ctx.translate(middle, middle);
	ctx.rotate((-90 * Math.PI) / 180);
	ctx.translate(-middle, -middle);

	ctx.font = defaults.font(axisTitleFontSize);
	ctx.fillText(yAxisTitle, middle, axisTitleFontSize, axisTitleMaxLength);

	ctx.font = defaults.font(axisMaxLabelFontSize);
	ctx.fillText(
		yAxisMaxLabel,
		bottom,
		axisOffset + axisMaxLabelFontSize / 2 - tickOffset * 2.5,
		axisMaxLabelMaxLength,
	);

	ctx.setTransform(1, 0, 0, 1, 0, 0);
};
