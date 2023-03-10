console.log("barcahrt with csv values");
let data;
let scatter;
let stacked;
// sets the colours to be used across all graphs
let colorPalette = ["#e85d04","#f48c06","#faa307","#ffba08"]
let lineChartPalette = ["#ffba08","#9d0208","#e85d04","#f48c06","#faa307"]

let charts= [];

function preload() {
    data = loadTable('./data/travel_time2016final.csv', 'csv', 'header');
    scatter = loadTable('./data/HeightWeight.csv', 'csv', 'header');
}

function setup(){
    createCanvas(1920, 1080);
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
        _barLabel: "VALUE_OTHER",
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
        _totalSums: "TOTALS_STACKED",
        _tLine:"AVG_R"
}));

    charts.push(new HBarChart({
        _height: 300,
        _width: 300,
        _yName: "County_of_residence",
        _chartName: 'At_work_school_or_college',
        _chartValue: "VALUE_F",
        _data:data,
        _posX: 680
    
    }));

    charts.push(new StackedHbar({
        _height: 300,
        _width: 300,
        _yName: "County_of_residence",
        _chartName: 'At_work_school_or_college',
        _chartValue: ["VALUE_M", "VALUE_F", "VALUE_OTHER"],
        _totalSums: "TOTALS_H_STACKED",
        _data:data,
        _posX: 680
    }));

    charts.push(new LineChart({
        _height: 300, 
        _width: 300,
        _xName: "County_of_residence2",
        _chartValue: ["VALUE_M", "VALUE_F", "VALUE_OTHER"],
        _data:data,
        _posX: 1200,
        _posY: 400
}));

charts.push(new ScatterPlot({
    _height: 300, 
    _width: 300, 
    _xName:"County_of_residence",
    _markers: 7,
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
