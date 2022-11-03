import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import landing_l from '../../resources/landing_l.png';

const RootPage = () => {

    // const ResponsiveImage = () => {
    //     return (
    //         <picture>
    //         <source
    //           media="(max-width: 768px)"
    //           srcSet="image-url-768-cropped.jpeg 768w"
    //           sizes="768px"
    //         />
    //         <source
    //           srcSet="image-url-1280-big.jpeg 1280w"
    //           sizes="1280px"
    //         />
    //         <img alt="landing" src={landing_l} />
    //       </picture>
    //     );
    //    }

    return (

        
        <div        
            style={{
                height: '94%',
                position: 'absolute',
                left: 0,
                width: '100%',
                overflow: 'hidden',
                backgroundImage: `url(${landing_l})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",

              }}
        >   
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{mb: 40}}>
            <Typography variant="h1" gutterBottom sx={{fontFamily: "Helvetica", fontWeight: 500, color: "#3C4048"}}>
                Take Records In An Easier Way...
            </Typography>
            <Button variant='contained' color='warning' sx={{minHeight: 50, minWidth: 250, borderRadius: "15px"}}>Get Started</Button>
        </Box>
            
        </div>
    )
}

export default RootPage;