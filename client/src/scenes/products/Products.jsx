import { useState } from "react";
import { useGetProductsQuery } from "state/api"
import { Header } from "components";
import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function Products() {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PRODUCTS"
        subTitle="See your list of products"
      />
      {data || !isLoading ? (
        <Box
          mt="20p"
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%
          "
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4"
            }
          }}
        >
          {data.map((product) => {
            return <Product
              key={product._id}
              product={product} />
          })}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  )
}


const Product = ({ product }) => {
  const {
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
  } = product;
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem"
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography
          variant="h5"
          component="div"
        >
          {name}
        </Typography>
        <Typography
          sx={{ mb: "1.5rem" }}
          color={theme.palette.secondary[400]}
        >
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300]
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supplay Left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {stat[0].yearlySalesTotal}</Typography>
          <Typography>Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

