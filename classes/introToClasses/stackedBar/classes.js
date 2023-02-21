console.log("stacked bar");

function tidyData(){
    for(let x = 0; x < table.getRowCount(); x++){
        data.push(table.rows[x].obj);
    }
}

let fruits = []

let charts=[];
// "new" = uses classes and objects
// let chart01 = new BarChart();


function setup(){
    createCanvas(500,500);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);

    charts.push(new BarChart(400, 400, 50, 450, fruits, fruits.length, 10, 5, -5, 5));

}

function draw(){
    charts[0].render();

}



