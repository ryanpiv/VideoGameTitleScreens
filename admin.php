<!DOCTYPE html>
<html ng-app="PressPlay">
<head>
  	<?php include 'settings.php';?>
  	<link href="css/admin.css" type="text/css" rel="stylesheet" />
</head>
<body ng-controller="MainController" data-ng-init="init()">
<div class="container-fluid">
  <div class="row">
    <div class="col-lg-1 col-md-2 sidebar">
      <ul class="nav nav-sidebar">
        <li><a ng-click="findPendingReviews()" href="#pending-reviews">Pending Reviews <span ng-model="badgependingreviews" class="badge">{{totalReviews}}</span></a></li>
        <li><a href="#edit-data">Edit Data</a></li>
      </ul>
    </div>
    <section id="pending-reviews">
	    <div class="col-lg-11 col-md-10">
	    	<h1 class="page-header">{{pageHeader}}
	    		<span id="spanCurrentReviewTracker" class="review-count">{{currentReview}} of {{totalReviews}}
	    		</span>
	    	</h1>
	    	<div class="overlay">
	    		<div class="horizontal">
	    			<div class="vertical"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i></div>
	    		</div>
	    	</div>
	    	<div class="row flex-fill-row">
	    		<div id="pendingGameSubmitCol" class="flex-fill-row-item">
			    	<input type="button" id="pendingGameSubmit" class="btn btn-success btn-game" value="Approve" ng-click="approveGame()"/>
			    </div>
			    <div id="pendingGamePreviousCol" class="flex-fill-row-item">
			    	<input type="button" id="pendingGamePrevious" class="btn btn-warning btn-game" disabled readonly value="Previous" ng-click="previousGame()"/>
			    </div>
			    <div id="pendingGameSkipCol" class="flex-fill-row-item">
			    	<input type="button" id="pendingGameSkip" class="btn btn-warning btn-game" value="Next" ng-click="skipGame()"/>
			    </div>
			    <div id="pendingGameDeleteCol" class="flex-fill-row-item">
			    	<input type="button" id="pendingGameDelete" class="btn btn-danger btn-game" value="Delete" ng-click="deleteGame()"/>
			    </div>
			    <div id="enablePendingReviewsCol" class="flex-fill-row-item">
			    	<input type="button" id="enablePendingReviews" class="btn btn-warning btn-game review-count" value="Back to Pending Reviews" ng-click="callActivateReviewMode()" />
			    </div>
	    	</div>
	    	<form>
	    		<div class="row"><div class="games-row">
	    			<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mix" data-myorder={{gameformalname}}>
	    				<h2>Selected Item Preview</h2>
	    				<div class="game-item hover-out" onmouseover="lowerOpacity(this)" onmouseout="raiseOpacity(this)" style="background-image:url({{gamestillpath}})" data-game-title={{gameformalname}} data-game-series-name=gameseriesname data-game-series-sequence=gameseriessequence data-game-path={{gamevideopath}} data-game-background-color=gamebackgroundcolor data-game-formal-name="{{gamename | uppercase}}" data-game-audio-path={{gameaudiopath}} data-game-youtube-link={{gameyoutubelink}} data-game-youtube-start-time={{gameyoutubestarttime}} data-game-path-intro={{gamevideopathintro}}>
	    				</div>
	    				<div class="game-title hover-in">{{gameformalname}}</div>
	    			</div>
	    		</div></div>

	    		<div class="row">
	    			<div class="col-lg-2">
	    				<label>Game Id</label>
	    				<input ng-model="gameid" readonly disabled type="search" id"gameid" class="form-control"/>
	    			</div>
				  	<div class="col-lg-4">
				  		<label>Game Name</label>
				    	<input ng-model="gamename" type="search" id="gameSearchTitle" ng-keyup="search(gamename)" class="form-control"/>
				    	<ul class="gameSearchList" ng-include="'gameSearch.html'" ng-show="gamesSearch"></ul>
				    </div>
				    <div class="col-lg-4">
				    	<label for="seriesName">Series Name</label>
				    	<input ng-model="gameseriesname" type="search" disabled id="seriesName" class="form-control" required placeholder="Game Series Name" />
				    </div>
				    <div class="col-lg-2">
				    	<label>Series Sequence Number</label>
				    	<input type="number" string-to-number ng-model="gameseriessequence" disabled id="seriesSequence" class="form-control" required placeholder="Game Series Sequence" />
				    </div>
			    </div>

			    <div class="row">
			    	<div class="col-lg-4">
				    	<label>Youtube Video URL</label>
				    	<input type="search" ng-model="gameyoutubeurl" id="youtubeurl" class="form-control" required placeholder="Youtube Video URL" />
				    </div>

				    <div class="col-lg-2">
				    	<label>Youtube Start Time Minutes</label>
				    	<input type="number" value="0" ng-model="gameyoutubestarttimeminutes" ng-keydown="preventNegativeInput($event)" ng-change="createYoutubeURL()" min="0" id="youtubeStartTime" class="form-control" required placeholder="Youtube Start Time" />
				    </div>
				    <div class="col-lg-2">
				    	<label>Seconds</label>
				    	<input type="number" value="0" ng-model="gameyoutubestarttimeseconds" ng-keydown="preventNegativeInput($event)" ng-change="createYoutubeURL()" id="youtubeStartTime" min="0" max="60" class="form-control" required placeholder="Youtube Start Time" />
				    </div>
				    <div class="col-lg-2">
				    	<label>Youtube End Time Minutes</label>
				    	<input type="number" ng-change="createYoutubeURL()" value="0" ng-model="gameyoutubeendtimeminutes" ng-keydown="preventNegativeInput($event)" min="0" id="youtubeEndTime" class="form-control" required placeholder="Youtube End Time" />
				    </div>
				    <div class="col-lg-2">
				    	<label>Seconds</label>
				    	<input type="number" value="0" ng-model="gameyoutubeendtimeseconds" ng-keydown="preventNegativeInput($event)" ng-change="createYoutubeURL()" id="youtubeEndTime" min="0" max="60" class="form-control" required placeholder="Youtube End Time" />
				    </div>
				</div>
				<div class="row">
				    <div class="col-lg-6">
				    	<!-- 16:9 aspect ratio -->
						<div class="embed-responsive embed-responsive-16by9">
						  <iframe class="embed-responsive-item" ng-model="gameyoutubeiframe" ng-src="{{youtubeIframeSrc | trusted}}"></iframe>
						</div>
				    </div>
				    <div class="col-lg-6">
					    <div class="form-group">
					        <label>Upload Image</label>
					        <div class="input-group">
					            <span class="input-group-btn">
					                <span class="btn btn-default btn-file">
					                    Browse… <input type="file" id="imgInp" onchange="" >
					                </span>
					            </span>
					            <input type="text" value={{gamestillpathinput}} class="form-control" readonly>
					        </div>
					        <img id='img-upload' src="{{gamestillpath}}" />
					    </div>
					    <script>
					    	$(document).ready( function() {
						    	$(document).on('change', '.btn-file :file', function() {
								var input = $(this),
									label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
								input.trigger('fileselect', [label]);
								});

								$('.btn-file :file').on('fileselect', function(event, label) {

								    var input = $(this).parents('.input-group').find(':text'),
								        log = label;

								    if( input.length ) {
								        input.val(log);
								    } else {
								        if( log ) alert(log);
								    }

								});
								function readURL(input) {
								    if (input.files && input.files[0]) {
								        var reader = new FileReader();

								        reader.onload = function (e) {
								            $('#img-upload').attr('src', e.target.result);
								            $('.game-item').css('background-image', 'url(' + e.target.result + ')');
								        }

								        reader.readAsDataURL(input.files[0]);
								    }
								}

								$("#imgInp").change(function(){
								    readURL(this);
								    angular.element(this).scope().setGameStillPath(this);
								});
							});
					    </script>
				    </div>
			    </div>
			</form>
	    </div>
    </section>
    <section id="edit-data">
    	<div class="col-lg-11 col-lg-offset-1 col-md-10 col-md-offset-2">
    		<h1 class="page-header">Edit Data</h1>
			<div ui-grid="gridPagedGames" id="gridPagedGames1" ui-grid-pagination ui-grid-selection class="grid"></div>
		</div>
    </section>
  </div>
</div>

</body>
</html>
