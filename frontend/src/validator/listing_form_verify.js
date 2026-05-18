const isRequired = (value) => value && value.toString().trim() !== "";

const isArray = (value) => Array.isArray(value);

const isValidLength = (value, min, max) =>
    value && value.toString().length >= min && value.toString().length <= max;

const isValidEmail = (value) =>
    value ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : true;

export function Listing_Form_validator(payload) {
    if (!isRequired(payload.name)) {
        return "Restaurant Name is required";
    }

    if (!isValidLength(payload.name, 2, 120)) {
        return "Name must be between 2 and 120 characters";
    }

    if (!isRequired(payload.description)) {
        return "Description is required";
    }

    if (!isValidLength(payload.description, 10, 2000)) {
        return "Description must be between 10 and 2000 characters";
    }

    if (!isRequired(payload.main_category)) {
        return "Main Category is required";
    }

    if (!isRequired(payload.address?.country)) {
        return "Country is required";
    }

    if (!isRequired(payload.address?.city)) {
        return "City is required";
    }

    if (!isRequired(payload.address?.area)) {
        return "Area is required";
    }

    if (!isRequired(payload.address?.state)) {
        return "State is required";
    }

    // Sub category (optional but if provided must be valid array with items)
    if (payload.sub_category !== undefined) {
        if (!isArray(payload.sub_category)) {
            return "Sub Category must be an array";
        }

        if (payload.sub_category.length === 0) {
            return "At least one sub category is required";
        }
    }

    // Contact validation (optional object)
    if (payload.contact) {
        if (payload.contact.email && !isValidEmail(payload.contact.email)) {
            return "Invalid email address";
        }

        if (
            payload.contact.phone &&
            !isValidLength(payload.contact.phone, 6, 20)
        ) {
            return "Phone number is invalid";
        }

        if (
            payload.contact.whatsapp &&
            !isValidLength(payload.contact.whatsapp, 6, 20)
        ) {
            return "Whatsapp number is invalid";
        }

        if (
            payload.contact.tell &&
            !isValidLength(payload.contact.tell, 6, 20)
        ) {
            return "Tell number is invalid";
        }
    }

    // Location validation (optional)
    if (payload.address?.location) {
        const { lat, lng } = payload.address.location;

        if (lat !== undefined && (lat < -90 || lat > 90)) {
            return "Invalid latitude";
        }

        if (lng !== undefined && (lng < -180 || lng > 180)) {
            return "Invalid longitude";
        }
    }

    // Features validation
    if (payload.features !== undefined) {
        if (!isArray(payload.features)) {
            return "Features must be an array";
        }
    }

    // Tags validation
    if (payload.tags !== undefined) {
        if (!isArray(payload.tags)) {
            return "Tags must be an array";
        }
    }

    // Images validation
    if (payload.images !== undefined) {
        if (!isArray(payload.images)) {
            return "Images must be an array";
        }
    }

    return null;
}