var valid = new RegExp("http:\/\/www[.][a-zA-Z0-9$_.+!*'(),,-]+[.].+")
var count = require("./.data/count")


function check_url(url){
  return valid.test(url)
}

function create_url(){
  var url = "https://make-small.glitch.me/link/x" + count.count
  count.count += Math.floor(Math.random() * 20)
  return url
}

function create_entry(long){
  return {
    short: create_url(),
    long : long 
  }
}

module.exports = {
  check_url: check_url,
  create_entry : create_entry,
  create_url: create_url
}