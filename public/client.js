document.querySelector("#submit_url").onclick = function(){
  var url = document.querySelector("#input_url").value
  if (url.length > 0){   
    shorten(url);
  } else {
    alert("You can't shorten nothing.")
    }
}

function shorten(url){
  //sends a request to the database, shortening the url.
  fetch('/', { //send a request to the server based on the url. This comes back as a promise.
    method : "post",
    body : JSON.stringify({long : url}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
    .then(function(response){return response.text()}) //when the promise resolves, turn it into text. This comes back as a promise.
    .then(function(text){ //when that promise resolves, 
      document.querySelector("#response").innerHTML = "Your shortened URL is " + text //print the text.
  })
}