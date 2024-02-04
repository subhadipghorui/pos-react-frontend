import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, TextField, Button, MenuItem, Card, CardMedia } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../../store/rootStore';


// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  category_id: Yup.string().required('Category is required'),
  price: Yup.number().required('Price is required').min(0, 'Minimum price is 0'),
  stock: Yup.number().required('Email is required').min(0, 'Minimum stock is 0'),
  image: Yup.mixed().test('fileType', 'Unsupported file format', (value:any) => {
    if (value !== ""){
      const supportedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
      return supportedFormats.includes(value.type);
    }
    return true; // skip this
  }).test('fileSize', 'File size is too large (max: 5000KB)', (value:any) => {
    if (value !== "") {
      return value.size <= 5000000; // 5000KB in bytes
    }
    return true; // skip this
  }), 
})


const ProductEdit = () => {
  const [imageUrl, setImageUrl] = useState<string|null>(null)
  const [categories, setCategories] = useState<any[]>([])
  const { rootStore: { productStore } } = useStore();
  const { getData, initForm,updateData } = productStore;
  const { id } = useParams()

  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors }, reset, setError } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      category_id: "",
      price: 0,
      stock: 0,
      image: "",
    }
  })

  const onSubmit = async (data:any) => {
    try {
     if(id){
      const formData = new FormData();
      Object.keys(data).map(key => {
       if(key=="image"){
        if(data[key] !== "") formData.append(key, data[key]);
       }else{
        formData.append(key, data[key]);
       }
      })
      const resData = await updateData(id, formData)
      if (resData){
        reset()
        navigate('..')
      }
     }
    } catch (error:any) {
      Object.keys(error?.data).map((e:any) => {
        setError(e, {
          type: 'manual', // Use 'manual' for manually triggered errors
          message: error?.data[e],
        });
      })
    }
  }
  
  const initFormData = async () => {
    try {
      const resData = await initForm();
      setCategories(resData.data.categories);

      if(id){
        const resData = await getData(id)
        console.log(resData.data.product)
        let {image, category, ...formData} = resData.data.product
        setImageUrl(process.env.REACT_APP_STORAGE_URL +"/"+image)
        reset(formData)
      }else{
        navigate(-1)
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error while fetching data:', error);
    }
  }
  useEffect(() => {
    initFormData()
  }, [id])

  
  return (
    <Box sx={{ width: '100%' }}>
    <h4>Edit</h4>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={6}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="name"
              label="Product name"
              variant="filled"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              select
              id="category_id"
              label="Category"
              variant="filled"
              error={!!errors.category_id}
              helperText={errors.category_id?.message}
            >
              {categories.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="price"
              label="Price"
              variant="filled"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="stock"
              label="Stock"
              variant="filled"
              error={!!errors.stock}
              helperText={errors.stock?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        {imageUrl && <Card sx={{ maxWidth: 345, my: 5 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="auto"
          image={imageUrl ?? ""}
        />
      </Card>}
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              id="image"
              type='file'
              label="Image"
              variant="filled"
              focused
              onChange={(e: any) => {
                field.onChange(e.target.files[0])
                e.target.files.length > 0 ? setImageUrl(URL.createObjectURL(e.target.files[0])) : setImageUrl(null)
              }}
              error={!!errors.image}
              helperText={errors.image?.message}
            />
          )}
        />
      </Grid>
    </Grid>
    <Button sx={{ mt: 2 }} type="submit" variant="contained" color="success">
      Save
    </Button>
    <Button sx={{ mt: 2, ml: 2 }} variant="contained" onClick={() => navigate(-1)}>
      Back
    </Button>
  </form>
</Box>
  )
}

export default observer(ProductEdit)