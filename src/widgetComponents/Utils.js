const cx = (e) => {
    var t = [];
        return e.forEach((e=>{
            if (e)
                switch (typeof e) {
                case "string":
                    t.push(e);
                    break;
                case "object":
                    Object.keys(e).forEach((a=>{
                        e[a] && t.push(a)
                    }
                    ));
                    break;
                default:
                    t.push(`${e}`)
                }
        }
        )),
        t.join(" ")
};

const mapToDataAttributes = (e) => {
    var t = {};
    return Object.keys(e).forEach((a=>{
            t[`data-${a}`] = e[a]
        }
    )), t
};

const sanitizeUrl = (e) => {
    return e ? e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
};

const getOpeningStyle = (e) => e.match(/\[style.*?\]/g);

export { cx, mapToDataAttributes, sanitizeUrl, getOpeningStyle }