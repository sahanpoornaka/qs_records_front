import React, {useRef, useMemo, useEffect, useState} from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';


import axios from "axios";

import * as BACKEND from '../../constants/routes';
import {IconButton, Tooltip} from "@mui/material";


const SCROLL_SENSITIVITY = 0.005;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.5;


const INIT_DATA = {
    refId: "A1",
    length: "1",
    width: "1",
    height: "1",
    qty: "1",
    times: "1",
    unit: "meters",
    remarks: ""
}

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

const MARKER_SIZE = 30;

const ZoomImage = ({recordData}) => {
    const [offset, setOffset] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [dragging, setDragging] = useState(false);

    const touch = useRef({x: 0, y: 0});

    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    // const observer = useRef(null);
    const background = useMemo(() => new Image(), [recordData.img_name]);

    // Paths
    const [doAddMarkers, setDoAddMarkers] = useState(false);
    const [pathObjs, setPathObjs] = useState([]);
    const [clickedCordinates, setClickedCordinates] = useState({x: 0, y: 0})

    // Modal Data
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setDragging(false);
    }

    // Form Data
    const [formValues, setFormValues] = useState(INIT_DATA);


    // This function returns the number between min and max values.
    // For example clamp(3,5,7) will return 5
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    const handleWheel = (event) => {
        const {deltaY} = event;
        setZoom((zoom) => clamp(zoom + deltaY * SCROLL_SENSITIVITY * -1, MIN_ZOOM, MAX_ZOOM));
    };

    const handleMouseMove = (event) => {
        if (dragging) {
            const {x, y} = touch.current;
            const {clientX, clientY} = event;
            // Calculate where the user is panning the image
            setOffset({
                x: offset.x + (x - clientX),
                y: offset.y + (y - clientY)
            });
            // Update the last position where user clicked
            touch.current = {
                x: clientX,
                y: clientY
            };
        }
    };

    const handleMouseDown = (event) => {
        const {clientX, clientY} = event;
        // Store the last position where user clicked
        touch.current = {
            x: clientX,
            y: clientY
        };
        setDragging(true);

        // Check Mouse Click
        handleMouseClick(event)
    };

    const handleMouseClick = (event) => {

        if (canvasRef.current) {
            const XY = getXY(canvasRef.current, event)
            const context = canvasRef.current.getContext("2d");

            const isMarkerNotClicked = pathObjs.every(path => {
                if (context.isPointInPath(path.path, XY.x, XY.y)) {
                    // Do Something with the click
                    // console.log("Clicked on Rectangle", XY.x, XY.y);
                    setFormValues(path.data);
                    setDragging(false);
                    handleOpen();
                    return false;
                }
                return true;
            })

            if (doAddMarkers && isMarkerNotClicked) {
                setClickedCordinates({x: XY.x, y: XY.y});
                // Add New Marker
                setFormValues(INIT_DATA);
                handleOpen();
            }
        }


    }

    const handleMouseUp = () => setDragging(false);

    // adjust mouse click to canvas coordinates
    const getXY = (canvas, event) => {
        const rect = canvas.getBoundingClientRect()
        const y = event.clientY - rect.top
        const x = event.clientX - rect.left
        return {x: x, y: y}
    }

    const markerConvert = () => {
        const markers = Object.values(recordData.pins).map(pin => {

            if (canvasRef.current) { // const XY = getXY(canvasRef.current, event)
                const XY = {
                    x: pin['x_coord'],
                    y: pin['y_coord']
                };

                const path = new Path2D();
                path.rect((offset.x + XY.x) / zoom, (offset.y + XY.y) / zoom, MARKER_SIZE * zoom, MARKER_SIZE * zoom);

                return {
                    "path": path,
                    "xC": (offset.x + XY.x) / zoom,
                    "yC": (offset.y + XY.y) / zoom,
                    "data": {
                        "refId": pin['ref_id'],
                        "length": pin['breadth'],
                        "width": pin['width'],
                        "height": pin['height'],
                        "qty": "1",
                        "times": pin['times'],
                        "unit": pin['measure_unit'],
                        "remarks": pin['remarks']
                    }
                }
            }
            return {"path": {}, "xC": 0, "yC": 0, "data": formValues}

        });
        return markers

    }

    useEffect(() => {
        draw();
    }, []);

    useEffect(() => {
        if (typeof(recordData) !== "undefined" && typeof(recordData.pins) !== "undefined") {
            const markers = markerConvert();
            setPathObjs(markers);
        }
    }, [recordData]);


    useEffect(() => {
        draw();
    }, [zoom, offset, pathObjs]);

    useEffect(() => {
        background.src = recordData.img_name;

        if (canvasRef.current) {
            background.onload = () => { // Get the image dimensions
                const {width, height} = background;
                canvasRef.current.width = width;
                canvasRef.current.height = height;

                // Draw the image
                canvasRef.current.getContext("2d").drawImage(background, 0, 0);
            };
        }
    }, [background, recordData]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (canvasRef.current) { // const XY = getXY(canvasRef.current, event)
            const XY = clickedCordinates;

            const path = new Path2D();
            path.rect((offset.x + XY.x) / zoom, (offset.y + XY.y) / zoom, MARKER_SIZE * zoom, MARKER_SIZE * zoom);


            setPathObjs([
                {
                    "path": path,
                    "xC": (offset.x + XY.x) / zoom,
                    "yC": (offset.y + XY.y) / zoom,
                    "data": formValues
                },
                ...pathObjs
            ]);
        }

        handleClose();
    };

    const saveMarkers = async () => {

        const pins = pathObjs.map(marker => {
            return {
                "ref_id": marker.data.refId,
                "measure_unit": marker.data.unit,
                "height": marker.data.height,
                "width": marker.data.width,
                "breadth": marker.data.length,
                "times": marker.data.times,
                "x_coord": marker.xC,
                "y_coord": marker.yC,
                "remarks": marker.data.remarks
            }

        });

        const res = await axios.put(BACKEND.ENDPOINT + `/project/update-pins?project_id=${
            recordData.project_id
        }&floor_id=${
            recordData.floor_id
        }&element_id=${
            recordData.element_id
        }`, pins);
        if (res.status === 200) {
            alert("Pins Successfully Saved!")
        }
    }


    const draw = () => {
        if (canvasRef.current) {
            const {width, height} = background;
            const context = canvasRef.current.getContext("2d");

            // Set canvas dimensions
            canvasRef.current.width = width;
            canvasRef.current.height = height;

            // Clear canvas and scale it based on current zoom
            context.translate(-offset.x, -offset.y);
            context.clearRect(0, 0, width, height);
            context.scale(zoom, zoom);

            // Make sure we're zooming to the center
            // const x = (context.canvas.width / zoom - background.width) / 2;
            // const y = (context.canvas.height / zoom - background.height) / 2;

            // Draw image
            // context.drawImage(background, x, y);
            context.drawImage(background, 0, 0);

            pathObjs.forEach(x => {
                context.fillStyle = "#FFFFFF"
                context.fillStyle = "rgba(255,87,51,0.8)"
                // context.fill(x.path)
                context.lineWidth = 2
                context.strokeStyle = "#000000"
                // context.stroke(x.path)

                context.beginPath();
                context.rect(x.xC, x.yC, MARKER_SIZE * zoom, MARKER_SIZE * zoom);
                context.fill();
                context.stroke();

                // Dispaly Text
                // context.font = `10px serif`;
                context.strokeStyle = "#FFFFFF"
                context.font = "normal normal lighter 18px/18px Arial, Sans-serif"
                // font-style, font-variant, font-weight, font-size/line-height, font-family
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.strokeText(x.data.refId, x.xC + (MARKER_SIZE * zoom) / 2, x.yC + (MARKER_SIZE * zoom) / 2);


            })

        }
    };


    return (
        <div style={{
            // backgroundColor: 'red',
            // height: '100%',
            // width: '100%',
            }}>
            <Box sx={
                {
                    position: 'absolute',
                    bottom: "13%",
                    right: "5%",
                    zIndex: 100
                }
            }>
                {
                doAddMarkers ? <Tooltip title="Stop Adding Markers"><Fab color="warning" aria-label="cancel" sx={{mx: 0.5}}
                    onClick={
                        () => setDoAddMarkers(false)
                }><DoDisturbIcon/></Fab></Tooltip> : <Tooltip title="Start Adding Markers"><Fab color="primary" aria-label="add" sx={{mx: 0.5}}
                    onClick={
                        () => setDoAddMarkers(true)
                }><AddIcon/></Fab></Tooltip>
            }
                <Tooltip title="Clear All Markers"><Fab color="error" aria-label="clear" sx={{mx: 0.5}}
                    onClick={
                        () => setPathObjs([])
                }><RemoveIcon/></Fab></Tooltip>
                <Tooltip title="Save MArkers To Database"><Fab color="success" aria-label="save" sx={{mx: 0.5}}
                    onClick={saveMarkers}><SaveIcon/></Fab></Tooltip>
            </Box>


            <div ref={containerRef}>
                <canvas style={{
                    height: '100%',
                    width: '100%',
                }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onWheel={handleWheel}
                    onMouseMove={handleMouseMove}
                    ref={canvasRef}/>
            </div>
            <Modal open={open}
                onClose={handleClose}
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <Grid container alignItems="center" justify="center" direction="column"
                            rowSpacing={3}>
                            <Grid item>
                                <TextField id="refId-input" name="refId" label="Reference ID" type="text"
                                    value={
                                        formValues.refId
                                    }
                                    onChange={handleInputChange}/>
                            </Grid>
                            <Grid item>
                                <TextField id="length-input" name="length" label="Length" type="number"
                                    value={
                                        formValues.length
                                    }
                                    onChange={handleInputChange}/>
                            </Grid>
                            <Grid item>
                                <TextField id="width-input" name="width" label="Width" type="number"
                                    value={
                                        formValues.width
                                    }
                                    onChange={handleInputChange}/>
                            </Grid>
                            <Grid item>
                                <TextField id="height-input" name="height" label="Height" type="number"
                                    value={
                                        formValues.height
                                    }
                                    onChange={handleInputChange}/>
                            </Grid>
                            <Grid item>
                                <TextField id="qty-input" name="qty" label="Qty" type="number"
                                    value={
                                        formValues.qty
                                    }
                                    onChange={handleInputChange}/>
                            </Grid>
                            <Grid item>
                                <TextField id="times-input" name="times" label="Times" type="number"
                                    value={
                                        formValues.times
                                    }
                                    onChange={handleInputChange}/>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <Select name="unit"
                                        value={
                                            formValues.unit
                                        }
                                        onChange={handleInputChange}>
                                        <MenuItem key="meters" value="meters">
                                            Meters
                                        </MenuItem>
                                        <MenuItem key="inches" value="inches">
                                            Inches
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <TextField id="remarks-input" name="remarks" label="Remarks" type="text"
                                    value={
                                        formValues.remarks
                                    }
                                    onChange={handleInputChange}/>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" type="submit">Save</Button>
                                <Button variant="contained" color="error"
                                    onClick={handleClose}>Cancel</Button>
                                <IconButton variant="contained" color="error">
                                    <DeleteIcon/>
                                </IconButton>

                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default ZoomImage;

