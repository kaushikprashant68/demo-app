import React, { useState } from "react";
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    TextField
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const InputField = ({ type, error, fullWidth, ...props }) => {
    const [show, setShow] = useState(false)
    if (type === 'password') {
        return (
            <>
                <FormControl variant="outlined" fullWidth={fullWidth}>
                    <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
                    <OutlinedInput
                        type={show ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShow(!show)}
                                    edge="end"
                                >
                                    {show ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        {...props}
                    />
                </FormControl>
                {error && <span className="help-block error">{error}</span>}
            </>
        )
    }
    return (
        <>
            {type !== "textarea" ? (
                <TextField
                    fullWidth={fullWidth}
                    variant="outlined"
                    type={type}
                    {...props}
                />
            ) : (
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    {...props}
                />
            )}
            {error && <span className="help-block error">{error}</span>}
        </>
    );
};

export default InputField;
