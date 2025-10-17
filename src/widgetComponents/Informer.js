import React from 'react';
import WidgetContainer from './blocks/WidgetContainer';
import WidgetContent from './blocks/WidgetContent';
import WidgetHeader from './blocks/WidgetHeader';
import WidgetFooter from './blocks/WidgetFooter';
import ActionVkcom from './blocks/ActionVkcom';
import Button from './blocks/Button';
import TextContainer from './blocks/TextContainer';
import Text from './blocks/Text';
import { Image, Icon } from './blocks/Image';
import './widget.css';

const m = function(e, t) {
    var a = {};
    for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (a[r] = e[r]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var n = 0;
        for (r = Object.getOwnPropertySymbols(e); n < r.length; n++)
            t.indexOf(r[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[n]) && (a[r[n]] = e[r[n]])
    }
    return a
};

function g(e, t) {
    var a = null, r = {};
    return e && (a = e.value, r = Object.assign({}, e.style)),
    t && (r = Object.assign(Object.assign({}, r), t)),
    [a, r];
}

const InformerCounter = ({ payload, styles }) => {
	return (<div className="SAKWidgetInformer__counter">
		<Text title={payload == null ? void 0 : payload.value} styles={styles} className="SAKWidgetInformer__counterText" breakAll={true}/>
	</div>);
};

const InformerSide = (props) => {
    let t = props.name, a = m(props, ["name"]);
    let p = Object.assign({}, a);
    switch (t) {
    	case "text":
    	case "button":
        	return (<Text {...p}/>);
    	case "image":
        	return (<Image {...p}/>);
    	case "icon":
    		let iconProps = Object.assign({}, a, {
            	widthPrior: "28px",
            	heightPrior: "28px"
        	});
        	return (<Icon {...iconProps}/>);
    	case "counter":
        	return (<InformerCounter {...p}/>);
    	default:
        	return null;
    }
}

const InformerUserStack = ({ children }) => <div className="SAKWidgetInformer__userStack">{children}</div>;

const InformerLeft = ({ mini_apps, games, groups, profiles, left, root_style }) => {
	let meta = {
        groups: groups,
        profiles: profiles,
        mini_apps: mini_apps,
        games: games
    };
	return (<div className="SAKWidgetInformer__left">
		<InformerSide name={left.type} styles={root_style} items={[left.payload]} payload={left.payload} meta={meta}/>
	</div>);
};

const InformerImage = ({ children }) => <div className="SAKWidgetInformer__image">{children}</div>;

const InformerMiddle = ({ mini_apps, games, groups, profiles, middle, root_style }) => {
	let meta = {
        groups: groups,
        profiles: profiles,
        mini_apps: mini_apps,
        games: games
    };
    let p = g(middle.title, root_style == null ? void 0 : root_style.title), 
    v = p[0], f = p[1], C = g(middle.subtitle, root_style == null ? void 0 : root_style.subtitle), 
    E = C[0], y = C[1], k = g(middle.second_subtitle, root_style == null ? void 0 : root_style.second_subtitle), 
    w = k[0], b = k[1], M = middle.buttons || [];
    !M.length && middle.button && (M = [middle.button]);
    return (<TextContainer className="SAKWidgetInformer__middle">
    	{v && <Text title={v} styles={f}/>}
    	{E && <Text title={E} styles={y} isSubtitle={true}/>}
    	{w && <Text title={w} styles={b} isSubtitle={true}/>}
    	{middle.avatars && <InformerUserStack>
    		{middle.avatars.map((e, t) => {
    			let s = {
                    image: Object.assign(Object.assign({}, root_style == null ? void 0 : root_style.image), {
                        type: e.style || "circle",
                        image_padding: root_style == null ? void 0 : root_style.image_padding
                    })
                };
                return (<InformerImage key={t}>
                	<Image styles={s} items={[e]} meta={meta} widthPrior="36px" heightPrior="36px"/>
                </InformerImage>);
    		})}
    	</InformerUserStack>}
    	{M.length ? <div className="SAKWidgetInformer__buttons">
    		{M.map((e, t) => {
    			let n, l, o = e && e.icon, 
    			i = e && ((n = e.title) === null || n === void 0 ? void 0 : n.value), 
    			c = e && e.style, 
    			d = Object.assign(Object.assign({}, root_style == null ? void 0 : root_style.button), c);
    			let key = `${(l = e.title) === null || l === void 0 ? void 0 : l.value}${t}`;

    			return (<Button key={key} icon={o} title={i} styles={d} action={e.action} className="SAKWidgetInformer__button"/>);
    		})}
    	</div> : null}
    </TextContainer>);
};

const InformerRight = ({ mini_apps, games, groups, profiles, right, root_style }) => {
	let meta = {
        groups: groups,
        profiles: profiles,
        mini_apps: mini_apps,
        games: games
    };
	return (<div className="SAKWidgetInformer__right">
		<InformerSide name={right.type} styles={root_style} payload={right.payload} meta={meta}/>
	</div>);
};

const InformerRow = ({ mini_apps, games, groups, profiles, row, root_style }) => <ActionVkcom action={row.action}>
	<WidgetContent className="SAKWidgetInformer__content">
		{row.left && <InformerLeft profiles={profiles} groups={groups} games={games} mini_apps={mini_apps} left={row.left} root_style={root_style.left}/>}
		{row.middle && <InformerMiddle profiles={profiles} groups={groups} games={games} mini_apps={mini_apps} middle={row.middle} root_style={root_style.middle}/>}
		{row.right && <InformerRight profiles={profiles} groups={groups} games={games} mini_apps={mini_apps} right={row.right} root_style={root_style.right}/>}
	</WidgetContent>
</ActionVkcom>;

const Informer = ({ mini_apps, games, groups, profiles, item }) => {
	let meta = {
        groups: groups,
        profiles: profiles,
        mini_apps: mini_apps,
        games: games
    }, 
    c = item.payload, 
    d = c.header_title, 
    m = c.header_icon, 
    p = c.rows, 
    v = c.root_style, 
    h = c.action, 
    f = m && m[m.length - 1];

	return (<WidgetContainer action={h} meta={meta}>
			{d && <WidgetHeader label={d} size={24} icon={f == null ? void 0 : f.url} action={h}/>}
			{p && p.map((e, l) => {
				return (<InformerRow key={l} row={e} root_style={v[0]} profiles={profiles} groups={groups} games={games} mini_apps={mini_apps}/>)
			})}
			<WidgetFooter item={item} mini_apps={mini_apps} profiles={profiles} games={games} groups={groups} showDivider={true}/>
		</WidgetContainer>);
};

export default Informer;