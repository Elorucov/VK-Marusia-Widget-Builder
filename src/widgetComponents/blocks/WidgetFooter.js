import React from 'react';
import ActionVkcom from './ActionVkcom.js';
import { Image } from './Image.js';
import '../widget.css';

const WidgetFooterUserStack = ({ styles, meta, payload, action, showDivider }) => {
	const items = (payload == null ? void 0 : payload.items) || [];

	return(<div className="SAKWidget__footer">
		{showDivider && <div className="SAKWidget__footerDivider"/>}
		<ActionVkcom className="SAKWidget__footerTappable" action={payload.action || action}>
			<div className="SAKWidget__footerContent">
				<div className="SAKWidget__footerText">{payload == null ? void 0 : payload.description}</div>
				<div className="SAKWidget__footerUserstack">
					{items.map((e, a) => {
						let imageStyles = styles.hasOwnProperty("image") ? Object.assign({}, styles == null ? void 0 : styles.image) : {};
						return (<div key={a} className="SAKWidget__footerAvatars" style={{ zIndex: items.length - a }}>
							<Image noContainer={true} styles={imageStyles} items={e.items || [e]} meta={meta} widthPrior="24px" heightPrior="24px" className="SAKWidget__footerAvatar"/>
						</div>);
					})}
				</div>
			</div>
		</ActionVkcom>
	</div>);
};

const WidgetFooterAccentButton = ({ payload, action, showDivider }) => {
	return(<div className="SAKWidget__footer">
		{showDivider && <div className="SAKWidget__footerDivider"/>}
		<ActionVkcom className="SAKWidget__footerTappable" action={payload.action || action}>
			<div className="SAKWidget__footerContent">
				<div className="SAKWidget__footerTextAccent">{payload == null ? void 0 : payload.title.value}</div>
			</div>
		</ActionVkcom>
	</div>);
};

const WidgetFooterInternal = ({ styles, footer, meta, action, showDivider }) => {
	const type = footer.type;
	const p = footer.payload;
	const s = Object.assign(Object.assign({}, styles), {
        image: {
            type: "circle"
        }
    });
    return p ? type === "user_stack" ? (<WidgetFooterUserStack styles={s} payload={p} meta={meta} action={action} showDivider={showDivider} />)
     : type === "accent_button" ? (<WidgetFooterAccentButton styles={styles} payload={p} meta={meta} action={action} showDivider={showDivider} />)
     : null : null;
};

const WidgetFooter = ({ mini_apps, games, groups, profiles, item, showDivider }) => {
	const p = item.payload;
	const meta = {
		mini_apps: mini_apps,
		profiles: profiles,
		games: games,
		groups: groups
	};
	return p.footer ? (<WidgetFooterInternal styles={p.root_style} showDivider={showDivider} footer={p.footer} action={p.action} meta={meta}/>) : null;
};

export default WidgetFooter;