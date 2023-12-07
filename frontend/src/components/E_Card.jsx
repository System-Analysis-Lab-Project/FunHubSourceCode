import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { RatingStars } from "./RatingStars";

/* eslint-disable react/prop-types */
export default function E_Card({ product, id }) {
  const { image, name, price, description, rating, numReviews, countInStock } =
    product;
  const showReviewsText = true;
  return (
    <>
      <Card className="w-72 bg-white m-auto shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl dark:bg-[#151725]">
        <Link to={`/products/${id}`}>
          <CardHeader
            shadow={false}
            floated={false}
            className="h-100 dark:bg-[#242635]"
          >
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography
                color="blue-gray"
                className="font-medium dark:text-white"
              >
                {name}
              </Typography>
              <Typography
                color="blue-gray"
                className="font-medium ml-6 dark:text-white"
              >
                ${price}
              </Typography>
            </div>
            <div
              style={{ maxHeight: "5rem", overflow: "hidden" }}
              className="mb-2"
            >
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75 dark:text-white"
              >
                {description}
              </Typography>
            </div>
            <RatingStars
              rating={rating}
              reviews={numReviews}
              showText={showReviewsText}
            />
          </CardBody>
        </Link>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-700"
            disabled={!countInStock}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
