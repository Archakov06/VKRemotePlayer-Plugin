window.onload = function() {

	function getData(url,callback){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, false);
		xhr.send();
		if (xhr.status == 200) {
		  if (callback) callback(xhr.responseText); else return xhr.responseText;
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

	function InitAudioJS(){
		if (!window.audioplayer){
			stManager.add(['audio.js','audioplayer.js'], function() {
			    headPlayPause();
			    Pads.show('mus');
			    setTimeout(function(){
			    	document.querySelector('#pad_wrap').remove();
			    },100);
			});
		}
	}

	function checkPlayer(){
		if ( location.pathname.indexOf('audios')>=0 && !window.audioPlayer) {
			location.reload();
			return false;
		}
		InitAudioJS();
	}

	function play(){
		if (!window.audioPlayer){

			if ( location.pathname.indexOf('audios')>=0 )
				window.audioPlayer.initPlayer(document.querySelector('.play_new').getAttribute('id').substr(4,document.querySelector('.play_new').getAttribute('id').length));
			else
			{
				stManager.add(['audio.js','audioplayer.js'], function() {
					var data = getData('/audios'+localStorage['vkrp_id']);
					var doc = new DOMParser().parseFromString(data, "text/html");
					var aid = doc.querySelector('.play_new').getAttribute('id').substr(4,doc.querySelector('.play_new').getAttribute('id').length);
					audioPlayer.operate.apply(null, [aid]);
				});
			}

		}
		else 
			window.audioPlayer.playTrack();
	}

	function run(cmd,val){
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
				play();
			break;

			case 'vol':
				window.audioPlayer.player.setVolume(val);
				setStyle(window.audioPlayer.controls.ac.volume, {width: (val * 100) + '%'});
			break;

			case 'random':
				window.audioPlayer.shuffleAudios();
			break;

			case 'repeat':
				execute("getAudioPlayer().toggleRepeatCurrentAudio()");
			break;

		}

		if (data) clear();
	}


		var cmd = val = "";

		function getD(call){
			getData('http://ileet.ru/vkrp/index.php?id='+localStorage['vkrp_id'],function(data){

				if (data.indexOf('-')>=0){
					cmd = data.split('-')[0];
					val = data.split('-')[1];
				} else cmd = data;

				console.log(data);

				run(cmd,val);

			});
		}

		getD(function(){getD});

};