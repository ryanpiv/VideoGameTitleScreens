//quality_type = 1;
//controls youtube video quality when loading from a youtube source
//0 = 360p/480p/lowest available
//1 = 720p --default value
//2 = 1080p
//3 = 1440p/highest available

//display_type = 0;
//controls to decide if the video opens in a new tab or in the same window
//0 = same window --default
//1 = new tab

//player_size = 0;
//controls the size of the video in the browser
//0 = in-browser: not full screen --default
//1 = in-browser full screen: browser full screen
//2 = full screen: monitor full screen

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (100*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

//checks radio buttons according to cookie values
//previous function has already set default values if cookies did not exist
function rdoBtnCompare(rdoName){
	switch(rdoName){
		case "player_size":
			switch(getCookie(rdoName)){
				case '0':
					$("#settings-video-size_inbrowser").prop("checked", true);
					break;
				case '1':
					$("#settings-video-size_inbrowser-fullscreen").prop("checked", true);
					break;
				case '2':
					$("#settings-video-size_fullscreen").prop("checked", true);
					break;
			}
			break;
		case "display_type":
			switch(getCookie("display_type")){
				case "0":
					$("#settings-tab_window").prop("checked", true);
					break;
				case "1":
					$("#settings-tab_tab").prop("checked", true);
					break;
			}
			break;
	}
}

function checkSettingsPageLoad (){
	if(getCookie("player_size") == ""){
	  setCookie("player_size", "0");
	}
	rdoBtnCompare("player_size");

	if(getCookie("display_type") == ""){
	  setCookie("display_type", "0");
	}
	rdoBtnCompare("display_type");

	/*
	if(getCookie("quality_type") == ""){
	  setCookie("quality_type", "0"; 
	}
	rdoBtnCompare("quality_type");
	*/
}
