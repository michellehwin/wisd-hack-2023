



//Court dimensions in pixels
const WIDTH = 1125;
const HEIGHT = 598;

//scaling svg to data
const xScale = d3.scaleLinear().domain([-47, 47]).range([0, 1125]);
const yScale = d3.scaleLinear().domain([-25, 25]).range([598, 0]);

async function getPlayerCoords(game_id, play_rank) {
    const response = await fetch(`http://127.0.0.1:5000/coords?game_id=${game_id}&play_rank=${play_rank}`);
    const json = await response.json();


    return json;
}
let playerData = await getPlayerCoords('0042100301', 1);

const gameDropdown = document.getElementById('gameDropdown');
const rankDropdown = document.getElementById('rankDropdown');

gameDropdown.addEventListener("change", async e => {
    const game_id = e.target.value;
    const rank = rankDropdown.value;
    playerData = await getPlayerCoords(game_id, rank);
    await loadCourt()
    renderPlayers(playerData)
}, false);

rankDropdown.addEventListener("change", async e => {
    const game_id = gameDropdown.value;
    const rank = e.target.value;
    playerData = await getPlayerCoords(game_id, rank);
    await loadCourt();
    renderPlayers(playerData)

},false)

const svg = d3.select(".court")
    .append("svg")
    .attr("width", WIDTH)
    .attr("height", HEIGHT);


async function loadCourt() {
    try {
        const document = await d3.xml("courtFinal.xml");
        const court = document.documentElement;
        svg.node().append(court);
        console.log('court loaded');
    } catch (error) {
        console.error("Error loading court:", error);
    }
}



await loadCourt();
renderPlayers(playerData)

function renderPlayers(playerData) {
    const circleGroup = svg.append("g");
    const circles = circleGroup.selectAll("circle")
        .data(playerData)
        .join(enter => enter.append("circle")
            .attr("r", 15)
            .attr("cx", (d) => xScale(d.coords[0][0]))
            .attr("cy", (d) => yScale(d.coords[0][1]))
            .attr("fill", (d) => d.color));
    moveCircles(circles);
    const textLabels = circleGroup.selectAll("text")
        .data(playerData)
        .join("text")
        .attr("x", (d) => xScale(d.coords[0][0])) 
        .attr("y", (d) => yScale(d.coords[0][1])) 
        .text((d) => d.number) 
        .style("fill", "white")
        .style("font-size", "15px") 
        .style("dominant-baseline", "central") 
        .style("text-anchor", "middle");
        
    moveText(textLabels);
    updatePlayerText();

}

function updatePlayerText(){
    const awayPlayers = d3.select(".away")
        .selectAll("h3")
        .data(playerData);
    awayPlayers.enter()
        .append("h3")
        .text(function (d) {
            if (d.type == "away") {
                return d.number;
            }});
    awayPlayers.text(function (d) {
        if (d.type == "away") {
            return d.number;
        }});
        const homePlayers = d3.select(".home")
        .selectAll("h3")
        .data(playerData);
    homePlayers.enter()
        .append("h3")
        .text(function (d) {
            if (d.type == "home") {
                return d.number;
            }});
    homePlayers.text(function (d) {
            if (d.type == "home") {
                return d.number;
            }});
    
}



function moveCircles(circles) {
    circles
        .attr("cx", (d) => xScale(d.coords[0][0]))
        .attr("cy", (d) => yScale(d.coords[0][1]))
        .each(function (d) {
            d3.select(this)
                .interrupt()
                .attr("cx", (d) => xScale(d.coords[0][0]))
                .attr("cy", (d) => yScale(d.coords[0][1]));

            for (let i = 0; i < d.coords.length; i++) {
                d3.select(this).transition()
                    .ease(d3.easeLinear)
                    .ease(d3.easeSinOut)
                    .duration(3000)
                    .attr("cx", xScale(d.coords[i][0]))
                    .attr("cy", yScale(d.coords[i][1]));
                // console.log(i)
                // console.log(d.coords[i][0])
                // console.log(d.coords[i][1])
            }
        });
};

function moveText(textLabels) {
    textLabels
        .attr("x", (d) => xScale(d.coords[0][0]))
        .attr("y", (d) => yScale(d.coords[0][1]))
        .each(function (d) {
            d3.select(this)
                .attr("x", (d) => xScale(d.coords[0][0]))
                .attr("y", (d) => yScale(d.coords[0][1]));

            for (let i = 0; i < d.coords.length; i++) {
                d3.select(this).transition()
                    .duration(3000)
                    .attr("x", xScale(d.coords[i][0]))
                    .attr("y", yScale(d.coords[i][1]))
                    .ease(d3.easeLinear)
                    .ease(d3.easeSinOut);
                // console.log(i);
                // console.log(d.coords[i][0]);
                // console.log(d.coords[i][1]);
            }
        });
}
const replayButton = d3.select("button");

replayButton.on("click", async function () {
    await loadCourt()
    renderPlayers(playerData)
    console.log("Clicking");
});



function handleDropdownChange(event) {
    const selectedValue = event.target.value;
    var homeGame = "";
    var awayGame = "";
    const homeText= document.getElementById('home-h2');
    const awayText= document.getElementById('away-h2');
    console.log('Dropdown changed to:', selectedValue);
    switch (selectedValue){
                case "0042100301":
                    console.log("changing names");
                    homeGame= "Miami Heat";
                    awayGame="Boston Celtics";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100302":
                    console.log("changing names");
                    homeGame= "Miami Heat";
                    awayGame="Boston Celtics";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100303":
                    homeGame= "Boston Celtics";
                    awayGame= "Miami Heat";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100304":
                    homeGame= "Boston Celtics";
                    awayGame= "Miami Heat";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100305":
                    homeGame= "Miami Heat";
                    awayGame="Boston Celtics";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100306":
                    homeGame= "Boston Celtics";
                    awayGame= "Miami Heat";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100307":
                    homeGame= "Miami Heat";
                    awayGame="Boston Celtics";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100311":
                    homeGame= "Golden State Warriors";
                    awayGame="Dallas Mavericks";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100312":
                    homeGame= "Golden State Warriors";
                    awayGame="Dallas Mavericks";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100313":
                    homeGame= "Dallas Mavericks";
                    awayGame="Golden State Warriors";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100314":
                    homeGame= "Dallas Mavericks";
                    awayGame="Golden State Warriors";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100315":
                    homeGame= "Golden State Warriors";
                    awayGame="Dallas Mavericks";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100401":
                    homeGame= "Golden State Warriors";
                    awayGame="Boston Celtics";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100402":
                    homeGame= "Golden State Warriors";
                    awayGame="Boston Celtics";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100403":
                    homeGame= "Boston Celtics";
                    awayGame="Golden State Warriors";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100404":
                    homeGame= "Boston Celtics";
                    awayGame="Golden State Warriors";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100405":
                    homeGame= "Golden State Warriors";
                    awayGame="Boston Celtics";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
                case "0042100406":
                    homeGame= "Boston Celtics";
                    awayGame="Golden State Warriors";
                    homeText.innerHTML = "HOME TEAM: " + homeGame;
                    awayText.innerHTML = "AWAY TEAM: " + awayGame;
                    break;
  }
}
  
const dropdown = document.getElementById('gameDropdown');
dropdown.addEventListener('change', handleDropdownChange);











