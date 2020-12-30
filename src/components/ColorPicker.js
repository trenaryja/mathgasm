import React from "react";
import { Slider, TextField, makeStyles } from "@material-ui/core";
import chroma from "chroma-js";

const options = {
	hue: "h",
	saturation: "s",
	value: "v",
	alpha: "a",
};

const hueSliderStyles = makeStyles({
	thumb: {
		color: (props) => props.thumbColor,
	},
	rail: {
		opacity: 1,
		background: `linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)`,
	},
	track: {
		display: "none",
	},
});

const gradientSliderStyles = makeStyles({
	thumb: {
		color: (props) => props.thumbColor,
	},
	rail: {
		opacity: 1,
		background: (props) =>
			`linear-gradient(to right, ${props.leftColor}, ${props.rightColor}`, //TODO: Fix these styles not applying on first render
	},
	track: {
		display: "none",
	},
});

export default (props) => {
	const { color, onChange } = props;
	const [h, s, v, a] = color;
	const chromaColor = chroma({ h, s, v }).alpha(a);
	const chromaColorHex = chromaColor.hex("rgb");

	const hueSliderClasses = hueSliderStyles({
		thumbColor: chromaColorHex,
	});

	const saturationSliderClasses = gradientSliderStyles({
		thumbColor: chromaColorHex,
		leftColor: chroma({ h, s: 0, v }).hex("rgb"),
		rightColor: chroma({ h, s: 1, v }).hex("rgb"),
	});

	const valueSliderClasses = gradientSliderStyles({
		thumbColor: chromaColorHex,
		leftColor: chroma({ h, s, v: 0 }).hex("rgb"),
		rightColor: chroma({ h, s, v: 1 }).hex("rgb"),
	});

	const alphaSliderClasses = gradientSliderStyles({
		thumbColor: chromaColorHex,
		leftColor: "transparent",
		rightColor: chromaColorHex,
	});

	const handleChange = (option, value) => {
		switch (option) {
			case options.hue:
				onChange([value, s, v, a]);
				break;
			case options.saturation:
				onChange([h, value / 100, v, a]);
				break;
			case options.value:
				onChange([h, s, value / 100, a]);
				break;
			case options.alpha:
				onChange([h, s, v, value / 100]);
				break;
			default:
				break;
		}
	};

	return (
		<div
			style={{
				display: "grid",
				gap: "1em",
				gridTemplateRows: "1fr 1fr 1fr 1fr",
				gridTemplateColumns: "3fr 1fr",
				gridTemplateAreas: `
					'. preview'
					'. preview'
					'. preview'
					'. preview'
					'. preview'
				`,
			}}
		>
			<Slider
				classes={hueSliderClasses}
				max={360}
				value={h}
				onChange={(_e, value) => {
					handleChange(options.hue, value);
				}}
			/>
			<Slider
				classes={saturationSliderClasses}
				value={s * 100}
				onChange={(_e, value) =>
					handleChange(options.saturation, value)
				}
			/>
			<Slider
				classes={valueSliderClasses}
				value={v * 100}
				onChange={(_e, value) => handleChange(options.value, value)}
			/>
			<Slider
				classes={alphaSliderClasses}
				value={a * 100}
				onChange={(_e, value) => handleChange(options.alpha, value)}
			/>

			<div style={{ gridArea: "preview" }}>
				<svg viewBox="0 0 10 10" style={{ width: "100%" }}>
					<rect
						width={10}
						height={10}
						style={{
							fill: props.showBackground ? "white" : "none",
						}}
					/>
					<rect
						width={10}
						height={10}
						style={{
							fill: chromaColor.hex("rgba"),
						}}
					/>
				</svg>

				<TextField disabled value={chromaColor.hex("rgba")} />
			</div>
		</div>
	);
};
