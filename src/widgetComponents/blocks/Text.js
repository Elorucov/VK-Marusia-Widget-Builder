import React from 'react';
import { getOpeningStyle } from '../Utils.js';
import '../widget.css';

const NormalizedText = ({ text }) => {
    if (text.includes("[/style]")) {
        var a = ">>><<<", 
        s = text.replace(/\[style/g, ">>><<<[style").replace(/style\]/g, "style]>>><<<").split(a).map(e=>{
            var t = getOpeningStyle(e);
            if (null === t) return {
                style: {},
                value: e
            };

            var a = t[0].replace(/^\[style/, "").replace(/\]$/, "").split(";").map(e=>e.trim()).reduce((e,t)=>{
                var a = t.split("="), r = a[0], n = a[1];
                return e[r] = n.replace(/['"]+/g, ""), e;
            }, {});

            return {
                style: Object.keys(a).reduce(((e,t)=>{
                    if (a[t].includes("#")) {
                        var r = a[t].split("#")[1];
                        e[t] = `#${r}`
                    } else
                        e[t] = `var(--${t}-${a[t]})`;
                    return e
                }
                ), {}),
                value: e.replace(/\[style.*?\]/g, "").replace(/\[\/style\]/g, "").trim()
            }
        });

        return (<React.Fragment>
            {s.filter(e=>e.value.length > 0).map((e, t) => {
                console.log(e);
                return (<span style={e.style} key={`${a}_ ${t}`}>{e.value}</span>);
            })}
        </React.Fragment>);
    }
    return <span>{text}</span>
};

const Text = ({ title, styles, isSubtitle, isScroll, breakAll, className }) => {
	const classes = ["SAKWidget__text"];
	if (styles) {
        var d = styles.color || "", u = styles.weight || "";
        d && classes.push(`SAKWidget__text--color-${d.replace("text_", "")}`); 
        u && classes.push(`SAKWidget__text--weight-${u}`);
    }
    isSubtitle && classes.push("SAKWidget__text--subtitle");
    isScroll && classes.push("SAKWidget__text--scroll");
    breakAll && classes.push("SAKWidget__text--breakall");
    className && classes.push(className);

    // TODO: colored text

	return (<div className={classes.join(" ")}><NormalizedText text={title || ""}/></div>);
};

export default Text;