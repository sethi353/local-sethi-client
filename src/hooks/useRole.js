// import { useEffect, useState } from "react";

// const useRole = (email) => {
//   const [role, setRole] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!email) return;

//     fetch(`http://localhost:5000/users/role/${email}`, {
//       headers: {
//         authorization: `Bearer ${localStorage.getItem("access-token")}`,
//       },
//     })
//       .then(res => res.json())
//       .then(data => {
//         setRole(data.role);
//         setLoading(false);
//       });
//   }, [email]);

//   return { role, loading };
// };

// export default useRole;
