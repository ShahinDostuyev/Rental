import Layout from "../../layout/Layout";
import CarCard from "../../components/CarCard";
import Grid from "@mui/material/Grid";
import SearchBar from "../../components/SearchBar";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Fleet() {
  const [showDates, setShowDates] = useState(false); 

  // const formik = useFormik({
  //   initialValues: {
  //     carClass: "",
  //     pickupDate: "",
  //     returnDate: "",
  //     minPrice: "",
  //     maxPrice: "",
  //   },
  //   validationSchema: Yup.object({
  //     carClass: Yup.string().required("Car class is required"),
  //     pickupDate: Yup.date()
  //       .min(new Date(), "Pick-up Date cannot be less than the current date")
  //       .required("Pick-up Date is required"),
  //     returnDate: Yup.date()
  //       .min(
  //         Yup.ref("pickupDate"),
  //         "Return Date must be greater than or equal to Pick-up Date"
  //       )
  //       .required("Return Date is required"),
  //     minPrice: Yup.number()
  //       .min(1, "Minimum price must be greater than 0")
  //       .required("Minimum price is required"),
  //     maxPrice: Yup.number()
  //       .min(
  //         Yup.ref("minPrice"),
  //         "Maximum price must be greater than or equal to Minimum price"
  //       )
  //       .required("Maximum price is required"),
  //   }),
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });

  // const handleCarClassChange = (e) => {
  //   formik.handleChange(e);
  //   setShowDates(!!e.target.value);
  // };
  const cars = [
    {
      imageUrl: "https://www.topgear.com/sites/default/files/2022/07/6_0.jpg",
      price: 250,
      date: new Date(),
      model: "Bmw IX",
      mileage: 1000,
    },
    {
      imageUrl: "https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FUSION_2020.png",
      price: 40,
      date: new Date(),
      model: "Ford Fusion",
      mileage: 56000,
    },
    {
      imageUrl: "https://www.usnews.com/cmsmedia/12/be/5c7f3dfb4a12ab0795a9ba8144b5/2023-acura-integra-a-spec-2.jpg",
      price: 160,
      date: new Date(),
      model: "Acura NSX",
      mileage: 34000,
    },
    {
      imageUrl: "https://cdn.jdpower.com/Average%20Weight%20Of%20A%20Car.jpg",
      price: 130,
      date: new Date(),
      model: "Mercedes C class",
      mileage: 23000,
    },
    {
      imageUrl: "https://www.kia.com/content/dam/kia/us/en/home2-0/mtf-carousel/sedan/k5/kia_k5_2024_large-middle.png",
      price: 90,
      date: new Date(),
      model: "Kia K5",
      mileage: 17000,
    },
    {
      imageUrl: "https://assets-global.website-files.com/63d04d4b1b28345af4504ddc/643833d4a87446f67ecf20cf_Toyota_63d0517997cbdf9598476dde_Toyota.webp",
      price: 120,
      date: new Date(),
      model: "Toyota Camry",
      mileage: 36000,
    },
    {
      imageUrl: "https://hips.hearstapps.com/hmg-prod/images/2022-gr86-premium-trackbred-002-1628887849.jpg?crop=0.530xw:0.796xh;0.300xw,0.0962xh&resize=1200:*",
      price: 80,
      date: new Date(),
      model: "Toyota Corolla",
      mileage: 11000,
    },
    {
      imageUrl: "https://cloudfront-us-east-1.images.arcpublishing.com/tgam/2XCT3JN7ZRGMNAFSMZM2RSTH2I.jpeg",
      price: 70,
      date: new Date(),
      model: "Honda Civic",
      mileage: 6000,
    },
    {
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcY_tnMWC5_tR7KdE2Gh_emoRmU6UVf5Ob9w&usqp=CAU",
      price: 140,
      date: new Date(),
      model: "Ford Mustang",
      mileage: 5000,
    },
  ];

  return (
    <Layout>
      <div style={{backgroundColor: "#d8d8d8",}}>
      {/* <div style={{ width: "70%", margin: "auto" }}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="carClass"
            name="carClass"
            label="Car Class"
            value={formik.values.carClass}
            onChange={handleCarClassChange} // Use the custom change handler
            error={formik.touched.carClass && Boolean(formik.errors.carClass)}
            helperText={formik.touched.carClass && formik.errors.carClass}
            margin="normal"
          />
          {showDates && (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  id="pickupDate"
                  name="pickupDate"
                  label="Pick-up Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  value={formik.values.pickupDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.pickupDate &&
                    Boolean(formik.errors.pickupDate)
                  }
                  helperText={
                    formik.touched.pickupDate && formik.errors.pickupDate
                  }
                  margin="normal"
                />
                <span style={{ margin: "0 10px" }}>&#x2192;</span>
                <TextField
                  id="returnDate"
                  name="returnDate"
                  label="Return Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="date"
                  value={formik.values.returnDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.returnDate &&
                    Boolean(formik.errors.returnDate)
                  }
                  helperText={
                    formik.touched.returnDate && formik.errors.returnDate
                  }
                  margin="normal"
                />
              </div>
            </>
          )}
          {showDates && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                id="minPrice"
                name="minPrice"
                label="Min Price"
                type="number"
                value={formik.values.minPrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.minPrice && Boolean(formik.errors.minPrice)
                }
                helperText={formik.touched.minPrice && formik.errors.minPrice}
                margin="normal"
                inputProps={{
                  step: 10,
                }}
              />
              <span style={{ margin: "0 10px" }}>&#x2192;</span>
              <TextField
                id="maxPrice"
                name="maxPrice"
                label="Max Price"
                type="number"
                value={formik.values.maxPrice}
                onChange={formik.handleChange}
                error={
                  formik.touched.maxPrice && Boolean(formik.errors.maxPrice)
                }
                helperText={formik.touched.maxPrice && formik.errors.maxPrice}
                margin="normal"
                inputProps={{
                  step: 10,
                }}
              />
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "1rem",
                backgroundColor: "#9EBCF3",
                color: "#0B0909",
                borderRadius: 15,

                "&:hover": {
                  color: "#0B0909",
                  backgroundColor: "#04AA6D",
                },
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div> */}
        <Grid
        sx={{
          width: "70%",
          margin: "auto",
        }}
        container
        margingTop={2}
        paddingLeft={4}
      >
        {cars.map((car, index) => (
          <Grid
            item
            spacing={2}
            marginTop={2}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            key={index}
          >
            <CarCard carInfo={car} />
          </Grid>
        ))}
      </Grid>
      </div>
      
    </Layout>
  );
}
