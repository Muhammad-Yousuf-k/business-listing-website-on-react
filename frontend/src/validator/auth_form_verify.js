const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const isRequired = (value) => value && value.toString().trim() !== "";

export function Register_Form_Verificaton(form) {
    const {
        name,
        email,
        password,
        role,
        address,
    } = form;

    if (!isRequired(name)) {
        return "Name is required";
    }

    if (!isRequired(email)) {
        return "Email is required";
    }

    if (!isValidEmail(email)) {
        return "Invalid email";
    }

    if (!isRequired(password)) {
        return "Password is required";
    }

    if (password.length < 6) {
        return "Password length must be at least 6";
    }

    if (!isRequired(role)) {
        return "Role is required";
    }

    if (role === "admin") {
        return "Invalid role";
    }

    if (address) {
        const { country, state, city } = address;
        console.log(country);


        if (!isRequired(country)) {
            return "Country is required";
        }

        if (!isRequired(state)) {
            return "State is required";
        }

        if (!isRequired(city)) {
            return "City is required";
        }
    }

    return null;
}

export function Login_Form_Verificaton(email, password) {
    // Helper validators

    if (!isValidEmail(email) || !isRequired(email)) {

        return "email is required"

    } else if (!isRequired(password) || password.length < 6) {

        return password.length < 6 ? "password length must be at least 6" : "password is required"


    }

    return null
}