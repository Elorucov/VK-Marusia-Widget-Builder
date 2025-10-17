import React from 'react';
import WidgetContainer from './blocks/WidgetContainer';
import WidgetHeader from './blocks/WidgetHeader';
import WidgetFooter from './blocks/WidgetFooter';
import ActionVkcom from './blocks/ActionVkcom';
import Text from './blocks/Text';
import ScrollBox from './blocks/ScrollBox';
import './widget.css';

const Counter = ({ mini_apps, games, groups, profiles, item, onAction, onFormatLink }) => {
	let v = item.payload, 
	h = v.header_title, 
	f = v.header_icon, 
	g = v.items,
	_ = v.root_style, 
	C = v.action, 
	E = f && f[0], 
	y = null == E ? void 0 : E.url, 
	k = 100;

	switch ((g || []).length) {
    	case 1:
            k = 100;
            break;
        case 2:
            k = 50;
            break;
        case 3:
            k = 33;
            break;
        default:
            k = 37;
    }

	return (<WidgetContainer action={C} meta={{ mini_apps: mini_apps, games: games, profiles: profiles, groups: groups }}>
			{h && <WidgetHeader label={h} size={24} icon={y} action={C}/>}
			<ScrollBox>
				<div className="SAKWidgetCounter__scrollRow">
					{g && g.map((e, t) => {
						let a, s = e.title && e.title.style, 
						l = Object.assign(Object.assign({}, _.title), s), 
						i = e.subtitle && e.subtitle.style, 
						c = Object.assign(Object.assign({}, _.subtitle), i);

						let style = {
                        	width: `${k}%`,
                        	minWidth: `${k}%`,
                        	maxWidth: `${k}%`
                    	};

						return (<ActionVkcom key={`${(a = e.title) === null || a === void 0 ? void 0 : a.value}${e.counter.value}`} action={e.action} className="SAKWidgetCounter__tappable" style={style}>
							<div className="SAKWidgetCounter__item" key={t}>
								{e.counter && <Text title={e.counter.value} styles={e.counter.style} className="SAKWidgetCounter__text" breakAll={true}/>}
								{e.title && <Text title={e.title.value} styles={l}/>}
								{e.subtitle && <Text title={e.subtitle.value} styles={c} isSubtitle={true}/>}
							</div>
						</ActionVkcom>);
					})}
				</div>
			</ScrollBox>
			<WidgetFooter item={item} mini_apps={mini_apps} profiles={profiles} games={games} groups={groups} showDivider={true}/>
		</WidgetContainer>);
};

export default Counter;