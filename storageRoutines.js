'use strict';

const storage = window.localStorage;

// Method to insert new lecture session into local storage
function putSession(course, startTime, duration) {

  let lectures = getSessions();
  lectures = removeSessions(lectures);
  lectures.push({course, startTime, duration});
  storage.setItem('lectures', JSON.stringify(lectures));

}

// Read active lectures in the current hall scope
function getSessions() {

  let lectures = JSON.parse(storage.getItem('lectures'));
  return lectures;

}

// Filter out lectures which are over
function removeSessions(lectures) {

  let currentTime = Date.now();

  let updatedLectures = lectures.filter(lecture => (currentTime < (lecture.startTime + lecture.duration*60*60*1000)));

  return updatedLectures;

}
