



//Court dimensions in pixels


// const WIDTH = 1125;
// const HEIGHT = 598;

//scaling svg to data

const xScale = d3.scaleLinear().domain([-47, 47]).range([0, 1125])
const yScale = d3.scaleLinear().domain([-25, 25]).range([598, 0])

const playerNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
const document = await d3.xml("courtFinal.xml");
const court = document.documentElement



const svg = d3.select(".court")
                .append("svg")
                .attr("width", 1125)
                .attr("height", 598);
            

                
const background = svg.node().append(court);


   

   d3.select("body").selectAll("h2")
     .data(playerNames)
     .enter()
     .append("h2")
     .text("Players");


svg.append("circle")  
    .attr("r", 20)                     
    .attr("cx", xScale(0))
    .attr("cy", (d) => d * 20)
    .attr("fill", "blue")
const circles = svg.selectAll("circle")
   .data(playerNames)
   .enter()
   .append("circle")  
   .attr("r", 20)                     
   .attr("cx", (d, i) => i * 50)
   .attr("cy", (d) => d * 20)
   .attr("fill", "white")
                



















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
                

        




