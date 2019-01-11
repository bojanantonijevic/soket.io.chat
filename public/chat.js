
//Make connection

var socket = io.connect('https://speakeasy-io.herokuapp.com/');

// Query DOM 

var message = document.getElementById('message');
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

//lock the name if focusout && name longer or equal then 3

$("#handle").focusout(function(){

	if($(this).val().length >= 3){
	$(this).prop('disabled', true)
	}
});	

//Emit Events 

btn.addEventListener('click', function(){
	if($(message).val().length !== 0){
	socket.emit('chat', {
		message : message.value,
		handle : handle.value

	});

	message.value = '';

}else{
	return false;
}
});

// enter key to send the input
document.getElementById("message").addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    
    // Enter is pressed
    if ((e.keyCode == 13) && ($(message).val().length !== 0) ) { 
    	socket.emit('chat', {
			message : message.value,
			handle : handle.value

	}); message.value = '';}
}, false);


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
};

$("#output").bind("DOMSubtreeModified", function() {
   $('#chat-window').animate({scrollTop: $('#chat-window').prop("scrollHeight")}, 100);
		
});
