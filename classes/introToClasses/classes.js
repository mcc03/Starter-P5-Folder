console.log("test");
let fruits = [23,25,26,28];

function setup(){
    createCanvas(500,500);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);
}

function draw(){

}

class BarChart{
    // defines properties in object
    constructor(){
        // this object height
        this.height = 300;
    }
}

// "new" = uses classes and objects
// let chart01 = new BarChart(400);
// s2
// let chart02 = new BarChart(200);

let charts=[];

for(let x = 0; x < 100; x++){
    charts.push(20);
}