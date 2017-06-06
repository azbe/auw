window.onload = main;

function main()
{
	messages = document.getElementById('chat');
	send = document.getElementById('input_send');

	send.addEventListener('click', sendPost);
}

function sendPost()
{
	var text = document.getElementById('input_text').value;
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open('POST', window.location.href, true);
	xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xmlhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200)
		{
			var res = xmlhttp.responseText;
			var newMessage = document.createElement('div');
			newMessage.appendChild(document.createTextNode(res));
			newMessage.className += 'message';		
			newMessage.innerHtml = res;
			var newBr = document.createElement('br');
			messages.appendChild(newMessage);
			messages.appendChild(newBr);
		}
	};
	xmlhttp.send('chatmessage=' + text);
} 
