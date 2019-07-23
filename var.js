
var p = document.querySelector(".varheader");

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