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

const CardImage = ({ children, padding }) => {
	const classNames = ["SAKWidgetCard__image"];
	padding && classNames.push("SAKWidgetCard__image--padding");
	return (<div className={classNames.join(" ")}>{children}</div>);
};

const Card = ({ mini_apps, games, groups, profiles, item }) => {
	const v = item.payload
        , h = v.subtitle
        , f = v.title
        , g = v.second_subtitle
        , _ = v.header_title
        , C = v.header_icon
        , E = v.image
        , y = v.action
        , k = v.root_style
        , w = C && C[0]
        , b = null == w ? void 0 : w.url
        , M = f && f.style
        , I = Object.assign(Object.assign({}, k.title), M)
        , A = h && h.style
        , x = Object.assign(Object.assign({}, k.subtitle), A)
        , S = g && g.style
        , N = Object.assign(Object.assign({}, k.second_subtitle), S)
        , P = E ? {
            image: {
              type: E.type
            }
          } : void 0
        , R = !!((null == f ? void 0 : f.value) || (null == h ? void 0 : h.value) || (null == g ? void 0 : g.value));

	return (<WidgetContainer action={y} meta={{ mini_apps: mini_apps, games: games, profiles: profiles, groups: groups }}>
			{_ && <WidgetHeader label={_} size={24} icon={b} action={y}/>}
			<ActionVkcom action={y}>
				<WidgetContent direction="column">
					<CardImage padding={!!k.image_padding}>
						<Image widthPrior="100%" heightPrior="100%" styles={P} items={[E]} meta={{ mini_apps: mini_apps, games: games, profiles: profiles, groups: groups }}/>
					</CardImage>
					{R && <TextContainer className="SAKWidgetCard__text">
						<Text title={null == f ? void 0 : f.value} styles={I} />
						<Text title={null == h ? void 0 : h.value} styles={x} isSubtitle={true}/>
						<Text title={null == g ? void 0 : g.value} styles={N} isSubtitle={true}/>
					</TextContainer>}
				</WidgetContent>
			</ActionVkcom>
			<WidgetFooter item={item} mini_apps={mini_apps} profiles={profiles} games={games} groups={groups} showDivider={true}/>
		</WidgetContainer>);
};

export default Card;