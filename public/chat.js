//Make connection
var PORT = process.env.PORT || 3000;
var socket = io.connect('https://localhost:'+ PORT);

// Query DOM 

var message = document.getElementById('message');
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

//Emit Events 

btn.addEventListener('click', function(){

	socket.emit('chat', {
		message : message.value,
		handle : handle.value

	});

	message.value = '';

});

message.addEventListener('keypress', function(){
	socket.emit('typing', handle.value);
});

//Listen for events

socket.on('chat', function(data){
	output.innerHTML += '<p><strong>'+ data.handle +':</strong> '+ data.message+'</p>'
});

var timer = setTimeout(makeNoTypingState, 1000);
socket.on('typing', function(data){

	feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
	clearTimeout(timer);
    timer = setTimeout(makeNoTypingState, 1000);

});

function makeNoTypingState() {
    feedback.innerHTML = "";
}

//node indexno
