let data = [50, 100, 150, 200, 250, 1000, 999, 500, 700];
let maxValue = Math.max(...data);
let rightMargin = 10;
let leftMargin = 10;
let screenHeight = 500;
let screenWidth = 500;
let chartWidth = 400;
let chartHeight = 400;
let blockGap = 20;
let numBlocks = data.length;
let blockWidth = (chartWidth - (rightMargin + leftMargin) - ((numBlocks -1)*blockGap))/numBlocks;
let xstartPos = ((screenWidth - chartWidth)/2)+leftMargin;
let masterGap = blockWidth+blockGap;

console.log("blockWidth:", blockWidth);
console.log(maxValue);


function scaler(_num){
    for(let x=0; x < data.length; x++){
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
    for(let x=0; x < data.length; x++){
        push();
        translate(xstartPos + (x*masterGap),450)
        fill(data[x],0,0)
        rect(0,0,blockWidth,scaler(-data[x]));
        pop();
    }

}
console.log("hello");