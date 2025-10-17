const dispatchEvent = (name, details) => {
	let ce = new CustomEvent(name, { detail: details });
	document.dispatchEvent(ce);
}

export default dispatchEvent;