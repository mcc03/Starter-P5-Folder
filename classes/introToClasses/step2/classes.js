let data;
let userSelect = ["apples",  "oranges", "bananas"];
let colors = ["#ff4455", "#ff6455", "#ff2555"];

let charts=[];
// "new" = uses classes and objects
// let chart01 = new BarChart();


function preload() {
    data = loadTable('./data/data2.csv', 'csv', 'header');
}

function setup(){
    createCanvas(1000,1000);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);
    pixelDensity(1)
    console.log("john" + pixelDensity());

    charts.push(new BarChart(400, 400, 60, 900, data, data.getRowCount(), 10, 5, -5, 5));

}

function draw(){
    background(200);
    charts[0].render();

}

// get real data data.cso.ie



