var application = angular.module("firstApp",[]);

application.controller("BookListController", function($scope, $http) {
    $scope.showDetails = false;
    $scope.currentPage = 1;
    $scope.booksPerPage = 20;
    $scope.pagedBooks = [];
    $scope.gap = 5;

    $http({
        cache: true,
        method: 'GET',
        url: 'https://fakerestapi.azurewebsites.net/api/Books'
    }).then(function successCallback(response) {
        $scope.pagedBooks = [];
        for (var i = 0; i < response.data.length; i++) {
            if (i % $scope.booksPerPage === 0) {
                $scope.pagedBooks[Math.floor(i / $scope.booksPerPage)] = [response.data[i]];
            } else {
                $scope.pagedBooks[Math.floor(i / $scope.booksPerPage)].push(response.data[i]);
            }
        }
        $scope.range = function(size, currentPage, gap) {
            var ret = [];
            var start;
            var end;
            if (currentPage - Math.floor(gap/2) < 1) {
                start = 1;
                end = start + gap ;
            } else if (currentPage + Math.floor(gap/2)+1 > size) {
                end = size+1;
                start = size - gap+1;
            } else {
                start = currentPage - Math.floor(gap/2);
                end = currentPage + Math.floor(gap/2)+1;
            }
            for (var i = start; i < end; i++) {
              ret.push(i);
            }
            return ret;
          };

    }, function errorCallback(response) {
        console.log('error, response: ',response);
    });

    $scope.goToBookDetails = function(bookId) {
        $http({
            method: 'GET',
            url: 'https://fakerestapi.azurewebsites.net/api/Books/'+bookId
        }).then(function successCallback(res) {
            $scope.bookDetail = res;
            $scope.showDetails = true;
        }, function errorCallback(res) {
            console.log('error, response: ',res);
        });
    };

    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pagedBooks.length-1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function() {
        $scope.currentPage = this.n;
    };

});