



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

    let playData = await getPlayerCoords(game_id, rank);
    let playerCoords = playData.player_coords;
    await loadCourt();
    renderPlayers(playerCoords);
}, false);

rankDropdown.addEventListener("change", async e => {
    const game_id = gameDropdown.value;
    const rank = e.target.value;
    let playData = await getPlayerCoords(game_id, rank);
    let playerCoords = playData.player_coords;
    await loadCourt();
    renderPlayers(playerCoords);
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
renderPlayers(playerData.player_coords);

function playPaths(playerData) {
    let line = d3.line()
        .x(function (d) { return xScale(d[0]); })
        .y(function (d) { return yScale(d[1]); });

    const circleGroup = svg.append("g");
    playerData.forEach(player => {
        let path = circleGroup.append("path")
            .datum(player.coords)
            .attr("class", "line").attr("d", line)
            .attr("fill", "none")
            .style("stroke", "#CC0000")
            .style("stroke-width", "2");
        let pathLen = path.node().getTotalLength();
        let offset = 0;
        path.attr({
            "stroke-dasharray": pathLen + " " + pathLen,
            "stroke-dashoffset": offset
        });
        let circle = circleGroup.append("circle")
            .attr(
                'r', 15)
            .attr('transform', function () {
                let p = path.node().getPointAtLength(pathLen - offset);
                return `translate(${p.x}, ${p.y})`;
            })
            .attr("fill", player.color)
            ;

        path.transition()
            .ease(d3.easeLinear)
            .duration(2000)
            .attrTween("stroke-dashoffset", function (d, i) {
                return function (t) {
                    return pathLen * (1 - t);
                };
            });

        circle.transition()
            .ease(d3.easeLinear)
            .duration(2000)
            .attrTween("transform", function (d, i) {
                return function (t) {
                    var p = path.node().getPointAtLength(pathLen * t);
                    return "translate(" + [p.x, p.y] + ")";
                };
            });
    });
}

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



function moveCircles(circles, index) {
    circles
        .each(function (d) {
            d3.select(this)
                .transition()
                .duration(500)
                .attr("cx", xScale(d.coords[index][0]))
                .attr("cy", yScale(d.coords[index][1]))
                .on("end", () => {
                    if (index < d.coords.length - 1)
                        moveCircles(circles, index + 1);
                });
        })
        ;
};

function moveText(textLabels, index) {
    console.log("moving text");
    textLabels
        .each(function (d) {
            d3.select(this)
                .transition()
                .duration(500)
                .attr("x", xScale(d.coords[index][0]))
                .attr("y", yScale(d.coords[index][1]))
                .on("end", () => {
                    if (index < d.coords.length - 1)
                        moveText(textLabels, index + 1);
                });
        });
}
const replayButton = d3.select("button");

replayButton.on("click", async function () {
    await loadCourt();
    renderPlayers(playerData.player_coords);
    console.log("Clicking");
});








