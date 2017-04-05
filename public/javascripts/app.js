var comment = window.angular.module('comment', [])

comment.factory('pictureFetcher',pictureFetcher)
comment.controller('MainCtrl', MainCtrl)

function pictureFetcher($http) {
  var API_ROOT = 'comments'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
    post: function (formData) {
      return $http
        .post(API_ROOT,formData)
        .then(function (resp) {
          console.log("Post worked");
        })
    }
  }
}

function MainCtrl ($scope,$http, pictureFetcher) {
  $scope.comments = [];

  pictureFetcher.get()
    .then(function (data) {
      $scope.comments = data
    })

  $scope.addComment = function() {
    var newcomment = {title:$scope.Title,session:$scope.Session,url:$scope.Url,speaker:$scope.Speaker,upvotes:0};
    pictureFetcher.post(newcomment);
    $scope.comments.push(newcomment);
    $scope.Session='';
    $scope.Url='';
    $scope.Speaker='';
    $scope.Title='';
  };
    
$scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(comment) {
	  $scope.upvote(comment);
    };
    $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
    $scope.getAll();

}
