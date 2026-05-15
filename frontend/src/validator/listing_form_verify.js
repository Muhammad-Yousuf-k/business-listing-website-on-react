const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const isRequired = (value) => value && value.toString().trim() !== "";

export function Listing_Form_validator(payload) {
    // Helper validators
    let result = null;

    if (!isRequired(payload.name)) {
        return result = "Restaurant Name is required"
    }

    if (!isRequired(payload.description)) {
        return result = "Description is required"
    }

    if (!isRequired(payload.main_category)) {
        return result = "Main Category is required"
    }

    if (payload.sub_category.length < 1) {
        return result = "Sub Category is required"
    }

    if (!isRequired(payload.address.country)) {
        return result = "Country is required"
    }

    if (!isRequired(payload.address.city)) {
        return result = "City is required"
    }

    if (!isRequired(payload.address.area)) {
        return result = "Area is required"
    }

    if (!isRequired(payload.address.state)) {
        return result = "State is required"
    }


    return result
}