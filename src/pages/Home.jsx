import {
  Outlet,
  useLoaderData,
  json,
  Link,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchUserList,
  fetchRepairsList,
  fetchUserDeatails,
} from "../network/fetchFunctions/fetchFunctions";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/user-actions";

// import EventsList from "../components/EventsList";

// const repairList = [
//   {
//     id: "d407c326-9310-4e32-4531-08dd16246a18",
//     scheduledDate: "2024-12-26T00:00:00",
//     type: 0,
//     currentStatus: 0,
//     description: "1",
//     address: "1",
//     cost: 1,
//     property: null,
//     propertyId: "814dcd9a-d170-4eab-4172-08dd0eba5c3c",
//   },
//   {
//     id: "90ab3fae-b2c3-4bc4-1bf5-08dd18467b51",
//     scheduledDate: "2024-12-26T00:00:00",
//     type: 0,
//     currentStatus: 0,
//     description: "newww",
//     address: "1",
//     cost: 1,
//     property: null,
//     propertyId: "814dcd9a-d170-4eab-4172-08dd0eba5c3c",
//   },
//   {
//     id: "dda7ec77-2c32-4098-1bf6-08dd18467b51",
//     scheduledDate: "2025-01-01T00:00:00",
//     type: 1,
//     currentStatus: 0,
//     description: "gdasgasg",
//     address: "jlaflhjvags",
//     cost: 1,
//     property: null,
//     propertyId: "814dcd9a-d170-4eab-4172-08dd0eba5c3c",
//   },
//   {
//     id: "358cece0-7efa-47e9-1bf7-08dd18467b51",
//     scheduledDate: "2024-12-25T00:00:00",
//     type: 0,
//     currentStatus: 0,
//     description: "4",
//     address: "3333",
//     cost: 1,
//     property: null,
//     propertyId: "814dcd9a-d170-4eab-4172-08dd0eba5c3c",
//   },
//   {
//     id: "a9280ec8-b22e-4a13-3195-08dd190d48c4",
//     scheduledDate: "2024-12-12T00:00:00",
//     type: 2,
//     currentStatus: 0,
//     description: "desdd",
//     address: "eeeelll",
//     cost: 5,
//     property: null,
//     propertyId: "814dcd9a-d170-4eab-4172-08dd0eba5c3c",
//   },
//   {
//     id: "d062bb14-c914-4bb6-3196-08dd190d48c4",
//     scheduledDate: "2024-12-20T00:00:00",
//     type: 2,
//     currentStatus: 0,
//     description: "dessscription",
//     address: "gafelli 55",
//     cost: 1,
//     property: null,
//     propertyId: "814dcd9a-d170-4eab-4172-08dd0eba5c3c",
//   },
//   {
//     id: "60b57e3c-c35c-4d41-3197-08dd190d48c4",
//     scheduledDate: "2024-12-24T00:00:00",
//     type: 1,
//     currentStatus: 0,
//     description: "kainourgio test edit",
//     address: "ellle",
//     cost: 1,
//     property: null,
//     propertyId: "814dcd9a-d170-4eab-4172-08dd0eba5c3c",
//   },
// ];

// eslint-disable-next-line react/prop-types
function HomePage({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [repairList, setRepairList] = useState(null);
  const [userList, setUserList] = useState(null);

  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [errorUser, setErrorUser] = useState(null);

  const [isLoadingReapair, setIsLoadingReapair] = useState(false);
  const [errorRepair, setErrorRepair] = useState(null);

  useEffect(() => {
    const getRepairList = async () => {
      setIsLoadingReapair(true);
      setErrorRepair(null);

      try {
        console.log("Fetching repair details...");
        const response = await fetchRepairsList();

        if (response.ok) {
          const data = await response.json();
          setRepairList(data);
        } else {
          setErrorRepair(`Error: ${response.status}`);
        }
      } catch (err) {
        setErrorRepair(err.message || "Failed to fetch repair details.");
      } finally {
        setIsLoadingReapair(false);
      }
    };

    getRepairList();
  }, []); // Fetch repair details when repairId changes

  useEffect(() => {
    const getUserList = async () => {
      setIsLoadingUser(true);
      setErrorUser(null);

      try {
        console.log("Fetching repair details...");
        const response = await fetchUserList();

        if (response.ok) {
          const data = await response.json();
          setUserList(data);
        } else {
          setErrorUser(`Error: ${response.status}`);
        }
      } catch (err) {
        setErrorRepair(err.message || "Failed to fetch user details.");
      } finally {
        setIsLoadingUser(false);
      }
    };

    getUserList();
  }, []);

  console.warn("home", user);

  if (isLoadingReapair) {
    return <p>Loading repair details...</p>;
  }

  if (errorRepair) {
    return <p>{errorRepair}</p>;
  }

  if (!repairList) {
    return <p>No repair details available.</p>;
  }

  function handleSubmit(id) {
    console.warn("idhome", id);
    dispatch(fetchUser(id));

    navigate("/properties");
  }

  // return (
  //   <div className="max-w-3xl mx-auto p-8 rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800">
  //     <h1 className="mb-4 text-2xl font-bold text-center text-amber-400">
  //       Home Page
  //     </h1>
  //     <Outlet />
  //   </div>
  // );
  return (
    <div className="max-w-3xl mx-auto p-8 rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800">
      <h1 className="mb-4 text-2xl font-bold text-center text-amber-400">
        {user.role === 0 ? "User Page" : "Admin Page"}
      </h1>
      {user.role === 1 ? (
        <div className="space-y-4">
          {/* Expanded Section */}
          <div className="mt-4 p-4 bg-stone-500 rounded">
            <h3 className="text-md font-semibold text-stone-200">
              Users Information
            </h3>
            {userList?.length > 0 ? (
              <>
                <ul className="mt-2 space-y-2">
                  {userList.map((user, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-sm text-stone-300 bg-stone-700 rounded p-2"
                    >
                      <div>
                        {user.name} -{" "}
                        <span className="text-stone-400">{user.email}</span>
                      </div>
                      {/* Action Icons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSubmit(user.id)}
                          className="text-stone-400 hover:text-blue-400"
                          title="View Repair"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          onClick={() => navigate(`/user/${user.id}/edit`)}
                          // onClick={() => navigate(`/user/${user.id}/edit`)}

                          className="text-stone-400 hover:text-yellow-400"
                          title="Edit Repair"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => null}
                          className="text-stone-400 hover:text-red-400"
                          title="Delete Repair"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="text-amber-400 hover:text-amber-500">
                  <Link to={`/user/new`}>...create new</Link>
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 text-sm text-stone-400">
                  No repairs available for this property.
                </p>
                <p className="text-amber-400 hover:text-amber-500">
                  <Link to={`/user/new`}>...create new</Link>
                </p>
              </>
            )}
          </div>
        </div>
      ) : null}
      <div className="space-y-4">
        {/* Expanded Section */}
        <div className="mt-4 p-4 bg-stone-500 rounded">
          <h3 className="text-md font-semibold text-stone-200">
            Repairs Information
          </h3>
          {repairList?.length > 0 ? (
            <>
              <ul className="mt-2 space-y-2">
                {repairList.map((repair, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm text-stone-300 bg-stone-700 rounded p-2"
                  >
                    <div>
                      {repair.description} -{" "}
                      <span className="text-stone-400">
                        {repair.scheduledDate || "Unknown Date"}
                      </span>
                    </div>
                    {/* Action Icons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/${repair.propertyId}/${repair.id}/view`)
                        }
                        className="text-stone-400 hover:text-blue-400"
                        title="View Repair"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/${repair.propertyId}/${repair.id}/edit`)
                        }
                        className="text-stone-400 hover:text-yellow-400"
                        title="Edit Repair"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        onClick={() => null}
                        className="text-stone-400 hover:text-red-400"
                        title="Delete Repair"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {/* <p className="text-amber-400 hover:text-amber-500">
                <Link to={`/user/new`}>...create new</Link>
              </p> */}
            </>
          ) : (
            <>
              <p className="mt-2 text-sm text-stone-400">
                No repairs available for this property.
              </p>
              {/* <p className="text-amber-400 hover:text-amber-500">
                <Link to={`/user/new`}>...create new</Link>
              </p> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

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
