var http = require('http');
var url = require('url');
var request = require('request');
var parseJson = require('parse-json');
var configs = require('./email_settings.json');

http.createServer(function (req, thisServerResponse) {
  thisServerResponse.writeHead(200, {'Content-Type': 'text/html'});

  var body = [];
  req.on('data', (chunk) => {
	body.push(chunk);
  }).on('end', () => {
	body = Buffer.concat(body).toString();

	const jsonBody = parseJson(body);
	const imageUrl = jsonBody.TextBody
		.replace('Recognise=', "")
		.replace(/\r\n/g, "")
		.replace(/\\\//g, "/")
		.replace('Recognise=', "");

	var toEmail = jsonBody.From;
	var sender = configs.senderEmail;

	
    request.post({url:'https://developer.blippar.com/portal/vs-api/website-trial/', form: 
	  {'upload_type': 'async','paste_image_url': imageUrl}	  
	}, function(err,httpResponse,body)	{
	  var tags = parseJson(body).tags;
	  image_tags = tags;

	  var stringTags = "";
	  if(tags)	{
	  	stringTags = imageUrl+':\n"'+tags.join('";\n "')+'"';	
	  }
	  else {
	  	stringTags = "Failed to identify";
	  }
	  
	  request.post({url:'https://api.postmarkapp.com/email', json: 
	  	{'From': sender, 'To': toEmail, 'subject': 'Image recognition', 'TextBody': stringTags},
	  	headers: {'Accept': 'application/json', 'X-Postmark-Server-Token': configs.serverToken }
	  }, function(err,httpResponse,body)	{
	  	thisServerResponse.end(stringTags);
	  });

	});

  });
  
  
  
}).listen(8080);
