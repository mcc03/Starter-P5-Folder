class BarChart{
    // defines properties in object
    constructor(_height,_width,_posX,_posY,_data, _bars, _barGap, _markerSize){
        // this object height
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.bars = _bars;
        this.barGap = _barGap;
        this.markerSize = _markerSize
        this.bars = fruits.length;

        this.markers = fruits.length;
        this.leftMargin = 10;
        this.rightMargin = 10;

        // gap between markers
        this.markerGap = this.height/this.markers;

        // calculates bar width
        this.barWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.bars - 1)* this.barGap))/this.bars;

        // calculates bar spacing
        this.barSpacing = this.barWidth+this.barGap;

        // gets highest value from arrayName
        this.highestValue = Math.max(...fruits);

        // gap between labels
        this.LabelGap = this.height/this.markers;

        console.log("highest value is:", this.highestValue);
    }

    // calculates how to scale bars based off the highest value
    barScaler(_scalingNum){
        for(let x = 0; x < fruits.length; x++){
            let scaleValue = this.height/this.highestValue
            return _scalingNum*scaleValue;
        }
        
    }

    // draws the functions when called
    render(){
        push();
        translate(this.posX, this.posY);
        this.Vaxis();
        this.Haxis();
        this.barChart();
        this.chartMarkers();
        this.chartLabels();
        pop();
    }

    // draws vertical axis
    Vaxis(){
        noFill();
        stroke(0)
        line(0,0,0,-this.height)
    }

    // draw horizontal axis
    Haxis(){
        noFill();
        stroke(0)
        line(0,0,this.width,0)
    }

    // draws bars
    barChart(){
        for(let x = 0; x < fruits.length; x++){
            push();
            translate(this.leftMargin + (x*this.barSpacing), 0)
            translate(10, 0);
            fill(255);
            rect(0, 0,this.barWidth,this.barScaler(-fruits[x]));
            pop();
        }
    }

    // draws marks on Vaxis
    chartMarkers(){
        for(let x = 0; x <= this.markers ;x++){
            line(this.markerSize, x*-this.markerGap, 0, x*-this.markerGap)
            noStroke;
    }
}

    // draws labels on the vertical axis
    chartLabels(){
        for(let x = 0; x <= this.markers ;x++){
            noStroke;
            fill(255);
            textAlign(LEFT, CENTER)
            text(fruits[x], -40, x*-this.LabelGap);
    }
}

}

