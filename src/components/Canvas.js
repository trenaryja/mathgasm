import React from "react";
import CanvasDraw from "react-canvas-draw";
import { defaults } from "../utils/utils";

export default (props) => {
	return (
		<CanvasDraw
			brushRadius={props.brushRadius}
			brushColor={props.brushColor}
			hideGrid
			lazyRadius={5}
			canvasHeight={defaults.size}
			canvasWidth={defaults.size}
			ref={props.reference}
		/>
	);
};
