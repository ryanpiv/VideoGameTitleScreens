<html ng-app="PressPlay">
<head>
  <?php include('settings.php'); ?>
  <link href="css/admin.css" type="text/css" rel="stylesheet" />
</head>
<body ng-controller="MainController">
<div class="container-fluid">
  <div class="row">
    <div class="col-lg-2 col-md-2 sidebar">
      <ul class="nav nav-sidebar">
        <li class="active"><a href="#">Overview </a></li>
        <li><a ng-click="findPendingReviews()" href="#">Pending Reviews</a><span ng-model="badgependingreviews" class="badge">{{pendingReviews}}</span></li>
        <li><a href="#">Analytics</a></li>
        <li><a href="#">Export</a></li>
      </ul>
    </div>
    <div class="col-lg-10 col-md-10">
    	<h1 class="page-header">Pending Reviews</h1>
    	<form>
    		<div class="games-row">
    			<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mix" data-myorder={{gameformalname}}><div class="game-item hover-out" onmouseover="lowerOpacity(this)" onmouseout="raiseOpacity(this)" style="background-image:url({{gamestillpath}})" data-game-title={{gameformalname}} data-game-series-name=gameseriesname data-game-series-sequence=gameseriessequence data-game-path={{gamevideopath}} data-game-background-color=gamebackgroundcolor data-game-formal-name="{{gamename | uppercase}}" data-game-audio-path={{gameaudiopath}} data-game-youtube-link={{gameyoutubelink}} data-game-youtube-start-time={{gameyoutubestarttime}} data-game-path-intro={{gamevideopathintro}}></div><div class="game-title hover-in">{{gameformalname}}</div></div>
    		</div>

    		<div class="row">
			  	<div class="col-lg-5">
			  		<label>Game Name</label>
			    	<input ng-model="gamename" type="search" id="gameSearchTitle" class="form-control"/>
			    </div>
			    <div class="col-lg-5">
			    	<label for="seriesName">Series Name</label>
			    	<input ng-model="gameseriesname" type="search" disabled id="seriesName" class="form-control" required placeholder="Game Series Name" />
			    </div>
			    <div class="col-lg-2">
			    	<label>Series Sequence Number</label>
			    	<input type="number" string-to-number ng-model="gameseriessequence" disabled id="seriesSequence" class="form-control" required placeholder="Game Series Sequence" />
			    </div>
		    </div>
		    
		    <div class="row">
		    	<div class="col-lg-6">
			    	<label>Youtube Video URL</label>
			    	<input type="search" ng-model="gameyoutubeurl" id="youtubeurl" class="form-control" required placeholder="Youtube Video URL" />
			    </div>
			    
			    <div class="col-lg-3">
			    	<label>Youtube Start Time</label>
			    	<input type="number" ng-model="gameyoutubestarttime" id="youtubeStartTime" class="form-control" required placeholder="Youtube Start Time" />
			    </div>
			    <div class="col-lg-3">
			    	<label>Youtube End Time</label>
			    	<input type="number" ng-model="gameyoutubeendtime" id="youtubeEndTime" class="form-control" required placeholder="Youtube End Time" />
			    </div>
			    <div class="col-lg-12">
			    	<!-- 16:9 aspect ratio -->
					<div class="embed-responsive embed-responsive-16by9">
					  <iframe class="embed-responsive-item" ng-model="gameyoutubeiframe" ng-src="{{youtubeIframeSrc | trusted}}"></iframe>
					</div>
			    </div>
		    </div>
		</form>
    </div>
  </div>
</div>

</body>
</html>
