'use strict';

const storage = window.localStorage;

// Method to insert new course option
function putCourse(course) {

  let courses = getCourses();
  courses.push(course);
  storage.setItem('courses', JSON.stringify(courses));

}

// Read active courses
function getCourses() {

  let courses = JSON.parse(storage.getItem('courses') || '[]');
  return courses;

}

// Method to insert new lecture session into local storage
function putSession(course, startTime, duration) {

  let lectures = getSessions();
  let count = 0;
  lectures = removeSessions(lectures);
  lectures.push({course, startTime, duration, count});
  storage.setItem('lectures', JSON.stringify(lectures));

}

// Read active lectures in the current hall scope
function getSessions() {

  let lectures = JSON.parse(storage.getItem('lectures') || '[]');
  lectures = removeSessions(lectures);
  return lectures;

}

// Filter out lectures which are over
function removeSessions(lectures) {

  let currentTime = Date.now();

  let updatedLectures = lectures.filter(lecture => (currentTime < (lecture.startTime + lecture.duration*60*60*1000)));

  return updatedLectures;

}

function updateCount() {
  var sessions = getSessions();
  if(sessions.length == 1) {
    sessions[0]['count']++;
    storage.setItem('lectures', JSON.stringify(sessions))
    return sessions[0]['count'];
  }
  return null;
}
