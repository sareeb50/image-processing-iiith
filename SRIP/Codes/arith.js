var canvas2;
    var context2;
    window.addEventListener('load',secimgdisplay);
	function preview( img )
	{
		document.getElementById('input_layer').setAttribute('src',img);
        document.getElementById('input_layer').setAttribute('height',300);
        document.getElementById('input_layer').setAttribute('width',300);
        init();
	}
    function preview_sec( img )
	{
		
        document.getElementById('secondary_image').setAttribute('src',img);
        secimgdisplay();
        
	}
    function secimgdisplay()
    {
        var image2 = document.getElementById('secondary_image');
        canvas2 = document.getElementById('secondary');
        context2 = canvas2.getContext('2d');
        canvas2.width = image2.width;
        canvas2.height = image2.height;
        context2.drawImage(image2, 0, 0);
    }
    var operation;
    var RunButton;
    var fitting;
    var canvas;
    var context;

    function init() {
            var image = document.getElementById('input_layer');
            //var secimage = document.getElementById('secondary')
            RunButton = document.getElementById('Run');
            
            canvas = document.getElementById('output_layer');
            context = canvas.getContext('2d');
  
            // Set the canvas the same width and height of the image
            canvas.width = image.width;
            canvas.height = image.height;

           
           
  
            RunButton.addEventListener('click', addEffect);
        }


function addEffect() {
    drawImage(document.getElementById('input_layer'));
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var imageData2 = context2.getImageData(0, 0, canvas2.width, canvas2.height);
    doOperation(imageData.data, imageData2.data);
    context.putImageData(imageData, 0, 0);
}

function doOperation(data1,data2) 
{
  operation=$("input:radio[name=Operatn]:checked").val();
  fitting=$("input:radio[name=fitting]:checked").val();    
  for (var i = 0; i < data1.length; i+=4) 
  {
    
      //Doing the Operation as per selection
      if(operation=="1")
          {
             data1[i] +=data2[i];            
             data1[i+1] +=data2[i+1];              
             data1[i+2] +=data2[i+2];
                 
          }
      if(operation=="2")
          {
             data1[i] -=data2[i];               
             data1[i+1] -=data2[i+1];
             data1[i+2] -=data2[i+2];
               
          }
      if(operation=="3")
          {
             data1[i] = Math.abs(data1[i]-data2[i])               
             data1[i+1] = Math.abs(data1[i+1]-data2[i+1])       
             data1[i+2] = Math.abs(data1[i+2]-data2[i+2])
              
          }
      if(operation=="4")
          {
             data1[i] *=data2[i];
             data1[i+1] *=data2[i+1];         
             data1[i+2] *=data2[i+2];
              
          }
      if(operation=="5")
          {
             data1[i] /=data2[i];         
             data1[i+1] /=data2[i+1];         
             data1[i+2] /=data2[i+2];
                
          }
      //Doing the fitting as per selection
      
      if(fitting=="1")
          {
             if(data1[i]>255){data1[i]=255;}
             if(data1[i]<0){data1[i]=0;}
             if(data1[i+1]>255){data1[i+1]=255;}
             if(data1[i+1]<0){data1[i+1]=0;}
             if(data1[i+2]>255){data1[i]=255;}
             if(data1[i+2]<0){data1[i+2]=0;} 
          }
     
      
  }
}


    function drawImage(image) 
     {
        context.drawImage(image, 0, 0);
     }
