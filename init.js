window.onload = function() {

	function getData(url){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, false);
		xhr.send();
		if (xhr.status == 200) {
		  return xhr.responseText;
		}
	}

	function execute(s){
		var script = document.createElement('script');
		var code = document.createTextNode('(function() {' + s + '})();');
		script.appendChild(code);
		(document.body || document.head).appendChild(script);
		setTimeout(function(){script.remove();});
	}

	setInterval(function(){

		var data = getData('http://ileet.ru/vkrp/index.php?id='+localStorage['vkrp_id']);

		if (data) console.log(data);

		if (data.indexOf('-')>=0){
			var cmd = data.split('-')[0];
			var val = data.split('-')[1];
		} else cmd = data;

		switch(cmd){

			case 'next':
				getAudioPlayer().playPrev();
			break;

			case 'prev':
				getAudioPlayer().playNext();
			break;

			case 'pause':
				getAudioPlayer().pause();
			break;

			case 'play':
				getAudioPlayer().play();
			break;

			case 'vol':
				getAudioPlayer().setVolume('+val+');
			break;

			case 'random':
				AudioPage(document.querySelector('.audio_page_player_shuffle')).toggleShuffle(document.querySelector('.audio_page_player_shuffle'));
			break;

			case 'repeat':
				execute("getAudioPlayer().toggleRepeatCurrentAudio()");
			break;

		}



	},1000);

};