console.log("test2");
let fruits = [
    {name: "apple", sales:500},
    {name: "apple", sales:600},
    {name: "apple", sales:700},
    {name: "apple", sales:800},
    {name: "apple", sales:900},
    {name: "apple", sales:1200},
    {name: "apple", sales:1500}
];

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



