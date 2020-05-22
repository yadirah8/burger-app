export const updateObject = (oldObject, updatedProperties) => {
    return{
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value,rules) => {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
        const pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        isValid = isValid && pattern.test(value);
    }
    if (rules.isNumeric){
        const pattern = /^\d+$/;
        isValid = isValid && pattern.test(value);
    }
    
    return isValid;
}