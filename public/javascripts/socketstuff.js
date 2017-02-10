var socket = io('http://localhost:3000');

socket.on('user message', function(data){
  console.log(data)
})

socket.on('image', function(data) {
  var span = document.createElement('span');
  span.innerHTML = ['<img class="thumb" src="', data.image,
                    '" title="', escape('Test'), '"/>'].join('');
  document.getElementById('list').insertBefore(span, null);
})

function something() {
  socket.emit('new message', {
    message: "I'm broadcasting"
  })
}


// Image STuff
function handleFileSelect(evt) {
   var files = evt.target.files; // FileList object

   // Loop through the FileList and render image files as thumbnails.
   for (var i = 0, f; f = files[i]; i++) {

     // Only process image files.
     if (!f.type.match('image.*')) {
       continue;
     }
     var reader = new FileReader();
     // Closure to capture the file information.
     reader.onload = (function(theFile) {
       return function(e) {
         socket.emit('image', {
           image: e.target.result
         })
       };
     })(f);

     // Read in the image file as a data URL.
     reader.readAsDataURL(f);
   }
 }

 document.getElementById('files').addEventListener('change', handleFileSelect, false);
