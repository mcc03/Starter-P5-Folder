console.log("barcahrt with csv values");
let data;
let stacked;
// let barChartSelect = ["VALUE_M", "VALUE_F"];
// let userSelect = ["VALUE_M2", "VALUE_F2"];
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

    charts.push(new BarChart({
        _height: 300, 
        _width: 400, 
        _xName:"County_of_residence",
        _chartValue:["VALUE_M", "VALUE_F"],
        _maxValue:"MAX_VAL_BAR",
        _markers: 5,
        _markerSize: -5,
        _barGap: 10,
        _data:data
}));

    charts.push(new StackedBar({
        _height: 300, 
        _width: 400,
        _xName: "County_of_residence2",
        _chartValue: ["VALUE_M2", "VALUE_F2"],
        _data:data, 
}));

    charts.push(new HBarChart({
        _height: 400,
        _width: 300,
        _yName: "County_of_residence",
        _chartValue: "VALUE_F",
        _data:data

    }));

    charts.push(new StackedHbar({
        _height: 400,
        _width: 300,
        _yName: "County_of_residence",
        _chartValue: ["VALUE_M", "VALUE_F"],
        _data:data

    }));
}

function draw(){
    background(200);
    charts[0].render();
    charts[1].render();
    charts[2].render();
    charts[3].render();
}


// default parameters classes
// tidy data function for sorting