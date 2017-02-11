var socket = io('http://localhost:3000');

var students = 0;

socket.on('new user', function(data){
  console.log(data)
})

socket.on('new message', function(data){
  console.log(data)
  let feed = document.getElementById('doubt-feed');
  feed.innerHTML = "<div class='doubt-card'>" + JSON.parse(data.user).name +" : "+data.message + "</div>" + feed.innerHTML;
})

socket.on('image', function(data) {

  var source = data.image

  var span = document.createElement('span');
  var name = data.name.split('.');
  if(data.name.split('.')[name.length - 1] === 'pdf') {
    source = '/images/pdf.png';
  }

  if(data.name.split('.')[name.length - 1] === 'docx') {
    source = '/images/docx.png';
  }

  span.innerHTML = ['<img class="thumb" src="', source,
                    '" title="', escape(data.name), '"/>'].join('');
  document.getElementById('list').insertBefore(span, null);
})

function something() {
  console.log('hey')
  socket.emit('new message', {
    user: window.localStorage.getItem('user'),
    message: document.getElementById('message').value
  })
}


// Image Stuff
function handleFileSelect(evt) {
   var files = evt.target.files; // FileList object

   // Loop through the FileList and render image files as thumbnails.
   for (var i = 0, f; f = files[i]; i++) {

     // Only process image files.
     /*if (!f.type.match('image.*')) {
       continue;
     }
     */
     var reader = new FileReader();
     // Closure to capture the file information.
     reader.onload = (function(theFile) {
       return function(e) {
         socket.emit('image', {
           image: e.target.result,
           name: theFile.name
         })
       };
     })(f);

     // Read in the image file as a data URL.
     reader.readAsDataURL(f);
   }
 }

 socket.emit('new user', {
   message: JSON.parse(window.localStorage.getItem('user'))
 })


document.getElementById('files').addEventListener('change', handleFileSelect, false);
