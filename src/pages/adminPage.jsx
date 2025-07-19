import { useEffect, useState } from "react";
import ShipmentList from "../components/trackingComponent";
import Shipments from "../components/shipments.js"; // import local shipment array

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [isNewEntryOpen, setNewEntry] = useState(false);
  const [formData, setFormData] = useState({
    billLandingNo: "",
    containerNo: "",
    products: "",
    shippingLine: "",
    portOfLoading: "",
    portOfDischarge: "",
    vessel: "",
    status: "",
    ETA: "",
    paar: "",
  });

  useEffect(() => {
    setShipments(Shipments);
  }, []);

  const openNewEntry = () => setNewEntry(true);

  const closeModals = () => {
    setNewEntry(false);
    setFormData({
      billLandingNo: "",
      containerNo: "",
      products: "",
      shippingLine: "",
      portOfLoading: "",
      portOfDischarge: "",
      vessel: "",
      status: "",
      ETA: "",
      paar: "",
    });
    setErrors({});
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSave = async (updated) => {
    try {
      const formatShippingLine = (line) =>
        line.replace(/\s+/g, "_").toUpperCase();

      const updatedShipment = {
        ...updated,
        containerNo: Array.isArray(updated.containerNo)
          ? updated.containerNo
          : [updated.containerNo],
        shippingLine: formatShippingLine(updated.shippingLine),
      };

      const updatedList = shipments.map((s) =>
        s.billLandingNo === updated.billLandingNo ? updatedShipment : s
      );

      setShipments(updatedList);
      setSuccessMessage("Shipment updated successfully.");
    } catch (err) {
      console.error("Error updating shipment:", err);
    }
  };

  const handleDelete = async (billLandingNo) => {
    try {
      const filtered = shipments.filter(
        (s) => s.billLandingNo !== billLandingNo
      );
      setShipments(filtered);
    } catch (err) {
      console.error("Error deleting shipment:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: "" }));
  };

  const handleCreate = async () => {
    const newErrors = {};
    Object.entries(formData).forEach(([k, v]) => {
      if (!v.trim()) newErrors[k] = `Enter ${k.replace(/([A-Z])/g, " $1")}.`;
    });

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const alreadyExists = shipments.some(
      (s) => s.billLandingNo === formData.billLandingNo
    );
    if (alreadyExists) {
      setErrorMessage("A shipment with this Bill Landing No already exists.");
      return;
    }

    const payload = {
      ...formData,
      containerNo: [formData.containerNo],
      shippingLine: formData.shippingLine.replace(/\s+/g, "_").toUpperCase(),
    };

    try {
      setIsLoading(true);
      setShipments((prev) => [...prev, payload]);
      setSuccessMessage("Shipment entry created successfully.");
      setShowConfirm(true);
      closeModals();
    } catch (error) {
      console.error("Creation error:", error);
      setErrorMessage("Failed to create shipment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full text-[var(--Accent)] bg-gray-400 flex flex-col">
      <div className="flex justify-between ml-24 mr-12 items-center py-8">
        <h2 className="text-5xl font-extrabold text-[var(--NavBackgroundOne)]">
          Hello, Welcome back.
        </h2>
        <div className="flex gap-12">
          <button
            onClick={openNewEntry}
            className="text-lg font-extrabold px-4 py-2 rounded-xl cursor-pointer shadow-md bg-[var(--Accent)] text-[var(--Secondary)] hover:opacity-80"
          >
            + Create Shipment Entry
          </button>
          <button
            onClick={handleLogout}
            className="text-lg font-extrabold px-4 py-2 rounded-xl cursor-pointer shadow-md border-2 text-[var(--Accent)] hover:opacity-60"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="overflow-y-auto bg-gray-400 border-2 rounded-t-2xl h-full">
        <ShipmentList
          shipments={shipments}
          onUpdate={handleSave}
          onDelete={handleDelete}
          onSuccessMessage={setSuccessMessage}
        />
      </div>

      {isNewEntryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col w-max shadow-lg">
            <div className="text-xl font-extrabold mb-4 p-3 bg-[var(--Secondary)] rounded-md w-max">
              New Shipment Entry
            </div>

            <div className="space-y-4 grid grid-cols-3 gap-4">
              {[
                "billLandingNo",
                "containerNo",
                "products",
                "shippingLine",
                "portOfLoading",
                "portOfDischarge",
                "vessel",
                "status",
                "ETA",
                "paar",
              ].map((name) => (
                <div key={name} className="flex flex-col">
                  <label className="text-sm font-semibold mb-1" htmlFor={name}>
                    {name
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (s) => s.toUpperCase())}
                    :
                  </label>
                  <input
                    name={name}
                    type="text"
                    required
                    className="border rounded px-3 py-2"
                    value={formData[name]}
                    onChange={handleInputChange}
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-xs">{errors[name]}</p>
                  )}
                </div>
              ))}
            </div>

            {isLoading && (
              <p className="text-blue-700 font-medium">Creating entry...</p>
            )}
            {errorMessage && (
              <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-600 text-sm mt-2">{successMessage}</p>
            )}

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeModals}
                className="px-4 py-2 bg-gray-100 rounded-md hover:opacity-80 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:opacity-80 cursor-pointer disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Shipment"}
              </button>
            </div>
          </div>
        </div>
      )}

      {apiError && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm text-center shadow-md">
            <p className="text-red-600 font-semibold">{apiError}</p>
            <button
              className="mt-4 bg-gray-200 px-4 py-2 rounded hover:opacity-80"
              onClick={() => setApiError("")}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm text-center shadow-md">
            <p className="text-green-700 font-semibold">
              Shipment created successfully!
            </p>
            <button
              className="mt-4 bg-blue-700 text-white px-4 py-2 rounded hover:opacity-80"
              onClick={() => setShowConfirm(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
