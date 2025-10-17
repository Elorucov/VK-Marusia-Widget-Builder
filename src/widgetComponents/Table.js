import React from 'react';
import WidgetContainer from './blocks/WidgetContainer';
import WidgetContent from './blocks/WidgetContent';
import WidgetHeader from './blocks/WidgetHeader';
import WidgetFooter from './blocks/WidgetFooter';
import ActionVkcom from './blocks/ActionVkcom';
import TextContainer from './blocks/TextContainer';
import Text from './blocks/Text';
import { Image } from './blocks/Image';
import './widget.css';

const TableItem = ({ children, flex, align, action }) => {
	let justify = (e=> e === "center" ? "center" : e === "left" ? "flex-start" : e === "right" ? "flex-end" : "")(align);
	return (<ActionVkcom action={action} className="SAKWidgetTable__item" style={{ flex: flex, justifyContent: justify }}>
		{children}
	</ActionVkcom>);
};

const Table = ({ mini_apps, games, groups, profiles, item }) => {
	let meta = {
        groups: groups,
        profiles: profiles,
        mini_apps: mini_apps,
        games: games
    }, 
    v = item.payload, 
    h = v.header_title, 
    f = v.header_icon, 
    g = v.items, 
    _ = v.root_style, 
    C = v.action, 
    E = f && f[0], 
    y = E == null ? void 0 : E.url;

	return (<WidgetContainer action={C} meta={meta}>
			{h && <WidgetHeader label={h} size={24} icon={y} action={C}/>}
			{g && g.map((e, t) => {
				return (<WidgetContent direction="row" key={t} className="SAKWidgetTable__content">
					{e.map((e, s) => {
						console.log(`Table r${t} c${s}`);
						let i, c = _.columns[s];

						// Строка ниже — это багфикс, в оригинале (т. е. в фастчате vk.com и web.vk.me) её нет,
						// из-за чего виджет не отображается, если root_style.colums.length меньше items-ов.  
						if (c === undefined) c = _.columns[_.columns.length - 1];

						let u = {
                        	image: {
                            	type: c.image === null || c.image === void 0 ? void 0 : c.image.type
                        	}
                    	},
                    	m = c.title, 
                    	p = c.subtitle, 
                    	v = c.align === "left" || c.align === "center";

                    	return (<TableItem align={c.align} flex={_.sizes[s]} action={e.action} key={`${(i = e.title) === null || i === void 0 ? void 0 : i.value}${s}`}>
                    		{v && e.image && <div className="SAKWidgetTable__imageLeft">
                    			<Image styles={u} items={[e.image]} meta={meta} heightPrior="24px" widthPrior="24px"/>
                    		</div>}
                    		<TextContainer className="SAKWidgetTable__text" align={c.align}>
                    			{e.title && <Text title={e.title.value} styles={m} breakAll={true}/>}
                    			{e.subtitle && <Text title={e.subtitle.value} styles={p} isSubtitle={true} breakAll={true}/>}
                    		</TextContainer>
                    		{!v && e.image && <div className="SAKWidgetTable__imageRight">
                    			<Image styles={u} items={[e.image]} meta={meta} heightPrior="24px" widthPrior="24px"/>
                    		</div>}
                    	</TableItem>);
					})}
				</WidgetContent>)
			})}
			<WidgetFooter item={item} mini_apps={mini_apps} profiles={profiles} games={games} groups={groups} showDivider={true}/>
		</WidgetContainer>);
};

export default Table;