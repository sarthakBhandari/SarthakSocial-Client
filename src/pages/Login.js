import { useForm } from "react-hook-form";
import { loginCall } from "../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

const Login = () => {
  const { isFetching, dispatch } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    loginCall(data, dispatch);
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
          <span>Connect with friends and the world around you.</span>
        </div>
        {/* login right */}
        <div className="lg:flex-1 flex flex-col justify-center">
          {/* login box */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="h-96 border-8 flex flex-col justify-between p-3"
          >
            <input
              {...register("email", { required: true })}
              name="email"
              className="outline-none p-2 border m-1 px-4 rounded-lg"
              placeholder="Email"
              type="email"
            />
            {errors.email && (
              <p className="bg-white text-red-600 text-right p-1 text-sm">
                Email field required
              </p>
            )}
            <input
              {...register("password", { required: true })}
              name="password"
              className="outline-none p-2 border m-1 px-4 rounded-lg"
              placeholder="Password"
              type="password"
            />
            {errors.password && (
              <p className="bg-white text-red-600 text-right p-1 text-sm">
                Password field required
              </p>
            )}
            <button
              type="submit"
              className={`${
                isFetching && "cursor-not-allowed"
              } border-none bg-blue-500 text-white rounded-md h-12 w-3/5 self-center active:bg-blue-700`}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <button
              className={`${
                isFetching && "cursor-not-allowed"
              } border-none bg-yellow-400 text-white rounded-md h-12 w-3/5 self-center active:bg-yellow-700`}
            >
              Forgot Password
            </button>
            <button
              className={`${
                isFetching && "cursor-not-allowed"
              } border-none bg-green-500 text-white rounded-md h-12 w-3/5 self-center active:bg-green-700`}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
