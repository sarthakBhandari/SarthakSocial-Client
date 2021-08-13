import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.password1) {
      reset({ username: data.username, email: data.email });
      setAlert({
        show: true,
        message: "Passwords don't match",
        type: "danger",
      });
    } else {
      const { password1, ...other } = data;
      try {
        const res = await axios.post(
          "https://sarthak-social.herokuapp.com/api/auth/register",
          other
        );
        if (res) {
          setAlert({
            show: true,
            message: "User successfully registered, redirecting to login page",
            type: "success",
          });
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        }
      } catch (error) {
        setAlert({
          show: true,
          message:
            "An error occured, either the username or email already exists. Could be an internal server error",
          type: "danger",
        });
      }
    }
  };

  const Alert = ({ message, type }) => {
    useEffect(() => {
      const timeout = setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 4000);
      return () => {
        clearTimeout(timeout);
      };
    }, []);

    return (
      <p
        className={`text-sm text-center rounded-full p-1 mb-3 ${
          type === "danger"
            ? "text-red-600 bg-red-200"
            : "text-green-600 bg-green-200"
        }`}
      >
        {message}
      </p>
    );
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      {/* login wrapper */}
      <div className=" w-3/4 h-3/4 bg-white flex flex-col justify-between lg:flex-row p-5">
        {/* login left  */}
        <div className="lg:flex-1 flex flex-col justify-center">
          <h3 className="font-bold text-5xl mb-3 font-francois text-blue-500">
            Sarthak Social
          </h3>
          <span className="text-lg">
            Connect with friends and the world around you.
          </span>
        </div>
        {/* login right */}
        <div className="lg:flex-1 flex flex-col justify-center">
          {alert.show ? (
            <Alert message={alert.message} type={alert.type} />
          ) : null}
          {/* login box */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="h-96 border-8 flex flex-col justify-between p-3"
          >
            <input
              {...register("username", { required: true })}
              name="username"
              className="outline-none p-2 border m-1 px-4 rounded-lg"
              placeholder="Username"
            />
            {errors.username && (
              <p className="bg-white text-red-600 text-right p-1 text-sm">
                Username field required
              </p>
            )}
            <input
              {...register("email", { required: true })}
              name="email"
              type="email"
              className="outline-none p-2 border m-1 px-4 rounded-lg"
              placeholder="Email"
            />
            {errors.email && (
              <p className="bg-white text-red-600 text-right p-1 text-sm">
                Email field required
              </p>
            )}
            <input
              {...register("password", { required: true })}
              name="password"
              type="password"
              className="outline-none p-2 border m-1 px-4 rounded-lg"
              placeholder="Password"
            />
            {errors.password && (
              <p className="bg-white text-red-600 text-right p-1 text-sm">
                Password field required
              </p>
            )}
            <input
              {...register("password1", { required: true })}
              name="password1"
              type="password"
              className="outline-none p-2 border m-1 px-4 rounded-lg"
              placeholder="Confirm Password"
            />
            {errors.password1 && (
              <p className="bg-white text-red-600 text-right p-1 text-sm">
                Password field required
              </p>
            )}
            <button
              type="submit"
              className="border-none bg-blue-500 text-white rounded-md h-12 w-3/5 self-center active:bg-blue-700"
            >
              Register
            </button>
            <Link to="/login" className="flex justify-center">
              <button className="border-none bg-green-500 text-white rounded-md h-12 w-3/5 self-center active:bg-green-700">
                Log into Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
