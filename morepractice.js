let fruits = [
    {name: "apple", sales:500},
    {name: "apple", sales:600},
    {name: "apple", sales:700},
    {name: "apple", sales:800},
    {name: "apple", sales:900},
    {name: "apple", sales:300},
    {name: "apple", sales:370},
    {name: "apple", sales:600}
];

let highestValue = Math.max(...fruits.map(object => object.sales));
let screenWidth = 500;
let screenHeight = 500;
let chartSize = 400;
let chartyPos = 450;
let chartxPos = 50;
let leftMargin = 10
let rightMargin = 10
let bars = fruits.length;
let barGap = 20;
let barWidth = (chartSize - (leftMargin + rightMargin) -((bars - 1)*barGap))/bars;
let barSpacing = barWidth+barGap;
let markerSize = -5;
let markers = 5;

console.log(barWidth);
console.log(highestValue);

function scaler(_numScale){
    for(let x = 0; x < fruits.length; x++){
        let scaleValue = chartSize/highestValue
        return _numScale*scaleValue;
    }
}

function setup(){
    createCanvas(screenHeight, screenWidth);
    noLoop();
}

function draw(){
    background(100);
    translate(chartxPos,chartyPos)
    
    for(let x = 0; x < fruits.length; x++){
        push();
        translate(leftMargin + (x*barSpacing), 0);
        fill(fruits[x].sales/3,255,0);
        rect(0,0,barWidth,scaler(-fruits[x].sales));
        pop();
    }

    strokeWeight(2);
    // y-axis
    line(0,0,chartSize,0);
    // x-axis
    line(0,-chartSize,0,0);

    let markerGap = chartSize/markers;
    let textGap = highestValue/markers;
    console.log(markerGap)
    console.log(textGap)

    // draws the markers on the y-axis
    // highestValue/markers = 180, each time x increases it adds another 180 for the next marker
    for(let x = 0; x <= markers ;x++){
        line(0,x*-markerGap,markerSize,x*-markerGap)
        noStroke;
        // rounding numbers to 2decimals
        textAlign(LEFT, CENTER)
        text(int(x*textGap).toFixed(2), -40, x*-markerGap);
    }


    
}