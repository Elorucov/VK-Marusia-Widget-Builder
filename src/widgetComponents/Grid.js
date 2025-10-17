import React from 'react';
import WidgetContainer from './blocks/WidgetContainer';
import WidgetHeader from './blocks/WidgetHeader';
import WidgetFooter from './blocks/WidgetFooter';
import ActionVkcom from './blocks/ActionVkcom';
import { Image } from './blocks/Image';
import './widget.css';

const Grid = ({ mini_apps, games, groups, profiles, item }) => {
	const p = {
                groups: groups,
                profiles: profiles,
                mini_apps: mini_apps,
                games: games
            }
              , v = item.payload
              , h = v.header_title
              , f = v.header_icon
              , g = v.items
              , _ = v.action
              , C = v.root_style
              , E = f && f[0]
              , y = null == E ? void 0 : E.url;

	return (<WidgetContainer action={_} meta={p}>
			{h && <WidgetHeader label={h} size={24} icon={y} action={_}/>}
				<div className="SAKWidgetGrid">
					{g && g.map((e, t) => {
						const a = "medium" === C.size ? "medium" : "large";
						return (<div key={t} className={`SAKWidgetGrid__item SAKWidgetGrid__item--${a}`}>
							<ActionVkcom action={e.action} className="SAKWidgetGrid__itemInner">
								<Image styles={{}} items={[e]} meta={p} widthPrior="100%" heightPrior="100$"/>
							</ActionVkcom>
						</div>);
					})}
				</div>
			<WidgetFooter item={item} mini_apps={mini_apps} profiles={profiles} games={games} groups={groups} showDivider={true}/>
		</WidgetContainer>);
};

export default Grid;