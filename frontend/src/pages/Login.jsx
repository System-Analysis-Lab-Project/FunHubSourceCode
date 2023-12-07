import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  // Form,
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import CustomSpinner from "../components/CustomSpinner";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();

  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo?.token) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      const user = res._doc;
      console.log(user);
      dispatch(setCredentials({ ...user }));
      navigate(redirect);
    } catch (err) {
      console.log(err);
      err?.data?.data?.map((er) => toast.error(er.msg));
      toast.error(err?.data?.message);
    }
  };

  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-screen w-full max-w-xs m-auto flex flex-col  justify-center items-center"
    >
      <Typography variant="h4" color="blue-gray" className="text-white">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 text-white font-normal">
        Welcome back!
      </Typography>
      <form
        onSubmit={submitHandler}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-white -mb-3"
          >
            Your Email
          </Typography>
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-blue-gray-200 text-white  focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-white -mb-3"
          >
            Password
          </Typography>
          <Input
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 focus:!border-blue-gray-200 text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        {isLoading && <CustomSpinner />}
        <Button
          className="mt-6 bg-[#151725] hover:bg-[#151729]"
          fullWidth
          disabled={isLoading}
          type="submit"
          onSubmit={submitHandler}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
        <Typography
          color="gray"
          className="text-white mt-4 text-center font-normal"
        >
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600  font-medium ">
            Sign up
          </Link>
        </Typography>
      </form>
    </Card>
  );
}

export default Login;
