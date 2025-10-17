import React from 'react';
import WidgetContainer from './blocks/WidgetContainer';
import WidgetHeader from './blocks/WidgetHeader';
import WidgetFooter from './blocks/WidgetFooter';
import ActionVkcom from './blocks/ActionVkcom';
import TextContainer from './blocks/TextContainer';
import Text from './blocks/Text';
import Button from './blocks/Button';
import './widget.css';

const Placeholder = ({ mini_apps, games, groups, profiles, item, onAction, onFormatLink }) => {
	const p = (onAction,
        onFormatLink,
        item.payload)
	const v = p.button;
	const h = p.title;
	const f = p.root_style;
	const g = p.action;
	const ht = p.header_title;
	const C = p.header_icon;
	const E = C && C[C.length - 1];
	const y = null == E ? void 0 : E.url;
	const k = h && h.style;
	const w = Object.assign(Object.assign({}, f.title), k);

	return (<WidgetContainer action={g} meta={{ mini_apps: mini_apps, games: games, profiles: profiles, groups: groups }}>
			{ht && <WidgetHeader label={ht} size={24} icon={y} action={g}/>}
			<ActionVkcom action={g}>
				<div className="SAKWidgetPlaceholder">
					<div className="SAKWidgetPlaceholder__text">
						<TextContainer>
							{h && <Text title={h.value} styles={w}/>}
						</TextContainer>
					</div>
					{v && v.title && <div className="SAKWidgetPlaceholder__button">
						<Button title={v.title.value} styles={{type: "outline"}} action={v.action}/>
					</div>}
				</div>
			</ActionVkcom>
			<WidgetFooter item={item} mini_apps={mini_apps} profiles={profiles} games={games} groups={groups} showDivider={true}/>
		</WidgetContainer>);
};

export default Placeholder;