import React from 'react';
import '../widget.css';

const WidgetHeaderImage = ({ icon, size }) => {
	return (<img className="SAKWidget__headerImage" src={icon} width={size} height={size} alt="WidgetHeaderImage"></img>);
};

export default WidgetHeaderImage;