import {Paper, Box, Container, Typography} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';

const Footer = () => {
    return(
        <Paper sx={{
            backgroundColor: '#1976D2',
            marginTop: 'calc(5% + 40px)',
            position: 'fixed',
            bottom: 0,
            width: '100%'
            }} component="footer" square variant="outlined">
                <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my:1
          }}
        >
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'whitesmoke' }} />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
        >
          <Typography variant="caption" color="whitesmoke">
            Copyright ©2022. Ishini Nimasha
          </Typography>
        </Box>
      </Container>
            </Paper>
    )
}

export default Footer