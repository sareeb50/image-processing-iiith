var slider = document.getElementById("myRange1");
var output = document.getElementById("MeanDeviation");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
} 

var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("VarianceDeviation");
output2.innerHTML = slider2.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function() {
  output2.innerHTML = this.value;
} 