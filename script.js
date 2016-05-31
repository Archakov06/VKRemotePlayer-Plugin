
window.onload = function() {
	localStorage['vkrp_id'] = document.body.outerHTML.split('<a href="/albums')[1].split('"')[0];
	chrome.extension.sendRequest({id: document.body.outerHTML.split('<a href="/albums')[1].split('"')[0]});
};

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://rawgit.com/Archakov06/VKRemotePlayer-Plugin/master/init.js';
document.head.appendChild(script);