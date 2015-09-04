(function() {

	var user = angular.module("yleUser", ["yleEvent"]);
	user.value("USER_ENDPOINT", "http://localhost:8081");
	user.service("USER_API", ["$resource", "USER_ENDPOINT", function($resource, USER_ENDPOINT) {
		return $resource(USER_ENDPOINT + "/auth/:method", {
			method: "@id"
		}, {
			query: {
				method: "GET",
				cache: true,
				isArray: true
			}
		})
	}]);

	user.controller("loginCtrl", ["$scope", "USER_API", function($scope, USER_API) {
		$scope.user = new USER_API();
		$scope.login = function() {
			$scope.user.$save({
					"method": "login"
				},
				// Success callback method.
				function(response) {
					console.log(response)
				},
				// Error callback method.
				function(error) {
					console.log(error)
				});
		}
	}]);

	user.controller("signupCtrl", ["$scope", "USER_API", function($scope, USER_API) {
		$scope.user = new USER_API();
		$scope.signup = function() {
			$scope.user.$save({
					"method": "signup"
				},
				// Success callback method.
				function(response) {
					console.log(response)
				},
				// Error callback method.
				function(error) {
					console.log(error)
				});
		}
	}])
})();