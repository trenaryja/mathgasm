import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import chroma from "chroma-js";
import Canvas from "../components/Canvas";
import ColorPicker from "../components/ColorPicker";
import {
	Slider,
	ThemeProvider,
	CssBaseline,
	TextField,
	Button,
	FormControlLabel,
	Switch,
} from "@material-ui/core";
import {
	canvasArray2Png,
	drawPositiveXY,
	getCanvasElement,
	getCanvasElements,
} from "../utils/canvas.utils";
import { defaults } from "../utils/utils";
import * as styles from "../styles/styles";

const Index = () => {
	const canvas = useRef(null);
	const [brushColor, setBrushColor] = useState(
		chroma(defaults.brushColor).hsv().concat(1),
	);
	const [brushRadius, setBrushRadius] = useState(defaults.brushWidth);
	const [chartTitle, setChartTitle] = useState("");
	const [xAxisTitle, setXAxisTitle] = useState("");
	const [yAxisTitle, setYAxisTitle] = useState("");
	const [xAxisMaxLabel, setXAxisMaxLabel] = useState("");
	const [yAxisMaxLabel, setYAxisMaxLabel] = useState("");
	const [showBackground, setShowBackground] = useState(
		defaults.showBackground,
	);
	const [h, s, v, a] = brushColor;
	const brushColorHex = chroma({ h, s, v }).alpha(a).hex("rgba");

	useEffect(() => {
		drawChartBase();
		return drawChartBase;
	});

	const handleExport = () => {
		const canvasElements = [...getCanvasElements().slice(1)].reverse();
		canvasArray2Png(canvasElements, showBackground);
	};

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
					onChange={(e) => setChartTitle(e.target.value)}
				/>
				<div style={styles.fieldGrid}>
					<TextField
						value={xAxisTitle}
						label="X Axis Title"
						onChange={(e) => setXAxisTitle(e.target.value)}
					/>
					<TextField
						value={yAxisTitle}
						label="Y Axis Title"
						onChange={(e) => setYAxisTitle(e.target.value)}
					/>
					<TextField
						value={xAxisMaxLabel}
						label="X Axis Max Label"
						onChange={(e) => setXAxisMaxLabel(e.target.value)}
					/>
					<TextField
						value={yAxisMaxLabel}
						label="Y Axis Max Label"
						onChange={(e) => setYAxisMaxLabel(e.target.value)}
					/>
				</div>

				<FormControlLabel
					label="Show Background"
					control={
						<Switch
							checked={showBackground}
							onChange={(e) =>
								setShowBackground(e.target.checked)
							}
							color="primary"
						/>
					}
				/>

				<ColorPicker
					color={brushColor}
					onChange={setBrushColor}
					showBackground={showBackground}
				/>

				<Slider
					min={1}
					onChange={(_e, value) => setBrushRadius(value)}
				/>

				<Canvas
					brushColor={brushColorHex}
					brushRadius={brushRadius}
					reference={canvas}
				/>

				<div style={styles.canvasButtons}>
					<Button onClick={() => canvas.current.clear()}>
						Clear
					</Button>
					<Button onClick={() => canvas.current.undo()}>Undo</Button>
					<Button onClick={handleExport}>Export</Button>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default Index;
