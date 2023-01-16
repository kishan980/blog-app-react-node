import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { REDIRECT_FALSE, REMOVE_MESSAGE } from "../store/types/PostTypes";

const Dashboard = () => {
  const { redirect, message, loading } = useSelector(
    (state) => state.PostReducer
    );
    console.log("🚀 ~ file: Dashboard.js:9 ~ Dashboard ~ message", message)

  const dispatch = useDispatch();

  useEffect(() => {
    if (redirect) {
      dispatch({ type: REDIRECT_FALSE });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: REMOVE_MESSAGE });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>User Dashboard</title>
        <meta name="description" content="User Dashboard" />
      </Helmet>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
    </>
  );
};
export default Dashboard;
