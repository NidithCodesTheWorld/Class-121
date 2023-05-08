function preload(){
}

function setup() {

  canvas = createCanvas(350, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded)

}

function modelLoaded(){
console.log('Model Loaded!')

}

function draw(){

image(video, 0, 0, 350, 300);
classifier.classify(video, gotResults);

}

previousResult = '';

function gotResults(error, results){

if(error){
  
  console.error(error);

}
else{

if((results[0].confidence > 0.5) && (previousResult != results[0].label)){

console.log(results);
previousResult = results[0].label;
var synth = window.speechSynthesis;
speakData = "The object detected is" + results[0].label;
var utterThis = new SpeechSynthesisUtterance(speakData);
synth.speak(utterThis);

document.getElementById("objName").innerHTML = results[0].label;
document.getElementById("objAccuracy").innerHTML = results[0].confidence.toFixed(2);

}



}

}



