// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { Box, Checkbox, CircularProgress, CssBaseline, FormControlLabel, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import ReCAPTCHA from "react-google-recaptcha";
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import zxcvbn from 'zxcvbn';
// import Popup from '../components/Popup';
// import { authUser } from '../redux/userHandle';
// import { LightPurpleButton } from '../utils/buttonStyles';

// const AuthenticationPage = ({ mode, role }) => {
//     const bgpic = "https://images.pexels.com/photos/1121097/pexels-photo-1121097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

//     const [toggle, setToggle] = useState(false);
//     const [loader, setLoader] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");
//     const [captchaValue, setCaptchaValue] = useState(null);

//     const [emailError, setEmailError] = useState(false);
//     const [passwordError, setPasswordError] = useState(false);
//     const [passwordStrength, setPasswordStrength] = useState("");
//     const [userNameError, setUserNameError] = useState(false);
//     const [shopNameError, setShopNameError] = useState(false);
//     const [phoneNumberError, setPhoneNumberError] = useState(false);
//     const [phoneNumberErrorText, setPhoneNumberErrorText] = useState("");

//     const validatePhoneNumber = (phoneNumber) => {
//         const phoneRegex = /^\+?[\d\s-]{10,}$/;
//         return phoneRegex.test(phoneNumber);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         const email = event.target.email.value;
//         const password = event.target.password.value;
//         const phoneNumber = event.target.phoneNumber?.value;

//         const passwordStrengthScore = zxcvbn(password).score;
//         if (passwordStrengthScore < 2) {
//             setMessage("Password is too weak. Please choose a stronger password.");
//             setShowPopup(true);
//             return;
//         }

//         if (!email || !password) {
//             if (!email) setEmailError(true);
//             if (!password) setPasswordError(true);
//             return;
//         }

//         if (mode === "Register" && (!phoneNumber || !validatePhoneNumber(phoneNumber))) {
//             setPhoneNumberError(true);
//             setPhoneNumberErrorText("Please enter a valid phone number");
//             return;
//         }

//         if (!captchaValue) {
//             setMessage("Please complete the CAPTCHA.");
//             setShowPopup(true);
//             return;
//         }

//         if (mode === "Register") {
//             const name = event.target.userName.value;

//             if (!name) {
//                 setUserNameError(true);
//                 return;
//             }

//             if (role === "Seller") {
//                 const shopName = event.target.shopName.value;

//                 if (!shopName) {
//                     setShopNameError(true);
//                     return;
//                 }

//                 const sellerFields = { name, email, password, role, shopName, phoneNumber };
//                 dispatch(authUser(sellerFields, role, mode));
//             } else {
//                 const customerFields = { name, email, password, role, phoneNumber };
//                 dispatch(authUser(customerFields, role, mode));
//             }
//         } else if (mode === "Login") {
//             const fields = { email, password };
//             dispatch(authUser(fields, role, mode));
//         }
//         setLoader(true);
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         if (name === 'email') setEmailError(false);
//         if (name === 'password') {
//             setPasswordError(false);
//             assessPasswordStrength(value);
//         }
//         if (name === 'userName') setUserNameError(false);
//         if (name === 'shopName') setShopNameError(false);
//         if (name === 'phoneNumber') {
//             setPhoneNumberError(false);
//             setPhoneNumberErrorText("");
//         }
//     };

//     const assessPasswordStrength = (password) => {
//         const result = zxcvbn(password);
//         setPasswordStrength(result.score);
//     };

//     const onCaptchaChange = (value) => {
//         setCaptchaValue(value);
//     };

//     useEffect(() => {
//         if (status === 'success' && currentRole !== null) {
//             navigate('/');
//         } else if (status === 'failed') {
//             setMessage(response);
//             setShowPopup(true);
//             setLoader(false);
//         } else if (status === 'error') {
//             setLoader(false);
//             setMessage("Network Error");
//             setShowPopup(true);
//         }
//     }, [status, currentUser, currentRole, navigate, error, response]);

//     return (
//         <>
//             <Grid container component="main" sx={{ height: '100vh' }}>
//                 <CssBaseline />
//                 <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                     <Box
//                         sx={{
//                             my: 8,
//                             mx: 4,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                         }}
//                     >
//                         <StyledTypography>
//                             {role} {mode}
//                         </StyledTypography>

//                         {role === "Seller" && mode === "Register" && (
//                             <Typography variant="h7">
//                                 Create your own shop by registering as a seller.
//                                 <br />
//                                 You will be able to add products and sell them.
//                             </Typography>
//                         )}

//                         {role === "Customer" && mode === "Register" && (
//                             <Typography variant="h7">
//                                 Register now to explore and buy products.
//                             </Typography>
//                         )}

//                         {mode === "Login" && (
//                             <Typography variant="h7">
//                                 Welcome back! Please enter your details.
//                             </Typography>
//                         )}

//                         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
//                             {mode === "Register" && (
//                                 <>
//                                     <TextField
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         id="userName"
//                                         label="Enter your name"
//                                         name="userName"
//                                         autoComplete="name"
//                                         autoFocus
//                                         variant="standard"
//                                         error={userNameError}
//                                         helperText={userNameError && 'Name is required'}
//                                         onChange={handleInputChange}
//                                     />
//                                     <TextField
//                                         margin="normal"
//                                         required
//                                         fullWidth
//                                         id="phoneNumber"
//                                         label="Phone Number"
//                                         name="phoneNumber"
//                                         autoComplete="tel"
//                                         variant="standard"
//                                         error={phoneNumberError}
//                                         helperText={phoneNumberError && phoneNumberErrorText}
//                                         onChange={handleInputChange}
//                                         inputProps={{
//                                             pattern: "[0-9]*",
//                                             inputMode: "numeric"
//                                         }}
//                                     />
//                                 </>
//                             )}
                            
//                             {mode === "Register" && role === "Seller" && (
//                                 <TextField
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="shopName"
//                                     label="Create your shop name"
//                                     name="shopName"
//                                     autoComplete="off"
//                                     variant="standard"
//                                     error={shopNameError}
//                                     helperText={shopNameError && 'Shop name is required'}
//                                     onChange={handleInputChange}
//                                 />
//                             )}

//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="Enter your email"
//                                 name="email"
//                                 autoComplete="email"
//                                 variant="standard"
//                                 error={emailError}
//                                 helperText={emailError && 'Email is required'}
//                                 onChange={handleInputChange}
//                             />

//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type={toggle ? 'text' : 'password'}
//                                 id="password"
//                                 autoComplete="current-password"
//                                 variant="standard"
//                                 error={passwordError}
//                                 helperText={passwordError && 'Password is required'}
//                                 onChange={handleInputChange}
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton onClick={() => setToggle(!toggle)}>
//                                                 {toggle ? <Visibility /> : <VisibilityOff />}
//                                             </IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
                            
//                             {mode === "Register" && passwordStrength !== undefined && (
//                                 <Typography
//                                     variant="body2"
//                                     sx={{
//                                         color: passwordStrength === 4 ? 'green' : passwordStrength > 0 ? 'red' : 'black'
//                                     }}
//                                 >
//                                     {passwordStrength === 4
//                                         ? "Password is strong!"
//                                         : passwordStrength > 0
//                                         ? "Password is weak. Try using a mix of letters, numbers, and symbols."
//                                         : ""}
//                                 </Typography>
//                             )}

//                             <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
//                                 <FormControlLabel
//                                     control={<Checkbox value="remember" color="primary" />}
//                                     label="Remember me"
//                                 />
//                             </Grid>

//                             <ReCAPTCHA
//                                 sitekey="6LdjS7sqAAAAAGbSewbMxGFpVyEoVK7CMAHwsCjc"
//                                 onChange={onCaptchaChange}
//                             />

//                             <LightPurpleButton
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 sx={{ mt: 3, mb: 2 }}
//                             >
//                                 {loader ? <CircularProgress size={24} color="inherit" /> : mode}
//                             </LightPurpleButton>

//                             <Grid container>
//                                 <Grid>
//                                     {mode === "Register" ? "Already have an account?" : "Don't have an account?"}
//                                 </Grid>
//                                 <Grid item sx={{ ml: 2 }}>
//                                     {mode === "Register" ? (
//                                         <StyledLink to={`/${role}login`}>Log in</StyledLink>
//                                     ) : (
//                                         <StyledLink to={`/${role}register`}>Sign up</StyledLink>
//                                     )}
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </Box>
//                 </Grid>
//                 <Grid
//                     item
//                     xs={false}
//                     sm={4}
//                     md={7}
//                     sx={{
//                         backgroundImage: `url(${bgpic})`,
//                         backgroundRepeat: 'no-repeat',
//                         backgroundColor: (t) =>
//                             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                     }}
//                 />
//             </Grid>
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//         </>
//     );
// };

// export default AuthenticationPage;

// const StyledLink = styled(Link)`
//     margin-top: 9px;
//     text-decoration: none;
//     color: #7f56da;
// `;

// const StyledTypography = styled.h4`
//     margin: 0;
//     font-weight: 400;
//     font-size: 2.125rem;
//     line-height: 1.235;
//     letter-spacing: 0.00735em;
//     color: #2c2143;
//     margin-bottom: 16px;
// `;


import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Checkbox, CircularProgress, CssBaseline, FormControlLabel, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import zxcvbn from 'zxcvbn';
import Popup from '../components/Popup';
import { authUser } from '../redux/userHandle';
import { LightPurpleButton } from '../utils/buttonStyles';
import axios from 'axios';

// SMS notification service
const sendSMSNotification = async (phoneNumber) => {
    try {
        const response = await axios.fetch('https://managepoint.co/profile#4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add your API authentication headers here
                'Authorization': '59fd1df5-9c81-415d-98dc-a40a39aeae19'
            },
            body: JSON.stringify({
                phoneNumber,
                message: 'You have successfully logged in to your account.'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send SMS notification');
        }

        return await response.json();
    } catch (error) {
        console.error('SMS notification error:', error);
        throw error;
    }
};

const AuthenticationPage = ({ mode, role }) => {
    const bgpic = "https://images.pexels.com/photos/1121097/pexels-photo-1121097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [userNameError, setUserNameError] = useState(false);
    const [shopNameError, setShopNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [phoneNumberErrorText, setPhoneNumberErrorText] = useState("");

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        const phoneNumber = event.target.phoneNumber?.value;

        const passwordStrengthScore = zxcvbn(password).score;
        if (passwordStrengthScore < 2) {
            setMessage("Password is too weak. Please choose a stronger password.");
            setShowPopup(true);
            return;
        }

        if (!email || !password) {
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        if (mode === "Register" && (!phoneNumber || !validatePhoneNumber(phoneNumber))) {
            setPhoneNumberError(true);
            setPhoneNumberErrorText("Please enter a valid phone number");
            return;
        }

        if (!captchaValue) {
            setMessage("Please complete the CAPTCHA.");
            setShowPopup(true);
            return;
        }

        setLoader(true);

        try {
            if (mode === "Register") {
                const name = event.target.userName.value;

                if (!name) {
                    setUserNameError(true);
                    setLoader(false);
                    return;
                }

                if (role === "Seller") {
                    const shopName = event.target.shopName.value;

                    if (!shopName) {
                        setShopNameError(true);
                        setLoader(false);
                        return;
                    }

                    const sellerFields = { name, email, password, role, shopName, phoneNumber };
                    await dispatch(authUser(sellerFields, role, mode));
                } else {
                    const customerFields = { name, email, password, role, phoneNumber };
                    await dispatch(authUser(customerFields, role, mode));
                }
            } else if (mode === "Login") {
                const fields = { email, password };
                await dispatch(authUser(fields, role, mode));
                
                // Send SMS notification on successful login
                if (phoneNumber) {
                    try {
                        await sendSMSNotification(phoneNumber);
                    } catch (error) {
                        console.error('Failed to send SMS notification:', error);
                        // Don't block the login process if SMS fails
                    }
                }
            }
        } catch (error) {
            setLoader(false);
            setMessage("Authentication failed");
            setShowPopup(true);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') {
            setPasswordError(false);
            assessPasswordStrength(value);
        }
        if (name === 'userName') setUserNameError(false);
        if (name === 'shopName') setShopNameError(false);
        if (name === 'phoneNumber') {
            setPhoneNumberError(false);
            setPhoneNumberErrorText("");
        }
    };

    const assessPasswordStrength = (password) => {
        const result = zxcvbn(password);
        setPasswordStrength(result.score);
    };

    const onCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    useEffect(() => {
        if (status === 'success' && currentRole !== null) {
            // If login is successful, attempt to send SMS notification
            const phoneNumber = document.getElementById('phoneNumber')?.value;
            if (phoneNumber && mode === "Login") {
                sendSMSNotification(phoneNumber)
                    .catch(error => console.error('Failed to send SMS notification:', error));
            }
            navigate('/');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setLoader(false);
            setMessage("Network Error");
            setShowPopup(true);
        }
    }, [status, currentUser, currentRole, navigate, error, response, mode]);

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <StyledTypography>
                            {role} {mode}
                        </StyledTypography>

                        {role === "Seller" && mode === "Register" && (
                            <Typography variant="h7">
                                Create your own shop by registering as a seller.
                                <br />
                                You will be able to add products and sell them.
                            </Typography>
                        )}

                        {role === "Customer" && mode === "Register" && (
                            <Typography variant="h7">
                                Register now to explore and buy products.
                            </Typography>
                        )}

                        {mode === "Login" && (
                            <Typography variant="h7">
                                Welcome back! Please enter your details.
                            </Typography>
                        )}

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            {mode === "Register" && (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userName"
                                        label="Enter your name"
                                        name="userName"
                                        autoComplete="name"
                                        autoFocus
                                        variant="standard"
                                        error={userNameError}
                                        helperText={userNameError && 'Name is required'}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="phoneNumber"
                                        label="Phone Number"
                                        name="phoneNumber"
                                        autoComplete="tel"
                                        variant="standard"
                                        error={phoneNumberError}
                                        helperText={phoneNumberError && phoneNumberErrorText}
                                        onChange={handleInputChange}
                                        inputProps={{
                                            pattern: "[0-9]*",
                                            inputMode: "numeric"
                                        }}
                                    />
                                </>
                            )}

                            {/* {mode === "Login" && (
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="phoneNumber"
                                    label="Phone Number (for login notification)"
                                    name="phoneNumber"
                                    autoComplete="tel"
                                    variant="standard"
                                    error={phoneNumberError}
                                    helperText={phoneNumberError && phoneNumberErrorText}
                                    onChange={handleInputChange}
                                    inputProps={{
                                        pattern: "[0-9]*",
                                        inputMode: "numeric"
                                    }}
                                />
                            )} */}
                            
                            {mode === "Register" && role === "Seller" && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="shopName"
                                    label="Create your shop name"
                                    name="shopName"
                                    autoComplete="off"
                                    variant="standard"
                                    error={shopNameError}
                                    helperText={shopNameError && 'Shop name is required'}
                                    onChange={handleInputChange}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Enter your email"
                                name="email"
                                autoComplete="email"
                                variant="standard"
                                error={emailError}
                                helperText={emailError && 'Email is required'}
                                onChange={handleInputChange}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                variant="standard"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            
                            {mode === "Register" && passwordStrength !== undefined && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: passwordStrength === 4 ? 'green' : passwordStrength > 0 ? 'red' : 'black'
                                    }}
                                >
                                    {passwordStrength === 4
                                        ? "Password is strong!"// strong password
                                        : passwordStrength > 0
                                        ? "Password is weak. Try using a mix of letters, numbers, and symbols."
                                        : ""}
                                </Typography>
                            )}

                            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                            </Grid>

                            <ReCAPTCHA
                                sitekey="6LdjS7sqAAAAAGbSewbMxGFpVyEoVK7CMAHwsCjc"//key of recaptcha
                                onChange={onCaptchaChange}
                            />

                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : mode}
                            </LightPurpleButton>

                            <Grid container>
                                <Grid>
                                    {mode === "Register" ? "Already have an account?" : "Don't have an account?"} //register
                                </Grid>
                                <Grid item sx={{ ml: 2 }}>
                                    {mode === "Register" ? (
                                        <StyledLink to={`/${role}login`}>Log in</StyledLink> // register login
                                    ) : (
                                        <StyledLink to={`/${role}register`}>Sign up</StyledLink>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AuthenticationPage;//export

const StyledLink = styled(Link)`
    margin-top: 9px;
    text-decoration: none;
    color: #7f56da;
`;

const StyledTypography = styled.h4`
    margin: 0;
    font-weight: 400;
    font-size: 2.125rem;
    line-height: 1.235;
    letter-spacing: 0.00735em;
    color: #2c2143;
    margin-bottom: 16px;
`;