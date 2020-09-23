import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./logindiv.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "./Header";
import Footer from "./Footer";
import Home from "./Home";

const LoginPage = () => {
  const [values, setValues] = React.useState({
    password: "",
    email: "",
    name: "",
    expand: false,
    showPassword: false,
    result: true,

    resultreg: true,
    userstate: Cookies.get("userLoginState"),
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
    button: {
      margin: theme.spacing(1),
      width: "100%",
    },

    btnroot: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeem = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChangename = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const cleartext = () => {
    setValues({
      ...values,
      result: true,
      resultreg: true,
      password: "",
      email: "",
      name: "",
    });
  };
  const date = new Date().getFullYear();
  const submitdata = () => {
     // eslint-disable-next-line
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   
    if (reg.test(values.email) === false) {
      console.log("Email is Not Correct");
    } else {
      Axios.post("http://192.168.43.26:5055/api/insert", {
        email: values.email,
        password: values.password,
        date: date,
        name: values.name,
      }).then((response) => {


        if (response.data.statuss) {
          Cookies.set("userLoginState", response.data.statuss, { expires: 1 });
          Cookies.set("name", response.data.name);
          Cookies.set("uid", response.data.uid );
          Cookies.set("email", response.data.email );
          console.log(response.data.name)
        setValues({

          ...values,
          resultreg: response.data.statuss,
          password: "",
          email: "",
          name: "",
          
          userstate: response.data.statuss,
        });


      }
      //  console.log()
       
      });
    }
  };

  const submitlogin = async () => {
    await Axios.post("http://192.168.43.26:5055/api/insert/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log("sdfs",response.data.status);

     
      if (response.data.status) {
        Cookies.set("name", response.data.name);
        Cookies.set("uid", response.data.uid);
        Cookies.set("userLoginState", response.data.status, { expires: 1 });
      }
      //sessionStorage.setItem("userLoginState", response.data);
      setValues({
        ...values,
        result: response.data,
        password: "",
        email: "",
        name: "",
        userstate: response.data.status,
      });
    });
  };

  const openregister = () => {
    setValues({
      ...values,
      expand: true,
      result: true,
      resultreg: true,
      password: "",
      email: "",
      name: "",
    });
  };
  const closeregister = () => {
    setValues({
      ...values,
      expand: false,
      result: true,
      resultreg: true,
      password: "",
      email: "",
      name: "",
    });
  };

  
  if (values.userstate) {
    return <Redirect to="/Home"  Component={Home}/>;
  } else {
    return (
      <>
        <div className="logdiv">
          <NavBar className="NavHeader" />
          <div className="Logindiv">
            <div className="logindivtext">
              <AccountCircleIcon
                style={{
                  margin: "0px auto",
                  position: "relative",
                  fontSize: 60,
                  color: "#000000",
                }}
                className="loginicon"
              ></AccountCircleIcon>
              <br />
              {/* //  <span className="Logintext">LOGIN</span><br/> */}
              <span style={{ fontSize: 22 }} className="loginname1">
                NOTES
              </span>
              <span style={{ fontSize: 22 }} className="loginname2">
                MATE
              </span>
              <br />
              <hr className="loginhr"></hr>
              {values.result ? null : (
                <span style={{ fontSize: 12, color: "#fcba03" }}>
                  Account Not found <br /> Please Create new one
                </span>
              )}
              {values.resultreg ? null : (
                <span style={{ fontSize: 12, color: "#fcba03" }}>
                  Account already found <br /> Please Sign-in
                </span>
              )}
            </div>

            <div className="logininput">
              {values.expand ? (
                <>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-em">
                      Name
                    </InputLabel>

                    <OutlinedInput
                      id="outlined-adornment-em"
                      type={values.showname ? "text" : "Name"}
                      value={values.name}
                      onChange={handleChangename("name")}
                      endAdornment={
                        <InputAdornment position="end">
                          <AccountCircle />
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                  <br />
                </>
              ) : null}

              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-em">E-mail</InputLabel>

                <OutlinedInput
                  id="outlined-adornment-em"
                  type={values.showem ? "text" : "Email"}
                  value={values.email}
                  onChange={handleChangeem("email")}
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <br />
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>

                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              {values.expand ? (
                <>
                  <div className={classes.btnroot}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitdata}
                      className={classes.button}
                      endIcon={<Icon>person</Icon>}
                    >
                      {" "}
                      SIGNUP
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={cleartext}
                      className={classes.button}
                      endIcon={<Icon>clear</Icon>}
                    >
                      {" "}
                      RESET
                    </Button>
                  </div>
                  <div className={classes.btnroot}>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      endIcon={<Icon>login</Icon>}
                      onClick={closeregister}
                    >
                      {" "}
                      SIGNIN
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className={classes.btnroot}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitlogin}
                      className={classes.button}
                      endIcon={<Icon>login</Icon>}
                    >
                      {" "}
                      SIGNIN
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={cleartext}
                      className={classes.button}
                      endIcon={<Icon>clear</Icon>}
                    >
                      {" "}
                      RESET
                    </Button>
                  </div>
                  <div className={classes.btnroot}>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      endIcon={<Icon>person</Icon>}
                      onClick={openregister}
                    >
                      {" "}
                      SIGNUP
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
};

export default LoginPage;
