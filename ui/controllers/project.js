angular.module('controllers.project', [])

.controller('ProjectCtrl', function($scope, Clock) {

  $scope.sessions = Clock.sessions()

  $scope.startTime = null;

  $scope.clockedIn = function() {
    return Clock.isOn();
  }

  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  $scope.formatSession = function(session) {
    var diff = null;
    if (session.end) {
      diff = moment(session.end).diff(session.start);
    } else {
      diff = moment().diff(session.start);
    }
    var duration = moment.duration(diff)
    var hours = duration.hours()
    var mins = pad(duration.minutes(), 2)
    var secs = pad(duration.seconds(), 2)
    if (hours > 0) {
      return [hours, mins, secs].join(':')
    } else {
      return [mins, secs].join(':')
    }
  }

  var interval = null;

  $scope.clockIn = function() {
    Clock.on()
    interval = setInterval(function() {
      $scope.$digest();
    }, 1000);
  }

  $scope.clockOut = function() {
    Clock.off()
    clearInterval(interval);
  }
})