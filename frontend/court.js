



//Court dimensions in pixels


// const WIDTH = 1125;
// const HEIGHT = 598;

//scaling svg to data

const xScale = d3.scaleLinear().domain([-47, 47]).range([0, 1125])
const yScale = d3.scaleLinear().domain([-25, 25]).range([598, 0])

const sampleData = [{"type": "home", 
                     "number": 13, 
                     "color": "blue",
                     "coords": [[1.92,-1.08], [1.92,-1.08], [1.92,-1.11], 
                     [1.92,-1.13],[1.92,-1.16], [1.92,-1.19], [1.92,-1.22], [1.92,-1.25], [1.92,-1.28], [1.91,-1.31]]},

                     {"type": "home", 
                     "number": 17, 
                     "color": "red",
                     "coords": [[22.75,0.42], [22.69,0.42], [22.59,0.41], [22.47,0.4], [22.34,0.38], [22.21,0.36], 
                     [22.08,0.34], [21.95,0.33], [21.81,0.31], [21.67,0.3]]
                     }
]


// const sampleData = [{"type": "home", 
//                      "number": 13, 
//                      "color": "green",
//                      "coords":  [1.92,-1]},

//                      {"type": "home", 
//                      "number": 17, 
//                      "color": "red",
//                      "coords": [22.75,0.42]
//                      },

//                      {"type": "home", 
//                      "number": 15, 
//                      "color": "blue",
//                      "coords":  [1.92,-1.16]},
//]

const playerNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
const document = await d3.xml("courtFinal.xml");
const court = document.documentElement


const playerDocument = await d3.xml("player.xml");
const player = playerDocument.documentElement



const svg = d3.select(".court")
                .append("svg")
                .attr("width", 1125)
                .attr("height", 598);
            

                
const background = svg.node().append(court);


   d3.select(".info").selectAll("h2")
     .data(sampleData)
     .join("h2")
     .append("h2")
     .text((d) => "Player #" + d.number);
     console.log(sampleData)


// svg.append("circle")  
//     .attr("r", 20)                     
//     .attr("cx", xScale(0))
//     .attr("cy", yScale(0))
//     .attr("fill", (d) => d.color)

// svg.node().append(player)

// const testCircle = d3.create("circle")

// const circles = svg.selectAll(playet)
//    .data(sampleData)
//    .join()
//    .attr("r", 20)                     
//    .attr("cx", (d) => xScale(d.coords[0]))
//    .attr("cy", (d) => xScale(d.coords[1]))
//    .attr("fill", (d) => d.color);

const circleGroup = svg.append("g");

const circles = circleGroup.selectAll("circle")
                           .data(sampleData)
                           .join(enter => enter.append("circle")
                           .attr("r", 10)                     
                           .attr("cx", (d) => xScale(d.coords[0][0]))
                           .attr("cy", (d) => yScale(d.coords[0][1]))
                           .attr("fill", (d) => d.color)
                           .attr("opacity", 0.5));
                           
                           

circles.transition()
.duration(750)
.attr("cx", function(d) {
    return xScale(d.coords[0][0]); // Assuming xScale is a valid scale function
})
.attr("cy", function(d) {
    return yScale(d.coords[0][1]); // Assuming yScale is a valid scale function
})
.each(function(d) {
    const circle = d3.select(this);
    const coords = d.coords;
    
    for (let i = 0; i < coords.length; i++) {
    circle.transition() // Delay each transition by i*2000 milliseconds
        .duration(2000)
        .attr("cx", xScale(coords[i][0]))
        .attr("cy", yScale(coords[i][1]));
        console.log(i)
        console.log(coords[i][0])
        console.log(coords[i][1])

    }
});
// circles.transition()
//        .duration(2000)
//        .attr("cx", function(d){
//             for (let i=0; i<d.coords.length; i++){
//             console.log(d.coords[i][0])
//             return xScale(d.coords[i][0]);}})
//        .attr("cy", function(d){
//             for (let i=0; i<d.coords.length; i++){
//             console.log("moving")
//             console.log(d.coords[i][1])
//             return yScale(d.coords[i][1]);}});                         


// circles.transition()
//        .duration(750)
//        .attr("cx", 30)
//        .attr("cy", 30);                         

// circles.transition()
//        .duration(750)
//        .data(sampleData)
//        .attr("cx", (d) =>()
           
               
//            );
           
//        })
                           
   
function transitionCircle(){
    var update = circleGroup.selectAll("circle")
                            .data(sampleData)
                            .transition()
                            .duration(2000)
                            .attr("cx", function(d){
                                for (let i=0; i<d.coords.length; i++){
                                    return d.coords[i][0];
                                }
                            })
                            .attr("cy", function(d){
                                for (let i=0; i<d.coords.length; i++){
                                    return d.coords[i][1];
                                }
                            })
                            
                            ;

}



                



















// const svg = d3.xml("courtFinal.xml")
//                 .then(data => {
//                     d3.select(".court").node().append(data.documentElement)
        
//                 });


// const svg = d3.xml("courtFinal.xml", function(error, data) {


//     if (error) throw error;
//     console.log(data);
//     });

// const document = await d3.xml("courtFinal.xml");
// const court = document.documentElement
// const svg = d3.select(".court").create("svg")
// .attr("width", 975)
// .attr("height", 610)
// .attr("viewBox", [0, 0, 975, 610])
// .attr("style", "width: 100%; height: auto; height: intrinsic;");

// svg.append("circle").selectAll().join("circle").attr("fill", "red");

// d3.select(".court")
//   .append("li")
//   .text("Very important item");

// svg.append(court);



// d3.xml("courtFinal.xml").then(svgData => {
//     // Extract the root SVG element
//     const svgNode = svgData.documentElement;
//     // Convert the XML node to a D3 selection
//     const svg = d3.select(".court").node().append(svgNode);
//     console.log("adding xml")
// });










// const players = d3.selectAll(".court")
//                 .append("players")

//             players.append("circle")
//                 .attr("fill", "red")
//                 .attr("r", 300);

// const svg = d3.selectAll(".court")
//             .append("svg")
//             .attr("width", WIDTH)
//             .attr("height", HEIGHT)
//             .attr("color", "red");

//     svg.append("rect")
//             .attr("color", "beige")
//             .attr("fill", "tan")
//             .attr("width", WIDTH)
//             .attr("height", HEIGHT);
//     svg.append("arc")
//         .attr("color", "black")

// d3.xml("courtFinal.xml", function(xml) {
//   d3.select(".court").node.appendChild(xml.documentElement);

//   var circle = d3.select(".court").append("circle")
//             .attr("cx", 100)
//             .attr("cy", 100)
//             .attr("r", 20)
//             .style("fill", "red");
// });
                

        




