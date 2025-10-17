const blobToFile = (theBlob, fileName) => {
  let file = new File([theBlob], fileName);
  return file;
}

const prettyDate = (unix) => {
  const temp = new Date(unix * 1000);
  const pad = (i) => (i < 10) ? "0" + i : "" + i;
  return temp.getFullYear() + "." +
    pad(1 + temp.getMonth()) + "." +
    pad(temp.getDate()) + " " +
    pad(temp.getHours()) + ":" +
    pad(temp.getMinutes()) + ":" +
    pad(temp.getSeconds());
}

export { blobToFile, prettyDate };