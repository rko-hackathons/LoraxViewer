angular.module('songhop.services', ['ionic.utils'])

.factory('User', function ($http, $localstorage, $q, SERVER) {
    
    var o = {
        username: false,
        session_id: false,
        favorites: [ ]
    };

    // gets the entire list of this users faves from the server
    o.populateFavorites = function() {
       // persist this to the server
       return $http({
         method: 'GET',
         url: SERVER.url + '/favorites',
         params: { session_id: o.session_id}
       }).success(function(data){
        // merge data in to the fav queue
        o.favorites =  data;
      });
    };
    
    o.addSongToFavorites = function (song) {
        // insure there is a song to add
        if (!song) return false;
       
        // add to favorites array 
        o.favorites.unshift(song);

       // persist this to the server
       return $http.post(SERVER.url + '/favorites', { session_id: o.session_id, song_id: song.song_id});
        
    };
    
    o.removeSongFromFavorites = function(song, index) {
       // make sure there's a song to remove
       if (!song) return false;

       // remove from favorites array
       o.favorites.splice(index, 1);

       // remove this from the server
       return $http({
         method: 'DELETE',
         url: SERVER.url + '/favorites',
         params: { session_id: o.session_id, song_id: song.song_id}
    });
  };

    // attempt to login or signup
    o.auth = function(username,signingUp) {
       var authRoute;

       if (signingUp) {
          authRoute = 'signup';
       } else {
          authRoute = 'login';
       }

       return $http.post(SERVER.url + '/' + authRoute, {username: username})
          .success(function(data){
             o.setSession(data.username, data.session_id, data.favorites);
          });
    };

     // set session data
     o.setSession = function(username, session_id, favorites) {
        if (username) o.username = username;
        if (session_id) o.session_id = session_id;
        if (favorites) o.favorites = favorites;

        // set data in localstorage object
        $localstorage.setObject('user', { username: username, session_id: session_id });
     };

    // check if there's a user session present
    o.checkSession = function() {
       var defer = $q.defer();
       if (o.session_id) {
          // if this session is already initialized in the service
          defer.resolve(true);
       } else {
          // detect if there's a session in localstorage from previous use.
          // if it is, pull into our service
          var user = $localstorage.getObject('user');
          if (user.username) {
             // if there's a user, lets grab their favorites from the server
             o.setSession(user.username, user.session_id);
             o.populateFavorites().then(function() {
                defer.resolve(true);
             });
          } else {
             // no user info in localstorage, reject
             defer.resolve(false);
          }
       }
       return defer.promise;
    };
   
    // wipe out our session data
    o.destroySession = function() {
       $localstorage.setObject('user', {});
       o.username = false;
       o.session_id = false;
       o.favorites = [];
    }; 
 
    return o;
})

.factory('Recommendations', function ($http, SERVER, $q){
    
    var o = {
        queue: []
    };
    
    o.getNextSongs = function() {
        return $http ({
            method:'GET',
            url: SERVER.url + '/recommendations'
        })
        .success(function(data) {
            o.queue = o.queue.concat(data);
        });
    };
    
    o.nextSong = function() {
        o.queue.shift();
        
        if (o.queue.length <= 3) {
            o.getNextSongs();
        }
    };
    
    return o;
});
