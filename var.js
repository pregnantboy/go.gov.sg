navigator.permissions.query({
    name: 'ambient-light-sensor'
}).then(function (result) {

    if ('AmbientLightSensor' in window) {
        const sensor = new AmbientLightSensor();
        sensor.onreading = () => {
            console.log('Current light level:', sensor.illuminance);
        };
        sensor.onerror = (event) => {
            console.log(event.error.name, event.error.message);
        };
        sensor.start();
    }
});