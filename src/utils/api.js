import bridge from "@vkontakte/vk-bridge";
import corsFetch from '../utils/corsFetch.js';

const callAPIMethod = (method, params) => new Promise(function(resolve, reject) {
	if (!Window.access_token) {
		bridge.send('VKWebAppGetAuthToken', { 
			app_id: 6996699, 
  			scope: 'docs'
  		}).then((data) => { 
    		if (data.access_token) {
    			Window.access_token = data.access_token;
    			callAPIMethodInternal(method, params).then((response) => { 
    				console.log("Successfully get API token!");
    				resolve(response);
  				}).catch((error) => {
    				reject(error);
  				});
    		}
  		}).catch((error) => {
    		reject(error);
  		});
	} else {
		callAPIMethodInternal(method, params).then((response) => { 
    		resolve(response);
  		}).catch((error) => {
    		reject(error);
  		});
	}
});

const callAPIMethodInternal = (method, params) => new Promise(function(resolve, reject) {
	bridge.send('VKWebAppCallAPIMethod', {
  		method: method,
  		params: {
	    	v: '5.131',
    		access_token: Window.access_token,
    		...params
  		}
  	}).then((data) => { 
    	if (data.response) {
    		resolve(data.response);
    	} else {
    		reject("Incorrect response from VK API!");
    	}
  	}).catch((error) => {
    	reject(error);
  	});
});

const uploadToVKDoc = (name, file) => new Promise(function(resolve, reject) {
	callAPIMethod("docs.getUploadServer").then((response) => { 
    	let upload_url = response.upload_url;
    	let data = new FormData();
		data.append('file', file);
    	corsFetch(upload_url, data).then(async (resp2) => {
    		if (resp2.ok) {
    			let upload_result = await resp2.json();
    			if (upload_result.error) {
    				reject(new Error(`Uploader server returns an error: ${upload_result.error}`));
    			} else {
    				let file_info = upload_result.file;
    				callAPIMethod("docs.save", {
    					"file": file_info,
    					"title": name, 
    					"tags": "vk_widget_code"
    				}).then((resp3) => {
    					resolve(true);
    				}).catch((error) => {
    					reject(error);
    				});
    			}
    		} else {
    			reject(new Error(`Cannot upload a file to VK! ${resp2.status}`));
    		}
    	}).catch((error) => {
    		reject(error);
  		});
  	}).catch((error) => {
    	reject(error);
  	});
});

export { callAPIMethod, uploadToVKDoc };