import { useEffect, useState } from "react";
import Shipments from "../components/shipments";

export default function OverviewShipmentComponent() {
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      setShipments(Shipments);
      setFilteredShipments(Shipments);
      setLoading(false);
    } catch (err) {
      setError("Failed to load shipment data.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = shipments.filter((shipment) => {
      const containerList = Array.isArray(shipment.containerNo)
        ? shipment.containerNo
        : [shipment.containerNo]; // Fallback to array

      return containerList.some((no) => no.toLowerCase().includes(term));
    });

    setFilteredShipments(filtered);
  }, [searchTerm, shipments]);

  return (
    <div className="p-4 h-full rounded-xl flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-gray-300 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl lg:text-5xl uppercase font-bold text-center lg:text-left">
          Incoming Shipments View
        </h2>

        <input
          type="text"
          placeholder="Search by Container No."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:max-w-[45rem] px-4 py-2 border rounded-md shadow-sm"
        />
      </div>

      <div className="bg-gray-300 rounded-2xl shadow-xl min-h-[45rem] flex justify-center items-start">
        {loading ? (
          <div className="text-xl text-[var(--Accent)] font-semibold my-10 text-center">
            Loading shipments...
          </div>
        ) : error ? (
          <div className="text-red-500 text-lg my-6 text-center">{error}</div>
        ) : (
          <div className="rounded-lg max-h-full overflow-y-auto w-full">
            {/* ===== Desktop & Tablet Table ===== */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="text-[var(--Primary)] bg-[var(--Accent)] uppercase tracking-wider text-center text-lg font-semibold sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3">Container No.</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Shipping Line</th>
                    <th className="px-4 py-3">Port Loading</th>
                    <th className="px-4 py-3">Port Discharge</th>
                    <th className="px-4 py-3">Vessel</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">ETA</th>
                    <th className="px-4 py-3">PAAR</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[var(--Primary)]">
                  {filteredShipments.map((shipment, idx) => (
                    <tr
                      key={idx}
                      className="text-center hover:text-[var(--Secondary)] font-bold hover:bg-[var(--Accent)] transition-all"
                    >
                      <td className="px-4 py-3">
                        <code className="bg-[var(--NavBackgroundTwo)] p-2 rounded-md block">
                          {Array.isArray(shipment.containerNo)
                            ? shipment.containerNo.map((num, i) => (
                                <div key={i}>{num}</div>
                              ))
                            : "-"}
                        </code>
                      </td>

                      <td className="px-4 py-3">{shipment.products || "-"}</td>
                      <td className="px-4 py-3">
                        {shipment.shippingLine || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {shipment.portOfLoading || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {shipment.portOfDischarge || "-"}
                      </td>
                      <td className="px-4 py-3">{shipment.vessel || "-"}</td>
                      <td className="px-4 py-3">{shipment.status || "-"}</td>
                      <td className="px-4 py-3">{shipment.ETA || "-"}</td>
                      <td className="px-4 py-3">{shipment.paar || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ===== Mobile Card View ===== */}
            <div className="md:hidden flex flex-col gap-4 p-4">
              {filteredShipments.map((shipment, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2 text-sm font-semibold"
                >
                  <div>
                    <span className="text-gray-500">Container:</span>
                    <div className="mt-1">
                      {Array.isArray(shipment.containerNo)
                        ? shipment.containerNo.map((num, i) => (
                            <div
                              key={i}
                              className="bg-gray-200 inline-block px-2 py-1 rounded mr-2 mb-1"
                            >
                              {num}
                            </div>
                          ))
                        : "-"}
                    </div>
                  </div>

                  <p>
                    <span className="text-gray-500">Product:</span>{" "}
                    {shipment.products || "-"}
                  </p>
                  <p>
                    <span className="text-gray-500">Shipping Line:</span>{" "}
                    {shipment.shippingLine || "-"}
                  </p>
                  <p>
                    <span className="text-gray-500">Port Loading:</span>{" "}
                    {shipment.portOfLoading || "-"}
                  </p>
                  <p>
                    <span className="text-gray-500">Port Discharge:</span>{" "}
                    {shipment.portOfDischarge || "-"}
                  </p>
                  <p>
                    <span className="text-gray-500">Vessel:</span>{" "}
                    {shipment.vessel || "-"}
                  </p>
                  <p>
                    <span className="text-gray-500">Status:</span>{" "}
                    {shipment.status || "-"}
                  </p>
                  <p>
                    <span className="text-gray-500">ETA:</span>{" "}
                    {shipment.ETA || "-"}
                  </p>
                  <p>
                    <span className="text-gray-500">PAAR:</span>{" "}
                    {shipment.paar || "-"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
