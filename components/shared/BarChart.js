import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Rect, Line, Text as SvgText } from 'react-native-svg';
import { scaleLinear, scalePoint, scaleTime } from 'd3-scale';
import { format, differenceInDays } from 'date-fns';

const screen = Dimensions.get('window');

// Constants
const GRAPH_MARGIN = 30;
const GRAPH_BAR_WIDTH = 10;

const colors = {
  light: '#eee',
  dark: '#585858',
};

const SvgHeight = 400;
const SvgWidth = screen.width - 16;

const graphHeight = SvgHeight - 2 * GRAPH_MARGIN;
const graphWidth = SvgWidth - 2 * GRAPH_MARGIN;

export default function BarChart({ data, interval }) {
  console.log(data);

  // x point scale
  const xDomain = data.map((item) => item.label);
  const xRange = [0, graphWidth];
  const x = scalePoint().domain(xDomain).range(xRange);
  // const xTicks = x.ticks(differenceInDays(interval.end, interval.start));

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
            x1={GRAPH_MARGIN}
            y1={y(maxValue) * -1 + GRAPH_MARGIN}
            x2={graphWidth + GRAPH_MARGIN}
            y2={y(maxValue) * -1 + GRAPH_MARGIN}
            stroke={colors.light}
            strokeWidth={1}
          />

          {/* mid axis line */}
          <Line
            x1={GRAPH_MARGIN}
            y1={y(midValue) * -1 + GRAPH_MARGIN}
            x2={graphWidth + GRAPH_MARGIN}
            y2={y(midValue) * -1 + GRAPH_MARGIN}
            stroke={colors.light}
            strokeWidth={1}
          />

          {/* mid axis line */}
          <Line
            x1={GRAPH_MARGIN}
            y1={GRAPH_MARGIN}
            x2={graphWidth + GRAPH_MARGIN}
            y2={GRAPH_MARGIN}
            stroke={colors.light}
            strokeWidth={1}
          />

          {/* bars */}
          {data.map((item, i) => (
            <Rect
              key={`bar-${item.label}-${i}`}
              x={GRAPH_MARGIN + x(item.label) - GRAPH_BAR_WIDTH / 2}
              y={y(item.value) * -1 + GRAPH_MARGIN}
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
              x={GRAPH_MARGIN + x(item.label) - GRAPH_BAR_WIDTH / 2}
              y={50}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
});
