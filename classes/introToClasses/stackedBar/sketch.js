console.log("barcahrt with csv values");
let data;
let userSelect = ["apples", "oranges", "bananas"]
let colors = ["#ff4455", "#ff6455", "#ff6222"];
let charts=[];

function preload() {
    data = loadTable('./data/data2.csv', 'csv', 'header');
}

function setup(){
    createCanvas(1200,1200);
    angleMode(DEGREES);
    rectMode(CORNER);

    charts.push(new BarChart(400, 400, 100, 500, data, data.getRowCount(), 10, 5, -5, 5));

    charts.push(new StackedBar(400, 400, 100, 1000, data, data.getRowCount(), 10, 5, -5, 5));

}

function draw(){
    background(200);
    charts[0].render();
    charts[1].render();
}



