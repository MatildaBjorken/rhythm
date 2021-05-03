var stars = [];
var numStars = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < numStars; i++) {
    stars[i] = new Web();
    stars[i].setup(random(width), random(height));
  }
}

function draw() {
  background(255);

  // draw the stars
  for (var i = 0; i < numStars; i++) {
    stars[i].update();
    stars[i].display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// class
function Web() {
  this.x = [];
  this.y = [];
  this.numRings = 12;
  this.numSteps = 8;
  this.offset = [];
  this.color = [];

  this.posX;
  this.posY;

  this.setup = function (pos_x, pos_y) {
    this.posX = pos_x;
    this.posY = pos_y;
    this.color[0] = color(147, 205, 146);
    this.color[1] = color(255);

    for (var j = 0; j < this.numRings; j++) {
      this.x[j] = [];
      this.y[j] = [];

      for (var i = 0; i < this.numSteps; i++) {
        this.offset[i] = random(100);
      }
    }
  };

  this.update = function () {
    noiseDetail(2, 0.8);
    for (var j = 0; j < this.numRings; j++) {
      for (var i = 0; i < this.numSteps; i++) {
        this.offset[i] += 0.001;
        this.x[j][i] =
          this.posX +
          (j + 1) * (noise(this.offset[i] / 2) * 50) * cos(radians(i * 36));
        this.y[j][i] =
          this.posY +
          (j + 1) * (noise(this.offset[i] / 2) * 50) * sin(radians(i * 36));
      }
    }
  };

  this.display = function () {
    stroke(255);

    for (var j = this.numRings - 1; j > 0; j--) {
      beginShape();

      if (j % 2 == 0) {
        fill(this.color[0]);
      } else {
        fill(this.color[1]);
      }

      for (var i = 0; i < this.numSteps; i++) {
        vertex(this.x[j][i], this.y[j][i]);
      }
      vertex(this.x[j][0], this.y[j][0]); //close the shape
      endShape();
    }
  };
}

tl = new TimelineMax();

tl.from('.navbar > div', 1.6, {
  opacity: 0,
  y: 60,
  ease: Expo.easeInOut,
  delay: 0.6,
});

tl.from(
  '.site-logo',
  1.6,
  {
    opacity: 0,
    y: 40,
    ease: Expo.easeInOut,
  },
  '-=1.6'
);

tl.staggerFrom(
  '.site-menu > div',
  1,
  {
    opacity: 0,
    y: 60,
    ease: Power2.easeOut,
  },
  0.2
);

tl.staggerFrom(
  '.header > div',
  1,
  {
    opacity: 0,
    y: 60,
    ease: Power2.easeOut,
    delay: -1.4,
  },
  0.2
);
