import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";

import * as BACKEND from '../../constants/routes';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const INIT_DATA = {
    floorNo: 0,
    floorRemarks: ""
}

const AddLevelPage = () => {

    const [projectList, setProjectList] = useState([]);
    const [projectData, setProjectData] = useState("");

    // Form Data
    const [formValues, setFormValues] = useState(INIT_DATA);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const floorData = {
            "floor_no": formValues.floorNo,
            "floor_remarks": formValues.floorRemarks,
            "elements": {}
        }
        await axios.post(BACKEND.ENDPOINT + `/project/add-floor?project_id=${projectData.project_id}`, floorData)
        .then(response => {
            if (response.status === 200) {
                alert("Flooor Added Successfully!");
            } else {
                alert("Some Error Occured While Adding the Floor");
            }
        })

    }

    const fetchProjectData = async () => {
        await axios.get(BACKEND.ENDPOINT + "/app-data/list_all_projects").then(response => {
            setProjectList(response.data)
        })
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    useEffect(() => {
        fetchProjectData();
    }, [])

    return (
        <Box sx={style}>
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="center" justify="center" direction="column"
                    rowSpacing={3}>
                    <Grid item>
                        <FormControl size="small" sx={{mx: 1, minWidth: 150}}>
                            <InputLabel id="projectName-select-label">Project</InputLabel>
                            <Select labelId="projectName-select-label"
                                value={projectData}
                                onChange={
                                    (e) => setProjectData(e.target.value)
                            }>
                                {
                                projectList.map((projectData, index) => {
                                    return <MenuItem key={index}
                                        value={projectData}>
                                        {
                                        projectData.project_name
                                    }</MenuItem>
                            })
                            } </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField id="floorNo-input" name="floorNo" label="Floor Number" type="number"
                            value={
                                formValues.floorNo
                            }
                            onChange={handleInputChange}/>
                    </Grid>
                    <Grid item>
                        <TextField id="floorRemarks-input" name="floorRemarks" label="Floor Remarks" type="text" multiline
                            rows={3}
                            value={
                                formValues.floorRemarks
                            }
                            onChange={handleInputChange}/>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" type="submit">Add Level</Button>

                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default AddLevelPage;

