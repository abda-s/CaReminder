const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt")
const { sign } = require("jsonwebtoken")

const { users } = require("../models")

var validator = require('validator');
const JWT_secret = 'ifviuhaefgiauefhvpaiufg'

const isPasswordStrong = (password) => {
    // Define criteria for a strong password (e.g., minimum length, presence of special characters, etc.)
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    // Check if password meets all criteria
    const isValid =
        password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChars;

    // Prepare error message
    let errorMessage = "Password must contain:";
    if (password.length < minLength) {
        errorMessage += " at least 8 characters,";
    }
    if (!hasUpperCase) {
        errorMessage += " at least one uppercase letter,";
    }
    if (!hasLowerCase) {
        errorMessage += " at least one lowercase letter,";
    }
    if (!hasNumbers) {
        errorMessage += " at least one number,";
    }
    if (!hasSpecialChars) {
        errorMessage += " at least one special character,";
    }
    errorMessage = errorMessage.slice(0, -1); // Remove trailing comma

    return { isValid, errorMessage };
};

const isUsernameValid = (username) => {
    // Define criteria for a valid username (e.g., no spaces or special characters except '_', '-')
    const minLength = 3;
    const regex = /^[a-zA-Z0-9_-]+$/;
    const containsSpaces = /\s/.test(username);
    const containsSpecialChars = /[^\w-]/.test(username);

    let isValid = true;
    let errorMessage = "";

    if (containsSpaces) {
        isValid = false;
        errorMessage += "Username must not contain spaces.  ";
    }
    if (username.length < minLength) { // Corrected this line
        isValid = false;
        errorMessage += "Username must be at least 3 characters long. "; // Corrected this line
    }
    if (containsSpecialChars) {
        isValid = false;
        errorMessage +=
            "Username must not contain special characters except '_', '-'. ";
    }

    return { isValid, errorMessage };
};

router.post('/signup', async (req, res) => {
    try {
        const { username, password, email } = req.body;


        // check if the user exists
        const existingUser = await users.findOne({ where: { username: username } });
        if (existingUser) {
            return res.json({ error: "Username already exists" });
        }


        // check if the email exists
        const existingEmail = await users.findOne({ where: { email: email } });
        if (existingEmail) {
            return res.json({ error: "Email already exists" });
        }




        // Check if the username is valid
        const { isValid: usernameIsValid, errorMessage: usernameErrorMessage } = await isUsernameValid(username);
        if (!usernameIsValid) {
            return res.json({ error: usernameErrorMessage });
        }

        // Check if the password is strong
        const { isValid, errorMessage } = await isPasswordStrong(password);
        if (!isValid) {
            return res.json({ error: errorMessage });
        }

        // check if the email is valid
        const validEmail = await validator.isEmail(email);
        if (!validEmail) {
            return res.json({ error: "invalid email" })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        await users.create({
            username: username,
            password: hashedPassword,
            email: email
        });

        res.json("success");
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: `Failed to create user: ${err.message}` });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await users.findOne({ where: { username: username } });

        if (!existingUser) {
            return res.json({ error: "user does not exist" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        
        if (!isMatch) {
            return res.json({ error: "Invalid password" });
        }

        const token = sign(
            { email: existingUser.email, username: existingUser.username },
            JWT_secret);

        return res.json({ status: "ok", token: token });

    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: `Failed to sign: ${err.message}` });

    }
})
module.exports = router;