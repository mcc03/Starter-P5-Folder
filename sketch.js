let numBlocks = 8;
let chartWidth = 400;
let chartHeight = 400;
let marginLeft = 10;
let marginRight = 10;
let blockGap = 20;
// ((400−(10+10))−(8−1)×20)÷8
let blockWidth = (chartWidth - (marginLeft + marginRight) - ((numBlocks - 1)* blockGap))/numBlocks;
let screenWidth = 500;
let screenHeight = 500;
// screen width = 500, chart width = 400. 500 - 400 = 100/2 = 50 + marginLeft = 60, the start pos.
let firstBlockxPos = ((screenWidth - chartWidth)/2)+ marginLeft;
let masterGap = blockWidth+blockGap;

console.log(blockWidth)



// called once
function setup(){
    createCanvas(screenWidth,screenHeight);
    noLoop();
}

// called 60times per second
function draw(){
    background(200);
    fill(0);
    for(let x=0; x < numBlocks; x++){
        push();
        // 60 + num of block * blockW+20, 400
        translate(firstBlockxPos + (x*masterGap), chartHeight);
        rect(0,0,blockWidth,random(-20,-400));
        pop();
    }
  
    // noFill();
    // line(50,50,50,450)
    // line(450,450,50,450)

    // stroke(0);
    // strokeWeight(4);
    // fill(0,255,0);

    // // bars
    // fill(0,0,255)
    // rect(100,230,50,220);
    // fill(0,0,200)
    // rect(200,200,50,250);
    // fill(0,0,150)
    // rect(300,170,50,280);
    // fill(0,0,100)
    // rect(400,150,50,300);
}

// declaring function SCREAM
// when it is called, it will execute the code
// function scream(_numScreams, _name){
//     for(let x = 0; x <_numScreams; x++){
//         console.log(_name);
//     }
// }

// calling function scream
// parameters need to match the order as in function
// scream(5, "Help");

