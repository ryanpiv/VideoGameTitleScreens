<html>
<head>
  <link rel="shortcut icon" href="images/favicon.ico" />

  <link type="text/css" rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />

  <link href='http://fonts.googleapis.com/css?family=Poiret+One|Quicksand|Cantarell|Open+Sans:400,300,600' rel='stylesheet' type='text/css' />
  <link href='https://fonts.googleapis.com/css?family=Abel' rel='stylesheet' type='text/css'>

  <link type="text/css" rel="stylesheet" href="css/general.css" />
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
  <link rel="stylesheet" href="css/pace.css">

  <script src="https://code.jquery.com/jquery.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

  <script src="js/pace.min.js"></script>
  <script src="mixitup-master/src/jquery.mixitup.js"></script>
  <script src="bootstrap/js/bootstrap.js"></script>
  
  <script src="js/settings.js"></script>
  <!--<script src="js/general_js.js" ></script>-->
  <script src="js/FitVids.js-master/jquery.fitvids.js"></script>
  <script src="js/FitVids.js-master/jquery.fitvids.js"></script>

</head>
<body>
  <div class='container' id="loading">
	<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
		<img id="loading-image" src="images/ajax-loader.gif" alt="Loading..." />
	</div>
  </div>
  <div class="col-lg-1 col-md-1 col-sm-3 col-xs-4">
  	<div class="ui-hamburger pulse">
	  <span></span>
	  <span></span>
	  <span></span>
	</div>
  </div>

  <!--
  <div style="z-index:99999; border-right:1px solid red; left:50%; height:100%; position:fixed"></div>
  <div style="z-index:99998; border-top:1px solid red; top:50%; width:100%; position:fixed"></div> 
  -->

  <div class="container" id="search-container">
	<div class="search-row">
  	  <div class="row">
	    <div class="col-lg-offset-3 col-lg-6 col-md-offset-2 col-md-8 col-sm-offset-2 col-sm-8 col-xs-offset-1 col-xs-10 div-search">
	      <input class="input-search" type="text" placeholder="Search">
	    </div>
      </div>

	  <div class="row sort-panel">
	    <div class="col-lg-offset-4 col-lg-2 col-md-offset-4 col-md-2 col-sm-offset-2 col-sm-4 col-xs-6">
		  <button class="sort btn-sort btn-lg sort-active" data-sort="myorder:asc">Ascending Order</button>
	    </div>
	    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6">
	  	  <button class="sort btn-sort btn-lg" data-sort="myorder:desc">Descending Order</button>
	    </div>
	  </div>

	  <div class="row info-panel">
	    <div class="col-lg-offset-3 col-lg-2 col-md-offset-4 col-md-2 col-sm-4 col-xs-4">
	  	  <a class="info-about">About</a>
	    </div>
	    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
	  	  <a class="info-settings">Settings</a>
	    </div>
	    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-4">
	  	  <a class="info-submit">Submit</a>
	    </div>
	  </div>
    </div>
  </div>

  <div id="container-games" class="container">
    <div id="games-row" class="games-row"></div>
  </div>

  <div class='modal-cover'></div>

  <div class='modal-player container'>
	<div class='row'>
		<div class='player-container'>
		</div>
	</div>
  </div>

  <div class='modal-container-playersize'>
  	<div class='modal-playersize-small'></div>
  	<div class='modal-playersize-large'></div>
  	<div class='modal-playersize-full'></div>
  </div>

  <div class="modal-about container">
  	<div class="row">
  		<div class="col-lg-offset-3 col-lg-6">
  			<p>
  				Title Screens are iconic.  They're the first impression the player has from the development team.
  				<br />
  				<br />
  				I created this site for those of us who want to experience their favorite title screens again and again without the hastle of starting the game.  Here you can enjoy the beginnings of your favorite games with the click of your mouse.
  				<br />
  				<br />
  				I'm really glad you could make it to my site.  My name's Ryan and I'm very passionate about video games, music and software development.  To me it was a no brainer to combine all three into something I love.  I'm currently attempting to prove myself to the rest of the web dev world with projects such as this!  You can openly contribute to this project <a target="_blank" href="https://github.com/ryanpiv/VideoGameTitleScreens">on Github</a>.  I'm currently in massive need of a content aggregation system and migration to other storage needs, as well as additional feature development and bugfixes for video playing on mobile devices.
  			</p>
  		</div>
  	</div>
  </div>

  <div class="modal-settings container">
  	<legend class='settings-legend'></legend>
  	<div class="row">
		<div class='col-lg-offset-4 col-lg-4 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-xs-offset-2 col-xs-8'>
			Open Videos In
		</div>
	</div>
	<legend class='settings-legend'></legend>

	<div class="row">
		<div class='col-lg-offset-5 col-lg-1 col-md-offset-5 col-md-1 col-sm-offset-5 col-sm-1 col-xs-offset-4 col-xs-1'>
			<input class='settings-radio' type="radio" name="settings-tab" id="settings-tab_window" value="0" checked>
		</div>
		<div class="col-lg-6 col-md-6 col-sm-6 col-xs-7">
			<p class='settings-radio-desc'>This Window</p>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-offset-5 col-lg-1 col-md-offset-5 col-md-1 col-sm-offset-5 col-sm-1 col-xs-offset-4 col-xs-1">
			<input class='settings-radio' type="radio" name="settings-tab" id="settings-tab_tab" value="1">
		</div>
		<div class="col-lg-6 col-md-6 col-sm-6 col-xs-7">
			<p class='settings-radio-desc'>New Tab</p>
		</div>
  	</div>

  	<legend class='settings-legend'></legend>
  	<div class='row'>
	  	<div class='col-lg-offset-4 col-lg-4 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-xs-offset-2 col-xs-8'>
			Display Quality
		</div>
	</div>
	<legend class='settings-legend'></legend>

	<div class="row">
		<div class='col-lg-offset-5 col-lg-1 col-md-offset-5 col-md-1 col-sm-offset-5 col-sm-1 col-xs-offset-4 col-xs-1'>
			<input class='settings-radio' type="radio" name="settings-quality" value="480p" disabled>
		</div>
		<div class="col-lg-6 col-md-6 col-sm-6 col-xs-7">
			<p class='settings-radio-desc' style='color:#ccc'>480p</p>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-offset-5 col-lg-1 col-md-offset-5 col-md-1 col-sm-offset-5 col-sm-1 col-xs-offset-4 col-xs-1">
			<input class='settings-radio' type="radio" name="settings-quality" value="720p" disabled>
		</div>
		<div class="col-lg-6 col-md-6 col-sm-6 col-xs-7">
			<p class='settings-radio-desc' style='color:#ccc'>720p</p>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-offset-5 col-lg-1 col-md-offset-5 col-md-1 col-sm-offset-5 col-sm-1 col-xs-offset-4 col-xs-1">
			<input class='settings-radio' type="radio" name="settings-quality" value="1080p" disabled>
		</div>
		<div class="col-lg-6 col-md-6 col-sm-6 col-xs-7">
			<p class='settings-radio-desc' style='color:#ccc'>1080p</p>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-offset-5 col-lg-1 col-md-offset-5 col-md-1 col-sm-offset-5 col-sm-1 col-xs-offset-4 col-xs-1">
			<input class='settings-radio' type="radio" name="settings-quality" value="Best" checked>
		</div>
		<div class="col-lg-6 col-md-6 col-sm-6 col-xs-7">
			<p class='settings-radio-desc'>Best</p>
		</div>
	</div>		

	<legend class='settings-legend'></legend>
	<div class="row">
		<div class='col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 col-sm-offset-3 col-sm-6 col-xs-offset-2 col-xs-8'>
			Video Size
		</div>
	</div>
	<legend class='settings-legend'></legend>

	<div class="row">
		<div class='col-lg-offset-5 col-lg-1 col-md-offset-5 col-md-1 col-sm-offset-5 col-sm-1 col-xs-offset-4 col-xs-1'>
			<input class='settings-radio' type="radio" name="settings-video-size" id="settings-video-size_inbrowser" value="0" checked>
		</div>
		<div class="col-lg-6 col-md-6 col-sm-6 col-xs-7">
			<p class='settings-radio-desc'>In-Browser</p>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-offset-5 col-lg-1 col-md-offset-5 col-md-1 col-sm-offset-5 col-sm-1 col-xs-offset-4 col-xs-1">
			<input class='settings-radio' type="radio" name="settings-video-size" id="settings-video-size_inbrowser-fullscreen" value="1">
		</div>
		<div class="col-lg-6 col-md-6 col-sm-6 col-xs-7">
			<p class='settings-radio-desc'>In-Browser Full Screen</p>
		</div>
	</div>
	<div class="row">
		<div class='col-lg-offset-5 col-lg-1 col-md-offset-5 col-md-1 col-sm-offset-5 col-sm-1 col-xs-offset-4 col-xs-1'>
			<input class='settings-radio' type="radio" name="settings-video-size" id="settings-video-size_fullscreen" value="2">
		</div>
		<div class="col-lg-6 col-md-6 col-sm-6 col-xs-7">
			<p class='settings-radio-desc'>Full Screen</p>
		</div>
	</div>
  </div>

  <div class='modal-close'>
	<svg>
	  <line x1="0" y1="0" x2="40" y2="40" />
	  <line x1="40" y1="0" x2="0" y2="40" />
	</svg>
  </div>

  <script>
  	$(window).bind('load', function(){
  		$("#Container-mix-games").css('display', 'none');
  		$('#loading').fadeOut('slow');
  	});
  	Pace.on("done", function () {
  		$("#Container-mix-games").css('display', 'block');
  	});
  </script>
</body>
</html>
