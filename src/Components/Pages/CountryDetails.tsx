import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// interface InitiProps {
//     name: string
// }

interface countryProps{
    capital: string[],
    population: number,
    latlng: number[],
    flags: {
        svg: string
    }
}

interface weatherProps {
     temperature: number,
     weather_icons: string[],
     wind_speed: number,
     precip: number, 
}

const CountryDetails: React.FC = () => {
    const { name } = useParams<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
    const [countryDeatils, setCountryDeatils] = useState<countryProps>();
    // console.log('country details',countryDeatils);
    const [weatherDetails, setWeatherDetails] = useState<weatherProps>();
    console.log('weather data',weatherDetails);
    useEffect(() => {
        getCountryDetail()
    }, [])

    const getCountryDetail = async () =>{
        try{
          setLoading(true);  
          const url = `https://restcountries.com/v3.1/name/${name}`;
          const response = await axios(url);
          const data = response.data;
          setCountryDeatils(data.length> 1 ? data[2] : data[0])
          setLoading(false);
        }catch(error){
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(()=>{
        getWeatherInfo()
    },[])

    const getWeatherInfo = async () => {
          try{
            setWeatherLoading(true);
           const url = `http://api.weatherstack.com/current?access_key=6bffeda4580fe877ac708c03191f987f&query=${countryDeatils?.capital}`;
           const response = await axios(url);
           const data = response.data;
           setWeatherDetails(data.current)
           setWeatherLoading(false);
          }catch(error){
            setWeatherLoading(false)   
              console.log(error)
          }
    }

    return (
        <div style={{textAlign:'center', marginTop:'50px'}}>
       { loading? <p> country detail is loading... </p> :
        countryDeatils ?
             <Card sx={{margin:'auto', width:'30%'  }}>
     
             <CardMedia
               component="img"
               height="140"
               image={countryDeatils?.flags.svg}
               alt="green iguana"
             />
             <CardContent>
               <Typography sx={{textAlign:'start', textTransform:"uppercase"}} gutterBottom variant="h5" component="div">
                capital:  {countryDeatils?.capital[0]}
               </Typography>
               <Typography sx={{textAlign:'start'}} variant="body2" color="text.secondary">
                 Population: {countryDeatils?.population}
               </Typography>
               <Typography sx={{textAlign:'start'}} variant="body2" color="text.secondary">
                 Latitude: {countryDeatils?.latlng[0]}
               </Typography>
               <Typography sx={{textAlign:'start'}} variant="body2" color="text.secondary">
                 Longitude: {countryDeatils?.latlng[1]}
               </Typography> 
             </CardContent>
             <CardActions>
             { countryDeatils && <Button onClick={getWeatherInfo} size="small">weather info</Button>}
             </CardActions>
           </Card>
           : 
            <Typography sx={{textAlign:'center', color:'#f44336'}} variant="h5" color="text.secondary">
             Country details not found by name: {name}
             </Typography>
         
           }
           {
               weatherLoading ? <p> weather is loading...</p> :
               weatherDetails &&
               <Card sx={{margin:'auto', width:'30%'  }}>
     
               <CardMedia
                 component="img"
                 height="140"
                 image={weatherDetails?.weather_icons[0]}
                 alt="green iguana"
               />
               <CardContent>
                 <Typography sx={{textAlign:'start', textTransform:"uppercase"}} gutterBottom variant="h5" component="div">
                 Temperature:  {weatherDetails?.temperature}<sup>0</sup>
                 </Typography>
                 <Typography sx={{textAlign:'start'}} variant="body2" color="text.secondary">
                   wind speed: {weatherDetails?.wind_speed}
                 </Typography>
                 <Typography sx={{textAlign:'start'}} variant="body2" color="text.secondary">
                   precip: {weatherDetails?.precip}
                 </Typography>
               </CardContent>
              
             </Card>
           }
        </div>
    );
};

export default CountryDetails;