class StackedHbar{
    // defines properties in object
    constructor({
        _height=400,
        _width=300,
        _posX=650,
        _posY=580,
        _yName="Need a name",
        _barGap=5,
        _markers=5, 
        _markerSize=-5, 
        _hGridLines=0, 
        _vGridLines=5, 
        _chartValue,
        _data       
    }){

        // this object height
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.barGap = _barGap;
        this.markerSize = _markerSize;
        this.markers = _markers;
        this.topMargin = 10;
        this.bottomMargin = 10;
        this.hGridLines = _hGridLines;
        this.vGridLines = _vGridLines;
        this.chartValue = _chartValue;
        this.yName = _yName;

    // gap between markers
    this.markerGap = this.height/this.markers;

    // calculates bar width
    this.barWidth = (this.width - (this.topMargin + this.bottomMargin) - ((this.data.getRowCount() - 1)* this.barGap))/this.data.getRowCount();

    // calculates bar spacing
    this.barSpacing = this.barWidth+this.barGap;

    console.log("highest value is stacked Hbar:", this.highestValue());
    console.log("barWidth:", this.barWidth);
}

    sort(a, b){

    }

    highestValue(){
        let maxValue = 0;
        for(let x=0; x < this.data.getRowCount(); x++){
            
            if (int(data.rows[x].obj.TOTALS_STACKED) > maxValue){
                maxValue = int(data.rows[x].obj.TOTALS_STACKED);
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

    // renders the functions
    render(){
        push();
        translate(this.posX, this.posY);
        this.hGrid();
        this.vGrid();
        this.sidewaysBarChart();
        this.vAxis();
        this.hAxis();
        this.chartMarkers();
        this.chartLabels();
        this.barLabels();
        this.yAxisNames();
        this.chartTitle();
        pop();
    }

    // draws bar chart
    sidewaysBarChart(){

        // let numbers = [];
       
        // for(let x = 0; x < this.bars; x++){
        // // let numbers = [this.data.rows[x].obj.VALUE_F];
        
        //     numbers.push(int(this.data.rows[x].obj.VALUE_F))
        // }
        // // console.log(numbers);
       
        // numbers.sort(function(a, b){
        //    return a-b;
            
        // });
        // console.log(numbers);
        let barCount = this.data.getRowCount();

        for(let x = 0; x < barCount; x++){
            push();
            
            translate(0, this.topMargin + (x*this.barSpacing));

            push();
            for(let y = 0; y < this.chartValue.length; y++){
                let theColor = y % colors.length;
                fill(colors[theColor]);
                let height = -this.barScaler(int(-this.data.rows[x].obj[this.chartValue[y]]));
                noStroke()
                rect(0, 0, height, this.barWidth);
                noFill();
                stroke(240);
                line(0,0,0,this.barWidth);
                translate(height, 0);
            }
            pop();
            pop();

        }
    }

    // draws vertical axis
    vAxis(){
        noFill();
        strokeWeight(1);
        stroke(0);
        line(0,0,0,this.width)
    }

    // draw horizontal axis
    hAxis(){
        noFill();
        strokeWeight(1);
        stroke(0);
        line(0,this.width,this.height,this.width)
    }

    // draws marks on Vaxis
    chartMarkers(){
        for(let x = 0; x <= this.markers ;x++){
            strokeWeight(2);
            line(x*this.markerGap, this.width, x*this.markerGap, this.width-this.markerSize)
        }
    }

    // draws labels on the horizontal axis
    chartLabels(){
        for(let x = 0; x <= this.markers ;x++){
            let labelValues = this.highestValue()/this.markers;
            push();
            translate(x*this.markerGap, this.width);
            noStroke();
            fill(0);
            textSize(14);
            textAlign(LEFT, CENTER);
            rotate(30);
            text(int(labelValues*x).toFixed(2), 5, 15);
            pop();
        }
    }

    // draws bar labels(values)
    barLabels(){
        textSize(16);
        noStroke();
        textAlign(CENTER);

        fill(0);
            for(let x=0; x < this.data.getRowCount(); x++){
                let prop = "TOTALS_STACKED"

                push();
                translate(0, this.topMargin + (x*this.barSpacing))
                textStyle(BOLD);
                textAlign(LEFT, CENTER);
                let height = -this.barScaler(int(-this.data.rows[x].obj[prop]));
                text(this.data.rows[x].obj[prop], height+5, this.barWidth/2);
                pop();
            }
        }

    // draws labels for the x-axis
    yAxisNames(){
        // finds column
        let yAxisLabels = data.getColumn(this.yName);
        for(let x = 0; x < this.data.getRowCount(); x++){
            push();
            translate(0, this.topMargin + (x*this.barSpacing))
            textStyle(NORMAL);
            textAlign(RIGHT, CENTER);
            let labelName = yAxisLabels[x] 
            text(labelName, -5, this.barWidth/2);
            pop();
        }
    }

     // draw horizontal grid lines
    hGrid(){
        // if(this.gridCount == true){
            for(let x = 1; x <= this.hGridLines ;x++){
                stroke(150, 70);
                strokeWeight(2);
                line(this.markerSize, x*this.markerGap, this.height, x*this.markerGap)
            }
        // }   
    }
    
     // draw vertical grid lines
    vGrid(){
        // if(this.gridCount == true){
            for(let x = 1; x <= this.vGridLines ;x++){
                stroke(150, 70);
                strokeWeight(2);
                line(x*this.height/this.vGridLines, this.width, x*this.height/this.vGridLines, 0)
            }
        // }   
    }

    // draws chart title
    chartTitle(){
        let titleMargin = -10;
        textAlign(CENTER);
        textStyle(BOLD);
        text("travel time of pop. aged 15 or older at work (female)".toUpperCase(), this.height/2, titleMargin);
    }
}


