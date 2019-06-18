var canvas2;
    var context2;
    
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

window.addEventListener('load',checkSRC);
function checkSRC()
{
   RunButton = document.getElementById('Run');
    RunButton.addEventListener('click',function check(){
       if(document.getElementById('input_layer').getAttribute('src')=="")
        {
            alert("Please select image first !!!");
        } 
    });
   
}
function addEffect() {
   
   
   
    
    secimgdisplay();
    drawImage(document.getElementById('input_layer'));
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var imageData2 = context2.getImageData(0, 0, canvas2.width, canvas2.height);
    doOperation(imageData.data, imageData2.data);
    context.putImageData(imageData, 0, 0);
}

function doOperation(data1,data2) 
{
  var max = -300;
  var min = 66000;
    var num1,num2,num3;
    var num = new Array();
  operation=$("input:radio[name=Operatn]:checked").val();
  fitting=$("input:radio[name=fitting]:checked").val();    
  for (var i = 0; i < data1.length; i+=4) 
  {
       num1=data1[i];num2=data1[i+1];num3=data1[i+2];
      //Doing the Operation as per selection
      //here the canvas attribute automatically adjusts the data vaules to remain from 0 to 255 so to calculate max and min values other variables were used.
      if(operation=="1")
          {
             data1[i] +=data2[i];   num1 +=data2[i];         
             data1[i+1] +=data2[i+1]; num2 +=data2[i+1];              
             data1[i+2] +=data2[i+2]; num3 +=data2[i+2]; 
                 
          }
      if(operation=="2")
          {
             data1[i] -=data2[i]; num1 -=data2[i];               
             data1[i+1] -=data2[i+1]; num2 -=data2[i+1]; 
             data1[i+2] -=data2[i+2]; num3 -=data2[i+2]; 
               
          }
      if(operation=="3")
          {
             data1[i] = Math.abs(data1[i]-data2[i]) ; num1 = Math.abs(num1-data2[i]) ;              
             data1[i+1] = Math.abs(data1[i+1]-data2[i+1]);  num2 = Math.abs(num2-data2[i+1]) ;      
             data1[i+2] = Math.abs(data1[i+2]-data2[i+2]); num3 = Math.abs(num3-data2[i+2]) ; 
              
          }
      if(operation=="4")
          {
             data1[i] *=data2[i]; num1 *=data2[i]; 
             data1[i+1] *=data2[i+1];  num2 *=data2[i+1];         
             data1[i+2] *=data2[i+2]; num3 *=data2[i+2]; 
              
          }
      if(operation=="5")
          {
             data1[i] /=data2[i];  num1 /=data2[i];        
             data1[i+1] /=data2[i+1];   num2 /=data2[i+1];       
             data1[i+2] /=data2[i+2]; num3 /=data2[i+2]; 
                
          }
      num[i]=num1;num[i+1]=num2;num[i+2]=num3;
      max = Math.max(max,num1,num2,num3);
      min = Math.min(min,num1,num2,num3);
      
      
  }
  for (var i = 0; i < data1.length; i+=4)
      {

      //Doing the fitting as per selection
      if(fitting=="1")    //clippping
          {
//             the part below is not required since the canvas attribute automatically clips the data values .
//             if(data1[i]>255){data1[i]=255;}
//             if(data1[i]<0){data1[i]=0;}
//             if(data1[i+1]>255){data1[i+1]=255;}
//             if(data1[i+1]<0){data1[i+1]=0;}        
//             if(data1[i+2]>255){data1[i]=255;}
//             if(data1[i+2]<0){data1[i+2]=0;} 
          }
      if(fitting=="2")     //auto-scaling
          {
              data1[i] = 255*((num[i]-min)/(max-min));
              data1[i+1] = 255*((num[i+1]-min)/(max-min));
              data1[i+2] = 255*((num[i+2]-min)/(max-min));
              
          }
     
      
      }
}


    function drawImage(image) 
     {
        context.drawImage(image, 0, 0);
     }
 function FormReset()
{
    document.getElementById("OperForm").reset();
    document.getElementById("FitForm").reset();
    document.getElementById("SecForm").reset();
    document.getElementById("secondary_image").setAttribute('src',"images/add2.png")
}