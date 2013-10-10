
//var memes = new Array();

var memes = [ 
    {
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    },{
        "name": "fwp",
        "memeImg" : "images/meme/1stwp.jpg",
        "memeFont" : '40px Impact'    
    }
]

//console.log("memes" + memes);

//Memeing goes here
function memeIt(message, data) { //cl(sessionStorage.username);
            
    message = message.slice(2); // remove "m " from beginning
    if(message.indexOf(" ") != -1) var memeName = message.slice(0, message.indexOf(" ")); // get the meme name (if the text fields are not empty)
    
    message = message.slice(message.indexOf(" ")+1); // remove the meme name
    if(memeName === undefined) var memeName = message; // that's in case "m fwp", but messes up "m fwp tere".
                                
    var split = message.indexOf("/"); // find the position of "/" mark
    
    var message1 = '';
    var message2 = '';
                                    
    if (split === -1) { // not a 2 lined meme
        if(message === memeName) { // not even a 1 lined meme
        } else {
             message1 = message.trim(); // it's a 1 lined meme
        }
    } else { // 2 lined meme
        message1 = message.slice(0, split).trim();
        message2 = message.slice(split+1).trim();
    }

    switch (memeName) {
    
        case 'fwp':
            var memeImg = "images/meme/1stwp.jpg";
            var memeFont = '40px Impact';
        break;

        case 'baby':    
            var memeImg = "images/meme/successbaby.jpg";
            var memeFont = '40px Impact';
        break;

        case 'bru':    
            var memeImg = "images/meme/impossibru.jpg";
            var memeFont = '40px Impact';
            if (message2 === '') message2 = "IMPOSSIBRU!";
        break;

        case 'yuno':    
            var memeImg = "images/meme/yuno.gif";
            var memeFont = '40px Impact';
            //if (message1 === '') message1 = "Y U No";
        break;

        case 'goodguy':    
            var memeImg = "images/meme/goodguy.jpg";
            var memeFont = '40px Impact';
        break;

        case 'man':    
            var memeImg = "images/meme/mostinteresting.jpg";
            var memeFont = '40px Impact';
        break;

        case 'simply':    
            var memeImg = "images/meme/onedoesnotsimply.jpg";
            var memeFont = '40px Impact';
            if (message1 === '') message1 = "One does not simply";
        break;

        case 'whatif':    
            var memeImg = "images/meme/morpheus.jpg";
            var memeFont = '40px Impact';
            if (message1 === '') message1 = "What if I told you";
        break;

        case 'scumg':    
            var memeImg = "images/meme/stacy.jpg";
            var memeFont = '40px Impact';
        break;

        case 'scumb':    
            var memeImg = "images/meme/steve.jpg";
            var memeFont = '40px Impact';
        break;

        case 'gf':    
            var memeImg = "images/meme/overly_attached.jpg";
            var memeFont = '40px Impact';
        break;

        case '451':    
            var memeImg = "images/meme/451.jpg";
            var memeFont = '40px Impact';
        break;

        case 'fuckme':    
            var memeImg = "images/meme/fuckme.jpg";
            var memeFont = '40px Impact';
            if (message2 === '') message2 = "fuck me, right?";
        break;

        case 'fa':    
            var memeImg = "images/meme/fa.jpg";
            var memeFont = '40px Impact';
        break;
            
        case 'nobody':    
            var memeImg = "images/meme/aintnobody.jpg";
            var memeFont = '35px Impact';
            if (message2 === '') message2 = "Ain't nobody got time for that";
        break;
            
        default:
            var memeImg = "images/meme/noSuchMeme.gif";
            var memeFont = '40px Impact';
            message1 = memeName + " ?";
    
    }        
    $("#jetzt").before("<div class='message'><p><canvas id='meme' class='full'></canvas></p></div>");        
    
    var canvas = document.getElementById('meme');
    var context = canvas.getContext('2d');
    
    //window.cl(memeImg);
    //var daWidth = memeImg.width();
    //window.cl(daWidth);
    
    
    var imageObj = new Image();
    
    imageObj.onload = function() {
        var memeWidth = this.width; 
        var memeHeight = this.height;
        canvas.width  = memeWidth;
        canvas.height = memeHeight;
        //context.drawImage(imageObj, 0, 0, memeWidth, memeHeight);
        context.drawImage(imageObj, 0, 0);
        drawText(message1, message2, data.name); // <---- 
        var img    = canvas.toDataURL("image/png");
        $("#jetzt").before('<div class="message"><img src="images/drm.jpg" id="avatar" /><div id="time">'+data.time+'</div><p id="name"><strong>'+data.name+'</strong></p><p><img class="full" src="'+img+'" /></p></div>');
        scroll();
    };
    imageObj.src = memeImg;

    
    function drawText( message1, message2, username ){
        message1 = message1.toUpperCase();
        message2 = message2.toUpperCase();
        
        //window.cl(message1.length);
        
        context.font = '40px Impact';
        context.textAlign = 'center';
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        
        // cut message1 to multiple lines if it's too long
        if(message1.length < 20) {
            context.fillText(message1, canvas.width/2, 55);            
            context.strokeText(message1, canvas.width/2, 55);
        }
        else if(message1.length > 20 && message1.length < 40) {
            var m1cut1= message1.lastIndexOf(' ',20);
            var m1line1 = message1.substring(0, m1cut1);
            var m1line2 = message1.substring(m1cut1);
            context.fillText(m1line1, canvas.width/2, 55);            
            context.strokeText(m1line1, canvas.width/2, 55);
            context.fillText(m1line2, canvas.width/2, 105);            
            context.strokeText(m1line2, canvas.width/2, 105);
        }
        else {
            var m1cut1= message1.lastIndexOf(' ',20);
            var m1cut2= message1.lastIndexOf(' ',40);
            var m1line1 = message1.substring(0, m1cut1);
            var m1line2 = message1.substring(m1cut1, m1cut2);
            var m1line3 = message1.substring(m1cut2);
            context.fillText(m1line1, canvas.width/2, 55);            
            context.strokeText(m1line1, canvas.width/2, 55);
            context.fillText(m1line2, canvas.width/2, 105);            
            context.strokeText(m1line2, canvas.width/2, 105);
            context.fillText(m1line3, canvas.width/2, 155);            
            context.strokeText(m1line3, canvas.width/2, 155);
        }

        // cut message 2 to multiple lines if it's too long
        if(message2.length < 20) {
            context.fillText(message2, canvas.width/2, canvas.height-25);            
            context.strokeText(message2, canvas.width/2, canvas.height-25);
        }
        else if(message2.length > 20 && message2.length < 40) {
            var m2cut1= message2.lastIndexOf(' ',20);
            var m2line1 = message2.substring(0, m2cut1);
            var m2line2 = message2.substring(m2cut1);
            context.fillText(m2line1, canvas.width/2, canvas.height-25);            
            context.strokeText(m2line1, canvas.width/2, canvas.height-25);
            context.fillText(m2line2, canvas.width/2, canvas.height-75);            
            context.strokeText(m2line2, canvas.width/2, canvas.height-75);
        }
        else {
            var m2cut1= message2.lastIndexOf(' ',20);
            var m2cut2= message2.lastIndexOf(' ',40);
            var m2line1 = message2.substring(0, m2cut1);
            var m2line2 = message2.substring(m2cut1, m2cut2);
            var m2line3 = message2.substring(m2cut2);
            context.fillText(m2line1, canvas.width/2, canvas.height-25);            
            context.strokeText(m2line1, canvas.width/2, canvas.height-25);
            context.fillText(m2line2, canvas.width/2, canvas.height-75);            
            context.strokeText(m2line2, canvas.width/2, canvas.height-75);
            context.fillText(m2line3, canvas.width/2, canvas.height-125);            
            context.strokeText(m2line3, canvas.width/2, canvas.height-125);
        }
                
        if (name != username) document.getElementById('ping1').play();
        scroll();
    }    
}    


