angular.module('controllers.dash', [])

.controller('DashCtrl', function($scope, Project, Clock, db) {
  $scope.projects = Project.all();

  $scope.newProject = function() {
    $scope.newProject.visible = true;
  }
  $scope.newProject.visible = false;

  $scope.clockIn = function(clock) {
    clock.on()
    db.save();
  }

  $scope.clockOut = function(clock) {
    clock.off()
    db.save();
  }
})
