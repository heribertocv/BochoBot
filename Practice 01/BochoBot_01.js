// try in https://editor.p5js.org/


let theWorld;

// Load the image.
function preload() {
  theWorld = loadImage("/assets/track.png");
}


function setup() {
  // Set the canvas the width and height
  createCanvas(640, 480);

  frameRate(2);

  // Draw the  and scale it to cover the canvas.
  //image(img, 0, 0, width, height, 0, 0, img.width, img.height, COVER);
  image(theWorld, 0, 0);
  
  BochoAmarillo = new BochoBot(125,220, 90, 50, theWorld);
  BochoAmarillo.draw();
    
}


function draw() {
  // Draw the  and scale it to cover the canvas.
  image(theWorld, 0, 0);
  updatePixels();
  
  BochoAmarillo.rotate_right()
  BochoAmarillo.draw();
  
  
  
}


class BochoBot{
  
  constructor(x, y, angle, size, world ) {
    // This code runs once when an instance is created.
    this.x = x;
    this.y = y;
    this.angle = angle*PI/180.0;

    
    this.radius = size;
    this.size_sensor = this.radius / 5;

    this.world = world;
    this.step_size = 5; 
    this.step_angle = PI / 10;
    
    this.moves = []
    this.current_move = -1 
  }
  
  draw() {

    let status_sensor = this.read_sensors();  

    push();

    // Move origin to center robot
    translate( this.x, this.y);
    rotate(this.angle);

    // draw robot's body
    noStroke();
    fill(236, 189, 64);
    circle(0, 0, this.radius);

    // draw sensor's status
    noStroke();

    if (status_sensor[0] == 0) fill(255, 0, 0);
    else fill(200, 255, 0);
    circle(this.radius / 4, -this.radius / 4, this.size_sensor);

    if (status_sensor[1]  == 0) fill(255, 0, 0);
    else fill(200, 255, 0)
    circle(this.radius / 4, this.radius / 4, this.size_sensor);

    pop();
  }
   
  read_sensors( ){
    let vsl = createVector(this.radius / 4, -this.radius / 4);
    vsl.rotate(this.angle);  
    let pixelColor = this.world.get( this.x+vsl.x, this.y+vsl.y );
    let s1 = pixelColor[0];

    let vsr = createVector( this.radius / 4, this.radius / 4);
    vsr.rotate(this.angle);  
    pixelColor = this.world.get( this.x+vsr.x, this.y+vsr.y );
    let s2 = pixelColor[0];

    return [s1, s2];
  }
  
  move_left(){
    let position = createVector(this.step_size, 0);

    position.rotate(this.step_angle);  
    
    this.x += position.x;
    this.y += position.y;
    this.angle -= this.step_angle
  }
  
  move_right(){
    let position = createVector(this.step_size, 0);

    position.rotate(-this.step_angle);  
    
    this.x += position.x;
    this.y += position.y;
    this.angle += this.step_angle
  }
  
  move_forward(){
    let position = createVector(this.step_size, 0);

    print("pose: ", this.x, this.y, this.angle);
    position.rotate(this.angle);  
    
    this.x += position.x;
    this.y += position.y;
    
  }
  
  rotate_left(){
    this.angle -=  this.step_angle;
  }
  
  rotate_right(){
    this.angle +=  this.step_angle;
  }
  
  setMoves( theMoves ){
      this.moves = theMoves;
      this.current_move = 0;
  }
  
  next_move(){
    this.current_move = this.current_move % this.moves.length
  }
  
}
