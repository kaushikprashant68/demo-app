import React, { useState, useEffect } from "react";
import CustomInputField from "../Components/common/CustomInputField";
import { Button, Grid, Container } from "@material-ui/core";
import ChipInput from 'material-ui-chip-input'
import { useHistory } from "react-router-dom";
import { addFormValidation } from "../utils/validations";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    name: '',
    email: '',
    address: '',
    friends: [],
}
export default function AddUser(props) {
    const [userData, setUserData] = useState({ ...initialState });
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        const { edit = false, editedUser = {} } = props;
        if (edit) {
            setUserData({ ...editedUser })
        }
    }, []);

    const onHandleChange = (event) => {
        const { name = '', value = '' } = event.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleAddChip = (chip) => {
        let friendsChips = [...userData.friends];
        friendsChips.push(chip);
        setUserData({ ...userData, friends: friendsChips })
    }

    const handleDeleteChip = (chip, index) => {
        let friends = [...userData.friends];
        friends.splice(index, 1);
        setUserData({ ...userData, friends: friends })
    }

    const saveUserData = (edit) => {
        let { errors, isValid = false } = addFormValidation(userData);
        setErrors(errors);

        if (!isValid) return;

        toast("User added successfully!");
        history.push('users');
        let data = window.localStorage.getItem('users');
        data = JSON.parse(data);
        let userList = [];

        if (!edit) {
            userList = !data ? [] : [...data];
            userList.push(userData);
        }
        else {
            const { editedUser = {}, updatedUsers = () => { }, closeModal = () => { } } = props;
            let resultedData = data.map(userItem => {
                if (userItem.name === editedUser.name) {
                    return userData;
                }
                return userItem;
            });
            userList = resultedData;
            updatedUsers(userList);
            closeModal();
        }
        window.localStorage.setItem('users', JSON.stringify(userList));
    }

    const { edit = false } = props;

    return (
        <Container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div className="add-user">
                    <div className="cus-form-fields">
                        <ul>
                            <li>
                                <CustomInputField
                                    name="name"
                                    onChange={(e) => onHandleChange(e)}
                                    value={userData.name}
                                    placeholder="Name"
                                    fullWidth
                                    error={errors.name}
                                    className="pb-15"
                                />
                            </li>
                            <li>
                                <CustomInputField
                                    name="email"
                                    onChange={(e) => onHandleChange(e)}
                                    value={userData.email}
                                    placeholder="Email"
                                    fullWidth
                                    error={errors.email}
                                    className="pb-15"
                                />
                            </li>
                            <li>
                                <CustomInputField
                                    name="address"
                                    onChange={(e) => onHandleChange(e)}
                                    value={userData.address}
                                    error={errors.address}
                                    placeholder="Address"
                                    fullWidth
                                    className="pb-15"
                                />
                            </li>
                            <li>
                                <label>Friends</label>
                                <ChipInput
                                    className="cus-chip"
                                    value={userData.friends}
                                    onAdd={(chip) => handleAddChip(chip)}
                                    onDelete={(chip, index) => handleDeleteChip(chip, index)}
                                />
                            </li>
                            <p className="error">{errors.friends}</p>
                        </ul>
                    </div>
                    <ToastContainer />
                    <div className="cus-btn-group">
                        <Button variant="contained" color="primary" onClick={() => { saveUserData(edit) }}>Save User</Button>
                        {!edit ? <Button variant="contained" color="primary" onClick={() => { history.push('users') }}>All User</Button> : null}
                    </div>
                </div>
            </Grid>
        </Container>
    )
}