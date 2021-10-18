var voiceSelect = document.getElementById('voice');
function loadVoices() {
// Fetch the available voices.
var voices = speechSynthesis.getVoices();
console.log(voices);

// Loop through each of the voices.

voices.forEach(function(voice, i) {
// Create a new option element.
if (voice.lang == 'es-ES' || voice.lang == 'es-MX' ){
var option = document.createElement('option');

// Set the options value and text.
option.value = voice.name;
option.innerHTML = voice.name;
  
// Add the option to the voice selector.
voiceSelect.appendChild(option);
}});
}

// Execute loadVoices.
loadVoices();
// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
loadVoices();
}; 


$(function(){
$("a, .titulo-noticia, .titulo, .title, .filas, p, b, h5, h4, h3, h2, h1, strong, li, .accordion-toggle, .Titulo-interna, span, .accordion-content, .ms-listlink, .ms-rtestate-field").hover(function(){
event.preventDefault();
var nacordeon = $(this);
var utterance = new SpeechSynthesisUtterance();

utterance.text = $(this).text();
utterance.rate = 1;

if (voiceSelect.value) {
utterance.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
}
utterance.pitch = 1;
utterance.volume = 9;


utterance.onstart = function() {
    console.log('Inicio Oradora');
};
utterance.addEventListener('error', function(event) { 
  console.log('An error has occurred with the speech synthesis: ' + event.error);
});
utterance.onerror = function(event) {
  console.log('An error has occurred with the speech synthesis: ' + event.error);
}
utterance.onend = function() {
    console.log('final Oradora');
};

window.speechSynthesis.speak(utterance);
},function(){
window.speechSynthesis.cancel();
console.log('Oradora cancelada');
});
});

  
