import { useGetSalesQuery } from "state/api"
import "react-datepicker/dist/react-datepicker.css"
import { Box, useTheme } from "@mui/material";
import { useMemo } from "react";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";

export default function Monthly() {
  const { data } = useGetSalesQuery();
  const theme = useTheme();

  const [fromattedData] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;

    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: []
    };

    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary.main,
      data: []
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {

      totalSalesLine.data = [
        ...totalSalesLine.data,
        {
          x: month,
          y: totalSales
        }
      ]

      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        {
          x: month,
          y: totalUnits
        }
      ]
    });

    return [[totalSalesLine, totalUnitsLine]]
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Chart of daily sales" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
            data={fromattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200]
                  }
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200]
                  }
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1
                  },
                  text: {
                    fill: theme.palette.secondary[200]
                  }
                },

              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200]
                }
              },
              toolTip: {
                container: {
                  color: theme.palette.primary.dark,
                },

              }
            }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: 'middle'
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: 'middle'
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={

              [
                {
                  anchor: 'top-right',
                  direction: 'column',
                  justify: false,
                  translateX: 50,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                      }
                    }
                  ]
                }
              ]
            }
          />
        ) : <>Loading...</>}
      </Box>
    </Box>
  )
}
