var p = document.querySelector(".var.header");

function variableResize() {
    // Minimum & Maximum font weight
    const minFontWeight = 28;
    const maxFontWeight = 120;

    // Minimum and Maxium font width
    const minFontWidth = 60;
    const maxFontWidth = 100;

    // Minimum and Maximum viewport size
    const maxWindowSize = 800;
    const minWindowSize = 420;

    // Get current viewport size
    const windowWidth = window.innerWidth;

    //Scale within a range
    const percent =
        (windowWidth - minWindowSize) / (maxWindowSize - minWindowSize);


    const fontWeightScale =
        percent * (maxFontWeight + minFontWeight) - minFontWeight;
    const newWeight =
        windowWidth > maxWindowSize ?
        maxFontWeight :
        windowWidth < minWindowSize ? minFontWeight : fontWeightScale;
    p.style.setProperty("--weight", newWeight);

    const fontWidthScale = percent * (maxFontWidth + minFontWidth) - minFontWidth;
    const newWidth =
        windowWidth > maxWindowSize ?
        maxFontWidth :
        windowWidth < minWindowSize ? minFontWidth : fontWidthScale;

    p.style.setProperty("--width", newWidth);

}

variableResize();

window.addEventListener("resize", variableResize);


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

// Audio code from Ruth's Demo!! - https://codepen.io/Rumyra/pen/jomXeG
console.clear;
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

// resume
window.addEventListener("click", event => {
    audioCtx.resume();
    getStreamData().then(getAnalyserData);
})

// Fluid Axis Variation
function fluidAxisVariation(minimumAxisValue, maximumAxisValue, minimumEventValue, maximumEventValue, eventValue, axisCustomPropertyName, element) {

    const minAxisValue = minimumAxisValue;
    const maxAxisValue = maximumAxisValue;
    const minEventValue = minimumEventValue;
    const maxEventValue = maximumEventValue;
    const currentEventValue = eventValue;

    const eventPercent = (currentEventValue - minEventValue) / (maxEventValue - minEventValue);
    const fontAxisScale = eventPercent * (minAxisValue - maxAxisValue) + maxAxisValue;

    const newAxisValue = currentEventValue > maxEventValue ?
        minAxisValue :
        currentEventValue < minEventValue ?
        maxAxisValue :
        fontAxisScale;

    element.style.setProperty(axisCustomPropertyName, newAxisValue);
}