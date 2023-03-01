console.log("barcahrt with csv values");
let data;
let stacked;
let barChartSelect = ["VALUE_M", "VALUE_F"];
let userSelect = ["VALUE_M2", "VALUE_F2"];
let colors = ["#252525", "#FF0000", "#AF0404"];
let charts=[];

function preload() {
    data = loadTable('./data/travel_time2016fix.csv', 'csv', 'header');
    barData = loadTable('./data/stacked_travel2016.csv', 'csv', 'header');
}

function setup(){
    createCanvas(1800, 1000);
    angleMode(DEGREES);
    rectMode(CORNER);

    charts.push(new BarChart(300, 400, 100, 400, data, data.getRowCount(), 5, 5, -5, 5, 0));

    charts.push(new StackedBar(300, 400, 100, 900, data, data.getRowCount(), 5, 5, -5, 5, 0));

    charts.push(new HBarChart(400, 300, 650, 90, data, data.getRowCount(), 5, 5, -5, 0, 5));

}

function draw(){
    background(200);
    charts[0].render();
    charts[1].render();
    charts[2].render();
}


// default parameters classes
// tidy data function for sorting