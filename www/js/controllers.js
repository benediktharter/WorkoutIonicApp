angular.module('workout.controllers', [])

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate) {

  console.log("In menu ctrl");

  $scope.workouts = [
    { title: "Workout A", id: 1},
    { title: "Workout B", id: 2},
    { title: "Workout C", id: 3}

  ];

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('WorkoutCtrl', function($scope) {

  console.log("In workout ctrl");

  $scope.exercises = [
    { title: "Exercise A", id: 1},
    { title: "Exercise B", id: 2},
    { title: "Exercise C", id: 3}

  ];
});
