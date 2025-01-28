import { listQuery } from '@/customHooks/query/cms.query.hooks';
import { ListProps } from '@/interface/cms.interface';
import React, { FC, useState } from 'react'
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { productImg } from '@/api/axios/axios';
import Grid from "@mui/material/Grid";
import Link from 'next/link';
import { FieldValues } from "react-hook-form";
import SweetAlertComponent from '@/ui/SweetAlert';
import { deleteMutation } from '@/customHooks/query/cms.query.hooks';

const List: FC<ListProps> = ({  }) => {
  const [page, setPage] = useState(1)
  const perPage = 10
    const {data:list, isPending: isPendingCategories, isError: isErrorCategories} = listQuery(page, perPage)
    const [modal, setModal] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);
    const { mutate, isPending } = deleteMutation();

    const totalPages = list?.totalPages || 1
    const products = list?.data ||  []
    const handleDelete = async (formData: FieldValues) => {
      const formdata = new FormData();
      formdata.append("id", deleteId);
      mutate(formdata, {});
      setModal(false);
      console.log(formData);
    };
    const handleNextPage = () => {
      if (page < totalPages) setPage((prev) => prev + 1);
    };
  
    const handlePreviousPage = () => {
      if (page > 1) setPage((prev) => prev - 1);
    };
  return (
    <>
    <Grid container spacing={2}  sx={{maxWidth: '1250px', margin: '0 auto', marginTop: "30px" }}>
      {list?.data?.map((item, index) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={2}
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card sx={{ width: 200}} key={index}>
              <CardMedia
              sx={{ height: 200}}
                image={productImg(item.image)}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle2" component="span">
                  {item.title}
                </Typography>
              </CardContent>
              <CardActions>
              <Link href={`/cms/list/${item._id}`} key={index}>
                <Button size="small">Details</Button>
              </Link>
                <Button
                  onClick={() => {
                    setDeleteId(item._id), setModal(true);
                  }}
                  size="small"
                >
                  delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
    {modal && (
      <SweetAlertComponent
        confirm={handleDelete}
        cancel={() => setModal(false)}
        title="Are You Sure?"
        type="warning"
        subtitle="You will not be able to recover this product"
      />
    )}
   {products && (
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button
            variant="contained"
            disabled={page === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </Button>
          <Typography>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="contained"
            disabled={page === totalPages}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </Box>
      )}
  </>
  )
}

export default List;