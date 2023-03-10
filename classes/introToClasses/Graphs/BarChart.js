class BarChart{
    // defines properties in object
    constructor({
        _height=400,
        _width=400,
        _posX=100,
        _posY=400,
        _xName="Sample",
        _chartName = "test",
        _chartValue,
        _maxValue,
        _barGap=10,
        _markers=5,
        _markerSize=-5,
        _hGridLines=_markers,
        _barLabel = "VALUE_M",
        _vGridLines=0,
        _valueLabelName = "VALUE_LABEL",
        _data
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
        this.barLabel = _barLabel
        this.maxValue = _maxValue;
        this.barGap = _barGap;
        this.markerSize = _markerSize
        this.markers = _markers;
        this.leftMargin = 10;
        this.rightMargin = 10;
        this.valueLabelName = _valueLabelName;
        this.hGridLines = _hGridLines;
        this.vGridLines = _vGridLines;
        // this.gridCount = _gridCount;

        // gap between markers
        this.markerGap = this.height/this.markers;

        // calculates bar width
        this.barWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.data.getRowCount() - 1)* this.barGap))/this.data.getRowCount();

        // calculates bar spacing
        this.barSpacing = this.barWidth+this.barGap;

        console.log("highest value for normal barchart is:", this.highestValue())
        // console.log("barWidth:", this.barWidth);
    }

    // find highest value from specified object property
    highestValue(){
        let maxValue = 0;
        for(let x=0; x < this.data.getRowCount(); x++){
            if (int(data.rows[x].obj.MAX_VAL_BAR) > maxValue){
                maxValue = int(data.rows[x].obj.MAX_VAL_BAR);
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

    // draws the functions when called
    render(){
        push();
        translate(this.posX, this.posY);

        this.hGrid();
        this.vGrid();
        this.vAxis();
        this.hAxis();
        this.barChart();
        this.chartMarkers();
        this.chartLabels();
        // this.barLabels();
        this.xAxisNames();
        this.chartTitle();
        this.legend();
        this.valueLabel();

        pop();
    }

    // draws vertical axis
    vAxis(){
        noFill();
        strokeWeight(1);
        stroke(255);
        line(0,0,0,-this.height)
    }

    // draw horizontal axis
    hAxis(){
        noFill();
        strokeWeight(1);
        stroke(255);
        line(0,0,this.width,0)
    }

    // draw horizontal grid lines
    hGrid(){
            for(let x = 1; x <= this.hGridLines ;x++){
                stroke(255, 100);
                strokeWeight(2);
                line(this.markerSize, x*-this.markerGap, this.width, x*-this.markerGap)
            }
    }
    
     // draw vertical grid lines
    vGrid(){
            for(let x = 1; x <= this.vGridLines ;x++){
                stroke(255);
                strokeWeight(2);
                line(x*this.width/this.vGridLines, -this.height, x*this.width/this.vGridLines, 0)
            }
    }

    // draws bars
    barChart(){
        let barCount = this.data.getRowCount();

        for(let x = 0; x < barCount; x++){
            push();
            // spacing of bars
            translate(this.leftMargin + (x*this.barSpacing), 0)

            push();
            // specified data
            for(let y =0; y < this.chartValue.length; y++){
                // colors
                let theColor = y % colorPalette.length;
                fill(colorPalette[theColor]);
                
                let height = this.barScaler(int(-this.data.rows[x].obj[this.chartValue[y]]));
                noStroke();

                // divides the barWidth by the length of the data array to fit bars
                let dataLength = this.chartValue.length;

                rect(0, 0,this.barWidth/dataLength,height);
                translate(this.barWidth/dataLength, 0);
            }
            pop();
            pop();
        }
    }

    // draws marks on Vaxis
    chartMarkers(){
        for(let x = 0; x <= this.markers ;x++){
            strokeWeight(2);
            line(this.markerSize, x*-this.markerGap, 0, x*-this.markerGap);
          
    }
}

// let num = 2701
// for(let x = num; x %(mod) 7 ==0; x++){
// roundMaxNum = x; 
// }

    // draws labels on the vertical axis
    chartLabels(){
        for(let x = 0; x <= this.markers ;x++){
            let labelValues = this.highestValue()/this.markers;
            noStroke();
            fill(255);
            textSize(14);
            textAlign(RIGHT, CENTER)
            text(int(x*labelValues).toFixed(0), -10, x*-this.markerGap);
        }
    }

    // draws values above relative bars
    barLabels(){
        textSize(16);
        noStroke();
        textStyle(BOLD);
        textAlign(CENTER)
        fill(0);
            for(let x=0; x < this.data.getRowCount(); x++){
                push();
                fill(255);
                this.masterBarGap = (x * this.barWidth) + (x * this.barGap) + this.leftMargin;
                translate(this.masterBarGap + this.barWidth / 2, 0)
                
                // draws the values
                text(this.data.rows[x].obj[this.barLabel], 0, this.barScaler(-this.data.rows[x].obj[this.barLabel])-10);
                pop();
            }
    }

    // draws labels for the x-axis
    xAxisNames(){
        let xAxisLabels = data.getColumn(this.xName);
        for(let x = 0; x < xAxisLabels.length; x++){
            push();
            this.masterBarGap = (x * this.barWidth) + (x * this.barGap) + this.leftMargin;
            translate(this.masterBarGap + this.barWidth/2, 10)
            textStyle(NORMAL);
            textSize(14);
            textAlign(LEFT);
            rotate(30); 
            let labelName = xAxisLabels[x]
            text(labelName, 0, 10);
            pop();
        }
    }
    
    // draws chart title
    chartTitle(){
        let titleMargin = (this.height*-1)-40
        textAlign(CENTER);
        textSize(14);
        textStyle(BOLD);
        text(this.data.rows[0].obj[this.chartName].toUpperCase(), this.width/2, titleMargin);
    }

    // draws legends
    legend(){
        noStroke();
        for(let x = 0; x < this.chartValue.length; x++){
            let legendXpos = 10;
            let xPos = this.width+legendXpos;
            let yPos = -this.height;
            let legendTextSpace = 25;

            // each loop moves the legends down
            yPos+= x*30
       
            // colours the legends with the relative data series
            let theColor = x % colorPalette.length;
            fill(colorPalette[theColor]);
            rect(xPos, yPos, 20);

            textAlign(LEFT);
            textStyle(BOLD);
            fill(255);
            // draws legend name
            text(this.chartValue[x].toUpperCase(), xPos+legendTextSpace, yPos+10);
        }
    }

    // draws the label for the axis that diplays the number values
    valueLabel(){
        
        push();
        let margin = -70;
        translate(margin, -this.height/2)
        textStyle(BOLD);
        textAlign(CENTER);
        rotate(270); 
        fill(255);
        textSize(14);
        text(this.data.rows[0].obj[this.valueLabelName].toUpperCase(), 0, 10);
        pop();
    }
}
