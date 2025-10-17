import React from 'react';
import { cx } from '../Utils.js';
import '../widget.css';

const WidgetContainer = ({ children, action, className, translucent, meta }) => {
	const classes = ["SAKWidget__container", className];
	translucent && classes.push("SAKWidget__container--translucent");

	return (<div className={cx(classes)}>{children}</div>);
};

export default WidgetContainer;