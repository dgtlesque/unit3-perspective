let angle = 0;
let art;
let planeArt;
let sidePlaneArt;
let leftSidePlaneArt;
let topPlaneArt;
let spacing = 20;
let depth = 1000;

let sideVPX = 200;
let sideVPY = 200;

let sideVPX2 = 500;
let sideVPY2 = 500;

let waveSpeed = 0.02;
let waveAmplitude = 150;
let waveFrequency = 1;

let centerImg;

// Growth animation variables for glitch bar
let growth = 0;
let growthDirection = 1;  // 1 = growing, -1 = shrinking
let growthSpeed = 0.008;

function preload() {
  centerImg = loadImage('IMG_1655.PNG'); // Replace with your image file
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  art = createGraphics(400, 400);
  art.clear();

  planeArt = createGraphics(windowWidth, windowHeight);
  planeArt.clear();

  let sideSize = windowHeight * 1.2;
  sidePlaneArt = createGraphics(sideSize, sideSize);
  sidePlaneArt.clear();

  leftSidePlaneArt = createGraphics(sideSize, sideSize);
  leftSidePlaneArt.clear();

  topPlaneArt = createGraphics(windowWidth, windowHeight / 2);
  topPlaneArt.clear();

  strokeWeight(100);  // Thicker lines for horizontal animation
  stroke(355);
}

function draw() {
  background(0);

  // Update growth for glitch bar - grows and shrinks in loop
  growth += growthSpeed * growthDirection;
  if (growth >= 1) {
    growth = 1;
    growthDirection = -1;
  } else if (growth <= 0) {
    growth = 0;
    growthDirection = 1;
  }

  let centerX = planeArt.width / 2;
  let centerY = planeArt.height / 2;
  let radius = 300;

  let vpX = centerX + cos(angle * 1.5) * radius;
  let vpY = centerY + sin(angle * 1.5) * radius;

  let topVPX = topPlaneArt.width / 2 + cos(angle * 1.2) * radius;
  let topVPY = topPlaneArt.height / 2 + sin(angle * 1.2) * radius;

  art.clear();
  art.stroke(255);
  art.noFill();
  for (let i = 0; i < 400; i += spacing) {
    let x1 = lerp(200, i, growth);
    let y1 = lerp(200, 0, growth);
    let x2 = lerp(200, i, growth);
    let y2 = lerp(200, 400, growth);
    let x3 = lerp(200, 0, growth);
    let y3 = lerp(200, i, growth);
    let x4 = lerp(200, 400, growth);
    let y4 = lerp(200, i, growth);
    art.line(x1, y1, 100, 100);
    art.line(x2, y2, 100, 100);
    art.line(x3, y3, 100, 100);
    art.line(x4, y4, 100, 100);
  }

  planeArt.clear();
  planeArt.stroke(255);
  planeArt.noFill();
  for (let i = 0; i < planeArt.width; i += spacing) {
    let x1 = lerp(0, i, growth);
    let y1 = lerp(200, 0, growth);
    let x2 = lerp(0, i, growth);
    let y2 = lerp(200, planeArt.height, growth);
    planeArt.line(x1, y1, vpX, vpY);
    planeArt.line(x2, y2, vpX, vpY);
  }

  topPlaneArt.clear();
  topPlaneArt.stroke(255);
  topPlaneArt.noFill();
  for (let i = 0; i < topPlaneArt.width; i += spacing) {
    let x1 = lerp(0, i, growth);
    let y1 = 0;
    let x2 = lerp(0, i, growth);
    let y2 = topPlaneArt.height;
    topPlaneArt.line(x1, y1, topVPX, topVPY);
    topPlaneArt.line(x2, y2, topVPX, topVPY);
  }

  sidePlaneArt.clear();
  sidePlaneArt.stroke(255);
  sidePlaneArt.noFill();

  let sideVPXMov = sideVPX + sin(angle * waveFrequency) * waveAmplitude;
  let sideVPYMov = sideVPY + cos(angle * waveFrequency) * waveAmplitude;

  let sideVPX2Mov = sideVPX2 + sin(angle * waveFrequency + PI) * waveAmplitude;
  let sideVPY2Mov = sideVPY2 + cos(angle * waveFrequency + PI) * waveAmplitude;

  let stepSize = 11;
  for (let i = 0; i < sidePlaneArt.width; i += stepSize) {
    let distFromCenter = map(i, 0, sidePlaneArt.width, 0, 1);
    let scalingFactor = map(distFromCenter, 0, 1, 1, 0.1);

    let x1 = sidePlaneArt.width / 2 + cos(angle + distFromCenter * TWO_PI) * depth * scalingFactor;
    let y1 = sidePlaneArt.height / 2 + sin(angle + distFromCenter * TWO_PI) * depth * scalingFactor;

    let x2 = sidePlaneArt.width / 2 + cos(angle + distFromCenter * TWO_PI + PI) * depth * scalingFactor;
    let y2 = sidePlaneArt.height / 2 + sin(angle + distFromCenter * TWO_PI + PI) * depth * scalingFactor;

    sidePlaneArt.line(x1, y1, sideVPXMov, sideVPYMov);
    sidePlaneArt.line(x2, y2, sideVPX2Mov, sideVPY2Mov);
  }

  leftSidePlaneArt.clear();
  leftSidePlaneArt.stroke(255);
  leftSidePlaneArt.noFill();

  let waveLeftVPX = sideVPX + sin(angle * waveFrequency + HALF_PI) * waveAmplitude;
  let waveLeftVPY = sideVPY + cos(angle * waveFrequency + HALF_PI) * waveAmplitude;

  let waveLeftVPX2 = sideVPX2 + sin(angle * waveFrequency + PI / 2) * waveAmplitude;
  let waveLeftVPY2 = sideVPY2 + cos(angle * waveFrequency + PI / 2) * waveAmplitude;

  for (let i = 0; i < leftSidePlaneArt.width; i += stepSize) {
    let distFromCenter = map(i, 0, leftSidePlaneArt.width, 0, 1);
    let scalingFactor = map(distFromCenter, 0, 1, 1, 0.1);

    let x1 = leftSidePlaneArt.width / 2 + cos(angle + distFromCenter * TWO_PI) * depth * scalingFactor;
    let y1 = leftSidePlaneArt.height / 2 + sin(angle + distFromCenter * TWO_PI) * depth * scalingFactor;

    let x2 = leftSidePlaneArt.width / 2 + cos(angle + distFromCenter * TWO_PI + PI) * depth * scalingFactor;
    let y2 = leftSidePlaneArt.height / 2 + sin(angle + distFromCenter * TWO_PI + PI) * depth * scalingFactor;

    leftSidePlaneArt.line(x1, y1, waveLeftVPX, waveLeftVPY);
    leftSidePlaneArt.line(x2, y2, waveLeftVPX2, waveLeftVPY2);
  }

  // === Skybox Cube
  push();
  rotateX(angle * 3.5);
  rotateY(angle * 3.7);
  noStroke();
  texture(art);
  box(2000);
  pop();

  // === Center plane
  push();
  translate(0, 0, -1);
  rotateX(PI / 3);
  texture(planeArt);
  plane(windowWidth, windowHeight);
  pop();

  // === Top plane
  push();
  translate(0, -windowHeight / 4.05, -1);
  rotateX(HALF_PI);
  texture(topPlaneArt);
  plane(windowWidth, windowHeight / 1.2);
  pop();

  // === Right side plane
  push();
  translate(windowWidth / 3.5, 0, -1);
  rotateY(HALF_PI);
  texture(sidePlaneArt);
  plane(sidePlaneArt.width, sidePlaneArt.height);
  pop();

  // === Left side plane
  push();
  translate(-windowWidth / 3.5, 0, -1);
  rotateY(HALF_PI);
  texture(leftSidePlaneArt);
  plane(leftSidePlaneArt.width, leftSidePlaneArt.height);
  pop();

  // === Glitching black bar behind the center image ===
  push();
  strokeWeight(10);
  translate(-width / 2, 0, 400); // Behind the image plane (which is at z=450)

  let y = 0;
  let revealWidth = growth * width;

  const glitchMargin = 50;  // Shrink glitch effect area inside the image width
  const glitchWidth = 360 - glitchMargin * 2; // 400px wide glitch zone

  // Center glitch zone horizontally
  let glitchStart = width / 2 - (glitchWidth / 2);
  let glitchEnd = width / 2 + (glitchWidth / 2);

  stroke(0);
  if (revealWidth < glitchStart) {
    // Before glitch zone: solid line grows/shrinks normally
    line(0, y, revealWidth, y);
  } else {
    // Solid line up to glitch start
    line(0, y, glitchStart, y);

    // Glitch effect within glitch zone
    let glitchRevealEnd = min(revealWidth, glitchEnd);
    for (let x = glitchStart; x < glitchRevealEnd; x += random(5, 20)) {
      let xEnd = min(x + random(2, 15), glitchRevealEnd);
      stroke(random(50) < 10 ? 255 : 0); // occasional white glitch flicker
      line(x, y + random(-10, 10), xEnd, y + random(-10, 10));
    }

    // Solid line after glitch zone if revealWidth passes glitchEnd
    if (revealWidth > glitchEnd) {
      stroke(0);
      line(glitchEnd, y, revealWidth, y);
    }
  }
  pop();

  // === Centered Image Plane ===
  push();
  translate(0, 0, 450); // Slightly in front of the glitch line
  noStroke();
  texture(centerImg);
  plane(300, 200); // Image dimensions
  pop();

  angle += 0.003;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  planeArt = createGraphics(windowWidth, windowHeight);
  planeArt.clear();

  let sideSize = windowHeight * 1.2;
  sidePlaneArt = createGraphics(sideSize, sideSize);
  sidePlaneArt.clear();

  leftSidePlaneArt = createGraphics(sideSize, sideSize);
  leftSidePlaneArt.clear();

  topPlaneArt = createGraphics(windowWidth, windowHeight / 2);
  topPlaneArt.clear();
}
