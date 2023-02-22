console.log("barcahrt with csv values");
let data;
let userSelect = ["apples", "pears", "oranges"]
let colors = ["#ff4455", "#ff6455", "#ff6222"];
let charts=[];

function preload() {
    data = loadTable('./data/data.csv', 'csv', 'header');
}

function setup(){
    createCanvas(600,600);
  
    angleMode(DEGREES);
    rectMode(CORNER);

    charts.push(new BarChart(400, 400, 100, 500, data, data.getRowCount(), 10, 5, -5, 5));

}

function draw(){
    background(200);
    charts[0].render();
}



