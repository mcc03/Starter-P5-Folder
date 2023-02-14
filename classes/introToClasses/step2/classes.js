console.log("test2");
let fruits = [50,150,400,200,250,900];
let charts=[];

// "new" = uses classes and objects
// let chart01 = new BarChart();


function setup(){
    createCanvas(500,500);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);

    charts.push(new BarChart(400, 400, 50, 450, fruits, fruits.length, 20, -5));

}

function draw(){
    charts[0].render();

}



