class StackedBar{
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
        // this.highestValue = Math.max(...fruits.map(object => object.sales));
        this.highestValue = int(this.data.rows[0].obj.total);

        for(let x=0; x<this.bars -1; x++){
            if(int(this.data.rows[x].obj.total) > this.highestValue){
                this.highestValue = int(this.data.rows[x].obj.total);
            }
        }

        // gap between labels
        this.LabelGap = this.highestValue/this.markers;

        console.log("highest value is:", this.highestValue)
        console.log("barWidth:", this.barWidth);
    }

    // calculates how to scale bars based off the highest value
    barScaler(_scalingNum){
            let scaleValue = this.height/this.highestValue
            return _scalingNum*scaleValue;
    }

    // draws the functions when called
    render(){
        push();
        translate(this.posX, this.posY);
       
        this.stackedChart();
        this.chartMarkers();
        this.chartLabels();
        this.hGrid();
        this.vGrid();
        this.barLabels();
        this.Vaxis();
        this.Haxis();
        this.xAxisNames();
        this.chartTitle();
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
                stroke(255, 5);
                strokeWeight(2);
                line(this.markerSize, x*-this.markerGap, this.width, x*-this.markerGap)
            }
        // }   
    }
    
     // draw horizontal grid lines
    vGrid(){
        // if(this.gridCount == true){
            for(let x = 0; x <= this.numHgrid ;x++){
                stroke(255, 5);
                strokeWeight(2);
                line(x*this.width/this.numHgrid, -this.height, x*this.width/this.numHgrid, 0)
            }
        // }   
    }

    // draws bars
    stackedChart(){
        
        for(let x = 0; x < this.bars; x++){
            push();
            translate(this.leftMargin + (x*this.barSpacing), 0)
            
            push();
            for(let y =0; y < userSelect.length; y++){

                let theColor = y % colors.length;
                fill(colors[theColor]);
                let prop = userSelect[y];
                let height = this.barScaler(int(-this.data.rows[x].obj[prop]));
                noStroke()
                rect(0, 0,this.barWidth,height)
                noFill()
                stroke(240)
                line(0,0,this.barWidth,0)
                translate(0, height);
            }
            pop();
            pop();
        }
        
    }

    // draws marks on Vaxis
    chartMarkers(){
        for(let x = 0; x <= this.markers ;x++){
            stroke(15)
            strokeWeight(1);
            line(this.markerSize, x*-this.markerGap, 0, x*-this.markerGap)
    }
}

    // draws labels on the vertical axis
    chartLabels(){
        for(let x = 0; x <= this.markers ;x++){
            noStroke();
            fill(0);
            textSize(11)
            textAlign(RIGHT, CENTER)
            text(int(x*this.LabelGap).toFixed(2), -10, x*-this.markerGap);
        }
    }

    // placement of number above bar
    /* VERTICAL SPACING: Here I want to loop through the array of objects, getting the value of sales from each object 
    + x amount of spacing to appear above the bar. I also use the scaler function to scale the values to match the bars*/
    // HORIZONTAL SPACING: Here I want to space them horizontally to line up above the corresponding bar 
    barLabels(){
        textSize(16);
        noStroke();
        textAlign(LEFT, CENTER)
        let prop = "total";
        fill(0);
            for(let x=0; x<this.bars; x++){
                push();
                translate(this.leftMargin + (x*this.barSpacing), 0);
                text(this.data.rows[x].obj[prop], 0, this.barScaler(-this.data.rows[x].obj[prop])-10);
                pop();
            }
    }

    xAxisNames(){
        for(let x = 0; x < this.bars; x++){
            push();
            translate(this.barGap + (x*this.barSpacing), 0)
            textAlign(LEFT); 
            text(this.data.rows[x].obj.month, 0, 10);
            pop();
        }
    }

    chartTitle(){
        let titleMargin = (this.height*-1)-40
        textAlign(CENTER);
        textStyle(BOLD);
        text("stacked bar chart".toUpperCase(), this.width/2, titleMargin);
    }

}

// let num = 2701
// for(let x = num; x %(mod) 7 ==0; x++){
// roundMaxNum = x; 
// }

// stacked barchart has nested for loop