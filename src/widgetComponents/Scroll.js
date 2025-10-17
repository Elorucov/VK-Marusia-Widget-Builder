import React from 'react';
import WidgetContainer from './blocks/WidgetContainer';
import WidgetHeader from './blocks/WidgetHeader';
import WidgetFooter from './blocks/WidgetFooter';
import ActionVkcom from './blocks/ActionVkcom';
import Text from './blocks/Text';
import { Image } from './blocks/Image';
import ScrollBox from './blocks/ScrollBox';
import './widget.css';

const alignments = {
    left: "start",
    center: "center",
    right: "end",
    default: "center"
};

const ScrollText = ({ children, align }) => {
	const textAlign = align ? alignments[align] : alignments.left;
	return (<div className="SAKWidgetScroll__text" style={{ textAlign: textAlign }}>{children}</div>);
};

const ScrollBadge = ({ badge, styles }) => {
	const classNames = ["SAKWidgetScroll__badge"];
	styles.align && classNames.push(`SAKWidgetScroll__badge--align-${styles.align}`);
	badge.type && classNames.push(`SAKWidgetScroll__badge--type-${badge.type}`);
	return (<div className={classNames.join(" ")}>
		<Text title={badge.value} styles={{ color: "white" }}/>
	</div>);
};

const Scroll = ({ mini_apps, games, groups, profiles, item }) => {
	const f = {
        mini_apps: mini_apps,
        games: games,
        profiles: profiles,
        groups: groups
    }, 
    g = item.payload, 
    _ = g.header_title, 
    C = g.header_icon, 
    E = g.root_style, 
    y = g.items, 
    k = g.action, 
    w = C && C[C.length - 1], 
    b = null == w ? void 0 : w.url;

	return (<WidgetContainer action={k} meta={f}>
			{_ && <WidgetHeader label={_} size={24} icon={b} action={k}/>}
			<ScrollBox className="SAKWidgetScroll_box">
				<div className="SAKWidget__scrollBoxInner">
					{y && y.map((e, t) => {
						let a, l, 
						u = e.badge, 
						v = e.title && e.title.style, 
						h = Object.assign(Object.assign({}, E.title), v), 
						g = e.description && e.description.style, 
						_ = Object.assign(Object.assign({}, E.description), g);

						const title = (a = e.title) === null || a === void 0 ? void 0 : a.value;
						const description = (l = e.description) === null || l === void 0 ? void 0 : l.value;

						return (<ActionVkcom action={e.action} key={`${(a = e.title) === null || a === void 0 ? void 0 : a.value}${t}`}>
							<div className="SAKWidgetScroll__card">
								{u && <ScrollBadge badge={u} styles={E.badge}/>}
								{e.image && <Image styles={E} items={[e.image]} meta={f} widthPrior="56px" heightPrior="56px"></Image>}
								<ScrollText align={E.align}>
									{(title) && <Text styles={h} isScroll={true} title={title}/>}
									{(description) && <Text styles={_} isScroll={true} isSubtitle={true} title={description}/>}
								</ScrollText>
							</div>
						</ActionVkcom>);
					})}
					</div>
			</ScrollBox>
			<WidgetFooter item={item} mini_apps={mini_apps} profiles={profiles} games={games} groups={groups} showDivider={true}/>
		</WidgetContainer>);
};

export default Scroll;