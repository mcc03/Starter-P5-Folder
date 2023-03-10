class LineChart{
    // defines properties in object
    constructor({
        _height=400,
        _width=400,
        _posX=800,
        _posY=200,
        _xName,
        _chartValue,
        _data,
        _barGap=10, 
        _markers=5, 
        _markerSize=-5, 
        _hGridLines=5, 
        _vGridLines=0,
        _valueLabelName = "VALUE_LABEL"
    }){

        // this object height
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.xName = _xName;
        this.chartValue = _chartValue;
         // this.maxValue = "TOTALS";
        this.barGap = _barGap;
        this.markerSize = _markerSize
        this.markers = _markers;
        this.leftMargin = 10;
        this.rightMargin = 10;
        this.hGridLines = _hGridLines;
        this.valueLabelName = _valueLabelName;
        this.vGridLines = _vGridLines;
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

        console.log("linechart highest value is:", this.highestValue())
        console.log("barWidth:", this.barWidth);
    }

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
        this.chartMarkers();
        this.chartLabels();
        this.vAxis();
        this.hAxis();
        this.xAxisNames();
        this.chartTitle();
        this.lineChart();
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
                stroke(255);
                strokeWeight(1);
                line(x*this.width/this.vGridLines, -this.height, x*this.width/this.vGridLines, 0)
            }
        // }   
    }

    // draws a trendline based on avg values
    lineChart() {
        
        for(let col = 0; col < this.chartValue.length; col++){
            
            // spacing for each point on the lines
            
            strokeWeight(2);
            noFill();
            let theColor = col % colorPalette.length;

            stroke(colorPalette[theColor]);
            beginShape();
            
            // gets y-axis position for each point
                for(let row = 0; row < this.data.getRowCount(); row++){
                
                    // spacing between each point on a line
                    let xValue = (row*this.barSpacing)
                    let line1 = this.barScaler(int(-this.data.rows[row].obj[this.chartValue[col]]));
                    
                    // console.log("psacing", col,xValue*row,line1)
                    noFill();
                    // draws a continous line 
                    vertex(xValue,line1);
                    ellipse(xValue,line1,4);
                } 
                endShape();     
        }
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

    xAxisNames(){
        let xAxisLabels = data.getColumn(this.xName);
        for(let x = 0; x < this.data.getRowCount(); x++){
            push();
            this.masterBarGap = (x * this.barWidth) + (x * this.barGap) + this.leftMargin;
            translate(this.leftMargin+(x*this.width/this.data.getRowCount()), 10)
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
        let prop = 'At_work_school_or_college2'
        text(this.data.rows[0].obj[prop].toUpperCase(), this.width/2, titleMargin);
    }

    // draws legends
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

        // draws the label for the axis that diplays the number values
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