
var T2;
var T1;
var Histo;
var RunButton;
var TypeOfSeg;
var canvas;
var context;


function preview( img , img2)
	{
        document.getElementById("input_layer").style.visibility="visible";
        
        document.getElementById("input_layer").setAttribute("src",img);
        document.getElementById("input_layer").setAttribute("height",300);
        document.getElementById("input_layer").setAttribute("width",300);
        showhist(img2);
        init();
	}

    function showhist(img)
    {
          document.getElementById("Hist").setAttribute("src",img);
          document.getElementById("Hist").setAttribute("height",200);
          document.getElementById("Hist").setAttribute("width",350);
    }

    function drawImage(image) 
     {
        context.drawImage(image, 0, 0);
     }
    function init() {
            var image = document.getElementById("input_layer");
            //var secimage = document.getElementById("secondary")
            RunButton = document.getElementById("Run");
            canvas = document.getElementById("output_layer");
            context = canvas.getContext("2d");  
            // Set the canvas the same width and height of the image
            canvas.width = image.width;
            canvas.height = image.height;
            RunButton.addEventListener("click", addEffect);
        }

    function addEffect() {
    
    
    drawImage(document.getElementById("input_layer"));
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    doOperation(imageData.data);
    context.putImageData(imageData, 0, 0);
}

function doOperation(data)
{
	TypeOfSeg = $("input:radio[name=TypeSeg]:checked").val();
     Histo = $("input:radio[name=Hist]:checked").val();

     for (var i = 0; i < data.length; i+= 4) {
     data[i] = 255; // Invert Red
     data[i+1] =  255; // Invert Green
     data[i+2] =  255; // Invert Blue
      }
}

