const START_WATER_VALUE = 40;

const LEAK_FILL_WATER_VALUE = 5;
const LEAK_TIMER = 500; //milliseconds - less time more fast

const MUSIC_FILE_NAME = "music.mp3";

var bucketWater;
var myMusic;
var currentVolume;

$(document).ready(function() {
    $("#volume").slider({
        min: 0,
        max: 100,
        value: START_WATER_VALUE,
        range: "min",
        slide: function(event, ui) {
            setVolume(ui.value / 100);
        }
    });

    //make slider unclickable
    $("#volume").slider("disable");

    bucketWater = $(".water")
    bucketWater.height(START_WATER_VALUE + "%");

    var music = document.createElement('audio');
    $('#bucketplayer').append(music);
    music.id = "myMusic";
    myMusic = $("#myMusic")[0];

    $(".bucket").click(fillBucket);

    setInterval(leakWater, LEAK_TIMER);

    playMusic();
});

function leakWater() {
    currentVolume = $("#volume").slider("value");
    if(currentVolume >= 0) {
        $("#volume").slider("value", currentVolume - LEAK_FILL_WATER_VALUE);
        bucketWater.height(currentVolume - LEAK_FILL_WATER_VALUE + "%");
        myMusic.volume = currentVolume / 100;
    } 
}

function fillBucket() {
    currentVolume = $("#volume").slider("value");
    if(currentVolume <= 100) {
        $("#volume").slider("value", currentVolume + LEAK_FILL_WATER_VALUE);
        bucketWater.height(currentVolume + LEAK_FILL_WATER_VALUE + "%");
        myMusic.volume = currentVolume / 100;
    } 
}

function playMusic() {
    myMusic.src = MUSIC_FILE_NAME;
    myMusic.setAttribute('loop', 'loop');
    myMusic.volume = START_WATER_VALUE / 100;
    myMusic.play();
}