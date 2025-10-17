import React from 'react';
import { mapToDataAttributes } from '../Utils.js';
import '../widget.css';

const l = function(e, t) {
    var a = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (a[r] = e[r]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var n = 0;
        for (r = Object.getOwnPropertySymbols(e); n < r.length; n++) t.indexOf(r[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[n]) && (a[r[n]] = e[r[n]])
    }
    return a;
}

const ActionVkcom = (props) => {
	const i = l(props, ["action", "children", "className"]);
	const actionStr = JSON.stringify(props.action || {
        type: ""
    });

	const classNames = ["SAKWidget__tappable--vkcom"];
	props.className && classNames.push(props.className);

	const onClick = (e) => {
        e.stopPropagation();
		console.log(actionStr);
		props.action && alert(actionStr);
	};

	return React.createElement("div", Object.assign({
        className: classNames.join(" "),
        onClick: onClick
    }, i, mapToDataAttributes({
        action: actionStr
    })), props.children, props.action && React.createElement("span", {
        "aria-hidden": true,
        className: "SAKWidget__hover-shadow"
    }));
};

export default ActionVkcom;