import React, { useState } from "react";
import { fetchProfileDetails } from "@/customHooks/query/cms.query.hooks";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const Profile = () => {
const {data, isPending: isPendingCategories, isError: isErrorCategories} = fetchProfileDetails()

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "1250px",
          margin: "0 auto",
          paddingTop: "30px",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={12} >
              <Card sx={{ maxWidth: 345, margin: "0 auto" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${data?.profile_pic}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   {data?.first_name} {data?.last_name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {data?.email}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Role: {data?.role_data.role}
                  </Typography>
                </CardContent>
              </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
