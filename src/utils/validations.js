let eRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function addFormValidation(data = {}) {
    let errors = {};
    let isValid = true;
    let { name = '', email = '', address = '', friends = [] } = data;

    if (!name) {
        errors.name = "Name is required!";
        isValid = false
    }
    if (!email) {
        errors.email = "Email is required!";
        isValid = false
    }
    if(email && !eRegex.test(email)){
        errors.email = "Please enter valid email!";
        isValid = false
    }
    if (!address) {
        errors.address = "Address is required!";
        isValid = false
    }
    if (!friends.length) {
        errors.friends = "Please enter friends";
        isValid = false;
    }

    return {
        errors,
        isValid
    }

}