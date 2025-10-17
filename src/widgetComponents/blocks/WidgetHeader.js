import React from 'react';
import { Icon24Chevron } from '@vkontakte/icons';
import WidgetHeaderImage from './WidgetHeaderImage.js';
import ActionVkcom from './ActionVkcom.js';
import '../widget.css';

const WidgetHeader = ({ label, icon, size, action }) => {
	return (<ActionVkcom action={action} className="SAKWidget__header">
		{icon && <WidgetHeaderImage icon={icon} size={size}/>}
		<div className="SAKWidget__headerTitle">{label}</div>
		<div className="SAKWidget__headerIcon">
			<Icon24Chevron/>
		</div>
	</ActionVkcom>);
};

export default WidgetHeader;