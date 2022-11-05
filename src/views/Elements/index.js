import {
    Box,
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";

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
}

const AddElementPage = () => { 
    
    const [projectList, setProjectList] = useState([]);
    const [projectData, setProjectData] = useState("");

    const [levelList, setLevelList] = useState([]);
    const [levelData, setLevelData] = useState("");

    const [elementList, setElementList] = useState([]);
    const [elementData, setElementData] = useState("");

    // Form Data
    const [file, setFile] = useState(null);
    const [formValues, setFormValues] = useState(INIT_DATA);

    const fetchProjectData = async () => {
        await axios.get(BACKEND.ENDPOINT + "/app-data/list_all_projects").then(response => {
            setProjectList(response.data)
        })
    }

    const fetchLevelData = async () => {
        if (typeof(projectData.project_id) !== "undefined") {
            await axios.get(BACKEND.ENDPOINT + "/app-data/list_all_levels/" + projectData.project_id).then(response => {setLevelList(response.data.floors)})
        }
    }

    const fetchElementData = async () => {
        await axios.get(BACKEND.ENDPOINT+ "/app-data/list_all_add_elements").then(response => {setElementList(response.data)})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("image_file", file);
            formData.append("project_id", projectData.project_id);
            formData.append("floor_id", levelData.floor_id);
            formData.append("element_id", elementData.element_id);
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            const response = await axios.post(BACKEND.ENDPOINT + `/project/add-element`, formData, config);
            if (response.status === 200){
                alert("Element Added Successfully");
            } else {
                alert("Error Occured While Adding Element!");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);
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
        fetchElementData();
    }, [])

    useEffect(() => {
        fetchLevelData();
    }, [projectData]);

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
                    <FormControl size="small" sx={{mx: 1, minWidth: 120}}>
                        <InputLabel id="floorId-select-label">Level</InputLabel>
                        <Select labelId="floorId-select-label"
                            defaultValue={"FP000"}
                            name="floorId"
                            value={levelData}
                            onChange={(e) => setLevelData(e.target.value)}>
                                {levelList.map((levelData, index) => {
                                    return <MenuItem key={index} value={levelData}>{"Floor " + levelData.floor_no}</MenuItem>
                                })}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item>
                    <FormControl size="small" sx={{mx: 1, minWidth: 120}}>
                        <InputLabel id="elementName-select-label">Element</InputLabel>
                        <Select labelId="elementName-select-label"
                            // defaultValue={"EL001"}
                            // name="elementId"
                            value={elementData}
                            onChange={(e) => setElementData(e.target.value)}>
                                {elementList.map((elementData, index) => {
                                    return <MenuItem key={index} value={elementData}>{elementData.element_name}</MenuItem>
                                })}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField id="elementDescription-input" name="elementDescription" label="Element Description" type="text" multiline
                            rows={3}
                            value={
                                formValues.elementDescription
                            }
                            onChange={handleInputChange}/>
                    </Grid>
                    <Grid item>
                        <TextField id="elementRemarks-input" name="elementRemarks" label="Element Remarks" type="text" multiline
                            rows={3}
                            value={
                                formValues.elementRemarks
                            }
                            onChange={handleInputChange}/>
                    </Grid>
                    <Grid item>
                        <Typography sx={{mb: 2, color:"red"}}>Note: This Program Support Only PNG format. Please Convert The Plan File to PNG Format Before Uploading</Typography>
                        <Input fullWidth id="planImage-input" name="planImage" type="file"
                        onChange={handleFile}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" type="submit">Add Element</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default AddElementPage;

