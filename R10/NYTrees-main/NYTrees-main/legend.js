function drawLegend(legendSelector, legendColorScale, mapSelector, mapData) {
  const offsets = { width: 10, top: 2, bottom: 24 };
  const stepSize = 4;
  const minMaxExtendPercent = 0;

  const legend = d3.select(legendSelector);
  const legendHeight = legend.attr("height");
  const legendBarWidth = legend.attr("width") - (offsets.width * 2);
  const legendMinMax = d3.extent(legendColorScale.domain());
  const minMaxExtension = (legendMinMax[1] - legendMinMax[0]) * minMaxExtendPercent;
  const barHeight = legendHeight - offsets.top - offsets.bottom;

  let barScale = d3.scaleLinear().domain([legendMinMax[0] - minMaxExtension, legendMinMax[1] + minMaxExtension]).range([0, legendBarWidth]);
  let barAxis = d3.axisBottom(barScale);

  let bar = legend.append("g")
    .attr("class", "legend colorbar")
    .attr("transform", `translate(${offsets.width},${offsets.top})`)

  if (legendColorScale.hasOwnProperty('thresholds') || legendColorScale.hasOwnProperty('quantiles')) {
    let thresholds = [];
    if (legendColorScale.hasOwnProperty('thresholds')) { thresholds = legendColorScale.thresholds() }
    else { thresholds = legendColorScale.quantiles() }

    const barThresholds = [legendMinMax[0], ...thresholds, legendMinMax[1]];

    barAxis.tickValues(barThresholds);

    for (let i = 0; i < barThresholds.length - 1; i++) {
      let dataStart = barThresholds[i];
      let dataEnd = barThresholds[i + 1];
      let pixelStart = barAxis.scale()(dataStart);
      let pixelEnd = barAxis.scale()(dataEnd);

      let rect = bar.append("rect")
        .attr("x", pixelStart)
        .attr("y", 0)
        .attr("width", pixelEnd - pixelStart)
        .attr("height", barHeight)
        .style("fill", legendColorScale((dataStart + dataEnd) / 2.0))
        .on("mouseover", function (event) {
          let value = (dataStart + dataEnd) / 2.0;
          highlightLegend(value, legendSelector);
          highlightMap(value, mapSelector, mapData);
          showTooltip(event, value);
        })
        .on("mouseout", function (event) {
          let value = (dataStart + dataEnd) / 2.0;
          unHighlightLegend(value, legendSelector);
          unHighlightMap(value, mapSelector, mapData);
          hideTooltip();
        });
    }
  } else if (legendColorScale.hasOwnProperty('rangeRound')) {
    for (let i = 0; i < legendBarWidth; i = i + stepSize) {
      let center = i + (stepSize / 2);
      let dataCenter = barAxis.scale().invert(center);

      if (dataCenter < legendMinMax[0]) {
        let rect = bar.append("rect")
          .attr("x", i)
          .attr("y", 0)
          .attr("width", stepSize)
          .attr("height", barHeight)
          .style("fill", legendColorScale(legendMinMax[0]))
          .on("mouseover", function (event) {
            let value = legendMinMax[0];
            highlightLegend(value, legendSelector);
            highlightMap(value, mapSelector, mapData);
            showTooltip(event, value);
          })
          .on("mouseout", function (event) {
            let value = legendMinMax[0];
            unHighlightLegend(value, legendSelector);
            unHighlightMap(value, mapSelector, mapData);
            hideTooltip();
          });
      } else if (dataCenter < legendMinMax[1]) {
        let rect = bar.append("rect")
          .attr("x", i)
          .attr("y", 0)
          .attr("width", stepSize)
          .attr("height", barHeight)
          .style("fill", legendColorScale(dataCenter))
          .on("mouseover", function (event) {
            let value = dataCenter;
            highlightLegend(value, legendSelector);
            highlightMap(value, mapSelector, mapData);
            showTooltip(event, value);
          })
          .on("mouseout", function (event) {
            let value = dataCenter;
            unHighlightLegend(value, legendSelector);
            unHighlightMap(value, mapSelector, mapData);
            hideTooltip();
          });
      } else {
        let rect = bar.append("rect")
          .attr("x", i)
          .attr("y", 0)
          .attr("width", stepSize)
          .attr("height", barHeight)
          .style("fill", legendColorScale(legendMinMax[1]))
          .on("mouseover", function (event) {
            let value = legendMinMax[1];
            highlightLegend(value, legendSelector);
            highlightMap(value, mapSelector, mapData);
            showTooltip(event, value);
          })
          .on("mouseout", function (event) {
            let value = legendMinMax[1];
            unHighlightLegend(value, legendSelector);
            unHighlightMap(value, mapSelector, mapData);
            hideTooltip();
          });
      }
    }
  } else {
    let nomVals = legendColorScale.domain().sort();

    let barScale = d3.scaleBand().domain(nomVals)
      .range([0, legendBarWidth])
      .padding(0.05);
    barAxis.scale(barScale);

    nomVals.forEach(d => {
      let rect = bar.append("rect")
        .attr("x", barScale(d))
        .attr("y", 0)
        .attr("width", barScale.bandwidth())
        .attr("height", barHeight)
        .style("fill", legendColorScale(d))
        .on("mouseover", function (event) {
          let value = d;
          highlightLegend(value, legendSelector);
          highlightMap(value, mapSelector, mapData);
          showTooltip(event, value);
        })
        .on("mouseout", function (event) {
          let value = d;
          unHighlightLegend(value, legendSelector);
          unHighlightMap(value, mapSelector, mapData);
          hideTooltip();
        });
    });
  }

  legend.append("g")
    .attr("class", "legend axis")
    .attr("transform", `translate(${offsets.width},${offsets.top + barHeight + 5})`)
    .call(barAxis);
}

function highlightLegend(value, legendSelector) {
  d3.select(legendSelector)
    .selectAll("rect")
    .filter(function (d, i, nodes) {
      return d3.select(this).style("fill") === d3.select(legendSelector).select(".legend").select("rect").style("fill");
    })
    .style("stroke", "black")
    .style("stroke-width", "2px");
}

function unHighlightLegend(value, legendSelector) {
  d3.select(legendSelector)
    .selectAll("rect")
    .style("stroke", "none")
    .style("stroke-width", "0px");
}

function highlightMap(value, mapSelector, mapData) {
  d3.select(mapSelector)
    .selectAll(".map-feature")
    .filter(function (d, i, nodes) {
      return d.properties.value === value;
    })
    .style("fill", "yellow");
}

function unHighlightMap(value, mapSelector, mapData) {
  d3.select(mapSelector)
    .selectAll(".map-feature")
    .style("fill", function (d, i, nodes) {
      return mapData.colorScale(d.properties.value);
    });
}

function showTooltip(event, value) {
  d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 10) + "px")
    .style("background-color", "white")
    .style("border", "1px solid black")
    .style("padding", "5px")
    .style("font-size", "12px")
    .text("Value: " + value);
}

function hideTooltip() {
  d3.select(".tooltip").remove();
}
