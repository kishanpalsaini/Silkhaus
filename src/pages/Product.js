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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Slide from '@mui/material/Slide';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// Kishanpal-saini
const baseUrl = "https://api.escuelajs.co/api/v1";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const successToaster = (data) => toast.success(data);

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [shortByPrice, setShortByPrice] = React.useState("asc");
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [dialogOpenClose, setDialogOpenClose] = React.useState(false);
  const [setsliderImages, setSetsliderImages] = useState([])
  const [cartList, setCartList] = useState([])
  const [drawer, setDrawer] = useState(false)
  const [cartTotalPrice, setCartTotalPrice] = useState(0)
  const [paginationCount, setPaginationCount] = useState(0)
  const [paginationList, setPaginationList] = useState([])
  const [paginationPerPage, setPaginationPerPage] = useState(10)


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

  useEffect(() => {
    const temp = [...productList]
    const res = temp.slice(paginationCount,paginationCount+paginationPerPage)
    setPaginationList(res)
    console.log("res :", res)
  }, [productList, paginationCount])
  

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
    successToaster("Thank You for your interest in our product.")
  }
  const handleDialogClose = () => {
    setDialogOpenClose(false);
  }

  const hanldeAddCart = (event, item) => {
    event.stopPropagation()
    const temp = [...cartList]
    const check = temp.filter(product => product.id === item.id)
    if (!check.length) {
      item.quantity = 1;
      item.totalPrice = item.price;
      setCartTotalPrice(cartTotalPrice + item.price)
      temp.push(item)
      setCartList(temp)
    }
    console.log("cart :", check, cartList, temp)
  }

  const toggleDrawer = (newOpen) => () => {
    setDrawer(newOpen);
  };

  const handleIncreaseCartQuantity = (item) => {
    const temp = [...cartList]
    temp.forEach(product => {
        if(product.id === item.id){
            product.quantity += 1;
            product.totalPrice += product.price;
            setCartTotalPrice(cartTotalPrice + product.price)
        }
    });
        setCartList(temp)
      console.log("handleIncreaseCartQuantity :", cartList, temp)
  }

  const handleDecreaseCartQuantity = (item) => {
    let temp = [...cartList]
    temp.forEach(product => {
        if(product.id === item.id){
            product.quantity -= 1;
            product.totalPrice -= product.price;
            setCartTotalPrice(cartTotalPrice - product.price)
        }
        if(product.quantity === 0){
            temp = temp.filter(ele => ele.id !== product.id)
        }
    });
        setCartList(temp)
      console.log("handleDecreaseCartQuantity :", cartList, temp)

  }

  const hanldeBuyCartItems = () => {
    successToaster("Order Placed")
  }

  const handlePagination = (e,page) => {
    console.log("handlePagination e,page :", e,page)
    const temp = (page - 1) * paginationPerPage
    setPaginationCount(temp)
  }

  return (
    <div>
      <Container maxWidth="lg">
        <div className="" style={{ textAlign: "right" }}>
          <Badge
            badgeContent={cartList.length}
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={toggleDrawer(true)}
          >
            <AddShoppingCartIcon />
          </Badge>
          <Drawer
            anchor="right"
            open={drawer}
            onClose={toggleDrawer(false)}
            sx={{ p: 3 }}
          >
            <h1 style={{ padding: "0px 10px", marginBottom: "0px" }}>
              Cart List
            </h1>

            {cartList?.map((item) => (
              <Card
                style={{
                  display: "flex",
                  margin: "10px",
                  alignItems: "center",
                  gap: "10px",
                  padding: "0px 10px",
                }}
              >
                <div style={{ maxWidth: "80px" }}>
                  <img
                    src={item.images[0]}
                    alt=""
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <div style={{ maxWidth: "50%" }}>
                  <h5 style={{ margin: "0px" }}>{item.title}</h5>
                  <p style={{ margin: "0px" }}>${item.price}</p>
                </div>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <Box
                    sx={{
                      padding: "5px",
                      backgroundColor: "#ddd",
                      borderRadius: "25px",
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => handleIncreaseCartQuantity(item)}
                  >
                    <AddIcon />
                  </Box>
                  {item.quantity}
                  <Box
                    sx={{
                      padding: "5px",
                      backgroundColor: "#ddd",
                      borderRadius: "25px",
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => handleDecreaseCartQuantity(item)}
                  >
                    <RemoveIcon />
                  </Box>
                </div>

                <div style={{}}>
                  <p style={{ fontSize: "12px", margin: "0px" }}>Total Price</p>
                  <h5 style={{ margin: "0px", textAlign: "center" }}>
                    ${item.totalPrice}
                  </h5>
                </div>
              </Card>
            ))}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                backgroundColor: "#ddd",
                alignItems: 'center'
              }}
            >
              <Button
                variant="contained"
                onClick={(e) => hanldeBuyCartItems()}
              >
                Buy Now
              </Button>  
               <h5 style={{ margin: "0px", textAlign: "center" }}>      
               <span>Total Amount</span> ${cartTotalPrice}
                  </h5>
            </Box>
          </Drawer>
        </div>
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
                {filterByCategory.length &&
                  filterByCategory?.map((item) => (
                    <MenuItem value={item.name} key={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                {/* <MenuItem value={"Clothes"}>Clothe</MenuItem>
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
          {paginationList?.map((item) => (
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{ maxWidth: 345, height: "100%" }}
                key={item.id}
                onClick={() => handleDialogOpen(item)}
              >
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

                    <Button
                      sx={{ mt: 2 }}
                      variant="contained"
                      onClick={(e) => hanldeAddCart(e, item)}
                    >
                      Add to cart
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        
    <Stack spacing={2} sx={{m: 2, textAlign: "right", width: '100%'}}>
      <Pagination sx={{marginLeft: 'auto !important'}} count={ Math.ceil(productList.length/10)} onChange={handlePagination} />
    </Stack>
      </Container>

      <Dialog
        // fullScreen
        fullWidth
        maxWidth="xl"
        open={dialogOpenClose}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
        style={{ overflow: "hidden" }}
      >
        {/* <AwesomeSlider cssModule={AwesomeSliderStyles}>
    {
        setsliderImages.map((item) => (
            <div data-src={item} />
        ))
    }
  </AwesomeSlider> */}

        <Slider {...settings}>
          {setsliderImages.map((item) => (
            <div className="slider-img-wrapper">
              <img src={updateImgUrl(item)} alt="product-img" />
            </div>
          ))}
        </Slider>
      </Dialog>
    </div>
  );
};

export default Product;
