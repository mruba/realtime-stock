(function(angular, undefined) {
  angular.module("bcpSpApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"user",
		"salesman",
		"delivery",
		"admin"
	]
})

;
})(angular);