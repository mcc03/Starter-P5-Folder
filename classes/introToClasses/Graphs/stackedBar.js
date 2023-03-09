class StackedBar{
    // defines properties in object
    constructor({
        _height=400,
        _width=400,
        _posX=100,
        _posY=900,
        _xName,
        _chartValue,
        _data,
        _barGap=10, 
        _markers=5,
        _chartName, 
        _markerSize=-5, 
        _hGridLines=5, 
        _vGridLines=0,
        _totalSums = "TOTALS_STACKED",
        _valueLabelName = "VALUE_LABEL",
        _tLine = "testr"
    }){

        // this object height
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.xName = _xName;
        this.chartValue = _chartValue;
        this.chartName = _chartName;
        this.totalSums = _totalSums
        this.barGap = _barGap;
        this.markerSize = _markerSize
        this.markers = _markers;
        this.leftMargin = 10;
        this.rightMargin = 10;
        this.hGridLines = _hGridLines;
        this.vGridLines = _vGridLines;
        this.valueLabelName = _valueLabelName;
        this.tLine = _tLine;
        // this.gridCount = _gridCount;

        // gap between markers
        this.markerGap = this.height/this.markers;

        // calculates bar width
        this.barWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.data.getRowCount() - 1)* this.barGap))/this.data.getRowCount();

        // calculates bar spacing
        this.barSpacing = this.barWidth+this.barGap;

        // gets highest value from arrayName
        // this.highestValue = Math.max(...fruits.map(object => object.sales));
        // this.highestValue = int(this.data.rows[0].obj.MAX_S);

        // for(let x=0; x<this.bars -1; x++){
        //     if(int(this.data.rows[x].obj.MAX_S) > this.highestValue){
        //         this.highestValue = int(this.data.rows[x].obj.MAX_S);
        //     }
        // }

        console.log("stacked highest value is:", this.highestValue())
        console.log("barWidth:", this.barWidth);
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
            let scaleValue = this.height/this.highestValue();
            return _scalingNum*scaleValue;
    }

    // draws the functions when called
    render(){
        push();
        translate(this.posX, this.posY);
        this.legend();
        this.hGrid();
        this.vGrid();
        this.stackedChart();
        this.chartMarkers();
        this.chartLabels();
        this.barLabels();
        this.vAxis();
        this.hAxis();
        this.xAxisNames();
        this.chartTitle();
        this.trendLine();
        this.valueLabel();
        pop();
    }

    // draws vertical axis
    vAxis(){
        stroke(255);
        line(0,0,0,-this.height)
    }

    // draw horizontal axis
    hAxis(){
        stroke(255);
        line(0,0,this.width,0)
    }

    // draw horizontal grid lines
    hGrid(){
        // if(this.gridCount == true){
            for(let x = 1; x <= this.hGridLines ;x++){
                stroke(255, 100);
                strokeWeight(2);
                line(this.markerSize, x*-this.markerGap, this.width, x*-this.markerGap)
            }
        // }   
    }
    
     // draw horizontal grid lines
    vGrid(){
        // if(this.gridCount == true){
            for(let x = 1; x <= this.vGridLines ;x++){
                stroke(255, 100);
                strokeWeight(1);
                line(x*this.width/this.vGridLines, -this.height, x*this.width/this.vGridLines, 0)
            }
        // }   
    }

    // draws bars
    stackedChart(){
        let barCount = this.data.getRowCount();

        for(let x = 0; x < barCount; x++){
            push();
            // spacing of bars
            translate(this.leftMargin + (x*this.barSpacing), 0)

            push();
            // specified columns of data
            for(let y =0; y < this.chartValue.length; y++){
                let theColor = y % colorPalette.length;
                fill(colorPalette[theColor]);
                let height = this.barScaler(int(-this.data.rows[x].obj[this.chartValue[y]]));
                noStroke();
                rect(0, 0,this.barWidth,height);
                noFill();
                stroke(0);
                line(0,0,this.barWidth,0);
                translate(0, height);
            }
            pop();
            pop();
        }
        
    }

    // draws a trendline based on avg values
    trendLine() {
        beginShape();
        for(let x = 0; x < this.data.getRowCount(); x++){
         
            let xValue = this.leftMargin + (x*this.barSpacing) + (this.barWidth/2);
            noFill()
            stroke(255);
            strokeWeight(2);
            
            let avgPointY = this.barScaler(int(-this.data.rows[x].obj[this.tLine]))
            
            // draws a continous line
            vertex(xValue,avgPointY);
            // draws circle at average point per bar
            ellipse(xValue,avgPointY,10,10)

        }
        endShape();
    }

    // draws marks on Vaxis
    chartMarkers(){
        for(let x = 0; x <= this.markers ;x++){
            stroke(255);
            strokeWeight(1);
            line(this.markerSize, x*-this.markerGap, 0, x*-this.markerGap)
    }
}

    // draws labels on the vertical axis
    chartLabels(){
        for(let x = 0; x <= this.markers ;x++){
            let labelValues = this.highestValue()/this.markers;
            noStroke();
            fill(255);
            textSize(12);
            textAlign(RIGHT, CENTER)
            text(int(x*labelValues).toFixed(0), -10, x*-this.markerGap);
        }
    }

    // placement of number above bar
    /* VERTICAL SPACING: Here I want to loop through the array of objects, getting the value of sales from each object 
    + x amount of spacing to appear above the bar. I also use the scaler function to scale the values to match the bars*/
    // HORIZONTAL SPACING: Here I want to space them horizontally to line up above the corresponding bar 
    barLabels(){
        textSize(16);
        textStyle(BOLD);
        noStroke();
        textAlign(CENTER)
        fill(255);
            for(let x=0; x<this.data.getRowCount(); x++){
                push();
                this.masterBarGap = (x * this.barWidth) + (x * this.barGap) + this.leftMargin;
                translate(this.masterBarGap + this.barWidth / 2, 0)
                text(this.data.rows[x].obj[this.totalSums], 0, this.barScaler(-this.data.rows[x].obj[this.totalSums])-10);
                pop();
            }
    }

    xAxisNames(){
        let xAxisLabels = data.getColumn(this.xName);
        for(let x = 0; x < this.data.getRowCount(); x++){
            push();
            this.masterBarGap = (x * this.barWidth) + (x * this.barGap) + this.leftMargin;
            translate(this.masterBarGap + this.barWidth / 2, 10)
            textStyle(NORMAL);
            textAlign(LEFT);
            noStroke();
            rotate(30); 
            let labelName = xAxisLabels[x];
            text(labelName, 0, 10);
            pop();
        }
    }

    chartTitle(){
        let titleMargin = -this.height-40
        noStroke();
        textSize(14);
        textAlign(CENTER);
        textStyle(BOLD);
        text(this.data.rows[0].obj[this.chartName].toUpperCase(), this.width/2, titleMargin);
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
            text(this.chartValue[x].toUpperCase(), this.width+rectSpacer, -this.height+(x*legendSpacer));

            let theColor = x % colorPalette.length;
            fill(colorPalette[theColor]);
            // colour reference
            rect(this.width, -this.height+margin-(x*rectSpacer), 15, 15);
        }
    }

    valueLabel(){
        
        push();
        let margin = -70;
        translate(margin, -this.height/2)
        noStroke();
        textStyle(BOLD);
        textAlign(CENTER);
        rotate(270); 
        fill(255);
        textSize(14);
        text(this.data.rows[0].obj[this.valueLabelName].toUpperCase(), 0, 10);
        pop();
    }

}

// let num = 2701
// for(let x = num; x %(mod) 7 ==0; x++){
// roundMaxNum = x; 
// }

// stacked barchart has nested for loop