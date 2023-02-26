console.log("barcahrt with csv values");
let data;
let userSelect = ["apples", "oranges", "bananas"]
let colors = ["#252525", "#FF0000", "#AF0404"];
let charts=[];

function preload() {
    data = loadTable('./data/data2.csv', 'csv', 'header');
}

function setup(){
    createCanvas(1800, 1000);
    angleMode(DEGREES);
    rectMode(CORNER);

    charts.push(new BarChart(300, 400, 100, 400, data, data.getRowCount(), 5, 5, -5, 5, 0));

    charts.push(new StackedBar(300, 400, 100, 900, data, data.getRowCount(), 5, 5, -5, 5, 0));

    charts.push(new HBarChart(400, 300, 600, 90, data, data.getRowCount(), 5, 5, -5, 0, 5));

}

function draw(){
    background(200);
    charts[0].render();
    charts[1].render();
    charts[2].render();
}



