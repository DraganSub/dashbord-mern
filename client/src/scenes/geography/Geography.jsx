import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useGetGeographyQuery } from "state/api";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";

export default function Geography() {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();
  console.log("🚀 ~ file: Geography.jsx:10 ~ Geography ~ data:", data)
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Geography" subTitle="Find where your users are located." />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        {data ? <>
          <ResponsiveChoropleth
            data={data}
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
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 50]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={true}
            graticuleLineWidth={0}
            borderWidth={1.3}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 2,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
          />

        </> : <>Loading...</>}
      </Box>
    </Box>
  )
}
