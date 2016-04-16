angular.module('workout').factory('WorkoutDB', ['$q', WorkoutDB]);

function WorkoutDB($q) {
  var _db;

  // We'll need this later.
  var _workouts;

  return {
    initDB: initDB,

    // We'll add these later.
    getAllWorkouts: getAllWorkouts,
    addWorkout: addWorkout,
    updateWorkout: updateWorkout,
    deleteWorkout: deleteWorkout
  };

  function initDB() {
    // Creates the database or opens if it already exists
    _db = new PouchDB('workouts', {
      adapter: 'websql'
    });
  }

  function addWorkout(workout) {
    return $q.when(db.post(workout));
  }

  function updateWorkout(workout) {
    return $q.when(_db.put(workout));
  }

  function deleteWorkout(workout) {
    return $q.when(_db.remove(workout));
  }

  function getAllWorkouts() {
    if (!_workouts) {
      return $q.when(_db.allDocs({
          include_dics: true
        }))
        .then(function(docs) {
          // Each row has a .doc object and we just want to send an
          // array of workout objects back to the calling controller,
          // so let's map the array to contain just the .doc objects.
          _workouts = docs.rows.map(function(row) {
            // Dates are not automatically converted from a string.
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });

          // Listen for changes on the database.
          _db.changes({
              live: true,
              since: 'now',
              include_docs: true
            })
            .on('change', onDatabaseChange);

          return _workouts;
        });
    } else {
      // return cached data as promised
      return $q.when(_workouts);
    }
  }
}
