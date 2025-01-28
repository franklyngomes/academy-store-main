import React, { FC, useState, useEffect } from 'react'
import {
  Typography,
  Paper,
  Button,
  TextField,
  Stack,
  Avatar,
  Input,
  Box,
  CircularProgress,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { UpdateProps } from "@/interface/cms.interface";
import { useRouter } from 'next/router';
import { updateMutation } from '@/customHooks/query/cms.query.hooks';
import { fetchProductQuery } from '@/customHooks/query/cms.query.hooks';

const ProductUpdate = () => {
  const router = useRouter();
  const { slug } = router.query;
  const id = slug as string;

  const {
    data: product,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = fetchProductQuery(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting},
  } = useForm<UpdateProps>();

  const { mutate, isPending } = updateMutation();
  const [image, setImage] = useState<string | File | null>(null);

  useEffect(() => {
    if (!isPending && !isErrorCategories && product) {
      setValue("title", product.title);
      setValue("description", product.description);
    }
  }, [product, setValue, isPending, isErrorCategories]);

  const sendData = async (e:any) => {
    const formdata = new FormData();
    formdata.append("id", id as string);
    formdata.append("title", e.title);
    formdata.append("description", e.description);

    if (image) {
      formdata.append("image", image);
    }

    mutate(formdata, {
      onSuccess: () => {
        toast.success("Product Data Updated Successfully");
        router.push("/cms/list");
      },
      onError: () => {
        toast.error("Something Went Wrong!Product Data not updated");
      },
    });
  };

  if (isPendingCategories) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (isErrorCategories) {
    return (
      <Typography variant="h6" align="center" color="error">
        Failed to load product details. Please try again later.
      </Typography>
    );
  }
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "60vh", padding: 20 }}
      >
        <Paper
          style={{
            width: "100%",
            maxWidth: 500,
            padding: 20,
            borderRadius: 15,
            border: "1px solid #000",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{ marginBottom: 10 }}
          >
            Update Product
          </Typography>
          <form>
            <TextField
              {...register("title", { required: "Title is required" })}
              label="Title"
              placeholder="Enter product title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              {...register("description", {
                required: "Description is required",
              })}
              label="Description"
              placeholder="Enter product description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ marginTop: 1 }}
            >
              <Avatar
                alt="Product Picture"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : product?.image
                    ? `https://wtsacademy.dedicateddevelopers.us/uploads/product/${product.image}`
                    : ""
                }
                sx={{ width: 90, height: 90, border:'1px solid gray' }}
              />
              <label htmlFor="product-pic-upload">
                <Input
                  accept="image/*"
                  id="product-pic-upload"
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
            </Stack>
            <Button
              variant="contained"
              onClick={handleSubmit(sendData)}
              sx={{ mt: 3, color: "#fff",textTransform: "capitalize" }}
              disabled={isSubmitting}
            >
              Save
            </Button>
          </form>
        </Paper>
      </Grid>
     </>
  );
};

export default ProductUpdate