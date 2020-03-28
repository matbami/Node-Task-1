
const  http = require('http')
const fs = require('fs')
const qs = require('querystring');


http.createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/html"})
   res.write("<html><body><form method ='POST' action = '/message'><h2>Please Enter a message below</h2><input name='message'></input><br> <pre><button>Submit</button></pre></form></body></html>")
    
   //check request headers and parameters
   if(req.method== "POST" && req.url == '/message')
    var body = ''
    req.on('data',function(data){
        body+=data
        //pass 'body' into querystring to be able to extract the message property
        var final = qs.parse(body)
        
        //write message to file
        fs.writeFile('message.text', final.message, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });

          
    })
    res.end()
})
.listen(8080)

