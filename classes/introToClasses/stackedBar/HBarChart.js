class HBarChart{
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
        this.topMargin = 10;
        this.bottomMargin = 10;
        this.hGridLines = _hGridLines;
        this.vGridLines = _vGridLines;
    

    // gap between markers
    this.markerGap = this.height/this.markers;

    // calculates bar width
    this.barWidth = (this.width - (this.topMargin + this.bottomMargin) - ((this.bars - 1)* this.barGap))/this.bars;

    // calculates bar spacing
    this.barSpacing = this.barWidth+this.barGap;

    // gets highest value from arrayName
    // this.highestValue = Math.max(...fruits.map(object => object.sales));
    this.highestValue = int(this.data.rows[0].obj.VALUE_F);

    for(let x=0; x<this.bars -1; x++){
        if(int(this.data.rows[x].obj.VALUE_F) > this.highestValue){
            this.highestValue = int(this.data.rows[x].obj.VALUE_F);
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

    sort(a, b){

    }

    // calculates how to scale bars based off the highest value
    barScaler(_scalingNum){
        for(let x = 0; x < this.bars; x++){
            let scaleValue = this.height/this.highestValue
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

        let numbers = [];
       
        for(let x = 0; x < this.bars; x++){
        // let numbers = [this.data.rows[x].obj.VALUE_F];
        
            numbers.push(int(this.data.rows[x].obj.VALUE_F))
        }
        // console.log(numbers);
       
        numbers.sort(function(a, b){
           return a-b;
            
        });
        // console.log(numbers);

        for(let x = 0; x < this.bars; x++){
            push();
            translate(0, this.topMargin + (x*this.barSpacing))
            let theColor = x % colors.length;
            fill(colors[theColor]);
            let prop = "VALUE_F";
            let height = -this.barScaler(int(-this.data.rows[x].obj[prop]));
            noStroke()
            rect(0, 0, height, this.barWidth);
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

            push();
            translate(x*this.markerGap, this.width);
            noStroke();
            fill(0);
            textSize(14);
            textAlign(LEFT, CENTER);
            rotate(30);
            text(int(x*this.LabelGap).toFixed(2), 5, 15);
            pop();
        }
    }

    // draws bar labels(values)
    barLabels(){
        textSize(16);
        noStroke();
        textAlign(CENTER);
        let prop = "VALUE_F";
        
        fill(0);
            for(let x=0; x < this.bars; x++){
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
        for(let x = 0; x < this.bars; x++){
            push();
            translate(0, this.topMargin + (x*this.barSpacing))
            textStyle(NORMAL);
            textAlign(RIGHT, CENTER); 
            text(this.data.rows[x].obj.County_of_residence, -5, this.barWidth/2);
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


