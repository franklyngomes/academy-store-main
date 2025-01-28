import React, { FC } from 'react'
import {
    Stack,
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
  } from "@mui/material";
import { CreateProps } from '@/interface/cms.interface';
import { useForm } from 'react-hook-form';
import { createMutation } from '@/customHooks/query/cms.query.hooks';
import toast from 'react-hot-toast';


const index: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {  errors, isSubmitSuccessful, isSubmitting },
      } = useForm<CreateProps>();
      const { mutate, isPending } = createMutation();
      const [image, setImage] = React.useState<File | null>(null);
    
      const onSubmit = async (formData: CreateProps) => {
        const { title, description } = formData;
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        if (image) {
          formdata.append("image", image);
        } else {
            toast.error("Please upload an image");
          return;
        }
    
        mutate(formdata, {
          onSuccess: () => {
            reset();
            setImage(null);
            toast.success("Product created successfully!");
          },
        });
      };
  return (
<Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", background: "#f4f6f8", padding: 20 }}
    >
      <Paper style={{ width: "100%", maxWidth: 500, padding: 20 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ marginBottom: 20 }}
        >
          Add Product
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
            {...register("description", { required: "Description is required" })}
            label="Description"
            placeholder="Enter product description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            {...register("image", { required: "Image is required" })}
            type="file"
            variant="outlined"
            onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
            }}
            error={!!errors.image}
            helperText={errors.image?.message}
            fullWidth
            sx={{ backgroundColor: "white", borderRadius: "5px", mb: 2 }}
          />
          {image && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ marginBottom: "1rem", gap: "0.5rem" }}
            >
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                height={100}
                width="auto"
                style={{ borderRadius: "10px" }}
              />
              <Typography variant="caption" display="block">
                Selected file: {image.name}
              </Typography>
            </Stack>
          )}
          <Button variant='contained' onClick={handleSubmit(onSubmit)}  sx={{ mt: 3, fontSize: 14,textTransform: "capitalize", color: '#ffff' }} disabled={isSubmitting}>Add Product  {isSubmitting ? "Loading" : " "}</Button>
        </form>
      </Paper>
    </Grid>
  )
}

export default index;