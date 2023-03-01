class BarChart{
    // defines properties in object
    constructor(_height,_width,_posX,_posY,_data, _bars, _barGap, _markers, _markerSize, _hGridLines, _vGridLines){
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
        this.hGridLines = _hGridLines;
        this.vGridLines = _vGridLines;
        // this.gridCount = _gridCount;

        // gap between markers
        this.markerGap = this.height/this.markers;

        // calculates bar width
        this.barWidth = (this.width - (this.leftMargin + this.rightMargin) - ((this.bars - 1)* this.barGap))/this.bars;

        // calculates bar spacing
        this.barSpacing = this.barWidth+this.barGap;

        // gets highest value from arrayName
        // this.highestValue = Math.max(...fruits.map(object => object.sales));
        this.highestValue = int(this.data.rows[0].obj.VALUE_M);

        for(let x=0; x<this.bars -1; x++){
            if(int(this.data.rows[x].obj.VALUE_M) > this.highestValue){
                this.highestValue = int(this.data.rows[x].obj.VALUE_M);
            }
        }

        // for(let x = 0; x<this.bars;x++){
        //     this.masterBarGap = (x * this.barWidth) + (x * this.barGap) + this.leftMargin;
        // }

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
        this.barLabels();
        this.xAxisNames();
        this.chartTitle();
        this.legend();

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

    // draws bars
    barChart(){
        for(let x = 0; x < this.bars; x++){

                push();
                translate(this.leftMargin + (x*this.barSpacing), 0)
                let theColor = x % colors.length;
                fill(colors[theColor]);
                let prop = 'VALUE_M';
                let height = this.barScaler(int(-this.data.rows[x].obj[prop]));
                
                // console.log(this.data.getRowCount())
               
                let prop2 = 'VALUE_F';
                let height2 = this.barScaler(int(-this.data.rows[x].obj[prop2]));
                // console.log(height)
                noStroke()
                rect(0, 0,this.barWidth, height);
                // rect(0, 0,this.barWidth, height2);

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

// let num = 2701
// for(let x = num; x %(mod) 7 ==0; x++){
// roundMaxNum = x; 
// }

    // draws labels on the vertical axis
    chartLabels(){

        for(let x = 0; x <= this.markers ;x++){
            noStroke();
            fill(0);
            textSize(14);
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
        textStyle(BOLD);
        textAlign(CENTER)
        let prop = "VALUE_M";
        fill(0);
            for(let x=0; x < this.bars; x++){
                push();
                this.masterBarGap = (x * this.barWidth) + (x * this.barGap) + this.leftMargin;
                translate(this.masterBarGap + this.barWidth / 2, 0)
                text(this.data.rows[x].obj[prop], 0, this.barScaler(-this.data.rows[x].obj[prop])-10);
                pop();
            }
    }

    // draws labels for the x-axis
    xAxisNames(){
        for(let x = 0; x < this.bars; x++){
            push();
            this.masterBarGap = (x * this.barWidth) + (x * this.barGap) + this.leftMargin;
            translate(this.masterBarGap + this.barWidth / 2, 10)
            textStyle(NORMAL);
            textAlign(LEFT);
            rotate(90); 
            let prop = "County_of_residence"
            text(this.data.rows[x].obj[prop], 0, 0);
            pop();
        }
    }
    
    // draws chart title
    chartTitle(){
        let titleMargin = (this.height*-1)-40
        textAlign(CENTER);
        textStyle(BOLD);
        text("travel time of pop. aged 15 or older at work (male)".toUpperCase(), this.width/2, titleMargin);
    }

    // draws legends
    legend(){
        for(let x = 1; x <= 3; x++){
            textAlign(LEFT);
            textStyle(BOLD);
            // text(data.columns[x].toUpperCase(), this.width, -this.height+(x*-20));
            rect(this.width/2, -this.height+(x*-20), 0, -this.height+(x*-20));
        }

    }

}

// let num = 2701
// for(let x = num; x %(mod) 7 ==0; x++){
// roundMaxNum = x; 
// }

// stacked barchart has nested for loop