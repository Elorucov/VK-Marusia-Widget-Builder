import React from 'react';
import WidgetContainer from './blocks/WidgetContainer';
import WidgetHeaderImage from './blocks/WidgetHeaderImage';
import ActionVkcom from './blocks/ActionVkcom';
import TextContainer from './blocks/TextContainer';
import Text from './blocks/Text';
import { Icon24Chevron } from '@vkontakte/icons';
import './widget.css';

const Internal = ({ mini_apps, games, groups, profiles, item }) => {
	const p = item.payload;
	const title = p.title && p.title.value;
	const subtitle = p.subtitle && p.subtitle.value;
	const headerIcon = p.header_icon && p.header_icon[0];

	return (<WidgetContainer action={p.action} meta={{ mini_apps: mini_apps, games: games, profiles: profiles, groups: groups }}>
			<ActionVkcom action={p.action}>
				<div className="SAKWidget__header">
					<WidgetHeaderImage icon={headerIcon.url} size={24}/>
					<TextContainer>
						{title && <Text title={title} styles={Object.assign(Object.assign({}, p.root_style.title), p.title && p.title.style)}/>}
						{subtitle && <Text isSubtitle title={subtitle} styles={Object.assign(Object.assign({}, p.root_style.subtitle), p.subtitle && p.subtitle.style)}/>}
					</TextContainer>
					<div className="SAKWidget__headerIcon">
						<Icon24Chevron/>
					</div>
				</div>
			</ActionVkcom>
		</WidgetContainer>);
};

export default Internal;