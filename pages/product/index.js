import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { product } from '@/Reducer/reducer';


// MUI Imports
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Button } from '@mui/material';
import Link from 'next/link';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Index = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState(''); // For Search Product


    // Get Product For Use Query
    const getProductdata = async () => {
        const response = await dispatch(product()); // Call Product function
        return response?.payload;
    };

    // Use Query Area
    const { isLoading, isError, data: productdata, error, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: getProductdata, // This line of code works as same as useEffect()
    });


    // Handle For Search
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    // Filter products based on search query
    const filteredProducts = productdata?.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // For Loading
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>Loading...</h1>

            </div>

        );
    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>

            <div className="container" style={{ marginTop: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>
                    All Products
                </h1>
                <Box sx={{ flexGrow: 1 }}>
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{
                            marginTop: '20px',
                            marginBottom: '10px',
                            width: '100%',
                            padding: '15px',
                            borderRadius: '25px',
                            border: '1px solid #ccc',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            fontSize: '16px',
                            boxSizing: 'border-box',
                            backgroundImage: 'linear-gradient(to right, #ffffff, #f2f2f2)',
                            backgroundSize: '200% auto',
                            transition: 'background-position 0.5s ease',
                        }}
                    />
                    <Grid container spacing={2} justifyContent="center">
                        {filteredProducts.length !== 0 ? (
                            filteredProducts.map((value) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={value._id}>
                                    <Card
                                        sx={{
                                            maxWidth: 345,
                                            borderRadius: '10px',
                                            boxShadow: '0px 1px 1px 1px',
                                            overflow: 'hidden',
                                            height: '550px',
                                        }}
                                    >
                                        <CardActionArea style={{ height: '500px' }}>
                                            <CardMedia component="img" height="250" image={value?.image} alt="trainer" />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {value?.title}
                                                </Typography>
                                                <Typography gutterBottom variant="p" component="div">
                                                    Price: {value?.price}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Link href={`/product/${value.id}`} className='btn btn-info'>Details</Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <>
                                <p>No Data Found</p>
                            </>
                        )}
                    </Grid>
                </Box>
            </div>

        </>
    );
};

export default Index;