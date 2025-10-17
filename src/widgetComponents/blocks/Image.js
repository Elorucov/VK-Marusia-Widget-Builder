import React from 'react';
import { sanitizeUrl } from '../Utils.js';
import '../widget.css';

function o(e, t) {
    return e.find(((e,a)=>t === e.id));
}

function i(e) {
    for (var t, a = e.length, r = e.length; r > 0 && (!(t = e[a - 1]) || !t.url); r--);
    return t
}

const getImageSize = e => e === "circle" || e === "app" || e === "square" ? {
    width: "56px",
    height: "56px"
} : "poster" === e ? {
    width: "56px",
    height: "76px"
} : e === "tv" ? {
    width: "48px",
    height: "36px"
} : {
    width: "",
    height: ""
};

const getImageInfo = (e, t,a,r)=>{
    var n = e[e.length - 1];
    return n.hasOwnProperty("type") ? function(e, t, a, r) {
        var n = "", s = getImageSize(r), c = a.heightPrior || s.height, d = a.widthPrior || s.width;
        if (e.type === "mini_app") {
            var u = [...t.mini_apps || [], ...t.games || []], m = u.length && o(u, e.object_id);
            m && m.icon_139 && (n = m.icon_139);
            m && m.icon_128 && (n = m.icon_128);
        } else if (e.type === "profile") {
            var p = t.profiles && o(t.profiles, e.object_id);
            p && p.photo_200 && (n = p.photo_200);
        } else if (e.type === "group") {
            var v = t.groups && o(t.groups, e.object_id);
            v && v.photo_200 && (n = v.photo_200)
        } else if (e.type === "inline") {
            var h = i(e.items);
            if (h) {
                n = h.url;
                c = a.heightPrior || s.height;
                d = a.widthPrior || s.width;
            }
        }
        return {
            style: {
                height: c,
                width: d
            },
            src: n
        }
    }(n, t, a, r) : function(e, t, a) {
        var r = i(e), n = getImageSize(a), s = r && r.url, o = t.widthPrior || n.width;
        return {
            style: {
                height: t.heightPrior || n.height,
                width: o
            },
            src: s
        }
    }(e, a, r)
}

const ImageContainer = ({children, type, vAlign, width, height}) => {
    let classNames = ["SAKWidget__image"];
    type && classNames.push(`SAKWidget__image--type-${type}`);
    vAlign && classNames.push(`SAKWidget__valign--type-${vAlign}`);
    return (<div className={classNames.join(" ")} style={{width: width, height: height}}>{children}</div>)
};

let s = 0;
const ImageIcon = ({className, src, style}) => {
    let filterId = `sakWidgetFilter_${React.useMemo((()=>s++), [])}`;
    return (<svg xmlns="http://www.w3.org/2000/svg" version="1.1" className={className} width={style.width} height={style.height}>
        <defs>
            <filter id={filterId}>
                <feFlood result="flood" className="SAKWidget__svgFlood"/>
                <feComposite in="flood" in2="SourceGraphic" operator="in"/>
            </filter>
        </defs>
        <image width="100%" height="100%" filter={`url(#${filterId})`} xlinkHref={src}/>
    </svg>);
};

const Icon = ({ styles, payload, items, meta, widthPrior, heightPrior }) => {
    let c = {
        image: Object.assign(Object.assign({}, styles.icon), payload && payload.style)
    }, 
    d = payload && payload.items ? payload.items : items;

    return (<Image isIcon={true} styles={c} items={d} meta={meta} heightPrior={heightPrior} widthPrior={widthPrior}/>);
};

const Image = ({ styles, items, meta, widthPrior, heightPrior, isIcon, noContaner, className }) => {
    let v = void 0 === className ? "" : className;
    let h = (null == styles ? void 0 : styles.image) || {};
    let type = h.type || "";
    let color = h.color || "";
    let valign = h.vertical_align || "";
    let img = getImageInfo(items, meta, {
        widthPrior: widthPrior,
        heightPrior: heightPrior
    }, type);
    img.src && sanitizeUrl(img.src);

    let classNames = [];
    v && classNames.push(v);

    if (isIcon && color) {
        classNames.push("SAKWidget__svgTag");
        classNames.push(`SAKWidget__svgTag--color-${color}`);
    } else {
        classNames.push("SAKWidget__imgTag");
        type && classNames.push(`SAKWidget__imgTag--type-${type}`);
    }

    let y = isIcon && color ? React.createElement(ImageIcon, Object.assign({
        className: classNames.join(" ")
    }, img)) : React.createElement("img", Object.assign({
        className: classNames.join(" ")
    }, img));

    return noContaner ? y : (<ImageContainer type={type} vAlign={valign} width={img.style.width}>{y}</ImageContainer>);
};

export { Icon, Image };