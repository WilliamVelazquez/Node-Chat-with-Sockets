//@Author William E. Velázquez Amarra - williamvelazquez.isc@gmail.com
const socket = io(); 

let USER;
let $MESSAGE;
let $MESSAGES_UNORDERED_LIST;
let $NOTIFY_USER;

const callback = function(){
  let name = makeid();
  USER=name;
  $MESSAGE = document.querySelector('#messageInput');
  $MESSAGES_UNORDERED_LIST = document.querySelector('#messages');
  $NOTIFY_USER = document.querySelector('#notifyUser');
  document.querySelector('#user').value=name;
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
};

const makeid = function(){
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( let i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

const submitfunction = function(){
  let message=$MESSAGE.value;
  if(message != '') {
    socket.emit('chatMessage', USER, message);
  }
  $MESSAGE.value="";
  $MESSAGE.focus();
  return false;
}

const notifyTyping = function(){
  socket.emit('notifyUser', USER);
}

////////////////////////////////////////
//Socket Events
////////////////////////////////////////

socket.on('chatMessage', function(from, msg){
  let color = (from == USER) ? 'green' : '#009afd';
  let fromText = (from == USER) ? 'Me' : from;
  $MESSAGES_UNORDERED_LIST.insertAdjacentHTML('beforeend','<li><b style="color:' + color + '">' + fromText + '</b>: ' + msg + '</li>');
});

socket.on('notifyUser', function(user){
  if(user != USER) {
    $NOTIFY_USER.innerHTML=user + ' is typing ...';
  }
  setTimeout(function(){$NOTIFY_USER.innerHTML=""; }, 10000);;
});
