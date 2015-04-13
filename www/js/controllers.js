angular.module('songhop.controllers', ['ionic', 'songhop.services'])


/*
Controller for the splash page
*/
.controller('SplashCtrl', function($scope, $state, User) {
   // attempt to signup/login via User.auth
   $scope.submitForm = function(username, signingUp) {
      User.auth(username, signingUp).then(function(){
         // session is now set so redirect to discover page
         $state.go('tab.discover');
      }, function() {
         // error handling
         alert('Hmm... try another username');
      });
   }

})

/*
Controller for the discover page
*/
.controller('DiscoverCtrl', function($scope, $ionicLoading, $timeout, User, Recommendations) {

    // helper functions for loading
    var showLoading = function() {
       $ionicLoading.show({
          template: '<i class="ion-loading-c"></i>',
          noBackdrop: true
       });
    }

    var hideLoading = function() {
       $ionicLoading.hide();
    }

    // set loading to true the first time we load data from the server
    showLoading();

    // get our first songs
    Recommendations.getNextSongs()
    .then(function(){
      $scope.currentSong = Recommendations.queue[0];
    }).then(function(){
       hideLoading();
       $scope.currentSong.loaded = true;
    });
   
    /*$scope.songs = [
     {
        "title":"Stealing Cinderella",
        "artist":"Chuck Wicks",
        "image_small":"https://i.scdn.co/image/d1f58701179fe768cff26a77a46c56f291343d68",
        "image_large":"https://i.scdn.co/image/9ce5ea93acd3048312978d1eb5f6d297ff93375d"
     },
     {
        "title":"Venom - Original Mix",
        "artist":"Ziggy",
        "image_small":"https://i.scdn.co/image/1a4ba26961c4606c316e10d5d3d20b736e3e7d27",
        "image_large":"https://i.scdn.co/image/91a396948e8fc2cf170c781c93dd08b866812f3a"
     },
     {
        "title":"Do It",
        "artist":"Rootkit",
        "image_small":"https://i.scdn.co/image/398df9a33a6019c0e95e3be05fbaf19be0e91138",
        "image_large":"https://i.scdn.co/image/4e47ee3f6214fabbbed2092a21e62ee2a830058a"
     }
  ]; 
    
    $scope.currentSong = angular.copy($scope.songs[0]);
    */
   
    // fired when we favorite / skip a song 
    $scope.sendFeedback = function (bool){
       // first, add to favorites if they favorited
       if (bool) User.addSongToFavorites($scope.currentSong);

       // set variables for the correct animation seq
       $scope.currentSong.rated = bool;
       $scope.currentSong.hide = true;
        
       // prepare the next song
       Recommendations.nextSong();

       $timeout(function() {
          // $timeout to allow animation to complete
          $scope.currentSong = Recommendations.queue[0];
       }, 250);
    };
    
    // used for retrieving the next album image.
  // if there isn't an album image available next, return empty string.
  $scope.nextAlbumImg = function() {
    if (Recommendations.queue.length > 1) {
      return Recommendations.queue[1].image_large;
    }

    return '';
  };

})


/*
Controller for the favorites page
*/
.controller('FavoritesCtrl', function($scope, User, $window) {
    $scope.favorites = User.favorites;
    $scope.username = User.username;

    // do this when favorite song is selected
    $scope.openSong = function(song) {
       $window.open(song.open_url, "_system");  // open in browser
    };
    
    $scope.removeSong = function(song, index) {
       User.removeSongFromFavorites(song, index);
    };

})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope, User, $window) {
    $scope.logout = function() {
       User.destroySession();

       // instead of using $state.go, we're going to redirect.
       // reason: we need to ensure views aren't cached.
       $window.location.href = 'index.html';
    };

});
