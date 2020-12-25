import React, { useRef, useEffect, useState } from "react";
import Canvas from "../components/Canvas";
import {
	Slider,
	ThemeProvider,
	CssBaseline,
	TextField,
	Button,
} from "@material-ui/core";
import { SketchPicker } from "react-color";
import { canvasArray2Png, wrapText } from "../utils/canvas.utils";
import defaults from "../utils/defaults";
import * as styles from "../styles/styles";

export default () => {
	const canvas = useRef(null);
	const [brushColor, setBrushColor] = useState(defaults.brushColor);
	const [brushRadius, setBrushRadius] = useState(defaults.brushWidth);
	const [chartTitle, setChartTitle] = useState("");
	const [xAxisTitle, setXAxisTitle] = useState("");
	const [yAxisTitle, setYAxisTitle] = useState("");
	const [xAxisMaxLabel, setXAxisMaxLabel] = useState("");
	const [yAxisMaxLabel, setYAxisMaxLabel] = useState("");

	useEffect(() => {
		drawChartBase();
		return drawChartBase;
	});

	const getCanvasElements = () =>
		Array.from(document.getElementsByTagName("canvas"));

	const getCanvasElement = (layerIndex) =>
		getCanvasElements()[layerIndex || 1];

	const handleClear = () => canvas.current.clear();

	const handleUndo = () => canvas.current.undo();

	const handleExport = () => {
		const canvasElements = [...getCanvasElements().slice(1)].reverse();
		canvasArray2Png(canvasElements);
	};

	const handleBrushColorChange = (color) => setBrushColor(color.hex);

	const handleBrushRadiusChange = (_e, value) => setBrushRadius(value);

	const handleTitleChange = (e) => setChartTitle(e.target.value);

	const handleXAxisChange = (e) => setXAxisTitle(e.target.value);

	const handleYAxisChange = (e) => setYAxisTitle(e.target.value);

	const handleXAxisMaxLabelChange = (e) => setXAxisMaxLabel(e.target.value);

	const handleYAxisMaxLabelChange = (e) => setYAxisMaxLabel(e.target.value);

	const drawChartBase = () => {
		setTimeout(() => {
			const baseCanvas = getCanvasElement(3);
			const ctx = baseCanvas.getContext("2d");
			ctx.clearRect(0, 0, defaults.size, defaults.size);
			drawTitle(ctx);
			drawAxes(ctx);
		}, 0);
	};

	const drawTitle = (ctx) => {
		const fontSize = defaults.size / 20;
		ctx.font = defaults.font(fontSize);
		ctx.textAlign = "center";
		wrapText(
			ctx,
			chartTitle,
			defaults.size / 2,
			fontSize,
			defaults.size - defaults.size / 5,
			fontSize,
		);
	};

	const drawAxes = (ctx) => {
		const inset = defaults.size / 7.5;
		const tickOffset = defaults.size / 50;
		const bottom = defaults.size - inset;
		const middle = defaults.size / 2;

		ctx.beginPath();
		ctx.moveTo(inset - tickOffset, inset);
		ctx.lineTo(inset + tickOffset, inset);
		ctx.moveTo(inset, inset);
		ctx.lineTo(inset, bottom);
		ctx.lineTo(bottom, bottom);
		ctx.moveTo(bottom, bottom - tickOffset);
		ctx.lineTo(bottom, bottom + tickOffset);
		ctx.stroke();

		const fontSize = defaults.size / 30;
		ctx.font = defaults.font(fontSize);
		ctx.textAlign = "center";
		const axisTitleMaxLength = defaults.size - inset * 2;

		ctx.fillText(
			xAxisTitle,
			middle,
			defaults.size - tickOffset,
			axisTitleMaxLength,
		);

		ctx.translate(middle, middle);
		ctx.rotate((-90 * Math.PI) / 180);
		ctx.translate(-middle, -middle);

		ctx.fillText(
			yAxisTitle,
			middle,
			fontSize + tickOffset,
			axisTitleMaxLength,
		);

		ctx.setTransform(1, 0, 0, 1, 0, 0);
	};

	return (
		<ThemeProvider theme={defaults.theme}>
			<div style={styles.app}>
				<CssBaseline />
				<TextField
					value={chartTitle}
					label="Chart Title"
					onChange={handleTitleChange}
				/>
				<div style={styles.fieldGrid}>
					<TextField
						value={xAxisTitle}
						label="X Axis Title"
						onChange={handleXAxisChange}
					/>
					<TextField
						value={yAxisTitle}
						label="Y Axis Title"
						onChange={handleYAxisChange}
					/>
					<TextField
						disabled
						value={xAxisMaxLabel}
						label="X Axis Max Label"
						onChange={handleXAxisMaxLabelChange}
					/>
					<TextField
						disabled
						value={yAxisMaxLabel}
						label="Y Axis Max Label"
						onChange={handleYAxisMaxLabelChange}
					/>
				</div>

				<SketchPicker
					width={defaults.size / 2}
					disableAlpha
					presetColors={[]}
					color={brushColor}
					onChange={handleBrushColorChange}
				/>

				<Slider min={1} onChange={handleBrushRadiusChange} />

				<Canvas
					brushColor={brushColor}
					brushRadius={brushRadius}
					reference={canvas}
				/>

				<div style={styles.canvasButtons}>
					<Button onClick={handleClear}>Clear</Button>
					<Button onClick={handleUndo}>Undo</Button>
					<Button onClick={handleExport}>Export</Button>
				</div>
			</div>
		</ThemeProvider>
	);
};
