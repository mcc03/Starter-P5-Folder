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
        _vGridLines=0,
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
        this.maxValue = _maxValue;
        this.barGap = _barGap;
        this.markerSize = _markerSize
        this.markers = _markers;
        this.leftMargin = 10;
        this.rightMargin = 10;
        this.hGridLines = _hGridLines;
        this.vGridLines = _vGridLines;
        // this.gridCount = _gridCount;

        // gap between markers
        this.markerGap = this.height/this.markers;

        // calculates bar width
        this.barWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.data.getRowCount() - 1)* this.barGap))/this.data.getRowCount();

        // calculates bar spacing
        this.barSpacing = this.barWidth+this.barGap;

        // gets highest value from arrayName
        // this.highestValue = int(this.data.rows[0].obj[this.maxValue]);

        // for(let x=0; x<this.data.getRowCount() -1; x++){
        //     if(int(this.data.rows[x].obj[this.maxValue]) > this.highestValue){
        //         this.highestValue = int(this.data.rows[x].obj[this.maxValue]);
        //     }
        // }

        // gap between labels
        console.log("highest value for normal barchart is:", this.highestValue())
        // console.log("barWidth:", this.barWidth);
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
        for(let x = 0; x < this.data.getRowCount(); x++){
            let scaleValue = this.height/this.highestValue();
            return _scalingNum*scaleValue;
        }
    }

    // capitalFirst(str){
    // return str
    //     .toLowerCase()
    //     .split(' ')
    //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    //     .join(' ');
    // }

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
        // if(this.gridCount == true){
            for(let x = 1; x <= this.hGridLines ;x++){
                stroke(255, 100);
                strokeWeight(2);
                line(this.markerSize, x*-this.markerGap, this.width, x*-this.markerGap)
            }
        // }   
    }
    
     // draw vertical grid lines
    vGrid(){
        // if(this.gridCount == true){
            for(let x = 1; x <= this.vGridLines ;x++){
                stroke(255);
                strokeWeight(2);
                line(x*this.width/this.vGridLines, -this.height, x*this.width/this.vGridLines, 0)
            }
        // }   
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
                let theColor = y % colors.length;
                fill(colors[theColor]);
                
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

    // placement of number above bar
    /* VERTICAL SPACING: Here I want to loop through the array of objects, getting the value of sales from each object 
    + x amount of spacing to appear above the bar. I also use the scaler function to scale the values to match the bars*/
    // HORIZONTAL SPACING: Here I want to space them horizontally to line up above the corresponding bar 
    barLabels(){
        textSize(16);
        noStroke();
        textStyle(BOLD);
        textAlign(CENTER)
        let prop = "VALUE_M";
        fill(0);
            for(let x=0; x < barCount; x++){
                push();
                this.masterBarGap = (x * this.barWidth) + (x * this.barGap) + this.leftMargin;
                translate(this.masterBarGap + this.barWidth / 2, 0)
                text(this.data.rows[x].obj[prop], 0, this.barScaler(-this.data.rows[x].obj[prop])-10);
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
            textSize(16);
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
        textStyle(BOLD);
        // let prop = 'At_work_school_or_college'
        text(this.data.rows[0].obj[this.chartName].toUpperCase(), this.width/2, titleMargin);
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

            let theColor = x % colors.length;
            fill(colors[theColor]);
            // colour reference
            rect(this.width, -this.height+margin-(x*rectSpacer), 15, 15);
        }

    }

}

// let num = 2701
// for(let x = num; x %(mod) 7 ==0; x++){
// roundMaxNum = x; 
// }

// stacked barchart has nested for loop