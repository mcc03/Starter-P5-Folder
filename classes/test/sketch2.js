// intro to excel files
console.log("test4");
let fruits = [
    {name: "apple", sales:500},
    {name: "apple", sales:600},
    {name: "apple", sales:700},
    {name: "apple", sales:800},
    {name: "apple", sales:1000},
    {name: "apple", sales:300},
    {name: "apple", sales:370},
    {name: "apple", sales:600}
];



let charts=[];

function preload(){
    table = loadTable('//classes/test/data/fruitsales.csv', 'csv', 'header');
}

function setup(){
    createCanvas(500,500);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);
}

function draw(){
    background(0);
}