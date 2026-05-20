let sp = []; // Declare the object
let num = 30;

function setup() {
    colorMode(HSB, 360, 100, 100, 255);
    canvas = createCanvas(800, 400);
    canvas.parent('p5js');
    background(25);
    ellipseMode(CENTER);
    angleMode(RADIANS);
    //construct the object
    for (let i=0; i < num; i++) {
        let x = random(0, width); //starting x position
        let y = random(0, height); //starting y positon
        let v = createVector(x, y); 
        let d = random(50,100); //sidelength/diameter
        let e = random(0.005, 0.05); //speed of shape
        let c = createVector(random(0, 360), random(0, 360)); //color
        let r = random(0.01, 0.1); //rate of change of color
        let a = random(0, 0.5); //angular momentum
        sp[i] = new Spot(v, d, e, c, r, a);
    }
}
function draw() {
    background(0,12);
    for (let i=0; i < num; i++) {
        push();
        sp[i].move();
        sp[i].display();
        pop();
    }
}
// function to define a class
class Spot {
    // Construct the object
    constructor(vect, sideLength, ease, col, rate, angle) {
        this.v = vect;
        this.d = sideLength;
        this.e = ease;
        this.c = col;
        this.r = rate;
        this.a = angle;
        this.deg = this.a;
    }
    // method to display the object
    display() {
        let co = map(sin(frameCount * this.r * 0.005), -1, 1, 0, 360);
        fill(co, 100, 100);
        translate(this.v.x, this.v.y);
        this.a = (movedX + movedY) / 45 //angular momentum scales with amount the mouse has moved
        if (movedX != 0 || movedY != 0) {this.deg += this.a;} //if the mouse isn't moving shape doesn't spin
        rotate(this.deg); 
        if (this.a > 0.5) {ellipse(0, 0, this.d, this.d*1.5);} 
        else if (this.a > 0.25) {triangle(0, this.d/(3**0.5), 
            -this.d*0.5, -this.d/(2*(3**0.5)), 
            this.d*0.5, -this.d/(2*(3**0.5)));}
        else rect(-0.5*this.d, -0.5*this.d, this.d, this.d);
        // number of sides scales with spin speed (rotational forces smooth out corners)

        }
    move() {
        if (mouseIsPressed) {
            let dx = mouseX - this.v.x; //dx = the distancebetween mouse and shape
            this.v.x -= dx * this.e; 
            let dy = mouseY - this.v.y;
            this.v.y -= dy * this.e;
        } else {
            let dx = mouseX + movedX - this.v.x;
            this.v.x += dx * this.e;
            let dy = mouseY + movedY - this.v.y;
            this.v.y += dy * this.e;
        }
    }
}