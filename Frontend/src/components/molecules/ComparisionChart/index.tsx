import Highcharts, { SeriesAreasplineOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { CurrencyChartData } from "../../../types/chartdata.type";
import localeUtils from "../../../utils/locale-utils";

interface MultiCurrencyChartProps {
  xAxisLabels: Array<string>;
  dataArr: Array<CurrencyChartData>;
  showLegends?: boolean;
}

const MultiCurrencyChart: React.FC<MultiCurrencyChartProps> = ({
  xAxisLabels,
  dataArr,
  showLegends,
}) => {
  const options: Highcharts.Options = {
    chart: {
      type: "areaspline",
      marginLeft: 0,
      marginRight: 0,
      style: {
        fontFamily: "GraphikRegular",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "14px",
      },
    },
    series: dataArr.map(
      (data) =>
        ({
          name: data.currencyName,
          data: data.data,
          color: data.currencyColor,
          states: {
            hover: {
              enabled: true,
              lineWidth: 1,
            },
          },
        } as SeriesAreasplineOptions),
    ),
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
        pointPlacement: "on",
      },
      areaspline: {
        animation: {
          defer: 100,
          duration: 2000,
        },
        fillOpacity: 0.1,
        lineWidth: 1,
      },
    },
    tooltip: {
      formatter: function () {
        const value = localeUtils.formatCurr(this.y);
        return `${value}`;
      },
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      crosshair: {
        width: 2,
      },
      categories: xAxisLabels,
      tickmarkPlacement: "on",
    },
    yAxis: {
      grid: {
        enabled: true,
      },
      endOnTick: false,
      startOnTick: false,
    },
    legend: {
      enabled: showLegends == undefined || showLegends,
      layout: "horizontal",
      align: "right",
      verticalAlign: "top",
      itemMarginTop: 10,
      itemMarginBottom: 10,
    },
    title: undefined,
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      data-testid="chart-container"
    />
  );
};

export default MultiCurrencyChart;
