$(document).ready(function() {

    function createCanvas(parent, width, height) {
        const drawContainer = document.getElementsByClassName("drawContainer")[0];
        var rect = drawContainer.getBoundingClientRect();
        var canvas = document.getElementById("drawing-board");
        const ctxX = Math.floor(rect.width);
        const ctxY = Math.floor(rect.height);
        canvas.width = ctxX;
        canvas.height = ctxY;
        canvas.context = canvas.getContext('2d');
        return canvas;
   }
 
   function init(container, width, height, fillColor) {
    var canvas = createCanvas(container, width, height);
     var ctx = canvas.context;

     ctx.fillCircle = function(x, y, radius, fillColor) {
       this.fillStyle = fillColor;
       this.beginPath();
       this.moveTo(x, y);
       this.arc(x, y, radius, 0, Math.PI * 2, false);
       this.fill();
     };
     ctx.freeDraw = function(x, y, color, lineWidth) {
        console.log("Drawing");
        this.lineTo(x, y);
        this.strokeStyle = "black";
        this.lineWidth = lineWidth;
        this.lineCap ="round";
        this.lineJoin = "round";
        this.stroke();
     }
     ctx.clearTo = function(fillColor) {
       ctx.fillStyle = fillColor;
       ctx.fillRect(0, 0, width, height);
     };
     ctx.clearTo("#fff");
 
     canvas.onmousemove = function(e) {
       if (!canvas.isDrawing) {
         return;
       }
       var rect = canvas.getBoundingClientRect();
       var x = e.clientX - rect.left;
       var y = e.clientY - rect.top;
       var radius = 5;
       var lineWidth = 10;
       var color = "black";
       //var fillColor = 'rgb(102,153,255)';
       //ctx.fillCircle(x, y, radius, fillColor);
       ctx.freeDraw(x, y, color, lineWidth);
     };
     canvas.onmousedown = function(e) {
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        canvas.isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
     };
     canvas.onmouseup = function(e) {
        console.log("Ctx end path");
        ctx.closePath();
       canvas.isDrawing = false;
     };
   }
 
   var container = document.getElementById('drawing-board');
   init(container, 200, 200, '#ddd');
 
   function clearCanvas() {
        var canvas = document.getElementById("drawing-board");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
   }

   function uploadCanvasImage(e) {
        var canvas = document.getElementById("drawing-board");
        var ctx = canvas.getContext("2d");
        var files = e.target.files[0];
        var reader = new FileReader();
        if (files) {
            reader.readAsDataURL(files);
            reader.onload = (e) => {
                var img = new Image();
                img.onload = function() {
                    drawImageToCanvas(img);
                }
                img.src = e.target.result;
            };
        }
        
        
   }

   function drawImageToCanvas(img) {
        var canvas = document.getElementById("drawing-board");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img,0,0);
  	    console.log("Image importée");
   }

   /*
   function getData() {
     var canvas = document.getElementById("inputCanvas");
     var imageData = canvas.context.getImageData(0, 0, canvas.width, canvas.height);
     var data = imageData.data;
     var outputData = []
     for(var i = 0; i < data.length; i += 4) {
       var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
       outputData.push(brightness);
     }
     $.post( "/postmethod", {
       canvas_data: JSON.stringify(outputData)
     }, function(err, req, resp){
       window.location.href = "/results/"+resp["responseJSON"]["uuid"];  
     });
   }*/
 
   $( "#clear" ).click(function(){
        clearCanvas();
   });

   $( "#upload" ).click(function(e){
        uploadCanvasImage(e);
   });
   
   /*
   $( "#sendButton" ).click(function(){
     getData();
   });
   */
 });