//@Author William E. Velázquez Amarra - williamvelazquez.isc@gmail.com
const socket = io(); 

let USER;
let $MESSAGE;
let $MESSAGES_UNORDERED_LIST;
let $NOTIFY_USER;

const callback = function(){
  // Handler when the DOM is fully loaded
  let name = makeid();
  USER=name;
  $MESSAGE = document.querySelector('#messageInput');
  $MESSAGES_UNORDERED_LIST = document.querySelector('#messages');
  $NOTIFY_USER = document.querySelector('#notifyUser');
  document.querySelector('#user').value=name;
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
};

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

const submitfunction = function(){
  // let from = document.querySelector('#user').value;//$('#user').val();
  // let message = document.querySelector('#messageInput').value;//$('#m').val();
  // console.log("------>",from, message);
  let message=$MESSAGE.value;
  console.log("------>",USER, message);
  if(message != '') {
    socket.emit('chatMessage', USER, message);
    // socket.emit('chatMessage', from, message);
  }
  $MESSAGE.value="";
  $MESSAGE.focus();
  //$('#m').val('').focus();
  return false;
}

const notifyTyping = function(){ 
  // let user = $('#user').val();
  // socket.emit('notifyUser', user);
  socket.emit('notifyUser', USER);
}

socket.on('chatMessage', function(from, msg){
  // let me = $('#user').val();
  let color = (from == USER) ? 'green' : '#009afd';
  // let color = (from == me) ? 'green' : '#009afd';
  let fromText = (from == USER) ? 'Me' : from;
  // let fromText = (from == me) ? 'Me' : from;
  console.log("------>>>>>>", msg, color, fromText);
  // $('#messages').append('<li><b style="color:' + color + '">' + fromText + '</b>: ' + msg + '</li>');
  $MESSAGES_UNORDERED_LIST.insertAdjacentHTML('beforeend','<li><b style="color:' + color + '">' + fromText + '</b>: ' + msg + '</li>');
});

socket.on('notifyUser', function(user){
  // let me = $('#user').val();
  // if(user != me) {
  if(user != USER) {
    // $('#notifyUser').text(user + ' is typing ...');
    $NOTIFY_USER.innerHTML=user + ' is typing ...';
  }
  // setTimeout(function(){ $('#notifyUser').text(''); }, 10000);;
  setTimeout(function(){$NOTIFY_USER.innerHTML=""; }, 10000);;
});

// $(document).ready(function(){
//   let name = makeid();
//   $('#user').val(name);
//   // document.querySelector('#user').value=name;
//   socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
//   // USER=document.querySelector('#user').value;
//   // $MESSAGE = document.querySelector('#messageInput');
//   // $MESSAGES_UNORDERED_LIST = document.querySelector('#messages');
//   // $NOTIFY_USER = document.querySelector('#notifyUser');
// });

const makeid = function(){
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( let i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}