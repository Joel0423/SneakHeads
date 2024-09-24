import React, { useEffect, useState } from 'react';
import './SignupFormPage.css'; 
import Cookies from 'js-cookie';
import axios from 'axios';

const SignupFormPage = () => {
    const [isSignup, setIsSignup] = useState(true);
    const [token, setToken] = useState('');
    const [user, setUser] = useState()

    useEffect(() => {
        async function fetchUser() {

            if(token !== ''){
                console.log(token);
                const urlEncodedData = new URLSearchParams(token);
                try {
                    let user = await axios.post('http://localhost:8002/api/auth/profile', urlEncodedData, {
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })

                    console.log(user.data.user);
                    setUser(user.data.user);
            } catch (error) {
                    console.log(error);
                }
    
            }
        }
        fetchUser();
    }, [token])

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dateOfBirth: '',
        address: '',
    });

    const [loginFormData, setLoginFormData] = useState({
        loginEmail: '',
        loginPassword: '',
    });

    const [loginValidation, setLoginValidation] = useState({
        loginEmail: false,
        loginPassword: false,
    })

    const [errorState, setErrorState] = useState({
        firstName: [false, ""],
        lastName: [false, ""],
        email: [false, ""],
        password: [false, ""],
        confirmPassword: [false, ""],
        gender: [false, ""],
        dateOfBirth: [false, ""],
        address: [false, ""],
        loginEmail: [false, ""],
        loginPassword: [false, ""],
    });

    const [validation, setValidation] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
        gender: false,
        dateOfBirth: false,
        address: false,

    });

    const showErrorMessage = (field, error) => {
        return <span className="error">{field} is invalid. {error}</span>;
    };

    const setOutline = (errState, valid) => {
        //this logic to prevent outline color when form is first loaded
        if (!errState && valid) {
            return "valid";
        }
        if (errState) {
            return "invalid";
        }

    };

    const validateField = (eleName, value) => {
        if (eleName === "firstName" || eleName === "lastName") {
            let strRegex = new RegExp(/^[a-zA-Z ]+$/i);
            let alpha = strRegex.test(value);
            let minLen = value.length <= 3;
            let maxLen = value.length > 15;
            if (minLen) {
                setErrorState({ ...errorState, [eleName]: [true, "Name is too short, less than 3 characters"] });
                setValidation({ ...validation, [eleName]: false });

            }
            if (maxLen) {
                setErrorState({ ...errorState, [eleName]: [true, "Name is too long, over 15 characters"] });
                setValidation({ ...validation, [eleName]: false });

            }
            if (!alpha) {
                setErrorState({ ...errorState, [eleName]: [true, "Name should only contain letters"] });
                setValidation({ ...validation, [eleName]: false });
            }
            if (value === "") {
                setErrorState({ ...errorState, [eleName]: [true, "Enter your name"] });
                setValidation({ ...validation, [eleName]: false });
            }
            if (!minLen && !maxLen && alpha) {
                setErrorState({ ...errorState, [eleName]: [false, ""] });
                setValidation({ ...validation, [eleName]: true });
            }
        }
        if (eleName === "email") {
            if (/^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/.test(value)) {
                setErrorState({ ...errorState, [eleName]: [false, ""] });
                setValidation({ ...validation, [eleName]: true });
            }
            else //invalid input-
            {
                setErrorState({ ...errorState, [eleName]: [true, "Enter a valid email"] });
                setValidation({ ...validation, [eleName]: false });
            }
        }
        if (eleName === "password") {
            //bool to store if uppercase letters are matched by the regex
            let has_upper_letters = /[A-Z]/.test(value);
            //bool to store if lowercase letters are matched by the regex
            let has_lower_letters = /[a-z]/.test(value);
            //bool to store if numbers are matched by the regex
            let has_num = /[0-9]/.test(value);
            //bool to store if special characters are matched by the regex
            let has_special = /[!@#$%^&*()]/.test(value);
            var errTxt = "";
            if (!has_upper_letters) {
                errTxt = errTxt + " Include uppercase characters,";
            }
            if (!has_lower_letters) {
                errTxt = errTxt + " Include lower characters,";
            }
            if (!has_num) {
                errTxt = errTxt + " Include numbers,";
            }
            if (!has_special) {
                errTxt = errTxt + " Include special characters,";
            }
            if (value.length < 8) {
                errTxt = errTxt + " Minimum length is 8,";
            }
            let newErrorState = { ...errorState };
            let newValidation = { ...validation };
            //valid pass
            if (has_lower_letters && has_num && has_special && has_upper_letters && value.length >= 8) {
                newErrorState[eleName] = [false, ""];
                newValidation[eleName] = true;

            }
            else {
                newErrorState[eleName] = [true, errTxt];
                newValidation[eleName] = false;
            }
            //also check conf pass
            if (formData.confirmPassword !== "") {
                if (value === formData.confirmPassword) {
                    newErrorState['confirmPassword'] = [false, ""];
                    newValidation['confirmPassword'] = true;
                }
                else if (value !== formData.confirmPassword) {
                    newErrorState['confirmPassword'] = [true, "Passwords do not match"];
                    newValidation['confirmPassword'] = false;
                }
            }
            setErrorState(newErrorState);
            setValidation(newValidation);

        }
        //check conf pass here for for its data entry
        if (eleName === "confirmPassword") {
            //valid
            if (value === formData.password && validation.password) {
                setErrorState({ ...errorState, [eleName]: [false, ""] });
                setValidation({ ...validation, [eleName]: true });
            }
            else if (value !== formData.Password && validation.password) {
                setErrorState({ ...errorState, [eleName]: [true, "Passwords do not match"] });
                setValidation({ ...validation, [eleName]: false });
            }
            else if (value !== formData.Password && !validation.password) {
                setErrorState({ ...errorState, [eleName]: [true, "Enter a correct password first"] });
                setValidation({ ...validation, [eleName]: false });
            }
        }
        if (eleName === "gender") {
            if (value !== "") {
                setErrorState({ ...errorState, [eleName]: [false, ""] });
                setValidation({ ...validation, [eleName]: true });
            }
        }
        if (eleName === "dateOfBirth") {
            //converting the selected date to a JavaScript date object
            let selDate = new Date(value);
            //Gets the current date
            let curDate = new Date();
            //age will be current date - selected date
            var age = curDate.getFullYear() - selDate.getFullYear();

            //birthday hasn't occurred yet on that year
            var monthDifference = curDate.getMonth() - selDate.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && curDate.getDate() < selDate.getDate())) {
                age--;
            }

            //Invalid state-
            if (age < 18) {
                setErrorState({ ...errorState, [eleName]: [true, "You must be over 18"] });
                setValidation({ ...validation, [eleName]: false });
            }
            else //valid input
            {
                setErrorState({ ...errorState, [eleName]: [false, ""] });
                setValidation({ ...validation, [eleName]: true });
            }
        }
        if (eleName === "address") {
            // Split the text into words filtering out empty strings
            var words = value.trim().split(/\s+/).filter(word => word.length > 3);

            // Check if there are at least 4 words
            if (words.length >= 4) //valid input
            {
                setErrorState({ ...errorState, [eleName]: [false, ""] });
                setValidation({ ...validation, [eleName]: true });
            }
            else {
                setErrorState({ ...errorState, [eleName]: [true, "Enter a proper address"] });
                setValidation({ ...validation, [eleName]: false });
            }
        }
        if (eleName === "loginEmail") {
            if (/^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/.test(value)) {
                setErrorState({ ...errorState, [eleName]: [false, ""] });
                setLoginValidation({ ...loginValidation, [eleName]: true });
            }
            else //invalid input-
            {
                setErrorState({ ...errorState, [eleName]: [true, "Enter a valid email"] });
                setLoginValidation({ ...loginValidation, [eleName]: false });
            }
        }
        if (eleName === "loginPassword") {
            //bool to store if uppercase letters are matched by the regex
            let has_upper_letters = /[A-Z]/.test(value);
            //bool to store if lowercase letters are matched by the regex
            let has_lower_letters = /[a-z]/.test(value);
            //bool to store if numbers are matched by the regex
            let has_num = /[0-9]/.test(value);
            //bool to store if special characters are matched by the regex
            let has_special = /[!@#$%^&*()]/.test(value);
            let errTxt = "";
            if (!has_upper_letters) {
                errTxt = errTxt + " Include uppercase characters,";
            }
            if (!has_lower_letters) {
                errTxt = errTxt + " Include lower characters,";
            }
            if (!has_num) {
                errTxt = errTxt + " Include numbers,";
            }
            if (!has_special) {
                errTxt = errTxt + " Include special characters,";
            }
            if (value.length < 8) {
                errTxt = errTxt + " Minimum length is 8,";
            }
            //valid pass
            if (has_lower_letters && has_num && has_special && has_upper_letters && value.length >= 8) {
                setErrorState({ ...errorState, [eleName]: [false, ""] });
                setLoginValidation({ ...loginValidation, [eleName]: true });
            }
            else {
                setErrorState({ ...errorState, [eleName]: [true, errTxt] });
                setLoginValidation({ ...loginValidation, [eleName]: false });
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData({ ...loginFormData, [name]: value });
        validateField(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isFormValid = true;

        // Create a copy of the error state that we will modify
        let newErrorState = { ...errorState };

        // Loop through the validation object
        Object.keys(validation).forEach((key) => {
            if (!validation[key]) {
                isFormValid = false;
                // Update the newErrorState object
                newErrorState[key] = [true, "Enter the correct details"];
            } else {
                newErrorState[key] = [false, ""];
            }
        });

        // Update the error state once after the loop
        setErrorState(newErrorState);

        // Check if form is valid and alert accordingly
        if (isFormValid) {
            alert('Form submitted successfully!');
            // alert('Form Data: ' + JSON.stringify(formData, null, 2));
            console.log(formData);
            
            // Convert the data to URL-encoded form
            const urlEncodedData = new URLSearchParams(formData);
            try {
                let token = await axios.post('http://localhost:8002/api/auth/register', urlEncodedData, {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                
                console.log(token.data);
                setToken(token.data);

            } catch (error) {
                console.log(error);
                alert(error.response.data);
            }
            

        }
        else // get data here
        {
            alert('Please fill all fields correctly.');
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        let isFormValid = true;

        // Create a copy of the error state that we will modify
        let newErrorState = { ...errorState };

        // Loop through the validation object
        Object.keys(loginValidation).forEach((key) => {
            if (!loginValidation[key]) {
                isFormValid = false;
                // Update the newErrorState object
                newErrorState[key] = [true, "Enter the correct details"];
            } else {
                newErrorState[key] = [false, ""];
            }
        });

        // Update the error state once after the loop
        setErrorState(newErrorState);

        // Check if form is valid and alert accordingly
        if (isFormValid) {
            alert('Form submitted successfully!');
            // alert('Form Data: ' + JSON.stringify(loginFormData, null, 2));
            // console.log(loginFormData);

            // Convert the data to URL-encoded form
            const urlEncodedData = new URLSearchParams(loginFormData);
            try {
                let token = await axios.post('http://localhost:8002/api/auth/login', urlEncodedData, {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                
                console.log(token.data);
                setToken(token.data);

            } catch (error) {
                console.log(error);
                alert(error.response.data);
            }
        }
        else // get data here
        {
            alert('Please fill all fields correctly.');

        }
    };

    const handleLogout = async() => {
        try {
            await axios.get('http://localhost:8002/api/auth/logout');
            setToken('');
            setUser(null);
            alert('Logged out successfully!');
        } catch (error) {
            console.log(error);
            alert(error.response.data);
        }
    }

    return (
        user ? 
        <>
            <div className='w-full h-[90vh] relative' style={{backgroundImage: 'url(/img/bg1.jpg)'}}>
                <button onClick={() => handleLogout()} className='absolute right-4 top-4 px-4 py-2 rounded-md border-[2px] border-white text-white shadow-sm shadow-white font-bold'>Logout</button>
                <div className='flex flex-col py-6 justify-center items-center gap-2 w-[30vw] h-[70vh] absolute bottom-0 left-1/2 -translate-x-1/2 bg-[rgba(255,255,255,.5)] rounded-tl-3xl rounded-tr-3xl font-custom3' style={{backdropFilter: 'blur(3px)'}}>
                    <div className="w-[200px] h-[200px] rounded-full bg-black absolute left-1/2 -translate-x-1/2 top-[calc(-100px)] overflow-hidden">
                        <img className="w-full h-full object-cover" src={ (user.gender === 'female') ? "/img/female.jpg" : "/img/male.jpg" } alt="" />
                    </div>

                    <h1 className='font-custom1 text-5xl'>{user.firstName} {user.lastName}</h1>
                    <p className='text-2xl'>📩 <span className='text-blue-500 text-base font-semibold cursor-pointer'>{user.email}</span></p>
                    <p className='text-2xl'>🎂 <span className='text-base font-semibold'>{user.dateOfBirth}</span></p>
                    <p className='text-2xl'>🏠 <span className='text-base font-semibold'>{user.address}</span></p>
                </div>
            </div>
        </> 
        : 
        <>
        <div className="container">
            <div className="form-wrapper">
                <div className="form-toggle">
                    <button className={`toggle-btn ${isSignup ? 'active' : ''}`} onClick={() => setIsSignup(true)}>
                        Signup
                    </button>
                    <button className={`toggle-btn ${!isSignup ? 'active' : ''}`} onClick={() => setIsSignup(false)}>
                        Login
                    </button>
                </div>

                {isSignup ? (
                    < form onSubmit={handleSubmit} className="signupForm">
                        <h2>Signup Form</h2>
                        <div className="name-group">
                            <div className="n-input-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={setOutline(errorState.firstName[0], validation.firstName)}
                                />
                                <br />
                                {errorState.firstName[0] && showErrorMessage('First Name', errorState.firstName[1])}
                            </div>

                            <div className="n-input-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={setOutline(errorState.lastName[0], validation.lastName)}
                                />
                                <br />
                                {errorState.lastName[0] && showErrorMessage('Last Name', errorState.lastName[1])}
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={setOutline(errorState.email[0], validation.email)}
                            />
                            {errorState.email[0] && showErrorMessage('Email', errorState.email[1])}
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={setOutline(errorState.password[0], validation.password)}
                            />
                            {errorState.password[0] && showErrorMessage('Password', errorState.password[1])}

                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={setOutline(errorState.confirmPassword[0], validation.confirmPassword)}
                            />
                            {errorState.confirmPassword[0] && showErrorMessage('Confirm Password', errorState.confirmPassword[1])}

                        </div>

                        <div className="input-group">
                            <label>Gender</label>
                            <div className="radio-group">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onChange={handleInputChange}
                                /> Male
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onChange={handleInputChange}
                                /> Female
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    onChange={handleInputChange}
                                /> Other
                            </div>
                            {errorState.gender[0] && showErrorMessage('Gender', errorState.gender[1])}

                        </div>

                        <div className="input-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className={setOutline(errorState.dateOfBirth[0], validation.dateOfBirth)}
                            />
                            {errorState.dateOfBirth[0] && showErrorMessage('Date of Birth', errorState.dateOfBirth[1])}
                        </div>

                        <div className="input-group">
                            <label>Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className={setOutline(errorState.address[0], validation.address)}
                            />
                            {errorState.address[0] && showErrorMessage('Address', errorState.address[1])}
                        </div>

                        <button type="submit" className="submit-btn">Signup</button>
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit} className="loginForm">
                        <h2>Login Form</h2>
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="loginEmail"
                                value={loginFormData.loginEmail}
                                onChange={handleLoginInputChange}
                                className={setOutline(errorState.loginEmail[0], validation.loginEmail)}
                            />
                            {errorState.loginEmail[0] && showErrorMessage('Email', errorState.loginEmail[1])}
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="loginPassword"
                                value={loginFormData.loginPassword}
                                onChange={handleLoginInputChange}
                                className={setOutline(errorState.loginPassword[0], validation.loginPassword)}
                            />
                            {errorState.loginPassword[0] && showErrorMessage('Password', errorState.loginPassword[1])}
                        </div>

                        <button type="submit" className="submit-btn">Login</button>
                    </form>
                )}
            </div>
        </div >
        </>
    );
};

export default SignupFormPage;
