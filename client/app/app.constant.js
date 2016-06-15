(function(angular, undefined) {
  angular.module("bcpSpApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin",
		"salesman",
		"delivery"
	]
})

;
})(angular);