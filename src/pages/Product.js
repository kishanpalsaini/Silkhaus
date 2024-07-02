import React, { useState, useEffect } from "react";
import { getRequest } from "../services/apis/axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Slide from '@mui/material/Slide';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Kishanpal-saini
const baseUrl = "https://api.escuelajs.co/api/v1";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
const Product = () => {
  const [productList, setProductList] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [shortByPrice, setShortByPrice] = React.useState("asc");
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [dialogOpenClose, setDialogOpenClose] = React.useState(false);
  const [setsliderImages, setSetsliderImages] = useState([])

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    getData(`${baseUrl}/products`);
    getCategories(`${baseUrl}/categories`);
  }, []);

  const getData = async (url) => {
    const data = await getRequest(url);
    console.log("temp :", data);
    setProductList(data);
    setApiData(data);
  };

  const getCategories = async (url) => {
    const data = await getRequest(url);
    console.log("getCategories :", data);
    setFilterByCategory(data);
  };

  const getFilterData = async (price, category) => {
    const url = `${baseUrl}/products?sort=${price}&filter=${category}&page=1&limit=10`
    const data = await getRequest(url);
    console.log("getFilterData :", data);
  }

  const updateImgUrl = (str) => {
    // const array = await JSON.parse(str);
    const url = str.replace(/[\[\]"]+/g, "");
    // const url = array[0];
    return url;
  };

  const customSearch = (str) => {
    const result = apiData?.filter((item) => item.title === str);
    console.log("customSearch :", result, str);
    result.length ? setProductList(result) : setProductList(apiData);
  };

  const handleAutoSearch = (event, val) => {
    // const str = await e.target.value
    console.log("handleAutoSearch", event, event.target, val);
    customSearch(val);
    // debugger
  };

  const handleShortByPrice = (event) => {
    setShortByPrice(event.target.value);
  };

  const handleFilterByCategory = (event) => {
    setCategoryValue(event.target.value);
    getFilterData(shortByPrice, event.target.value)
  };


  const handleDialogOpen = (cardData) => {
    setSetsliderImages(cardData.images)
    console.log("setSetsliderImages ", cardData.images)
    setDialogOpenClose(true);
  }
  const handleDialogClose = () => {
    setDialogOpenClose(false);
  }

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ m: 2 }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              onInputChange={handleAutoSearch}
              options={apiData.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={2} sx={{ m: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Short By Price
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={shortByPrice}
                label="Short By Price"
                onChange={handleShortByPrice}
              >
                <MenuItem value={"asc"}>High to Low</MenuItem>
                <MenuItem value={"desc"}>Low to High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2} sx={{ m: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Short By categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryValue}
                label="Short By categories"
                onChange={handleFilterByCategory}
              >
                {filterByCategory.length && filterByCategory?.map((item) => (
                  <MenuItem value={item.name} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
                {/* <MenuItem value={"Clothes"}>Clothes</MenuItem>
                <MenuItem value={"Electronics"}>Electronics</MenuItem>
                <MenuItem value={"Furniture"}>Furniture</MenuItem>
                <MenuItem value={"Shoes"}>Shoes</MenuItem>
                <MenuItem value={"Miscellaneous"}>Miscellaneous</MenuItem>
                <MenuItem value={"Electronics"}>Electronics</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {productList?.map((item) => (
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ maxWidth: 345, height: "100%" }} key={item.id} onClick={() => handleDialogOpen(item)}>
                <CardActionArea sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={updateImgUrl(item?.images[0])}
                    // image={item.category.image}
                    category
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      
      <Dialog
        // fullScreen
        fullWidth
        maxWidth="lg"
        open={dialogOpenClose}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
      >
     
     {/* <AwesomeSlider cssModule={AwesomeSliderStyles}>
    {
        setsliderImages.map((item) => (
            <div data-src={item} />
        ))
    }
  </AwesomeSlider> */}
  
  <Slider {...settings}>
  {
        setsliderImages.map((item) => (
        <div className="slider-img-wrapper">
            <img src={updateImgUrl(item)} />
        </div>
        ))
    }
    </Slider>
      </Dialog>
    </div>
  );
};

export default Product;
