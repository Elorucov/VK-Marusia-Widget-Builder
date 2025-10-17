import React from 'react';
import '../widget.css';

const TextContainer = ({ children, align, className }) => {
	const classes = ["SAKWidget__textContainer"];

	return align && classes.push(`SAKWidget__textContainer--align-${align}`),
            className && classes.push(className),
            (<div className={classes.join(" ")}>{children}</div>);
};

export default TextContainer;