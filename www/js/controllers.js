app.controller('MainController', 
  ['$scope', '$http', 'Flickr', function($scope, $http, Flickr) { 
      // similarwords.success(function(data) { 
      //   $scope.words = data.similars; 
      // });
      query = $scope.query;
      
      $scope.search = function(query) {
        $http.get('http://hetzner.radimrehurek.com/w2v/most_similar?positive%5B%5D='+query)
          .success(function(data) {
            console.log(data)
            result = []
            
            for (i = 0; i < data.similars.length; i++) { 
                var word =  capitalise(data.similars[i][0]).replace("_"," ").replace("_"," ");
                Flickr.search(word).then(function(resp) {
                  photos = resp;
                  $scope.photo = photos.items[i]
                });
                result.push({
                  "word": data.similars[i][0],
                  "upper_word": word,
                  "pct": data.similars[i][1],
                  //"photo": $scope.photo.media.m,
                })
            }
            console.log(result)
            
            $scope.result = result;
          });
      };
}]);


function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};