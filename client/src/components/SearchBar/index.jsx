import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function SearchBar() {
  const [showDates, setShowDates] = useState(false); 

  const formik = useFormik({
    initialValues: {
      carClass: "",
      pickupDate: "",
      returnDate: "",
      minPrice: "",
      maxPrice: "",
    },
    validationSchema: Yup.object({
      carClass: Yup.string().required("Car class is required"),
      pickupDate: Yup.date()
        .min(new Date(), "Pick-up Date cannot be less than the current date")
        .required("Pick-up Date is required"),
      returnDate: Yup.date()
        .min(
          Yup.ref("pickupDate"),
          "Return Date must be greater than or equal to Pick-up Date"
        )
        .required("Return Date is required"),
      minPrice: Yup.number()
        .min(1, "Minimum price must be greater than 0")
        .required("Minimum price is required"),
      maxPrice: Yup.number()
        .min(
          Yup.ref("minPrice"),
          "Maximum price must be greater than or equal to Minimum price"
        )
        .required("Maximum price is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleCarClassChange = (e) => {
    formik.handleChange(e);
    setShowDates(!!e.target.value);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F0F1CF",
        margin: "auto",
        padding: "2rem",
        borderRadius: "10px",
        marginTop: "10%",
        width: "70%",
      }}
    >
      <div style={{ width: "70%", margin: "auto" }}>
        <h1 style={{ color: "#9EBCF3" }}>Find suitable vehicle</h1>
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
      </div>
    </Box>
  );
}

export default SearchBar;
