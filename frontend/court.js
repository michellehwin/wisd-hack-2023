

//import { sampleData } from "/Users/jennifertran/Desktop/hack/wisd-hack-2023/frontend/data/0042100301_p1.js";

//import { sampleData } from "./data/0042100301_p1";


//Court dimensions in pixels


const WIDTH = 1125;
const HEIGHT = 598;

//scaling svg to data

const xScale = d3.scaleLinear().domain([-47, 47]).range([0, 1125])
const yScale = d3.scaleLinear().domain([-25, 25]).range([598, 0])


const sampleData = [{"type": "home", 
                     "number": 13, 
                     "color": "blue",
                     "coords": [[-37.65, -6.72, 0],[-37.65, -6.72, 0], [-37.93, -12.95, 0], [-38.56, -12.18, 0], 
                     [-38.3, -10.72, 0], [-37.4, -10.7, 0], [-35.25, -10.75, 0], [-31.19, -10.57, 0],[-24.28, -10.36, 0]]
                    },

                     {"type": "home", 
                     "number": 17, 
                     "color": "blue",
                     "coords": [[-18.33, -9.42, 0], [-18.33, -9.42, 0], [-14.72, -13.14, 0], [-12.02, -14.92, 0], [-3.02, -18.79, 0], 	
                    [2.89, -20.99, 0], [11.58, -22.58, 0],[19.79, -23.5, 0], [30.04, -23.07, 0]]
                     },

                     {"type": "home", 
                     "number": 2, 
                     "color": "blue",
                     "coords": [[-41.76, 1.8399999999999999, 0],[-41.76, 1.8399999999999999, 0], [-41.1, 5.48, 0],[-42.69, 5.04, 0], [-39.71, -1.45, 0], [-37.16, -5.87, 0], 	
                    [-33.08, -7.75, 0], [-27.98, -10.19, 0], [-15.38, -14.2, 0]]
                     },

                     {"type": "home", 
                     "number": 22, 
                     "color": "blue",
                     "coords": [[-26.14, 11.08, 0], [-26.14, 11.08, 0], [-25.14, 16.92, 0], [-22.46, 18.8, 0], [-11.85, 19.99, 0], 
                    [-2.85, 19.32, 0], [9.92, 15.25, 0], [20.66, 11.38, 0], [27.17, 9.99, 0]]
                     },

                     {"type": "home", 
                     "number": 31, 
                     "color": "blue",
                     "coords": [[-36.23, 1.38, 0], [-36.23, 1.38, 0], [-37.59, 9.18, 0], [-38.4, 8.95, 0], [-38.82, 8.52, 0], 
                    [-35.22, 8.94, 0], [-28.58, 10.08, 0], [-21.04, 10.98, 0], [-8.67, 12.55, 0]]
                     },

                     {"type": "away", 
                     "number": 0, 
                     "color": "red",
                     "coords": [[-5.9, -4.74, 0], 
                     [-5.9, -4.74, 0], 
                     [0.92, -6.52, 0], 
                     [3.07, -7.6, 0], 
                     [8.75, -9.27, 0], 
                     [12.94, -9.76, 0], 
                     [19.08, -9.75, 0], 
                     [25.59, -8.96, 0], 
                     [32.66, -9.15, 0]]
                     },

                     {"type": "away", 
                     "number": 11, 
                     "color": "red",
                     "coords": [[-41.56, 4.01, 0], 
                     [-41.56, 4.01, 0], 
                     [-35.3, 6.8100000000000005, 0], 
                     [-32.2, 7.5600000000000005, 0], 
                     [-21.04, 8.66, 0], 
                     [-12.8, 9.07, 0], 
                     [-0.08, 9.92, 0], 
                     [12.53, 9.41, 0], 
                     [24.49, 6.94, 0]] 
                     },
                     {"type": "away", 
                     "number": 27, 
                     "color": "red",
                     "coords": [[-22.8, -3.24, 0], 
                     [-22.8, -3.24, 0], 
                     [-8.51, 0.74, 0], 
                     [-3.87, 2.43, 0], 
                     [6, 7.76, 0], 
                     [11.83, 9.94, 0], 
                     [19.75, 9.75, 0], 
                     [26.84, 7.85, 0], 
                     [31.66, 7.45, 0]] 
                     },

                     {"type": "away", 
                     "number": 7, 
                     "color": "red",
                     "coords": [[-35.83, -6.49, 0], 
                     [-35.83, -6.49, 0], 
                     [-27.34, -11.87, 0], 
                     [-24.73, -11.46, 0], 
                     [-16.09, -9.63, 0], 
                     [-9.22, -7.85, 0], 
                     [1.42, -5.58, 0], 
                     [10.85, -4.18, 0], 
                     [20.62, -3.25, 0]] 
                     },

                     {"type": "away", 
                     "number": 9, 
                     "color": "red",
                     "coords": [[-34.16, 10.44, 0], 
                     [-34.16, 10.44, 0], 
                     [-34.44, 10.57, 0], 
                     [-35.05, 10.02, 0], 
                     [-27.72, 9.38, 0], 
                     [-20.45, 9.06, 0], 
                     [-9.92, 7.92, 0], 
                     [0.33, 5.92, 0], 
                     [12.18, 4.96, 0]] 
                     }
                    ]

const svg = d3.select(".court")
.append("svg")
.attr("width", WIDTH)
.attr("height", HEIGHT);

async function loadCourt(){
    const document = d3.xml("courtFinal.xml");
    const court = document.documentElement;
    document.addEventListener("DOMContentLoaded", function() {
        const background = svg.node().append(court);
      });
   
}








const homePlayers= d3.select(".home").selectAll("h3")
     .data(sampleData)
     .join("h3")
     .append("h3")
     .text(function(d){
         if (d.type == "home"){
             return d.number
         }});

const awayPlayers = d3.select(".away")
                      .selectAll("h3")
                      .data(sampleData)
                      .join("h3")
                      .append("h3")
                      .text(function(d){
                                if (d.type == "away"){
                                    return d.number
                                }});                

function moveCircles() {
    circles
        .attr("cx", (d) => xScale(d.coords[0][0]))
        .attr("cy", (d) => yScale(d.coords[0][1]))
        .each(function(d) {
                d3.select(this)
                    .interrupt()
                    .attr("cx", (d) => xScale(d.coords[0][0]))
                    .attr("cy", (d) => yScale(d.coords[0][1]))
                
                for (let i = 0; i < d.coords.length; i++) {
                d3.select(this).transition()
                    .ease(d3.easeLinear)
                    .ease(d3.easeSinOut)
                    .duration(3000)
                    .attr("cx", xScale(d.coords[i][0]))
                    .attr("cy", yScale(d.coords[i][1]));
                    console.log(i)
                    console.log(d.coords[i][0])
                    console.log(d.coords[i][1])
            }
        })};
const circleGroup = svg.append("g");
const circles = circleGroup.selectAll("circle")
                           .data(sampleData)
                           .join(enter => enter.append("circle")
                           .attr("r", 15)                     
                           .attr("cx", (d) => xScale(d.coords[0][0]))
                           .attr("cy", (d) => yScale(d.coords[0][1]))
                            .attr("fill", (d) => d.color))
                           moveCircles();

                           


const textLabels = circleGroup.selectAll("text")
                                .data(sampleData)
                                .join("text")
                                .attr("x", (d) => xScale(d.coords[0][0])) // x-coordinate same as circle's cx
                                .attr("y", (d) => yScale(d.coords[0][1])) // y-coordinate same as circle's cy
                                .text((d) => d.number) // The text content, you can modify this according to your data
                                .style("text-anchor", "middle") // Center the text horizontally
                                .style("dominant-baseline", "central") // Center the text vertically
                                .style("font-size", "15px") // Set font size (modify as needed)
                                .style("fill", "white"); // Set text color (modify as needed)
                                moveText();
                                


function moveText() {
    textLabels
        .attr("x", (d) => xScale(d.coords[0][0]))
        .attr("y", (d) => yScale(d.coords[0][1]))
        .each(function(d) {
        d3.select(this)
            .interrupt()
            .attr("x", (d) => xScale(d.coords[0][0]))
            .attr("y", (d) => yScale(d.coords[0][1]));
    
        for (let i = 0; i < d.coords.length; i++) {
            d3.select(this).transition()
            .ease(d3.easeLinear)
            .ease(d3.easeSinOut)
            .duration(3000)
            .attr("x", xScale(d.coords[i][0]))
            .attr("y", yScale(d.coords[i][1]));
            console.log(i);
            console.log(d.coords[i][0]);
            console.log(d.coords[i][1]);
        }
        });
    }
const button = d3.select("button");

button.on("click", function () {
    moveCircles();
    moveText();
    console.log("Clicking");
});
    


function changeTeamNames(homeGame){
    d3.select(".home").selectAll("h2")
                      .append("h2")
                      .text(homeGame);

}
document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.getElementById('gameDropdown');
        const elementToUpdate = document.getElementById('homeDiv');
        console.log("drop down selected")
        dropdown.addEventListener('change', function(){
            var gameID = dropdown.value;

            console.log(gameID)
            var homeGame = "";
            var awayGame = "";
            switch (gameID){
                case "0042100301":
                    console.log("changing names");
                    homeGame= "Miami Heat";
                    elementToUpdate.innerHTML = "Home Team: " + homeGame;
            
                    break;
    
    
            }
        })
})




        






