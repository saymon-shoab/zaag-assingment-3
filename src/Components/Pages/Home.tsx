import React, { useState } from 'react';
import { Button, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
const Home: React.FC = () => {
    let navigate = useNavigate();
    const [name, setName] = useState<String>('')
    console.log(name)
    const handleChange = (e:any) => {
        setName(e.target.value)    
    }
    const onSubmit = () => {
        navigate(`/country/${name}`)
    }
    return (

        <div style={{marginLeft: "430px", marginTop:'50px', display:'flex'}}>
            <div style={{alignItems:'center'}}>
                <TextField
                   sx={{width:'350px'}} 
                   size='medium'
                   variant="standard"
                   placeholder="Enter a country name"
                   value={name}
                   onChange={handleChange}
                />
            <Button
             variant="contained"
             disabled={!name}
             onClick={onSubmit}
             >
            Search
            </Button>
            </div>
        </div>
    );
};

export default Home;