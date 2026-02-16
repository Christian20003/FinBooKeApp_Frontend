/**
 * This type represents a group of bars in a bar chart.
 *
 * @property {string} xValue: The position on the x-axis.
 * @property {number[]} yValues: The position of all bars on the y-axis.
 */
export type BarGroup = {
  xValue: string;
  yValues: number[];
};

/**
 * This type represents the data for a single bar chart.
 *
 * @property {BarGroup[]}: The data that should be displayed.
 * @property {string[]}: The labels for the legend.
 * @property {string[]}: The color of a bar.
 */
export type BarChartData = {
  groups: BarGroup[];
  colors: string[];
};
