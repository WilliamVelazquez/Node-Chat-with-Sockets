//@Author William E. Velázquez Amarra - williamvelazquez.isc@gmail.com
const socket = io(); 
const KEY_CODES = [8,9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,91,92,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145,255];

let USER;
let $MESSAGE;
let $MESSAGES_UNORDERED_LIST;
let $NOTIFY_USER;

let typingTimeOut;

const scrollToBottom = function(){
  window.scrollTo(0,document.body.scrollHeight);
}

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

const submitfunction = function(event){
  event.preventDefault();
  let message=$MESSAGE.value;
  if(message != '') {
    socket.emit('chatMessage', USER, message);
  }
  $MESSAGE.value="";
  $MESSAGE.focus();
  // return false;
}

const notifyTyping = function(event){
  if(!KEY_CODES.includes(event.keyCode)){
    socket.emit('notifyUser', USER);
  }
}

////////////////////////////////////////
//Socket Events
////////////////////////////////////////

socket.on('chatMessage', function(from, msg){
  let color = (from == USER) ? 'green' : '#009afd';
  let fromText = (from == USER) ? 'Me' : from;
  $MESSAGES_UNORDERED_LIST.insertAdjacentHTML('beforeend','<li><b style="color:' + color + '">' + fromText + '</b>: ' + msg + '</li>');
  scrollToBottom();
  if(from !== USER){
    $NOTIFY_USER.innerHTML="";
    clearTimeout(typingTimeOut);
  }
});

socket.on('notifyUser', function(user){
  if(user != USER) {
    clearTimeout(typingTimeOut);
    $NOTIFY_USER.innerHTML=user + ' is typing ...';
  }
  typingTimeOut=setTimeout(function(){$NOTIFY_USER.innerHTML=""; }, 5000);;
});
