'use strict';

let course;
let duration;

function backToHome() {

  let lightbox = document.getElementById('lightbox');
  let confirmSessionNode = document.getElementById('confirm-session-pop-up');
  let confirmCourseNode = document.getElementById('add-new-course-option');

  lightbox.style.display = 'none';
  lightbox.style.opacity = 0;

  confirmSessionNode.style.display = 'none';
  confirmSessionNode.style.opacity = 0;

  confirmCourseNode.style.display = 'none';
  confirmCourseNode.style.opacity = 0;

}

function reInitCourses() {

  let savedCourses = getCourses();
  // let currentInnerHtml = document.getElementById('course-list').innerHTML;
  savedCourses = savedCourses.map(course => `<li><div>${course}</div><div data-for="${course}" class="start-btn">Start Session</div></li>`).join('')
  let currentInnerHtml = savedCourses;

  document.getElementById('course-list').innerHTML = currentInnerHtml;

  let newEventTriggers = document.querySelectorAll('.start-btn')
  newEventTriggers.forEach(node => {

    node.addEventListener('click', () => {

      let lightbox = document.getElementById('lightbox');
      let confirmSessionNode = document.getElementById('confirm-session-pop-up');

      lightbox.style.display = 'block';
      lightbox.style.opacity = 0.8;

      confirmSessionNode.style.display = 'block';
      confirmSessionNode.style.opacity = 1;

      course = node.attributes['data-for'].value;

    });

  });

}

document.addEventListener('DOMContentLoaded', (e) => {

  reInitCourses();

  let confirmSession = document.getElementById('confirm-session');

  confirmSession.addEventListener('click', () => {

    if (getSessions().length == 0) {
      let durationNodeValue = document.getElementById('duration').value;
      putSession(course, Date.now(), Number(durationNodeValue));

      backToHome();
    } else {
      alert('A lecture is still active')
    }
  });

  let backButtons = document.querySelectorAll('.back-to-home');
  backButtons.forEach(node => {

    node.addEventListener('click', () => {

      backToHome();

    });

  });

  let addNewCoursePopUpButton = document.getElementById('add-new-course');
  addNewCoursePopUpButton.addEventListener('click', () => {

    let lightbox = document.getElementById('lightbox');
    let confirmSessionNode = document.getElementById('add-new-course-option');

    lightbox.style.display = 'block';
    lightbox.style.opacity = 0.8;

    confirmSessionNode.style.display = 'block';
    confirmSessionNode.style.opacity = 1;

  });

  let confirmNewCourse = document.getElementById('confirm-course');
  confirmNewCourse.addEventListener('click', () => {

    let inputCourse = document.getElementById('course-name-inp').value;
    if (inputCourse != '') {
      putCourse(inputCourse);
      reInitCourses();
      backToHome();
    }

  });

});
