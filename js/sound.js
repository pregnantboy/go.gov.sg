/*

TODO:
1. Main header font based on window width
2. Buttons on hover go bold but dont shift things about
3. Funky go.sg logo
4. Expandable smooth animation stats on hover
5. Maybe rocket or 3 logo animate on hover or sound
6. sian night mode
7. Rocket move on shake

https://codepen.io/collection/XqRLMb/2/
*/

// create audio context and make sure it gets activated
const audioCtx = new AudioContext();
let data = new Uint8Array(2);

// create analyser 
const analyserNode = new AnalyserNode(audioCtx, {
    fftSize: 64,
    maxDecibels: -25,
    minDecibels: -60,
    smoothingTimeConstant: 0.5,
});

function getAnalyserData() {
    requestAnimationFrame(getAnalyserData);
    analyserNode.getByteFrequencyData(data);

    const minAxisValue = 1.00;
    const maxAxisValue = 0.00;

    const minEventValue = 0;
    const maxEventValue = 255;

    // Get the current event value
    const element = document.querySelector(".clap");
    element.style.setProperty("--sound", 1.00);
    if (data[0] === maxEventValue) {
        element.style.setProperty("--sound", 0.00);
        return
    } else {
        fluidAxisVariation(minAxisValue, maxAxisValue, minEventValue, maxEventValue, data[0], "--sound", element);
    }
}

// set draw after stream has started
function getStreamData() {
    // pipe in analysing to getUserMedia
    return navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    })
        .then(stream => audioCtx.createMediaStreamSource(stream))
        .then(source => {
            source.connect(analyserNode);
        });
}

function resumeAudio() {
    audioCtx.resume();
    getStreamData().then(getAnalyserData);
    window.onclick = null;
}

// resume
window.onclick = resumeAudio;
