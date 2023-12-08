import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";

import { setCredentials } from "../slices/authSlice";
// import { useNavigate } from "react-router-dom";
import CustomSpinner from "../components/CustomSpinner";
import ErrorComponent from "../components/ErrorComponent";
export default function Profile() {
  const user = useSelector((store) => store.auth.userInfo);
  const { userInfo } = useSelector((state) => state.auth);
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // const orders = data.data.orders;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        setIsLoading(true);
        const headers = {
          Authorization: `Bearer ${userInfo.token}`, // Add any other headers as needed
          _id: userInfo._id,
        };

        const res = await axios.get("http://localhost:3000/order/getMyOrders", {
          headers: headers,
        });
        console.log(res);
        setOrder(res?.data?.orders);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    }
    fetchOrderHistory();
  }, [userInfo._id, userInfo.token]);
  return (
    <div className="xs:min-w-max  w-screen h-screen	bg-[#151725]">
      <div className="min-w-fit container mx-auto  p-5 ">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* <!-- Left Side --> */}
          <div className="w-full md:w-3/12 md:mx-2">
            <ProfileCard user={user} />
            <div className="my-4"></div>
          </div>
          {/* <!-- Right Side --> */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            <About user={user} dispatch={dispatch} userInfo={userInfo} />
            <OrderHistory order={order} isLoading={isLoading} error={error} />
          </div>
        </div>
      </div>
    </div>
  );
}
function ProfileCard({ user }) {
  return (
    <div className="p-3  bg-[#1C1E2D] ">
      {/* <div className="image overflow-hidden">
        <img
          className="h-auto w-full mx-auto"
          src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
        />
      </div> */}
      <h1 className="font-bold text-xl leading-8 my-1 text-white">
        {user.firstname} {user.lastname}
      </h1>
      <h3 className="font-lg text-semibold leading-6 text-white">
        {/* Owner at Her Company Inc. */}
      </h3>
      <p className="text-sm hover:text-gray-600 leading-6 text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
        eligendi dolorum sequi illum qui unde aspernatur non deserunt
      </p>
      {/* <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
      <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Active
                    </span>
                  </span>
                </li>
      <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">Nov 07, 2016</span>
                </li>
      </ul> */}
    </div>
  );
}
function About({ user, dispatch, userInfo }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    password: "",
    confirmPassword: "",
  });
  // const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const validatePassword = () => {
    // Password validation logic
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(editedUser.password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send a POST request to the backend with editedUser data

    if (editedUser.password !== editedUser.confirmPassword) {
      // Display an error message or handle the mismatch case
      toast.error("Password and Confirm Password do not match");
      return;
    }
    if (!validatePassword()) {
      toast.error(
        "Password must be at least 8 characters long and contain letters, symbols, and numbers."
      );
      return;
    }
    const { firstname, lastname, password } = editedUser;
    const values = {
      id: userInfo._id,
      firstname,
      lastname,
      password,
      token: userInfo.token,
      email: userInfo.email,
    };
    const headers = {
      // Include any headers you want to send
      Authorization: `Bearer ${userInfo.token}`,
      // You can add more headers here if needed
    };

    try {
      const res = await axios.put(
        "http://localhost:3000/user/profile",
        values,
        { headers }
      );
      const updatedUser = res?.data;

      dispatch(setCredentials({ ...updatedUser }));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    // Reset the edit mode after saving
    setIsEdit(false);
  };

  return (
    <div className=" p-3 pb-0 shadow-sm rounded-sm  bg-[#1C1E2D]">
      {isEdit ? (
        <>
          <div className=" p-3 shadow-sm rounded-sm  bg-[#1C1E2D]">
            <form onSubmit={handleSubmit}>
              {/* Input fields for editing */}
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2 py-2">
                  <div className="px-4 py-2 font-semibold text-white ">
                    First Name:
                  </div>
                  <Input
                    type="text"
                    name="firstname"
                    value={editedUser.firstname}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200  text-white focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none text-white",
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 py-2">
                  <div className="px-4 py-2 font-semibold text-white">
                    Last Name:
                  </div>
                  <Input
                    type="text"
                    name="lastname"
                    value={editedUser.lastname}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200 text-white focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none text-white",
                    }}
                  />
                </div>
                {/* ... (other input fields) ... */}
                <div className="grid grid-cols-2 py-2">
                  <div className="px-4 py-2 font-semibold text-white">
                    Password:
                  </div>
                  <Input
                    type="password"
                    name="password"
                    value={editedUser.password}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200  text-white focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none text-white",
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 py-2">
                  <div className="px-4 py-2 font-semibold text-white">
                    Confirm Password:
                  </div>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={editedUser.confirmPassword}
                    onChange={handleInputChange}
                    className=" !border-t-blue-gray-200  text-white focus:!border-gray-700 "
                    labelProps={{
                      className:
                        "before:content-none after:content-none text-white",
                    }}
                  />
                </div>
              </div>
              {/* Save button */}
              <button
                type="submit"
                className="block w-full text-blue-800 text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  hover:shadow-xs p-3 my-4 hover:bg-[#151725] focus:bg-[#151725]"
                onClick={handleSubmit}
              >
                Save Information
              </button>
            </form>
            <button
              className="block w-full text-blue-800 text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline  hover:shadow-xs p-3 my-4 hover:bg-[#151725] focus:bg-[#151725]"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span className="text-green-500">
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span className="tracking-wide text-white">About</span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold text-white">
                  First Name:
                </div>
                <div className="px-4 py-2 text-white">{user.firstname}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold text-white">
                  Last Name:
                </div>
                <div className="px-4 py-2 text-white">{user.lastname}</div>
              </div>
              <div className="grid grid-cols-2">
                {/* <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">Female</div> */}
              </div>
              <div className="grid grid-cols-2">
                {/* <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">+11 998001001</div> */}
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold text-white">Email:</div>
                <div className="px-4 py-2">
                  <div className=" text-white">{user.email}</div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="block w-full text-blue-800 text-sm font-semibold rounded-lg  focus:outline-none focus:shadow-outline hover:shadow-xs p-3 my-4 hover:bg-[#151725] focus:bg-[#151725]"
            onClick={() => setIsEdit(true)}
          >
            Edit Information
          </button>
        </>
      )}
    </div>
  );
}
function OrderHistory({ order, isLoading, error }) {
  return (
    <div className="overflow-y-auto overflow-x-auto h-fit pb-3 bg-[#1C1E2D]">
      {isLoading ? (
        <CustomSpinner />
      ) : error ? (
        <ErrorComponent />
      ) : (
        <>
          <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden  shadow-lg px-5 bg-[#1C1E2D]">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="text-green-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <span className="tracking-wide text-white">Order History</span>
            </div>
          </div>
          <div className="align-middle inline-block min-w-full shadow overflow-hidden  shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg bg-[#1C1E2D]">
            <table className="min-w-full bg-[#151725] ">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                    Order ID
                  </th>

                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#151725]">
                {order?.map((info) => (
                  <tr key={info._id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm leading-5 text-white">
                            {info._id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                      {info.createdAt &&
                        format(new Date(info.createdAt), "yyyy-MM-dd")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
