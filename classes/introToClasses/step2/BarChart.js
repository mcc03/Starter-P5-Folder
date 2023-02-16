class BarChart{
    // defines properties in object
    constructor(_height,_width,_posX,_posY,_data, _bars, _barGap, _markers, _markerSize, _numHgrid){
        // this object height
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.bars = _bars;
        this.barGap = _barGap;
        this.markerSize = _markerSize
        this.markers = _markers;
        this.bars = fruits.length;
        this.leftMargin = 10;
        this.rightMargin = 10;
        this.numHgrid = _numHgrid
        // this.gridCount = _gridCount;

        // gap between markers
        this.markerGap = this.height/this.markers;

        // calculates bar width
        this.barWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.bars - 1)* this.barGap))/this.bars;

        // calculates bar spacing
        this.barSpacing = this.barWidth+this.barGap;

        // gets highest value from arrayName
        this.highestValue = Math.max(...fruits.map(object => object.sales));

        // gap between labels
        this.LabelGap = this.highestValue/this.markers;

        console.log("highest value is:", this.highestValue)
        console.log("barWidth:", this.barWidth);
    }

    // calculates how to scale bars based off the highest value
    barScaler(_scalingNum){
        for(let x = 0; x < fruits.length; x++){
            let scaleValue = this.height/this.highestValue
            return _scalingNum*scaleValue;
        }
    }

    // colour scaler
    // colourScaler(_scalingNum){
    //     for(let x = 0; x < fruits.length; x++){
    //         let scaleValue = this.highestValue/x
    //         return _scalingNum*scaleValue;
    //     }
    // }

    // draws the functions when called
    render(){
        push();
        translate(this.posX, this.posY);
        this.Vaxis();
        this.Haxis();
        this.barChart();
        this.chartMarkers();
        this.chartLabels();
        this.hGrid();
        this.vGrid();
        this.barLabels();
        pop();
    }

    // draws vertical axis
    Vaxis(){
        noFill();
        strokeWeight(1);
        stroke(0);
        line(0,0,0,-this.height)
    }

    // draw horizontal axis
    Haxis(){
        noFill();
        strokeWeight(1);
        stroke(0);
        line(0,0,this.width,0)
    }

    // draw horizontal grid lines
    hGrid(){
        // if(this.gridCount == true){
            for(let x = 0; x <= this.markers ;x++){
                stroke(150, 5);
                strokeWeight(2);
                line(this.markerSize, x*-this.markerGap, this.width, x*-this.markerGap)
            }
        // }   
    }
    
     // draw horizontal grid lines
    vGrid(){
        // if(this.gridCount == true){
            for(let x = 0; x <= this.numHgrid ;x++){
                stroke(150, 5);
                strokeWeight(2);
                line(x*this.width/this.numHgrid, -this.height, x*this.width/this.numHgrid, 0)
            }
        // }   
    }

    // draws bars
    barChart(){
        for(let x = 0; x < fruits.length; x++){
            push();
            translate(this.leftMargin + (x*this.barSpacing), 0)
            translate(10, 0);
            fill(60, fruits[x].sales/5, 180);
            rect(0, 0,this.barWidth,this.barScaler(-fruits[x].sales));
            pop();
        }
    }

    // draws marks on Vaxis
    chartMarkers(){
        for(let x = 0; x <= this.markers ;x++){
            strokeWeight(2);
            line(this.markerSize, x*-this.markerGap, 0, x*-this.markerGap)
    }
}

    // draws labels on the vertical axis
    chartLabels(){
        for(let x = 0; x <= this.markers ;x++){
            noStroke();
            fill(0);
            textAlign(LEFT, CENTER)
            text(int(x*this.LabelGap).toFixed(2), -45, x*-this.markerGap);
        }
    }

    // placement of number above bar
    /* VERTICAL SPACING: Here I want to loop through the array of objects, getting the value of sales from each object 
    + x amount of spacing to appear above the bar. I also use the scaler function to scale the values to match the bars*/
    // HORIZONTAL SPACING: Here I want to space them horizontally to line up above the corresponding bar 
    barLabels(){
        let labelSpacing = 10;
        let labelBar = 400/fruits.length;
        textSize(16);
        noStroke();
        fill(0);
            for(let x=0; x<fruits.length; x++){
                text(fruits[x].sales, (x*labelBar)+this.barWidth/2, this.barScaler(-fruits[x].sales)-labelSpacing);
            }

    }

}

// next week: [grid lines], [nice labels], colours