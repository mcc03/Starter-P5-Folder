console.log("barcahrt with csv values");
let data;
let scatter;
let stacked;
// let barChartSelect = ["VALUE_M", "VALUE_F"];
// let userSelect = ["VALUE_M2", "VALUE_F2"];
let colors = ["#115f9a", "#1984c5", "#22a7f0", "#48b5c4", "#76c68f", "#a6d75b", "#c9e52f", "#d0ee11", "#d0f400"]
;
let charts=[];

function preload() {
    data = loadTable('./data/travel_time2016fix.csv', 'csv', 'header');
    scatter = loadTable('./data/HeightWeight.csv', 'csv', 'header');
    barData = loadTable('./data/stacked_travel2016.csv', 'csv', 'header');
}

function setup(){
    createCanvas(1800, 1000);
    angleMode(DEGREES);
    rectMode(CORNER);

    charts.push(new BarChart({
        _height: 300, 
        _width: 300, 
        _xName:"County_of_residence",
        _chartValue:["VALUE_M", "VALUE_F", "VALUE_OTHER"],
        _maxValue:"MAX_VAL_BAR",
        _markers: 5,
        _markerSize: -5,
        _barGap: 10,
        _data:data,
        _chartName: 'At_work_school_or_college', 
        _line:"AVG_R",
        _posX: 100

}));

    charts.push(new StackedBar({
        _height: 300, 
        _width: 300,
        _xName: "County_of_residence2",
        _chartValue: ["VALUE_M2", "VALUE_F2", "VALUE_OTHER2"],
        _chartName: 'At_work_school_or_college2', 
        _data:data,
        _posX: 100, 
        _tLine:"AVG_R"
}));

    charts.push(new HBarChart({
        _height: 300,
        _width: 300,
        _yName: "County_of_residence",
        _chartName: 'At_work_school_or_college',
        _chartValue: "VALUE_F",
        _data:data,
        _posX: 650
    
    }));

    charts.push(new StackedHbar({
        _height: 300,
        _width: 300,
        _yName: "County_of_residence",
        _chartName: 'At_work_school_or_college',
        _chartValue: ["VALUE_M", "VALUE_F", "VALUE_OTHER"],
        _data:data,
        _posX: 650
    }));

    charts.push(new LineChart({
        _height: 300, 
        _width: 300,
        _xName: "County_of_residence2",
        _chartValue: ["VALUE_M", "VALUE_F"],
        _data:data,
        _posX: 1200,
        _posY: 400
}));

charts.push(new ScatterPlot({
    _height: 300, 
    _width: 300, 
    _xName:"County_of_residence",
    _markers: 5,
    _markerSize: -5,
    _barGap: 10,
    _scatter:scatter,
    _line:"AVG_R",
    _posX: 1200

}));

}

function draw(){
    background(0);
    charts[0].render();
    charts[1].render();
    charts[2].render();
    charts[3].render();
    charts[4].render();
    charts[5].render();
}


// default parameters classes
// tidy data function for sorting