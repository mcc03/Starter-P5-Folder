let data;
let userSelect = ["apples",  "oranges"];
let colors = ["#ff4455", "#ff6455"];

let charts=[];
// "new" = uses classes and objects
// let chart01 = new BarChart();


function preload() {
    data = loadTable('./data/data.csv', 'csv', 'header');
}

function setup(){
    createCanvas(1000,1000);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);
    pixelDensity(1)
    console.log("john" + pixelDensity());

    charts.push(new BarChart(300, 300, 100, 450, data, data.getRowCount(), 10, 5, -5, 5));

}

function draw(){
    background(200);
    charts[0].render();

}

// get real data data.cso.ie



