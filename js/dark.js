// This only works behind a flag in chrome and will not work inside Codepen's editor, you need to open in debug mode
// More information here: https://www.chromestatus.com/feature/5298357018820608

var shine = document.querySelector(".var.shine");

const minAxisValue = 200;
const maxAxisValue = 20;

const minEventValue = 0;
const maxEventValue = 1000;

shine.style.setProperty("--axis", 20);

if ('AmbientLightSensor' in window) {
    const sensor = new AmbientLightSensor();
    sensor.onreading = () => {

        fluidAxisVariation(minAxisValue, maxAxisValue, minEventValue, maxEventValue, sensor.illuminance, "--axis", shine);
        console.log('Current light level:', sensor.illuminance);
        if (sensor.illuminance < 10) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }

    };
    sensor.onerror = (event) => {
        console.log(event.error.name, event.error.message);
    };
    sensor.start();
}
