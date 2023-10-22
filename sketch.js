

let sizeBar = new scrollBar(100,200,200,20,6);
let barSize;
let tvalue;
let f1;
let iSave;
let touchX, touchY;


function setup() {
  createCanvas(400, 400);

  sizeBar.sbDisplay();
  tvalue = 0;

}

function draw() {
 
 textSize(15);

 fill(255);
 rect(1,1,399,399);
 textSize(15);

// sizebar control test 

 sizeBar.sbUpdate();
 sizeBar.sbDisplay();
 f1 = sizeBar.getPos();
 console.log('f1 ',f1);
 text(f1,20,20);

  if (mouseIsPressed) {
    fill(tvalue);  ellipse(mouseX, mouseY, 40, 40);} 
  else {
    fill(tvalue);
  }


}

function mousePressed() {

  if (tvalue = 255) {
    tvalue = 0;
  } else {
    tvalue = 255;
  }

}

function scrollBar (xp, yp, sw, sh, l) {
    this.swidth = sw;
    this.sheight = sh;
    let widthtoheight = sw - sh;
    let ratio = sw / widthtoheight;
    console.log('ratio = '+ratio);
    //ellipse(80,80,15,15);
    this.xpos = xp;   
    this.ypos = yp;
//    this.spos = this.xpos + this.swidth/2 - this.sheight/2;  // use this line  to initially center the slider in the slider bar
    this.spos = this.xpos;  // use this line to initially position the slider at the left edge of the slider bar
    this.newspos = this.spos;
    this.sposMin = this.xpos;
    this.sposMax = this.xpos + this.swidth - this.sheight;
    this.loose = l;
    let over;
    let locked;
    let loose;

  this.sbUpdate = function() {
    let ovrEvent = this.overEvent();
    if (ovrEvent == true) {
      over = true; 
    } else {
      over = false; 
    }
    if (mouseIsPressed && over) {
      locked = true; 
    }
    if (!mouseIsPressed) {
      locked = false; 
    }
    if (locked) {
      this.newspos = min(max((mouseX-(this.sheight/2)),this.sposMin),this.sposMax);
      //this.newspos = constraind(mouseX-sheight/2, this.sposMin, this.sposMax);
    }
    if (abs(this.newspos - this.spos) > 1) {
      this.spos = this.spos + (this.newspos-this.spos)/this.loose;
    }
  }

  this.overEvent=function() {
    if (mouseX > this.xpos && mouseX < this.xpos+this.swidth &&
       mouseY > this.ypos && mouseY < this.ypos+this.sheight) {
      return true;
    } else {
      return false;
    }
  }

  this.sbDisplay = function() {
    noStroke();
    fill(239);
    rect(this.xpos, this.ypos, this.swidth, this.sheight);
    if (over || locked) {
      fill(0, 0, 0);
    } else {
      fill(102, 102, 102);
    }
    rect(this.spos, this.ypos, this.sheight, this.sheight);
  }

  this.getPos=function() {
    // Convert spos to be values between
    // 0 and the total width of the scrollbar
    return this.spos * ratio;
  }
}