



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

async function getGameInfo(game_id) {
    const response = await fetch(`http://127.0.0.1:5000/game?game_id=${game_id}`);
    const json = await response.json();
    return json;
}
let playerData = await getPlayerCoords('0042100301', 1);

const gameDropdown = document.getElementById('gameDropdown');
const rankDropdown = document.getElementById('rankDropdown');

gameDropdown.addEventListener("change", async e => {
    const game_id = e.target.value;
    const rank = rankDropdown.value;

    const homeText = document.getElementById('home-h2');
    const awayText = document.getElementById('away-h2');
    let gameData = await getGameInfo(game_id);
    homeText.innerHTML = "HOME TEAM: " + gameData.homeTeamName;
    awayText.innerHTML = "AWAY TEAM: " + gameData.awayTeamName;

    playerData = await getPlayerCoords(game_id, rank);
    await loadCourt();
    renderPlayers(playerData);
}, false);

rankDropdown.addEventListener("change", async e => {
    const game_id = gameDropdown.value;
    const rank = e.target.value;
    playerData = await getPlayerCoords(game_id, rank);
    await loadCourt();
    renderPlayers(playerData);

}, false);

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
renderPlayers(playerData);

function renderPlayers(playerData) {

    const circleGroup = svg.append("g");
    const circles = circleGroup.selectAll("circle")
        .data(playerData)
        .join(enter => enter.append("circle")
            .attr("r", 15)
            .attr("cx", (d) => xScale(d.coords[0][0]))
            .attr("cy", (d) => yScale(d.coords[0][1]))
            .attr("fill", (d) => d.color));
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

    moveText(textLabels, 1);
    moveCircles(circles, 1);
    updatePlayerText(playerData);
}

function updatePlayerText(playerData) {
    const awayPlayers = d3.select(".away")
        .selectAll("h3")
        .data(playerData);
    awayPlayers.enter()
        .append("h3")
        .text(function (d) {
            if (d.type == "away") {
                return `${d.number} ${d.fullName}`;
            }
        });
    awayPlayers.text(function (d) {
        if (d.type == "away") {
            return `${d.number} ${d.fullName}`;

        }
    });
    const homePlayers = d3.select(".home")
        .selectAll("h3")
        .data(playerData);
    homePlayers.enter()
        .append("h3")
        .text(function (d) {
            if (d.type == "home") {
                return `${d.number} ${d.fullName}`;

            }
        });
    homePlayers.text(function (d) {
        if (d.type == "home") {
            return `${d.number} ${d.fullName}`;

        }
    });

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
    await loadCourt();
    renderPlayers(playerData);
    console.log("Clicking");
});








