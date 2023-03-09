class StackedHbar{
    // defines properties in object
    constructor({
        _height=400,
        _width=300,
        _posX=700,
        _posY=580,
        _yName="Need a name",
        _chartName,
        _barGap=5,
        _markers=5, 
        _markerSize=-5, 
        _hGridLines=0, 
        _vGridLines=5, 
        _chartValue,
        _totalSums = "TOTALS_H_STACKE",
        _valueLabelName = "VALUE_LABEL",
        _data       
    }){

        // this object height
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.barGap = _barGap;
        this.markerSize = _markerSize;
        this.markers = _markers;
        this.topMargin = 10;
        this.bottomMargin = 10;
        this.hGridLines = _hGridLines;
        this.vGridLines = _vGridLines;
        this.chartValue = _chartValue;
        this.chartName = _chartName;
        this.totalSums = _totalSums;
        this.valueLabelName = _valueLabelName;
        this.yName = _yName;

    // gap between markers
    this.markerGap = this.height/this.markers;

    // calculates bar width
    this.barWidth = (this.width - (this.topMargin + this.bottomMargin) - ((this.data.getRowCount() - 1)* this.barGap))/this.data.getRowCount();

    // calculates bar spacing
    this.barSpacing = this.barWidth+this.barGap;

    console.log("highest value is stacked Hbar:", this.highestValue());
    console.log("barWidth:", this.barWidth);
}

    sort(a, b){

    }

    highestValue(){
        let maxValue = 0;
        for(let x=0; x < this.data.getRowCount(); x++){
            
            if (int(data.rows[x].obj[this.totalSums]) > maxValue){
                maxValue = int(data.rows[x].obj[this.totalSums]);
            }
        }
        return maxValue;
    }

    // calculates how to scale bars based off the highest value
    barScaler(_scalingNum){
        for(let x = 0; x < this.data.getRowCount(); x++){
            let scaleValue = this.height/this.highestValue();
            return _scalingNum*scaleValue;
        }
    }

    // renders the functions
    render(){
        push();
        translate(this.posX, this.posY);
        this.hGrid();
        this.vGrid();
        this.stackedHbarChart();
        this.vAxis();
        this.hAxis();
        this.chartMarkers();
        this.chartLabels();
        this.barLabels();
        this.yAxisNames();
        this.chartTitle();
        this.legend();
        this.valueLabel();
        pop();
    }

    // draws bar chart
    stackedHbarChart(){

        // let numbers = [];
       
        // for(let x = 0; x < this.bars; x++){
        // // let numbers = [this.data.rows[x].obj.VALUE_F];
        
        //     numbers.push(int(this.data.rows[x].obj.VALUE_F))
        // }
        // // console.log(numbers);
       
        // numbers.sort(function(a, b){
        //    return a-b;
            
        // });
        // console.log(numbers);
        let barCount = this.data.getRowCount();

        for(let x = 0; x < barCount; x++){
            push();
            
            // translation of bar group
            translate(0, this.topMargin + (x*this.barSpacing));

            push();
            for(let y = 0; y < this.chartValue.length; y++){
                let theColor = y % colorPalette.length;
                fill(colorPalette[theColor]);
                let height = -this.barScaler(int(-this.data.rows[x].obj[this.chartValue[y]]));
                noStroke();
                rect(0, 0, height, this.barWidth);
                noFill();
                stroke(0);
                line(0,0,0,this.barWidth);
                // translates the next set of bars on top of each relative first bar
                translate(height, 0);
            }
            pop();
            pop();

        }
    }

    // draws vertical axis
    vAxis(){
        noFill();
        strokeWeight(1);
        stroke(255);
        line(0,0,0,this.width)
    }

    // draw horizontal axis
    hAxis(){
        noFill();
        strokeWeight(1);
        stroke(255);
        line(0,this.width,this.height,this.width)
    }

    // draws marks on Vaxis
    chartMarkers(){
        for(let x = 0; x <= this.markers ;x++){
            strokeWeight(2);
            line(x*this.markerGap, this.width, x*this.markerGap, this.width-this.markerSize)
        }
    }

    // draws labels on the horizontal axis
    chartLabels(){
        for(let x = 0; x <= this.markers ;x++){
            let labelValues = this.highestValue()/this.markers;
            push();
            translate(x*this.markerGap, this.width);
            noStroke();
            fill(255);
            textSize(14);
            textAlign(LEFT, CENTER);
            rotate(30);
            text(int(labelValues*x).toFixed(0), 5, 15);
            pop();
        }
    }

    // draws bar labels(values)
    barLabels(){
        textSize(16);
        noStroke();
        textAlign(CENTER);

        fill(255);
            for(let x=0; x < this.data.getRowCount(); x++){
                push();
                translate(0, this.topMargin + (x*this.barSpacing))
                textStyle(BOLD);
                textAlign(LEFT, CENTER);
                let height = -this.barScaler(int(-this.data.rows[x].obj[this.totalSums]));
                text(this.data.rows[x].obj[this.totalSums], height+5, this.barWidth/2);
                pop();
            }
        }

    // draws labels for the x-axis
    yAxisNames(){
        // finds column
        let yAxisLabels = data.getColumn(this.yName);
        for(let x = 0; x < this.data.getRowCount(); x++){
            push();
            fill(255);
            translate(0, this.topMargin + (x*this.barSpacing))
            textStyle(NORMAL);
            textAlign(RIGHT, CENTER);
            let labelName = yAxisLabels[x] 
            text(labelName, -5, this.barWidth/2);
            pop();
        }
    }

     // draw horizontal grid lines
    hGrid(){
        // if(this.gridCount == true){
            for(let x = 1; x <= this.hGridLines ;x++){
                stroke(255, 100);
                strokeWeight(2);
                line(this.markerSize, x*this.markerGap, this.height, x*this.markerGap)
            }
        // }   
    }
    
     // draw vertical grid lines
    vGrid(){
        // if(this.gridCount == true){
            for(let x = 1; x <= this.vGridLines ;x++){
                stroke(255, 100);
                strokeWeight(2);
                line(x*this.height/this.vGridLines, this.width, x*this.height/this.vGridLines, 0)
            }
        // }   
    }

    // draws chart title
    chartTitle(){
        let titleMargin = -10;
        textAlign(CENTER);
        textSize(14);
        textStyle(BOLD);
        fill(255);
        text(this.data.rows[0].obj[this.chartName].toUpperCase(), this.height/2, titleMargin);
    }

    legend(){
        noStroke();
        for(let x = 0; x < this.chartValue.length; x++){
            let legendSpacer = 20;
            let rectSpacer = 20;
            let margin = 30;
            textAlign(LEFT);
            textStyle(BOLD);
            fill(255);
            // draws legend name
            text(this.chartValue[x].toUpperCase(), this.height+rectSpacer, this.width/2+(x*legendSpacer));

            let theColor = x % colorPalette.length;
            fill(colorPalette[theColor]);
            // colour reference
            rect(this.height, this.width/2+margin-(x*rectSpacer), 15, 15);
        }
    }

         // draws the label for the axis that diplays the number values
         valueLabel(){
        
            push();
            let margin = -50;
            translate(this.height/2, this.width-margin)
            textStyle(BOLD);
            textAlign(CENTER);; 
            fill(255);
            textSize(14);
            text(this.data.rows[0].obj[this.valueLabelName].toUpperCase(), 0, 10);
            pop();
        }

}


