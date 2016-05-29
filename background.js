chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    localStorage['vkrp_id'] = request.id;
});