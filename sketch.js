let data = [2000, 1000, 700, 423, 350, 100, 250, 900, 1300]
let maxValue = Math.max(...data);
let numBlocks = data.length;
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

// let scaleValue = chartHeight/maxValue;
// console.log("The max value in the array is:", maxValue);
// console.log("This value will be used to scale the other values:", scaleValue);

// let scaleRatio = scaleValue*maxValue;
// console.log(scaleRatio);



// console.log(blockWidth)

function squarer(_num){
        let squared = _num * _num;
        return squared;
}
squarer(3);

function scaler(_num){
    for(let x=0; x < data.length; x++){
        let scaleValue = chartHeight/maxValue;
        return _num*scaleValue
    }
}

// called once
function setup(){
    createCanvas(screenWidth,screenHeight);
    noLoop();
}

// called 60times per second
function draw(){
    background(200);
    fill(0);
    for(let x=0; x < data.length; x++){
        push();
        // 60 + num of block * blockW+20, 400
        // each loop it moves the canvas
        translate(firstBlockxPos + (x*masterGap), 450);
        noStroke();
        fill(data[x],0,0)
        rect(0,0,blockWidth,scaler(-data[x]));
        console.log(data.length);
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

