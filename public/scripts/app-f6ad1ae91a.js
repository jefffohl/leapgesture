!function(){"use strict";angular.module("leapgesture",["ngCookies","ngTouch","ngSanitize","ngMessages","ngAnimate","ngAria","ngResource","ui.router","ui.bootstrap","toastr","ui-rangeSlider"])}(),function(){"use strict";function e(e,n){return{restrict:"E",replace:!0,templateUrl:"app/components/playControls/playControls.html",link:function(e,n,r){}}}e.$inject=["$log","leapController"],angular.module("leapgesture").directive("playControls",e)}(),function(){"use strict";function e(e,n){return{restrict:"E",replace:!1,link:function(r,a,t){function o(n){if(e.player&&e.player.recording){var r=n.offsetX/a.width(),t=Math.floor(e.player.recording.frameCount*r);e.player.setFrameIndex(t)}}a.on("mousedown",function(e){o(e),n.on("mousemove",function(e){o(e)})}),n.on("mouseup",function(){n.off("mousemove")})}}}e.$inject=["leapController","$document"],angular.module("leapgesture").directive("recording",e)}(),function(){"use strict";function e(e){return{restrict:"E",replace:!1,link:function(n,r,a){function t(){if(e.player)if(n.main.player&&n.main.player.recording){var a=n.main.player.recording.frameIndex/(n.main.player.recording.frameCount-1)*100+"%";r.css({width:a})}else r.css({width:"0%"})}e.controller.on("frame",t)}}}e.$inject=["leapController"],angular.module("leapgesture").directive("playhead",e)}(),function(){"use strict";function e(){var e=new Leap.Controller({background:!0}).use("playback",{loop:!1,pauseHotkey:!1,pauseOnHand:!1,autoPlay:!1}).use("riggedHand").connect(),n=e.plugins.playback.player;this.$get=function(){return{controller:e,player:n}}}angular.module("leapgesture").provider("leapController",e)}(),function(){"use strict";function e(e,n){e.gestureName="My Gesture",e.save=function(){e.$close(e.gestureName)},e.cancel=function(){e.$dismiss("Dismissed")}}e.$inject=["$scope","$uibModalInstance"],angular.module("leapgesture").controller("SaveRecordingModalController",e)}(),function(){"use strict";function e(e,n,r,a,t){var o=this;o.view={loading:!1,currentGestureId:null,recordedGesture:{name:"My Gesture"},playing:!1,recording:!1,unsavedRecording:!1};var i=r("/api/gestures/:id",{id:"@id"},{create:{method:"POST"},index:{method:"GET",isArray:!1},show:{method:"GET",isArray:!1},update:{method:"PUT"},destroy:{method:"DELETE"}});o.gestures=[],o.player=n.player,n.controller.on("playback.recordingFinished",function(){o.view.recording=!1;var e=a.open({animation:!0,templateUrl:"app/main/saveRecordingModal.html",controller:"SaveRecordingModalController",controllerAs:"modal",size:"lg"});e.result.then(function(e){o.view.recordedGesture.name=e,o.save()})}),n.controller.on("playback.playbackFinished",function(){o.view.playing=!1,e.$apply()}),o.toggle=function(){o.view.playing=!o.view.playing,o.player.toggle()},o.play=function(){o.view.playing=!0,n.player.play()},o.pause=function(){o.view.playing=!1,n.player.pause()},o.clear=function(){n.player.stop(),o.view.playing=!1},o.selectGesture=function(e){return e===o.view.currentGestureId?(o.view.currentGestureId=null,o.player.playing&&o.player.stop(),o.view.playing=!1,void o.clear()):(o.view.unsavedRecording=!1,o.view.loading=!0,void i.show({id:e},function(e){n.player.setRecording({compressedRecording:e.data.data}),o.view.currentGestureId=e.data.id,o.view.loading=!1,o.play()}))},o.record=function(){return o.view.recording?(o.view.recording=!1,o.player.pause(),o.player.stop(),void o.player.clear()):(o.view.currentGestureId=null,o.view.recording=!0,void n.player.record())},o["delete"]=function(){o.view.loading=!0,i.destroy({id:o.view.currentGestureId},function(){o.view.loading=!1,l()})},o.save=function(){var e=n.player.recording["export"]("lz"),r=new i({data:e,name:o.view.recordedGesture.name});r.$save().then(function(){o.view.unsavedRecording=!1,l()})};var l=function(){o.view.loading=!0,i.index(function(e){o.gestures=e.data,o.view.loading=!1})};l()}e.$inject=["$scope","leapController","$resource","$uibModal","$log"],angular.module("leapgesture").controller("MainController",e)}(),function(){"use strict";function e(e){e.debug("runBlock end")}e.$inject=["$log"],angular.module("leapgesture").run(e)}(),function(){"use strict";function e(e,n){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),n.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("leapgesture").config(e)}(),function(){"use strict";angular.module("leapgesture")}(),function(){"use strict";function e(e,n){e.debugEnabled(!0),n.allowHtml=!0,n.timeOut=3e3,n.positionClass="toast-top-right",n.preventDuplicates=!0,n.progressBar=!0}e.$inject=["$logProvider","toastrConfig"],angular.module("leapgesture").config(e)}(),angular.module("leapgesture").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="container-fluid">\n  <div class="loading" ng-show="main.view.loading"><span class="loading-spin"></span></div>\n  <div class="row">\n    <div class="controls col-xs-3">\n      <h1>LeapGesture</h1>\n      <p>This app requires a Leap Motion controller connected to your computer. Record hand gestures, save them, and play them back. To record a new gesture:</p>\n      <ul>\n        <li>Click <span class="record">Record</span></li>\n        <li>Put your hand over the the Leap Motion controller</li>\n        <li>The recording will stop when you move your hands away</li>\n        <li>You will be prompted to save your gesture</li>\n      </ul>\n      <h4 class="gestures-header">Gestures</h4>\n      <ul class="gestures">\n          <li ng-repeat="gesture in main.gestures" ng-class="{ selected : gesture.id === main.view.currentGestureId }"><span ng-click="main.selectGesture(gesture.id)">{{gesture.name}}</span></li>\n      </ul>\n      <div class="row">\n        <div class="col-xs-12">\n          <button class="btn" ng-click="main.record()" ng-class="{ \'btn-danger\' : main.view.recording, \'btn-default\' : !main.view.recording }"><span class="glyphicon glyphicon-record"></span> Record</button>\n          <button class="btn btn-default play-pause" ng-disabled="!main.player.recording || !main.view.currentGestureId" ng-click="main.toggle()">\n            <span ng-show="!main.view.playing"><span class="glyphicon glyphicon-play"></span> Play</span>\n            <span ng-show="main.view.playing"><span class="glyphicon glyphicon-pause"></span> Pause</span>\n          </button>\n         <!-- <button class="btn btn-default play-pause" ng-show="main.view.playing" ng-disabled="!main.player.recording || !main.view.currentGestureId" ng-click="main.pause()"><span class="glyphicon glyphicon-pause"></span> Pause</button> -->\n          <button class="btn btn-default" ng-disabled="!main.player.recording || !main.view.currentGestureId" ng-click="main.delete()"><span class="glyphicon glyphicon-trash"></span> Delete</button>\n        </div>\n      </div>\n    </div>\n    <div class="player-controller-container col-xs-9">\n      <play-controls></play-controls>\n    </div>\n  </div>\n</div>\n'),e.put("app/main/saveRecordingModal.html",'<div class="modal-header">\n    <h3 class="modal-title">Save Gesture</h3>\n</div>\n<div class="modal-body">\n  <form>\n    <div class="form-group">\n      <input type="text" class="form-control" placeholder="Gesture name" ng-model="gestureName">\n    </div>\n  </form>\n</div>\n<div class="modal-footer">\n    <button class="btn btn-primary" type="button" ng-click="save()">Save</button>\n    <button class="btn btn-default" type="button" ng-click="cancel()">Discard</button>\n</div>\n'),e.put("app/components/playControls/playControls.html",'<div class="player-controller">\n  <recording><playhead></playhead></recording>\n</div>\n')}]);
//# sourceMappingURL=../maps/scripts/app-f6ad1ae91a.js.map
