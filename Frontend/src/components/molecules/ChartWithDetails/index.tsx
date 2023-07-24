import { makeStyles } from "@material-ui/core";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { watchGraph } from "../../../pages/DashboardPage";
import { ChartPoint } from "../../../types/chartdata.type";
import localeUtils from "../../../utils/locale-utils";

const useStyles = makeStyles({
  chartContainer: {
    height: "100%",
    width: "100%",
  },
});

export type WatchlistItemChartPoint = watchGraph;
const mapToChartData = (
  data: Array<WatchlistItemChartPoint>,
): Array<[string, number]> => {
  if (!data.length) {
    return [];
  }
  return data.map((point) => [
    localeUtils.formatDatetime24h(new Date(point.datetime)),
    point.value,
  ]);
};

export interface WatchlistItemChartProps {
  data: Array<WatchlistItemChartPoint>;
  color?: string;
}

const WatchlistItemChart: React.FC<WatchlistItemChartProps> = ({
  data,
  color,
}) => {
  const options: Highcharts.Options = {
    series: [
      {
        type: "areaspline",
        data: mapToChartData(data),
        states: {
          hover: {
            enabled: true,
            lineWidth: 1,
          },
        },
      },
    ],
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
      areaspline: {
        marker: {
          enabled: false,
        },
        animation: {
          defer: 100,
          duration: 2000,
        },
        color: color,
        fillOpacity: 0.1,
        lineWidth: 1,
      },
    },
    chart: {
      marginLeft: 0,
      marginRight: 0,
      spacingLeft: 0,
      spacingRight: 0,
      marginTop: 0,
      marginBottom: 0,
      spacingTop: 0,
      spacingBottom: 0,
    },
    tooltip: {
      formatter: function () {
        const value = localeUtils.formatCurr(this.y);
        return `${this.point.name} | ${value}`;
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      visible: false,
      minPadding: 0,
      maxPadding: 0,
    },
    yAxis: {
      visible: false,
    },
    legend: {
      enabled: false,
    },
    title: undefined,
  };

  const classes = useStyles();

  return (
    <HighchartsReact
      containerProps={{ className: classes.chartContainer }}
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default WatchlistItemChart;
