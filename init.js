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

	function clear(){
		getData('http://ileet.ru/vkrp/index.php?id='+localStorage['vkrp_id']+'&clear');
	}

	setInterval(function(){

		var data = getData('http://ileet.ru/vkrp/index.php?id='+localStorage['vkrp_id']);

		if (data) console.log(data);

		if ( location.pathname.indexOf('audios')>=0 && !window.audioPlayer) location.reload();

		if (data.indexOf('-')>=0){
			var cmd = data.split('-')[0];
			var val = data.split('-')[1];
		} else cmd = data;

		switch(cmd){

			case 'next':
				window.audioPlayer.nextTrack();
			break;

			case 'prev':
				window.audioPlayer.prevTrack();
			break;

			case 'pause':
				window.audioPlayer.pauseTrack();
			break;

			case 'play':
			if (!window.audioPlayer.player)
					window.audioPlayer.initPlayer(document.querySelector('.play_new').getAttribute('id').substr(4,document.querySelector('.play_new').getAttribute('id').length));
				else 
					window.audioPlayer.playTrack();
			break;

			case 'vol':
				window.audioPlayer.player.setVolume(val);
			break;

			case 'random':
				window.audioPlayer.shuffleAudios();
			break;

			case 'repeat':
				execute("getAudioPlayer().toggleRepeatCurrentAudio()");
			break;

		}

		if (data) clear();

	},1000);

};