class ScatterPlot{
    // defines properties in object
    constructor({
        _height=400,
        _width=400,
        _posX=950,
        _posY=900,
        _xName="HeightInches",
        _barGap=10,
        _markers=5,
        _markerSize=-5,
        _hGridLines=_markers,
        _vGridLines=0,
        _scatter
    }){

        // this object height
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.scatter = _scatter;
        this.xName = _xName;
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
        this.barWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.scatter.getRowCount() - 1)* this.barGap))/this.scatter.getRowCount();

        // calculates bar spacing
        this.barSpacing = this.barWidth+this.barGap;

        // gap between labels
        console.log("highest weight is:", this.highestWeight());
        console.log("highest height is:", this.highestHeight());
        // console.log("barWidth:", this.barWidth);
    }

    // gets highest weight value
    highestWeight(){
        let maxValue = 0;
        for(let x=0; x < this.scatter.getRowCount(); x++){
            
            if (int(scatter.rows[x].obj.WeightPounds) > maxValue){
                maxValue = int(scatter.rows[x].obj.WeightPounds);
            }
        }
        return maxValue;
    }

    // gets highest height value
    highestHeight(){
        let maxValue = 0;
        for(let x=0; x < this.scatter.getRowCount(); x++){
            
            if (int(scatter.rows[x].obj.HeightInches) > maxValue){
                maxValue = int(scatter.rows[x].obj.HeightInches);
            }
        }
        return maxValue;
    }

    // calculates placement of y-axis values
    plotWeightScaler(_scalingNum){
        for(let x = 0; x < this.scatter.getRowCount(); x++){
            let scaleValue = this.height/this.highestWeight();
            return _scalingNum*scaleValue;
            
        }
    }

    // calculates placement of x-axis values
    plotHeightScaler(_scalingNum){
        for(let x = 0; x < this.scatter.getRowCount(); x++){
            let scaleValue = this.height/this.highestHeight();
            return _scalingNum*scaleValue;
        }
    }

    // I want to calculate the intervals between the min and a max value with a custom interval count
    heightIntervals(){
        // finding mix and max values for height
        let minHeight = this.scatter.rows[0].obj['min max height']
        let maxHeight = this.scatter.rows[1].obj['min max height']

        // setting empty array to push the intervals into
        let arrayHeights = [];

        let range = maxHeight - minHeight;
        let numIntervals = range/6;
        
        // min height + numIntervals until it reaches maxHeight
        for(let x = minHeight; x < maxHeight; x+numIntervals){
            arrayHeights.push(x);
        }
    }

    // draws the functions when called
    render(){
        push();
        translate(this.posX, this.posY);
        // this.heightIntervals();
        this.hGrid();
        this.vGrid();
        this.vAxis();
        this.hAxis();
        this.chartMarkers();
        this.chartLabels();
        this.xAxisNames();
        this.xChartLabels();
        this.scatterPlot();
        this.chartTitle();
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
                stroke(150, 70);
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

    scatterPlot(){
        for(let x = 0; x < this.scatter.getRowCount(); x++){
            push();
            let prop = "HeightInches"
            let prop2 = "WeightPounds"
            let height = this.plotHeightScaler(this.scatter.rows[x].obj[prop]);
            let weight = this.plotWeightScaler(this.scatter.rows[x].obj[prop2]);
            // console.log(height)
            // console.log(weight)

            let theColor = x % colorPalette.length;
            fill(colorPalette[theColor]);
            ellipse(height, -weight,5)

            // console.log(x)
            pop();
        }
        
     
    }

    // draws marks on v-axis and y-axis
    chartMarkers(){
        for(let x = 0; x <= this.markers ;x++){
            strokeWeight(2);
            line(this.markerSize, x*-this.markerGap, 0, x*-this.markerGap);
            line(x*this.markerGap, -this.markerSize,x*this.markerGap,0);
          
    }
}

    // draws labels on the y-axis
    chartLabels(){
        for(let x = 0; x <= this.markers ;x++){
            // let labelValues = this.highestWeight()/this.markers;
            let intervalsWeight = [90, 100, 110, 120, 130, 140, 150, 160]
            noStroke();
            fill(255);
            textSize(14);
            textAlign(RIGHT, CENTER)
            text(intervalsWeight[x], -10, x*-this.markerGap);
        }
    }

    // draws labels on the x-axis
    xChartLabels(){

        for(let x = 0; x <= this.markers ;x++){
            // let labelValues = this.highestHeight()/this.markers;
            let intervalsHeight = [62, 64, 66, 68, 70, 72, 74, 76]
            noStroke();
            fill(255);
            textSize(14);
            textAlign(CENTER)
            text(intervalsHeight[x], x*this.markerGap, 15);
        }
    }

    // draws labels for the x-axis
    xAxisNames(){
        let xAxisLabels = scatter.getColumn(this.xName);
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
        fill(255);
        textAlign(CENTER);
        textStyle(BOLD);
        text("height and weight scatter plot".toUpperCase(), this.width/2, titleMargin);
    }

}