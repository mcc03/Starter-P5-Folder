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
        _markerSize=-5, 
        _hGridLines=5, 
        _vGridLines=0
    }
        ){
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

        console.log("stacked highest value is:", this.highestValue())
        console.log("barWidth:", this.barWidth);
    }

    highestValue(){
        let maxValue = 0;
        for(let x=0; x < this.data.getRowCount(); x++){
            
            if (int(data.rows[x].obj.TOTALS) > maxValue){
                maxValue = int(data.rows[x].obj.TOTALS);
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
        // this.avgLine();
        pop();
    }

    // draws vertical axis
    vAxis(){
        stroke(0);
        line(0,0,0,-this.height)
    }

    // draw horizontal axis
    hAxis(){
        stroke(0);
        line(0,0,this.width,0)
    }

    // draw horizontal grid lines
    hGrid(){
        // if(this.gridCount == true){
            for(let x = 1; x <= this.hGridLines ;x++){
                stroke(150, 70);
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
                let theColor = y % colors.length;
                fill(colors[theColor]);
                let height = this.barScaler(int(-this.data.rows[x].obj[this.chartValue[y]]));
                noStroke();
                rect(0, 0,this.barWidth,height);
                noFill();
                stroke(240);
                line(0,0,this.barWidth,0);
                translate(0, height);
            }
            pop();
            pop();
        }
        
    }

    trendLine() {

        for(let x = 0; x < this.data.getRowCount(); x++){
            push();

            // spacing
            translate(this.leftMargin + (x*this.barSpacing), 0)
            let prop = "AVG_R";
            let circleAVG = this.barScaler(int(-this.data.rows[x].obj[prop]))
            fill(255);
            stroke(255);
            strokeWeight(2);
            circle(this.barWidth/2, circleAVG, 10);
            strokeWeight(4);
            line(this.barWidth/2, circleAVG, 50*2, -circleAVG);
            pop();
        }
    }

    // avgLine() {
    //     for(let x = 0; x < this.bars; x++){
    //         push();

    //         // spacing
    //         translate(this.leftMargin + (x*this.barSpacing), 0)
    //         let prop = "AVG_R";
    //         let circleAVG = this.barScaler(int(-this.data.rows[x].obj[prop]))
            
    //         fill(255);
    //         stroke(255);
    //         strokeWeight(4);
    //         line(this.barWidth/2, circleAVG, 0, circleAVG);
    //         pop();
    //     }
    // }

    // draws marks on Vaxis
    chartMarkers(){
        for(let x = 0; x <= this.markers ;x++){
            stroke(0);
            strokeWeight(1);
            line(this.markerSize, x*-this.markerGap, 0, x*-this.markerGap)
    }
}

    // draws labels on the vertical axis
    chartLabels(){
        for(let x = 0; x <= this.markers ;x++){
            let labelValues = this.highestValue()/this.markers;
            noStroke();
            fill(0);
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
        let prop = "TOTALS";
        fill(0);
            for(let x=0; x<this.data.getRowCount(); x++){
                push();
                this.masterBarGap = (x * this.barWidth) + (x * this.barGap) + this.leftMargin;
                translate(this.masterBarGap + this.barWidth / 2, 0)
                text(this.data.rows[x].obj[prop], 0, this.barScaler(-this.data.rows[x].obj[prop])-10);
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
        let titleMargin = (this.height*-1)-40
        noStroke();
        textAlign(CENTER);
        textStyle(BOLD);
        let prop = 'At_work_school_or_college2'
        text(this.data.rows[0].obj[prop].toUpperCase(), this.width/2, titleMargin);
    }

}

// let num = 2701
// for(let x = num; x %(mod) 7 ==0; x++){
// roundMaxNum = x; 
// }

// stacked barchart has nested for loop