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
// console.log(markerGap)
// console.log(textGap)

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
    angleMode(DEGREES);
}

// creates axis with markers
// draws the markers on the y-axis
// highestValue/markers = 180, each time x increases it adds another 180 
function createAxis( _pos, _markers, _markerSize, _labels, _rotationAngle ,_strokeColour, _strokeWeight){

    let markerGap = chartSize/_markers;
    let textGap = highestValue/_markers;
    translate(_pos.x, _pos.y);
    rotate(_rotationAngle);
    stroke(_strokeColour);
    strokeWeight(_strokeWeight); 
    
    // draws the markers
    for(let x = 0; x <= _markers ;x++){
        line(0,x*-markerGap,_markerSize,x*-markerGap)
        noStroke;
        // rounding numbers to 2decimals
        
        // enables and disables axis labels
        if(_labels == true){        
            textAlign(LEFT, CENTER)
            text(int(x*textGap).toFixed(2), -40, x*-markerGap);
        }

    }

    // if(_rotationAngle > 180){
    //     _markerSize*-1
    // }

    strokeWeight(2);
    // y-axis
    line(0,0,chartSize,0);
    // x-axis
    line(0,-chartSize,0,0);
}

function draw(){
    background(100);
    translate(chartxPos,chartyPos)

    for(let x = 0; x < fruits.length; x++){
        push();
        translate(leftMargin + (x*barSpacing), 0);
        fill(fruits[x].sales/3,255,0);
        rect(0,0,barWidth, scaler(-fruits[x].sales));
        pop();
    }
    
    //  _pos, _markers, _markerSize, _labels, _rotationAngle, _strokeColour, _strokeWeight
    createAxis(createVector(0,0), 5, -5, true, 0, 50, 1);   
}

// rotate y axis, over certain angle change marker sides (boolean?)