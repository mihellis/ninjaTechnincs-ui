import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {
  postProperty,
  putProperty,
  deleteProperty,
} from "../../store/properties-actions.js";
import { useNavigate, Link, redirect, useActionData } from "react-router-dom";
import { getRepairsByProp } from "../../store/repairs.js";
import { fetchUserDeatails } from "../../network/fetchFunctions/fetchFunctions.js";

export default function Properties() {
  const navigate = useNavigate();

  // const [properties, setProperties] = useState(user.properties);
  const properties = useSelector((state) => state.user.properties);
  const [expandedPropertyId, setExpandedPropertyId] = useState(null);
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({
    address: "",
    yearOfConstruction: "",
  });
  // useEffect(() => {
  //   console.warn(usersteat);
  //   if (!usersteat) {
  //     navigate("/login");
  //   }
  // }, [usersteat, navigate]);
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddProperty = () => {
    if (editingId) {
      dispatch(
        putProperty({
          propertyIDNumber: editingId,
          ownerId: user.id,
          address: formData.address,
          yearOfConstruction: formData.yearOfConstruction,
        })
      );
      setEditingId(null);
    } else {
      dispatch(
        postProperty({
          ownerId: user.id,
          address: formData.address,
          yearOfConstruction: formData.yearOfConstruction,
        })
      );
    }
    setFormData({ address: "", yearOfConstruction: "" });
  };

  const handleEdit = (id) => {
    const property = properties.find((p) => p.propertyIDNumber === id);
    setFormData(property);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    dispatch(
      deleteProperty({
        propertyIDNumber: id,
      })
    );
  };

  // const handleDeleteRepair = (id) => {
  //   dispatch(
  //     deleteProperty({
  //       propertyIDNumber: id,
  //     })
  //   );
  // };

  const handleView = (propertyIDNumber) => {
    // fetch the viewes
    dispatch(getRepairsByProp(propertyIDNumber));

    setExpandedPropertyId(
      expandedPropertyId === propertyIDNumber ? null : propertyIDNumber
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-8 rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800">
      <h1 className="mb-4 text-2xl font-bold text-center text-amber-400">
        Manage Properties{console.warn(properties)}
      </h1>
      <div className="flex flex-col gap-2 mb-6">
        <Input
          label="Address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
        <Input
          label="yearOfConstruction"
          value={formData.yearOfConstruction}
          onChange={(e) =>
            handleInputChange("yearOfConstruction", e.target.value)
          }
        />
        <div className="flex gap-4">
          <Button onClick={handleAddProperty}>
            {editingId ? "Update Property" : "Add Property"}
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {properties.map((property) => (
          <div
            key={property.propertyIDNumber}
            className="p-4 bg-stone-600 rounded shadouw-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-stone-200">
                  {property.address}
                </p>
                <p className="text-sm text-stone-300">
                  {property.yearOfConstruction}
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => handleView(property.propertyIDNumber)}
                  className="px-4 py-2 font-semibold uppercase rounded text-stone-900 bg-blue-400 hover:bg-blue-500"
                >
                  {expandedPropertyId === property.propertyIDNumber
                    ? "Hide"
                    : "View"}
                </Button>
                <Button onClick={() => handleEdit(property.propertyIDNumber)}>
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(property.propertyIDNumber)}
                  className="px-4 py-2 font-semibold uppercase rounded text-stone-900 bg-red-400 hover:bg-red-500"
                >
                  Delete
                </Button>
              </div>
            </div>
            {/* Expanded Section */}
            {expandedPropertyId === property.propertyIDNumber && (
              <div className="mt-4 p-4 bg-stone-500 rounded">
                <h3 className="text-md font-semibold text-stone-200">
                  Repairs Information
                </h3>
                {property.repairs?.length > 0 ? (
                  <>
                    <ul className="mt-2 space-y-2">
                      {property.repairs.map((repair, index) => (
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
                                navigate(
                                  `/${property.propertyIDNumber}/${repair.id}/view`
                                )
                              }
                              className="text-stone-400 hover:text-blue-400"
                              title="View Repair"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              onClick={() =>
                                navigate(
                                  `/${property.propertyIDNumber}/${repair.id}/edit`
                                )
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
                    <p className="text-amber-400 hover:text-amber-500">
                      <Link to={`/${property.propertyIDNumber}/new`}>
                        ...create new
                      </Link>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-sm text-stone-400">
                      No repairs available for this property.
                    </p>
                    <p className="text-amber-400 hover:text-amber-500">
                      <Link to={`/${property.propertyIDNumber}/new`}>
                        ...create new
                      </Link>
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export async function loader({ request, params }) {
  const id = params.userID;
  console.warn("params", params);
  console.warn("id", id);

  const response = await fetchUserDeatails(id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected repair." },
      {
        status: 500,
      }
    );
  } else {
    const data = await response.json();

    return data;
  }
} //
