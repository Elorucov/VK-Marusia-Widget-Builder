const corsFetch = (url, body) => new Promise(function(resolve, reject) {
	fetch(`https://elor.top/tools/ma_cors_proxy.php?url=${encodeURIComponent(url)}`, { 
      method: 'POST',
      headers: {
        'Authorization': window.location.href
      },
      body: body
    }).then((response) => {
      resolve(response);
    }).catch((error) => { 
      reject(error);
    });
});

export default corsFetch;