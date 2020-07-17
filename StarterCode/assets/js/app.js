// function makeResponsive() {
//     var svgArea = d3.select("#scatter").select("svg");

//     if(!svgArea.empty()) {
//         svgArea.remove();
//     }

//     svgHeight = 500;
//     svgWidth = 960;

//     var margins = {
//         top: 20,
//         right: 40,
//         bottom: 60,
//         left: 100
//     };

//     //chart area minus margins
//     var chartHeight = svgHeight - margins.top - margins.bottom;
//     var chartWidth = svgWidth - margins.left - margins.right;

//     //append svg
//     var svg = d3.select("#scatter").append("svg").attr("height", svgHeight).attr("width", svgWidth);

//     //append chart group
//     var chartGroup = svg.append("g")
//         .attr("transform", `translate(${margins.left}, ${margins.top})`);
    
//     d3.csv("assets/data/data.csv").then(function(newsData) {
//         console.log(newsData);

//         newsData.forEach(function(d) {
//             d.age = +d.age;
//             d.smokes = +d.smokes;
//         });

//         console.log(newsData);

//         //create xscale
//         var xScale = d3.scaleLinear()
//             .domain([d3.min(newsData, d => d.age), d3.max(newsData, d => d.age)])
//             .range([0, chartWidth]);

//         //create yscale
//         var yScale = d3.scaleLinear()
//             .domain([d3.min(newsData, d=> d.smokes), d3.max(newsData, d=> d.smokes)])
//             .range([chartHeight, 0]);

//         //create Axes
//         var yAxis = d3.axisLeft(yScale);
//         var xAxis = d3.axisBottom(xScale);

//         //set x to the bottom of the chart
//         chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`)
//             .call(xAxis);
            
//         //set y to the y axis
//         chartGroup.append("g").call(yAxis);

//         var circlesGroup = chartGroup.selectAll("circle")
//             .data(newsData)
//             .enter()
//             .append("circle")
//             .attr("cx", d => xScale(d.age))
//             .attr("cy", d => yScale(d.smoke))
//             .attr("r", 10)
//             .attr("fill", "red")
//             .attr("opacity", ".5")


//         var toolTip = d3.tip()
//         .attr("class", "tooltip")
//         .offset([80, -60])
//         .html(function(d) {
//             return (`${d.abbr}<br>Age: ${d.age}<br>Smoke: ${d.smokes}`);
//         });
      
//         chartGroup.call(toolTip);

//         circlesGroup.on("click", function(data) {
//             toolTip.show(data, this);
//           })
//             // onmouseout event
//             .on("mouseout", function(data, index) {
//               toolTip.hide(data);
//             });

//         // Create axes labels
//         chartGroup.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 0 - margin.left + 40)
//         .attr("x", 0 - (height / 2))
//         .attr("dy", "1em")
//         .attr("class", "axisText")
//         .text("Number of Billboard 100 Hits");

//         chartGroup.append("text")
//             .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//             .attr("class", "axisText")
//             .text("Hair Metal Band Hair Length (inches)");
//     }).catch(function(error) {
//         console.log(error);
//     });
// }

// makeResponsive();

// d3.select(window).on("resize", makeResponsive);

svgHeight = 500;
svgWidth = 960;

var margins = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

//chart area minus margins
var chartHeight = svgHeight - margins.top - margins.bottom;
var chartWidth = svgWidth - margins.left - margins.right;

//append svg
var svg = d3.select("#scatter").append("svg").attr("height", svgHeight).attr("width", svgWidth);

//append chart group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margins.left}, ${margins.top})`);

d3.csv("assets/data/data.csv").then(function(newsData) {
    console.log(newsData);

    newsData.forEach(function(d) {
        d.age = +d.age;
        d.smokes = +d.smokes;
    });

    console.log(newsData);

    //create xscale
    var xScale = d3.scaleLinear()
        .domain([d3.min(newsData, d => d.age), d3.max(newsData, d => d.age)])
        .range([0, chartWidth]);

    //create yscale
    var yScale = d3.scaleLinear()
        .domain([d3.min(newsData, d=> d.smokes), d3.max(newsData, d=> d.smokes)])
        .range([chartHeight, 0]);

    //create Axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    //set x to the bottom of the chart
    chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);
        
    //set y to the y axis
    chartGroup.append("g").call(yAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(newsData)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.age))
        .attr("cy", d => yScale(d.smokes))
        .attr("r", 10)
        .attr("fill", "red")
        .attr("opacity", ".5")


    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
        return (`${d.abbr}<br>Age: ${d.age}<br>Smoke: ${d.smokes}`);
    });
    
    chartGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
        })
        // onmouseout event
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });

    // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margins.left + 40)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("% Of Smokers");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margins.top + 30})`)
        .attr("class", "axisText")
        .text("Average Age");
}).catch(function(error) {
    console.log(error);
});

