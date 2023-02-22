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
        for(let x = 0; x < this.bars; x++){
            let scaleValue = this.height/this.highestValue
            return _scalingNum*scaleValue;
        }
    }

    // draws the functions when called
    render(){
        push();
        translate(this.posX, this.posY);

        this.barChart();
        this.vAxis();
        this.hAxis();
        this.chartMarkers();
        this.chartLabels();
        this.hGrid();
        this.vGrid();
        this.barLabels();
        // this.chartHorLabel();
        pop();
    }

    // draws vertical axis
    vAxis(){
        noFill();
        strokeWeight(1);
        stroke(0);
        line(0,0,0,-this.height)
    }

    // draw horizontal axis
    hAxis(){
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
        for(let x = 0; x < this.bars; x++){

                push();
                translate(this.leftMargin + (x*this.barSpacing), 0)
                let theColor = x % colors.length;
                fill(colors[theColor]);
                let prop = "total";
                // let height = this.barScaler(int(-this.data.rows[x].obj[prop]));
                noStroke()
                rect(0, 0,this.barWidth,this.barScaler(int(-this.data.rows[x].obj[prop])));
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
            text(int(x*this.LabelGap).toFixed(2), -55, x*-this.markerGap);
        }
    }

    // placement of number above bar
    /* VERTICAL SPACING: Here I want to loop through the array of objects, getting the value of sales from each object 
    + x amount of spacing to appear above the bar. I also use the scaler function to scale the values to match the bars*/
    // HORIZONTAL SPACING: Here I want to space them horizontally to line up above the corresponding bar 
    barLabels(){
        textSize(16);
        noStroke();
        textAlign(CENTER)
        let prop = "total";
        fill(0);
            for(let x=0; x<this.bars; x++){
                text(this.data.rows[x].obj[prop], this.barWidth+this.barSpacing*[x], this.barScaler(-this.data.rows[x].obj[prop])-10);
            }
    }

    
    // chartHorLabel(){
    //     for(let x = 0; x < this.bars; x++){
    //         push(); 
    //         translate(0, 10) 
    //         rotate(PI / 2); 
    //         textAlign(LEFT, CENTER); 
    //         text(fruits[x].name, this.barWidth+this.barSpacing*[x]-this.leftMargin, 10);
    //         pop();
    //     }

    // }
}

// let num = 2701
// for(let x = num; x %(mod) 7 ==0; x++){
// roundMaxNum = x; 
// }

// stacked barchart has nested for loop