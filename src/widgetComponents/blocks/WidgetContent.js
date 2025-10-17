import React from 'react';
import { cx } from '../Utils.js';
import '../widget.css';

const WidgetContainer = ({ children, direction, className }) => {
	let d = direction || "row";
	const classes = ["SAKWidget__content", `SAKWidget__content--${d}`, className];

	return (<div className={cx(classes)}>{children}</div>);
};

export default WidgetContainer;