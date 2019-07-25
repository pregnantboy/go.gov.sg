var p = document.querySelector(".var.header");

function variableResize() {
    // Minimum & Maximum font weight
    const minFontWeight = 28;
    const maxFontWeight = 120;

    // Minimum and Maxium font width
    const minFontWidth = 60;
    const maxFontWidth = 100;

    // Minimum and Maximum viewport size
    const maxWindowSize = 900;
    const minWindowSize = 220;

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
