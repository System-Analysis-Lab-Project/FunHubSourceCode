import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link, useNavigation } from "react-router-dom";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
// import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const validateName = (value) => {
    // Validate that the input contains only letters and no whitespace
    const isValid = /^[a-zA-Z]+$/.test(value);
    return isValid || "Invalid input";
  };

  const validateEmail = (value) => {
    // Validate that the input is a valid email and contains no whitespace
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return isValid || "Invalid email address";
  };
  const onSubmit = async (values) => {
    try {
      values.firstname =
        values.firstname.charAt(0).toUpperCase() + values.firstname.slice(1);
      values.lastname =
        values.lastname.charAt(0).toUpperCase() + values.lastname.slice(1);

      await axios.post("http://localhost:3000/user/signup", values);

      return navigate("/login");
    } catch (err) {
      setErr(err?.response?.data);
      console.log(err);
    }
  };
  return (
    <Card
      color="transparent"
      shadow={false}
      className="h-screen w-full max-w-xs m-auto flex flex-col  justify-center items-center"
    >
      <Typography variant="h4" color="blue-gray" className="text-white">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal text-white">
        Enter your details to register.
      </Typography>
      {err && <p className="text-red-500 text-xs italic">{err}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 mb-2 w-80 min-w-screen-lg sm:w-96"
      >
        <div className="grid md:grid-cols-2 md:gap-6 ">
          <div className="mb-3  relative z-0 max-w-[50%] sm:min-w-full xs:min-w-full group">
            <div className="min-w-full">
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500 text-white"
              >
                First Name
              </Typography>

              <Input
                name="firstname"
                type="firstname"
                id="firstname"
                size="md"
                placeholder="John"
                {...register("firstname", {
                  required: "Required",
                  validate: validateName,
                })}
                onBlur={(e) => {
                  e.target.value = e.target.value.trim(); // Trim whitespace on blur
                }}
                aria-invalid={errors.firstname ? "true" : "false"}
                className={
                  " !border-t-blue-gray-200 focus:!border-t-gray-900 focus:!border-blue-gray-200 text-white w-[90%] sm:min-w-full xs:min-w-full"
                }
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {errors.firstname?.type === "validate" && (
                <p
                  className="m-0 visible peer-invalid:visible text-pink-600 text-sm"
                  role="alert"
                >
                  {errors.firstname.message}
                </p>
              )}
            </div>
          </div>

          {/* Repeat similar structure for other inputs */}

          <div className="mb-3  relative z-0 max-w-[50%] sm:min-w-full xs:min-w-full group ">
            <div className="min-w-min flex flex-col justify-center">
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500 text-white "
              >
                Last Name
              </Typography>

              <Input
                name="lastname"
                type="lastname"
                id="lastname"
                size="md"
                placeholder="Doe"
                {...register("lastname", {
                  required: "Required",
                  validate: validateName,
                })}
                onBlur={(e) => {
                  e.target.value = e.target.value.trim(); // Trim whitespace on blur
                }}
                aria-invalid={errors.lastname ? "true" : "false"}
                className={
                  " !border-t-blue-gray-200 focus:!border-t-gray-900 focus:!border-blue-gray-200 text-white md:w-[90%] xs:min-w-full "
                }
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {errors.lastname?.type === "validate" && (
                <p
                  className="m-0 visible peer-invalid:visible text-pink-600 text-sm"
                  role="alert"
                >
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          {/* Repeat similar structure for other inputs */}
        </div>

        <div className="mb-3 flex flex-col gap-6">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500 text-white"
            >
              Your Email
            </Typography>
            <Input
              name="email"
              type="email"
              id="email"
              size="lg"
              {...register("email", {
                required: "Required",
                validate: validateEmail,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              onBlur={(e) => {
                e.target.value = e.target.value.trim(); //

                //  Trim whitespace on blur
              }}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 focus:!border-blue-gray-200 text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email && (
              <p
                className="m-0 p-0 visible peer-invalid:visible text-pink-600 text-sm"
                role="alert"
              >
                {errors?.email?.message}
              </p>
            )}
          </div>
        </div>

        {/* Repeat similar structure for other inputs */}

        <div className="mb-3 flex flex-col gap-6 ">
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-1 after:content-['*'] after:ml-0.5 after:text-red-500 text-white"
            >
              Password
            </Typography>
            <Input
              name="password"
              id="password"
              type="password"
              size="lg"
              {...register("password", {
                required: "Required",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                  message:
                    "Password requirements: 8-20 characters, 1 number, 1 letter, 1 symbol.",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 focus:!border-blue-gray-200 text-white "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password && (
              <p
                className="m-0 visible peer-invalid:visible text-pink-600 text-sm "
                role="alert"
              >
                {errors?.password?.message}
              </p>
            )}
          </div>
        </div>

        <Button
          className="mt-6 bg-[#151725] hover:bg-[#151729]"
          fullWidth
          disabled={navigation.state === "submitting"}
          type="submit"
        >
          {navigation.state === "submitting" ? "Register in..." : "Register"}
        </Button>
        <Typography
          color="gray"
          className="mt-4 text-center font-normal text-white"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  );
}

export default Register;
