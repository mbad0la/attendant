var socket = io('http://localhost:3000');

socket.on('new user', function(data){
  console.log(data)
})

socket.on('new message', function(data){
  console.log(data)
})


socket.on('image', function(data) {
  var span = document.createElement('span');
  span.innerHTML = ['<img class="thumb" src="', data.image,
                    '" title="', escape(data.name), '"/>'].join('');
  document.getElementById('list').insertBefore(span, null);
})

function something() {
  console.log('hey')
  socket.emit('new message', {
    message: "I'm broadcasting"
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
