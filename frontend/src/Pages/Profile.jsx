// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:5000/api/user/me", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setUser(data.user);
//         } else {
//           console.error("Failed to fetch user details:", data.message);
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [navigate]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-800 text-white p-6">
//       <h2 className="text-2xl font-semibold">Profile Details</h2>
//       {user && (
//         <>
//           <p className="text-gray-300">Welcome back, {user.name}</p>
//           <div className="mt-6 space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-white-700">Name</label>
//               <p className="mt-1 p-2 bg-gray-300 text-black rounded-md">{user.name}</p>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-white-700">Email</label>
//               <p className="mt-1 p-2 bg-gray-300 text-black rounded-md">{user.email}</p>
//             </div>
//             {/* <div>
//               <label className="block text-sm font-medium text-black-700">Joined On</label>
//               <p className="mt-1 p-2 bg-gray-300 text-black rounded-md">
//                 {new Date(user.createdAt).toLocaleDateString()}
//               </p>
//             </div> */}
//             <div>
//   <label className="block text-sm font-medium text-black">Joined On</label>
//   <p className="mt-1 p-2 bg-gray-300 text-black rounded-md">
//     {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
  

//   </p>
// </div>

//           </div>
//         </>
//       )}
//       <button
//         onClick={() => navigate("/")}
//         className="mt-4 bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 rounded-md transition-all duration-300"
//       >
//         Go to Home
//       </button>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        const response = await fetch("http://localhost:5000/api/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          console.error("Failed to fetch user details:", data.message);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-semibold">Profile Details</h2>
      {user && (
        <>
          <p className="text-gray-300">Welcome back, {user.name}</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white-700">Name</label>
              <p className="mt-1 p-2 bg-gray-300 text-black rounded-md">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-white-700">Email</label>
              <p className="mt-1 p-2 bg-gray-300 text-black rounded-md">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Joined On</label>
              <p className="mt-1 p-2 bg-gray-300 text-black rounded-md">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>
        </>
      )}
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
