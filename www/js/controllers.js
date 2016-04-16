angular.module('workout.controllers', [])

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate) {

  console.log("In menu ctrl");

  $scope.workouts = [{
      title: "Workout A",
      id: 1
    }, {
      title: "Workout B",
      id: 2
    }, {
      title: "Workout C",
      id: 3
    }

  ];

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('WorkoutCtrl', function($scope, $ionicModal) {

  console.log("In workout ctrl");
  $scope.id = 4;
  $scope.exercises = [{
      title: "Exercise A",
      id: 1
    }, {
      title: "Exercise B",
      id: 2
    }, {
      title: "Exercise C",
      id: 3
    }

  ];

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('templates/new_exercise.html', function(modal) {
    $scope.exerciseModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createExercise = function(exe) {
    $scope.exercises.push({
      title: exe.title,
      id: $scope.id
    });
    $scope.exerciseModal.hide();
    exe.title = "";
    $scope.id += 1;
  };

  // Open our new task modal
  $scope.newExercise = function() {
    $scope.exerciseModal.show();
  };

  // Close the new task modal
  $scope.closeNewExercise = function() {
    $scope.exerciseModal.hide();
  };

});
