function drawLegend(legendSelector, legendColorScale, mapSelector, mapData) {
  const offsets = { width: 10, top: 2, bottom: 24 };
  const stepSize = 4;
  const minMaxExtendPercent = 0;

  const legend = d3.select(legendSelector);
  const legendHeight = legend.attr("height");
  const legendBarWidth = legend.attr("width") - offsets.width * 2;
  const legendMinMax = d3.extent(legendColorScale.domain());
  const minMaxExtension =
    (legendMinMax[1] - legendMinMax[0]) * minMaxExtendPercent;
  const barHeight = legendHeight - offsets.top - offsets.bottom;

  let barScale = d3
    .scaleLinear()
    .domain([
      legendMinMax[0] - minMaxExtension,
      legendMinMax[1] + minMaxExtension,
    ])
    .range([0, legendBarWidth]);
  let barAxis = d3.axisBottom(barScale);

  let bar = legend
    .append("g")
    .attr("class", "legend colorbar")
    .attr("transform", `translate(${offsets.width},${offsets.top})`);

  if (
    legendColorScale.hasOwnProperty("thresholds") ||
    legendColorScale.hasOwnProperty("quantiles")
  ) {
    let thresholds = [];
    if (legendColorScale.hasOwnProperty("thresholds")) {
      thresholds = legendColorScale.thresholds();
    } else {
      thresholds = legendColorScale.quantiles();
    }

    const barThresholds = [legendMinMax[0], ...thresholds, legendMinMax[1]];

    barAxis.tickValues(barThresholds);

    for (let i = 0; i < barThresholds.length - 1; i++) {
      let dataStart = barThresholds[i];
      let dataEnd = barThresholds[i + 1];
      let pixelStart = barAxis.scale()(dataStart);
      let pixelEnd = barAxis.scale()(dataEnd);

      bar
        .append("rect")
        .attr("x", pixelStart)
        .attr("y", 0)
        .attr("width", pixelEnd - pixelStart)
        .attr("height", barHeight)
        .style("fill", legendColorScale((dataStart + dataEnd) / 2.0))
        .on("mouseover", function () {
          // Display the exact value
          let value = (dataStart + dataEnd) / 2.0;
          let tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("left", d3.event.pageX + 10 + "px")
            .style("top", d3.event.pageY - 10 + "px")
            .text(value.toFixed(2));

          // Highlight the corresponding part of the legend
          d3.select(this).style("stroke", "black").style("stroke-width", 2);

          // Highlight the corresponding part on the map
          highlightMap(mapSelector, mapData, value);
        })
        .on("mouseout", function () {
          // Remove the tooltip
          d3.select(".tooltip").remove();

          // Reset the legend
          d3.select(this).style("stroke", "none").style("stroke-width", 0);

          // Reset the map
          resetMap(mapSelector, mapData);
        });
    }
  } else if (legendColorScale.hasOwnProperty("rangeRound")) {
    for (let i = 0; i < legendBarWidth; i = i + stepSize) {
      let center = i + stepSize / 2;
      let dataCenter = barAxis.scale().invert(center);

      if (dataCenter < legendMinMax[0]) {
        bar
          .append("rect")
          .attr("x", i)
          .attr("y", 0)
          .attr("width", stepSize)
          .attr("height", barHeight)
          .style("fill", legendColorScale(legendMinMax[0]))
          .on("mouseover", function () {
            // Display the exact value
            let value = legendMinMax[0];
            let tooltip = d3
              .select("body")
              .append("div")
              .attr("class", "tooltip")
              .style("position", "absolute")
              .style("left", d3.event.pageX + 10 + "px")
              .style("top", d3.event.pageY - 10 + "px")
              .text(value.toFixed(2));

            // Highlight the corresponding part of the legend
            d3.select(this).style("stroke", "black").style("stroke-width", 2);

            // Highlight the corresponding part on the map
            highlightMap(mapSelector, mapData, value);
          })
          .on("mouseout", function () {
            // Remove the tooltip
            d3.select(".tooltip").remove();

            // Reset the legend
            d3.select(this).style("stroke", "none").style("stroke-width", 0);

            // Reset the map
            resetMap(mapSelector, mapData);
          });
      } else if (dataCenter < legendMinMax[1]) {
        bar
          .append("rect")
          .attr("x", i)
          .attr("y", 0)
          .attr("width", stepSize)
          .attr("height", barHeight)
          .style("fill", legendColorScale(dataCenter))
          .on("mouseover", function () {
            // Display the exact value
            let value = dataCenter;
            let tooltip = d3
              .select("body")
              .append("div")
              .attr("class", "tooltip")
              .style("position", "absolute")
              .style("left", d3.event.pageX + 10 + "px")
              .style("top", d3.event.pageY - 10 + "px")
              .text(value.toFixed(2));

            // Highlight the corresponding part of the legend
            d3.select(this).style("stroke", "black").style("stroke-width", 2);

            // Highlight the corresponding part on the map
            highlightMap(mapSelector, mapData, value);
          })
          .on("mouseout", function () {
            // Remove the tooltip
            d3.select(".tooltip").remove();

            // Reset the legend
            d3.select(this).style("stroke", "none").style("stroke-width", 0);

            // Reset the map
            resetMap(mapSelector, mapData);
          });
      } else {
        bar
          .append("rect")
          .attr("x", i)
          .attr("y", 0)
          .attr("width", stepSize)
          .attr("height", barHeight)
          .style("fill", legendColorScale(legendMinMax[1]))
          .on("mouseover", function () {
            // Display the exact value
            let value = legendMinMax[1];
            let tooltip = d3
              .select("body")
              .append("div")
              .attr("class", "tooltip")
              .style("position", "absolute")
              .style("left", d3.event.pageX + 10 + "px")
              .style("top", d3.event.pageY - 10 + "px")
              .text(value.toFixed(2));

            // Highlight the corresponding part of the legend
            d3.select(this).style("stroke", "black").style("stroke-width", 2);

            // Highlight the corresponding part on the map
            highlightMap(mapSelector, mapData, value);
          })
          .on("mouseout", function () {
            // Remove the tooltip
            d3.select(".tooltip").remove();

            // Reset the legend
            d3.select(this).style("stroke", "none").style("stroke-width", 0);

            // Reset the map
            resetMap(mapSelector, mapData);
          });
      }
    }
  } else {
    let nomVals = legendColorScale.domain().sort();

    let barScale = d3
      .scaleBand()
      .domain(nomVals)
      .range([0, legendBarWidth])
      .padding(0.05);
    barAxis.scale(barScale);

    nomVals.forEach((d) => {
      bar
        .append("rect")
        .attr("x", barScale(d))
        .attr("y", 0)
        .attr("width", barScale.bandwidth())
        .attr("height", barHeight)
        .style("fill", legendColorScale(d))
        .on("mouseover", function () {
          // Display the exact value
          let value = d;
          let tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("left", d3.event.pageX + 10 + "px")
            .style("top", d3.event.pageY - 10 + "px")
            .text(value);

          // Highlight the corresponding part of the legend
          d3.select(this).style("stroke", "black").style("stroke-width", 2);

          // Highlight the corresponding part on the map
          highlightMap(mapSelector, mapData, value);
        })
        .on("mouseout", function () {
          // Remove the tooltip
          d3.select(".tooltip").remove();

          // Reset the legend
          d3.select(this).style("stroke", "none").style("stroke-width", 0);

          // Reset the map
          resetMap(mapSelector, mapData);
        });
    });
  }

  legend
    .append("g")
    .attr("class", "legend axis")
    .attr(
      "transform",
      `translate(${offsets.width},${offsets.top + barHeight + 5})`
    )
    .call(barAxis);
}

// Function to highlight the map
function highlightMap(mapSelector, mapData, value) {
  // Assuming mapData is an array of objects with a 'value' property
  // and mapSelector is a string selecting the map SVG
  let map = d3.select(mapSelector);
  map.selectAll("path").style("fill", function (d) {
    if (d.value === value) {
      return "red"; // Highlight color
    } else {
      return "none"; // Default color
    }
  });
}

// Function to reset the map
function resetMap(mapSelector, mapData) {
  let map = d3.select(mapSelector);
  map.selectAll("path").style("fill", function (d) {
    return "none"; // Default color
  });
}
