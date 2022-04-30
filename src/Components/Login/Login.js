import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const initialData = {
  email: "",
  isEmailValid: "",
  password: "",
  isPasswordValid: "",
};

const actionHandlerFn = (state, action) => {
  if (action.type === "UserInput_EMAIL")
    return {
      ...state,
      email: action.val,
    };
  else if (action.type === "UserInput_PASSWORD")
    return {
      ...state,
      password: action.val,
    };
  else if (action.type === "UserInput_EMAIL_VALID")
    return {
      ...state,
      isEmailValid: state.email.includes("@"),
    };
  else if (action.type === "UserInput_PASSWORD_VALID")
    return {
      ...state,
      isPasswordValid: state.password.trim().length > 6,
    };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [data, dispatchDataFN] = useReducer(actionHandlerFn, initialData);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        data.email.includes("@") && data.password.trim().length > 6
      );
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [data.email, data.password]);

  const emailChangeHandler = (event) => {
    dispatchDataFN({ type: "UserInput_EMAIL", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchDataFN({ type: "UserInput_PASSWORD", val: event.target.value });
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(enteredEmail.includes('@'));
    dispatchDataFN({ type: "UserInput_EMAIL_VALID" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchDataFN({ type: "UserInput_PASSWORD_VALID" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(data.email, data.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            data.isEmailValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            data.isPasswordValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
