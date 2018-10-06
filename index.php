<html ng-app="PressPlay">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <?php include 'settings.php';?>
  
</head>
<body ng-controller="MainController">
  <i class="fa fa-bars ui-hamburger fa-3x" aria-hidden="true"></i>
  <div class='container-fluid' id="loading">
	<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
		<img id="loading-image" src="images/ajax-loader.gif" alt="Loading..." />
	</div>
  </div>

  <!--
  <div style="z-index:99999; border-right:1px solid red; left:50%; height:100%; position:fixed"></div>
  <div style="z-index:99998; border-top:1px solid red; top:50%; width:100%; position:fixed"></div>
  -->

  <div class="container-fluid" id="search-container">
  	<div class="user-row row justify-content-end">
  		<div class="col-1">
  			<button class="btn-signin btn">Sign In / Register</button>
  		</div>
  	</div>

	<div class="search-row">
  	  <div class="row justify-content-center">
	    <div class="col col-lg-6 div-search">
	      <input class="input-search" type="text" placeholder="Search">
	    </div>
      </div>

	  <div class="row justify-content-center sort-panel">
	    <div class="col-6 col-lg-3">
		  <button class="sort btn-sort btn-lg sort-active" data-sort="myorder:asc">Ascending Order</button>
	    </div>
	    <div class="col-6 col-lg-3">
	  	  <button class="sort btn-sort btn-lg" data-sort="myorder:desc">Descending Order</button>
	    </div>
	  </div>

	  <div class="row justify-content-center info-panel">
	    <div class="col-2">
	  	  <a class="info-about">About</a>
	    </div>
	    <div class="col-2">
	  	  <a class="info-settings">Settings</a>
	    </div>
	    <div class="col-2">
	  	  <a class="info-submit">Submit</a>
	    </div>
	  </div>
    </div>
    <div class="submit-row row">
    	<div class="loading">
    		<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
    	</div>
		<form name="searchGame" ng-submit="search(gamename)">
			<div class="form-row">
			  	<div class="form-group col-12 col-lg-5">
			  		<label>Search for a Game</label><a data-toggle="tooltip" title="Start typing to search for a game." href="#"> ?</a>
			    	<input type="search" id="gameSearchTitle" class="form-control" required placeholder="Game to find" ng-model="gamename" ng-keyup="search(gamename)" />
			    	<ul class="gameSearchList" ng-include="'gameSearch.html'" ng-show="gamesSearch"></ul>
			    </div>

			    <div class="form-group col-12 col-lg-3">
			    	<label>Youtube Video URL</label><a title="Enter the Youtube URL of the start screen video." data-toggle="tooltip" href="#"> ?</a>
			    	<input type="search" id="youtubeurl" class="form-control" required placeholder="Youtube Video URL" />
			    </div>

			    <div class="form-group col-12 col-lg-2">
			    	<label>Youtube Start Time</label><a href="#" data-toggle="tooltip" title="Enter the amount of time in seconds the video should start at."> ?</a>
			    	<input type="number" id="youtubeStartTime" class="form-control" required placeholder="Youtube Start Time" />
			    </div>
			    <div class="form-group col-12 col-lg-2">
			    	<label>Youtube End Time</label><a href="#" data-toggle="tooltip" title="Enter the amount of time in seconds the video should end at."> ?</a>
			    	<input type="number" id="youtubeEndTime" class="form-control" required placeholder="Youtube End Time" />
			    </div>

			    <div class="form-group col-12 col-lg-3">
			    	<label for="seriesName">Series Name</label><a title="This field is auto populated when you select a game in the search list." data-toggle="tooltip" href="#"> ?</a>
			    	<input type="search" disabled ng-model="gamecollection" id="seriesName" class="form-control" required placeholder="Game Series Name" />
			    </div>

			    <div class="form-group col-12 col-lg-3">
			    	<label>Series Sequence Number</label><a href="#" data-toggle="tooltip" title="This field is auto populated when you search for a game."> ?</a>
			    	<input type="number" disabled ng-model="gameseriessequence" id="seriesSequence" class="form-control" required placeholder="Game Series Sequence" />
			    </div>
			    <div class="form-group col-12 col-lg-6">
					<label>Upload Image</label><a href="#" data-toggle="tooltip" title="Upload an image to represent the game searched for.  This shouldn't be game cover art, but should be recognizeable by the majority of people."> ?</a>
			        <div class="input-group">
			            <span class="input-group-btn">
			                <span class="btn btn-default btn-file">
			                    Browse… <input type="file" id="imgInput">
			                </span>
			            </span>
			            <input type="text" class="form-control" readonly>
			        </div>
			        <img id='img-upload' class="img-responsive" />
			    </div>
			    <div class="col-12">
			    	<input type="button" id="newGameSubmit" class="btn btn-primary" value="Submit" onclick="validateNewGameSubmit()"/>
			    </div>
			</div>
		</form>
    </div>
  </div>

  <div id="container-games" class="container-fluid">
    <div id="games-row" class="games-row">

    	<?php include 'data/get-index.php';?>
    </div>
  </div>

  <div class='modal-cover'></div>

  <div class='modal-player container-fluid'>
	<div class='row'>
		<div class='player-container col-12'>
		</div>
	</div>
  </div>

  <div class='modal-container-playersize'>
  	<div class='modal-playersize-small'></div>
  	<div class='modal-playersize-large'></div>
  	<div class='modal-playersize-full'></div>
  </div>

  <div class="modal-about container-fluid">
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

  <div class="modal-settings container-fluid">
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

  <div class="modal-signin container-fluid">
  	<div class="row">
		<div class='col-lg-offset-4 col-lg-4 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-xs-offset-2 col-xs-8'>
			
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
  	$( function() {
    	$('[data-toggle="tooltip"]').tooltip();
  	});
  	$(window).bind('load', function(){
  		$("#Container-mix-games").css('display', 'none');
  		$('#loading').fadeOut('slow');
  	});
  	Pace.on("done", function () {
  		$("#Container-mix-games").css('display', 'block');
  	});
  </script>
  <script src="js/notifications.js"></script>
</body>
</html>
