import { Outlet } from "react-router-dom";

// import EventsList from "../components/EventsList";

function UsersPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800">
      <h1 className="mb-4 text-2xl font-bold text-center text-amber-400">
        Manage User
      </h1>
      <Outlet />
    </div>
  );
}

export default UsersPage;

// export async function loader() {
//   const response = await fetch("http://localhost:8080/events");

//   if (!response.ok) {
//     // return { isError: true, message: 'Could not fetch events.' };
//     // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
//     //   status: 500,
//     // });
//     throw json(
//       { message: "Could not fetch events." },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     return response;
//   }
// }
