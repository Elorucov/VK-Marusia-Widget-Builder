import React from 'react';
import { Icon } from './Image.js';
import ActionVkcom from './ActionVkcom.js';
import '../widget.css';

const outline = "outline";
const types = [outline, "primary", "secondary", "tertiary"];

const Button = ({title, icon, styles, action, className}) => {
    const u = icon && {
        icon: icon.style
    }
    const m = icon && icon.items;
    let p = styles.type || "";
    p = p.replace("_with_icon", "").replace("_icon", "").replace("_text", "");
    types.includes(p) || (p = outline);

    const v = icon ? (<span className="SAKWidget__buttonIcon">
        <Icon widthPrior={18} heightPrior={18} items={m} styles={u} meta={{}}/>
    </span>) : null;
    const h = title ? (<span className="SAKWidget__buttonText">{title}</span>) : null;

    const classNames = ["SAKWidget__button", `SAKWidget__button--type-${p}`];
    const buttonCntClassNames = ["SAKWidget__buttonContent"];
    icon && buttonCntClassNames.push("SAKWidget__buttonContent--icon");
    className && classNames.push(className);
    return(<ActionVkcom action={action} className={classNames.join(" ")}>
        <span className={buttonCntClassNames.join(" ")}>
            {v}{h}
        </span>
    </ActionVkcom>);
};

export default Button;