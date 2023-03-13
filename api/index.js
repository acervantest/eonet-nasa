
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());


app.get('/fires', (req, res) => {
    
    // destructuring month and year params 
    const { month, year } = req.query;
    
    // validates the service gets both params, sending a message otherwise
    if(!month || !year) {
        return res.status(418).send({ message: 'We need a month and a year!' });
    }
    
    // months mapping to number values for using later in API request
    const months = {'JAN': 01,'FEB': 02,'MAR': 03,'APR': 04,'MAY': 05,'JUN': 06,
                    'JUL': 07,'AUG': 08,'SEP': 09,'OCT': 10,'NOV': 11,'DEC': 12 }

    // validates month is valid format               
    if(month in months === false) {
        return res.status(418).send({ message: 'Params format should be month: MMM and year: YYYY' });
    }

    const month_string = months[month];

    // eonet uri request 
    const eonetReq = `https://eonet.gsfc.nasa.gov/api/v3/events?start=${year}-${month_string}-01&end=${year}-${month_string}-31`;
    

    axios({ method: 'get', url: eonetReq })
    .then( response => {    
        
        const { events } = response.data; 
        
        // eonet events response gets destructured and filtered to obtain wildfires information
        return events.filter( event => {
            return event.categories[0].id === 'wildfires'
        })
        .map( wildfire => {
            return { ['title']: wildfire.title, ['coordinates']: wildfire.geometry[0].coordinates }
        }) 

    })
    .then( async result => {

        let fires = []

        // using opencagedata geocoding API convert coordinates to a place and  
        // set 3 letter country string abbreviation to the response object
        await Promise.all( result.map( async fire => {
        
            const [ lng, lat ] = fire.coordinates;

            const openCageDataKey = '54764fc4115b46fcaea231a72dc3d42f' 

            let openCageUriReq = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${openCageDataKey}`
            
            await axios.get(openCageUriReq).then( response => {
                let { components } = response.data.results[0];
                const countryAcronym = components["ISO_3166-1_alpha-3"]
                fires.push({ title: fire.title, country: countryAcronym })
            })   
        }))  
        
        // the response gets sorted alphabetically by country acronym
        const sortedFires = fires.sort((a,b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0))
        
        return res.send( { wildfires: sortedFires } )
    })    
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})