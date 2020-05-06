const colorDivs = document.querySelectorAll(".color");
const generateBtn = document.querySelector("generate");
const sliders = document.querySelectorAll("input[type=range]");
const currentHexes = document.querySelector(".color h1");

sliders.forEach((slider) => {
  slider.addEventListener("input", hslControls);
});

colorDivs.forEach((div, index) => {
  div.addEventListener('change', () => {
    updatetextUI(index)
  })
})

function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}

function randomColor() {
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();

    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    checkTextContrast(randomColor, hexText);

    const color = chroma(randomColor);
    const sliders = div.querySelectorAll(".sliders input");

    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    colorizeSliders(color, hue, brightness, saturation);
  });
}

function colorizeSliders(color, hue, brightness, saturation) {
  //Scale Saturation
  const noSat = color.set("hsl.s", 0);
  const fullSat = color.set("hsl.s", 1);
  const scaleSat = chroma.scale([noSat, color, fullSat]);
  //Scale Brightness
  const midBright = color.set("hsl.l", 0.5);
  const scaleBright = chroma.scale(["black", midBright, "white"]);

  //Update Input Colors
  saturation.style.backgroundImage = `linear-gradient(to right,${scaleSat(
    0
  )}, ${scaleSat(1)})`;
  brightness.style.backgroundImage = `linear-gradient(to right,${scaleBright(
    0
  )},${scaleBright(0.5)} ,${scaleBright(1)})`;
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;
}

function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  if (luminance > 0.5) text.style.color = "black";
  else text.style.color = "white";
}

function hslControls(e) {
  const input = e.target;

  const index =
    input.getAttribute("data-bright") ||
    input.getAttribute("data-sat") ||
    input.getAttribute("data-hue");
  console.log(index);

  const sliders = e.path[1].querySelectorAll("input[type = range]");
  console.log(sliders);
  const hue = sliders[0];
  const brightness = sliders[1];
  const saturation = sliders[2];

  const bgcolor = colorDivs[index].querySelector("h2").innerText;

  const color = chroma(bgcolor)
    .set("hsl.s", saturation.value)
    .set("hsl.l", brightness.value)
    .set("hsl.h", hue.value);
  colorDivs[index].style.backgroundColor = color

}

function updatetextUI(index) {
  const activeDiv = colorDivs[index];
  const color = chroma(activeDiv.style.backgroundColor)
  console.log(color);
  const textHex = activeDiv.querySelector('h2')
  const icons = activeDiv.querySelectorAll('.controls button')

  textHex.innerText = color.hex()

  checkTextContrast(color, textHex)

  for (icon of icons) {
    checkTextContrast(color, icon)
  }

}



randomColor();