import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          console.log(data.user)
        } else {
          toast.error(data.message || "Failed to fetch user details");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while fetching user details");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);
//delete
const handleDeleteAccount = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  
    
      try {
        const userId = user._id; // Get the actual user ID from the state (or response)
        const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          toast.success("Account deleted successfully!");
          localStorage.removeItem("token"); // Remove the token from local storage
          navigate("/login");
        } else {
          const data = await response.json();
          toast.error(data.message || "Failed to delete account");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while deleting the account");
      }
    };
 

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg">No user data available</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Card Header */}
        <div className="bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-semibold">Profile Details</h2>
          <p className="text-gray-300">Welcome back, {user.name}!</p>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">{user.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">{user.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Joined On</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        
        <div className="bg-gray-50 p-4">
        <button
            onClick={() => navigate("/update")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-300"
          >
            Update Profile
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition-all duration-300"
          >
            Delete Account
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-md transition-all duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;