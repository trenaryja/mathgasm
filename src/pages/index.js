import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Canvas from "../components/Canvas";
import {
	Slider,
	ThemeProvider,
	CssBaseline,
	TextField,
	Button,
	FormControlLabel,
	Switch,
} from "@material-ui/core";
import { SketchPicker } from "react-color";
import { canvasArray2Png, drawPositiveXY } from "../utils/canvas.utils";
import { defaults } from "../utils/utils";
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
	const [showBackground, setShowBackground] = useState(
		defaults.showBackground,
	);

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
		canvasArray2Png(canvasElements, showBackground);
	};

	const handleBrushColorChange = (color) =>
		setBrushColor(color.hex + defaults.dec2Hex(color.rgb.a));

	const handleBrushRadiusChange = (_e, value) => setBrushRadius(value);

	const handleTitleChange = (e) => setChartTitle(e.target.value);

	const handleXAxisChange = (e) => setXAxisTitle(e.target.value);

	const handleYAxisChange = (e) => setYAxisTitle(e.target.value);

	const handleXAxisMaxLabelChange = (e) => setXAxisMaxLabel(e.target.value);

	const handleYAxisMaxLabelChange = (e) => setYAxisMaxLabel(e.target.value);

	const handleShowBackGroundChange = (e) =>
		setShowBackground(e.target.checked);

	const drawChartBase = () => {
		setTimeout(() => {
			const baseCanvas = getCanvasElement(3);
			baseCanvas.parentElement.style.background = showBackground
				? defaults.backgroundColor
				: null;
			const ctx = baseCanvas.getContext("2d");
			ctx.clearRect(0, 0, defaults.size, defaults.size);
			drawPositiveXY(
				ctx,
				chartTitle,
				xAxisTitle,
				yAxisTitle,
				xAxisMaxLabel,
				yAxisMaxLabel,
			);
		}, 0);
	};

	return (
		<ThemeProvider theme={defaults.theme}>
			<Helmet>
				<title>M A T H G A S M</title>
			</Helmet>
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
						value={xAxisMaxLabel}
						label="X Axis Max Label"
						onChange={handleXAxisMaxLabelChange}
					/>
					<TextField
						value={yAxisMaxLabel}
						label="Y Axis Max Label"
						onChange={handleYAxisMaxLabelChange}
					/>
				</div>

				<FormControlLabel
					label="Show Background"
					control={
						<Switch
							checked={showBackground}
							onChange={handleShowBackGroundChange}
							color="primary"
						/>
					}
				/>

				<SketchPicker
					width={defaults.size / 2}
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
