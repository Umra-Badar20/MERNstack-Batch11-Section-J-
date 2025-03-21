import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
          setName(data.user.name);
          setEmail(data.user.email);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const userId = user._id; // Get the actual user ID from the state
      const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),  // Send updated data
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
        navigate("/profile");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating your profile");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Card Header */}
        <div className="bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-semibold">Update Profile</h2>
          <p className="text-gray-300">Update your personal information</p>
        </div>

        {/* Card Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 bg-gray-50 rounded-md w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 bg-gray-50 rounded-md w-full"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-all duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-1/2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-md transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;


