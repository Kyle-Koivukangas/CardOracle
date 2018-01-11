var data = [[3302, -2269, -1469, 2355, 3551, -1311], [7578, 3687, 2304, 5344, 6633, 4408]];
var options = {
    "axes": {
        "xaxis": {
            "label": "&nbsp",
            "renderer": $.jqplot.CategoryAxisRenderer,
            "ticks": [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ]
        }
    },
    "legend": {
        "placement": "outsideGrid",
        "show": "true",
        "border": "none"
    },
    "series": [
        {
            "label": "Page1"
        },
        {
            "label": "Page2"
        }
    ],
    "seriesColors": [
        "red",
        "#cc88aa"
    ],
    "seriesDefaults": {
        "renderer": $.jqplot.BarRenderer
    }
}

        var graph = {
            "nodes": [
                { "name": "5", "rating": 1 },
                { "name": "6", "rating": 1 },
                { "name": "7", "rating": 2 },
                { "name": "8", "rating": 2 },
                { "name": "9", "rating": 2 },
                { "name": "10", "rating": 3 },
                { "name": "11", "rating": 3 },
                { "name": "27", "rating": 3 },
            ],
            "links": [
                { "source": 0, "target": 1 },
                { "source": 1, "target": 2 },
                { "source": 2, "target": 3 },
                { "source": 3, "target": 4 },
                { "source": 6, "target": 5 },
                { "source": 6, "target": 7 },
            ]
        }
    
        var margin = { top: -5, right: -5, bottom: -5, left: -5 },
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        var color = d3.scale.category20();

        var force = d3.layout.force()
            .charge(-200)
            .linkDistance(50)
            .size([width + margin.left + margin.right, height + margin.top + margin.bottom]);

        var zoom = d3.behavior.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        var drag = d3.behavior.drag()
            .origin(function (d) { return d; })
            .on("dragstart", dragstarted)
            .on("drag", dragged)
            .on("dragend", dragended);

        var svg = d3.select("#map").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
            .call(zoom);

        var rect = svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all");

        var container = svg.append("g");

        //d3.json('http://blt909.free.fr/wd/map2.json', function(error, graph) {

        force
            .nodes(graph.nodes)
                .links(graph.links)
                .start();

        var link = container.append("g")
            .attr("class", "links")
            .selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", 3);

        var node = container.append("g")
            .attr("class", "nodes")
            .selectAll(".node")
            .data(graph.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
            .call(drag);

        node.append("circle")
            .attr("r", function (d) { return d.weight * 2 + 12; })
            .style("fill", function (d) { return color(1 / d.rating); });

        force.on("tick", function () {
            link.attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });
            node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
        });

        var linkedByIndex = {};
        graph.links.forEach(function (d) {
            linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });

        function isConnected(a, b) {
            return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index];
        }

node
    .on("mouseover", function (d) {

        node.classed("node-active", function (o) {
            thisOpacity = isConnected(d, o) ? true : false;
            this.setAttribute('fill-opacity', thisOpacity);
            return thisOpacity;
        });

        link.classed("link-active", function (o) {
            return o.source === d || o.target === d ? true : false;
        });

        d3.select(this).classed("node-active", true);
        d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", (d.weight * 2 + 12) * 1.5);
    })
    .on("mouseout", function (d) {

        node.classed("node-active", false);
        link.classed("link-active", false);

        d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", d.weight * 2 + 12);
    });

function dottype(d) {
    d.x = +d.x;
    d.y = +d.y;
    return d;
}

function zoomed() {
    container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

function dragstarted(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
    force.start();
}

function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
    d3.select(this).classed("dragging", false);
}
"rendererOptions": {
    "fillToZero": true,
        "useNegativeColors": false
}
    },
"title": "Visits by Month",
    "canvasOverlay": {
    "show": true,
        objects: [
            {
                horizontalLine: {
                    name: 'threshold',
                    y: 6000,
                    lineWidth: 1,
                    color: 'rgb(200, 50, 50)',
                    shadow: false
                }
            }
        ]
}

};
$("#chart").jqplot(data, options);
