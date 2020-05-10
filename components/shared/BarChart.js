import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Rect, Line, Text as SvgText } from 'react-native-svg';
import { scaleLinear, scalePoint } from 'd3-scale';
import { format } from 'date-fns';

const screen = Dimensions.get('window');

// Constants
const GRAPH_HORIZONTAL_MARGIN = 30;
const GRAPH_VERTICAL_MARGIN = 50;
const GRAPH_BAR_WIDTH = 10;

const colors = {
  light: '#eee',
  dark: '#585858',
};

const SvgHeight = screen.height - 400;
const SvgWidth = screen.width - 16;

const graphHeight = SvgHeight - 2 * GRAPH_VERTICAL_MARGIN;
const graphWidth = SvgWidth - 2 * GRAPH_HORIZONTAL_MARGIN;

export default function BarChart({ data }) {
  console.log(data);

  // x point scale
  const xDomain = data.map((item) => item.label);
  const xRange = [0, graphWidth];
  const x = scalePoint().domain(xDomain).range(xRange);

  let maxValue = 0;
  data.forEach((point) => {
    if (point.value > maxValue) maxValue = point.value;
  });
  const midValue = Math.ceil(maxValue / 2);
  // y linear scale
  const yDomain = [0, maxValue];
  const yRange = [0, graphHeight];
  const y = scaleLinear().domain(yDomain).range(yRange);

  return (
    <View style={styles.container}>
      <Svg width={SvgWidth} height={SvgHeight} style={styles.container}>
        <G y={graphHeight}>
          {/* top axis line */}
          <Line
            x1={GRAPH_HORIZONTAL_MARGIN}
            x2={graphWidth + GRAPH_HORIZONTAL_MARGIN * 2}
            y1={y(maxValue) * -1 + GRAPH_VERTICAL_MARGIN}
            y2={y(maxValue) * -1 + GRAPH_VERTICAL_MARGIN}
            stroke={colors.light}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <SvgText
            x={GRAPH_HORIZONTAL_MARGIN}
            y={y(maxValue) * -1 + GRAPH_VERTICAL_MARGIN - 10}
            textAnchor="middle"
            fontSize={18}
            opacity={0.2}
            backgroundColor="#fff"
          >
            {maxValue}
          </SvgText>

          {/* mid axis line */}
          <Line
            x1={GRAPH_HORIZONTAL_MARGIN - GRAPH_BAR_WIDTH / 2}
            x2={graphWidth + GRAPH_HORIZONTAL_MARGIN}
            y1={y(midValue) * -1 + GRAPH_VERTICAL_MARGIN}
            y2={y(midValue) * -1 + GRAPH_VERTICAL_MARGIN}
            stroke={colors.light}
            strokeWidth={1}
            strokeDasharray="4 4"
          />

          {/* bottom axis line */}
          <Line
            x1={GRAPH_HORIZONTAL_MARGIN}
            x2={graphWidth + GRAPH_HORIZONTAL_MARGIN}
            y1={GRAPH_VERTICAL_MARGIN}
            y2={GRAPH_VERTICAL_MARGIN}
            stroke={colors.light}
            strokeWidth={1}
            strokeDasharray="4 4"
          />

          {/* bars */}
          {data.map((item, i) => (
            <Rect
              key={`bar-${item.label}-${i}`}
              x={GRAPH_HORIZONTAL_MARGIN + x(item.label) - GRAPH_BAR_WIDTH / 2}
              y={y(item.value) * -1 + GRAPH_VERTICAL_MARGIN}
              rx={GRAPH_BAR_WIDTH / 2}
              width={GRAPH_BAR_WIDTH}
              height={y(item.value)}
              fill="#fff"
              stroke={colors.dark}
            />
          ))}

          {/* labels */}
          {data.map((item, i) => (
            <SvgText
              key={`label-${item.label}-${i}`}
              x={
                GRAPH_HORIZONTAL_MARGIN +
                x(item.label) -
                GRAPH_BAR_WIDTH / 2 +
                5
              }
              y={GRAPH_VERTICAL_MARGIN * 1.5}
              textAnchor="middle"
              fillOpacity={0.4}
            >
              {format(new Date(item.label), 'EEE')}
            </SvgText>
          ))}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
});
