// let data = [50, 100, 150, 200, 250, 1000, 999, 500, 700];
// data as an array of objects. to acces an array you use arrayName[index] like fruits[2].
// then you access the propert value like object.name or fruits[2].sales.
let fruits = [
    {name:"apple", sales:83},
    {name:"apple", sales:63},
    {name:"apple", sales:23},
    {name:"apple", sales:93},
    {name:"apple", sales:150}
];

// method 1 of find max value in an array of objects
// let numFruits = [];

// for(x=0; x<fruits.length;x++){
//     numFruits.push(fruits[x].sales)
// }

// LIST OF VARIABLES
// method 2 of finding max value in an array of objects (more efficient)
let maxValue = Math.max(...fruits.map(object => object.sales));
let rightMargin = 10;
let leftMargin = 10;
let screenHeight = 500;
let screenWidth = 500;
let chartWidth = 400;
let chartxPos = 50;
let chartyPos = 450;
let chartHeight = 400;
let blockGap = 10;
let numBlocks = fruits.length;
let chartTicks = 5;
let tickSize = -10;

// This is where I calculate stuff from my variables
let blockWidth = (chartWidth - (rightMargin + leftMargin) - ((numBlocks -1)*blockGap))/numBlocks;
// let xstartPos = ((screenWidth - chartWidth)/2)+leftMargin;
let masterGap = blockWidth+blockGap;

console.log("blockWidth:", blockWidth);
console.log("high value is:", maxValue);

// function to calculate the scale value
function scaler(_num){
    for(let x=0; x < fruits.length; x++){
        let scaleValue = chartHeight/maxValue;
        return _num*scaleValue;  
    }
}

function setup(){
    createCanvas(screenHeight,screenWidth);
    noLoop();
}

function draw(){
    background(150);
    fill(0)
    // translating the whole chart
    translate(chartxPos,chartyPos)
    // this loop draws the bars
    for(let x=0; x < fruits.length; x++){
        push();
        translate(leftMargin + (x*masterGap), 0)
        fill(fruits[x].sales,0,fruits[x].sales*3)
        rect(0,0,blockWidth,scaler(-fruits[x].sales));
        pop();
    }
    // this draws the axis
    stroke(0);
    strokeWeight(2);
    // y-axis
    line(0,0,0,-chartHeight);
    // x-axis
    line(0,0,chartWidth,0);
    
    // ticks for the y-axis
    let chartGap = chartHeight/(chartTicks);
    let numGap = maxValue/(chartTicks);
    console.log(numGap);

    for(let x = 0; x <= chartTicks; x++){
        line(0,x*-chartGap,tickSize,x*-chartGap)
        noStroke;
        textSize(15);
        textAlign(RIGHT, CENTER);
        text(int(x*numGap).toFixed(2), -10, x*-chartGap)
    }

}
