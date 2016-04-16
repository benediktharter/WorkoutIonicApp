angular.module('workout.controllers', [])

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $timeout, $ionicModal, Workouts) {

  console.log("In menu ctrl");

  /*$scope.workouts = [{
      title: "Workout A",
      id: 1
    }, {
      title: "Workout B",
      id: 2
    }, {
      title: "Workout C",
      id: 3
    }
  ]; */

  // A utility function for creating a new workout
  // with the given workoutTitle
  var createWorkout = function(workoutTitle) {
    var newWorkout = Workouts.newWorkout(workoutTitle);
    $scope.workouts.push(newWorkout);
    Workouts.save($scope.workouts);
    $scope.selectProject(newWorkout, $scope.workouts.length - 1);
  }

  $scope.workouts = Workouts.all();

  // Grab the last active, or the first project
  $scope.activeWorkout = $scope.workouts[Workouts.getLastActiveIndex()];

  // Called to create a new project
  $scope.newWorkout = function() {
    var workoutTitle = prompt('Workout Name');
    if (workoutTitle) {
      createWorkout(workoutTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeWorkout = project;
    Workouts.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if ($scope.workouts.length == 0) {
      while (true) {
        var workoutTitle = prompt('Your first workout title:');
        if (workoutTitle) {
          createWorkout(workoutTitle);
          break;
        }
      }
    }
  })
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
    console.log($scope.id);
    console.log($scope.exercises);
  };

  // Open our new task modal
  $scope.newExercise = function() {
    $scope.exerciseModal.show();
  };

  // Close the new task modal
  $scope.closeNewExercise = function() {
    $scope.exerciseModal.hide();
  };

})

.factory('Workouts', function() {
  return {
    all: function() {
      var workoutString = window.localStorage['workout'];
      if (workoutString) {
        return angular.fromJson(workoutString);
      }
      return [];
    },
    save: function(workouts) {
      window.localStorage['workouts'] = angular.toJson(workouts);
    },
    newWorkout: function(workoutTitle) {
      // Add a new project
      return {
        title: workoutTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveWorkout']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveWorkout'] = index;
    }
  }
});
