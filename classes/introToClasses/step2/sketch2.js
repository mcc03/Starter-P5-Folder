// intro to excel files
console.log("test3");
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

let table;
let data = [];

function tidyData(){
    for(let x = 0; x < table.getRowCount(); x++){
        data.push(table.rows[x].obj);
    }
}

function preload(){
    table = loadTable('/classes/introToClasses/step2/data/invome.csv', 'csv', 'header');
}

function setup(){
    tidyData();
    createCanvas(500,500);
    background(200);

}

function draw(){
    background(0);
}