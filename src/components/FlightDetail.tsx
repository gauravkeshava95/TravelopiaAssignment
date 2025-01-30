import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Flight } from "../types";

const API_URL = "https://flight-status-mock.core.travelopia.cloud/flights";

const FlightDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlightDetail = async () => {
      try {
        const response = await axios.get<Flight>(`${API_URL}/${id}`);
        setFlight(response.data);
        setError(null);
      } catch {
        setError("Failed to fetch flight details.");
      }
    };

    fetchFlightDetail();
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!flight) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Flight Details</h2>
      <div className="card shadow p-4">
        <h4 className="mb-3">Flight Number: {flight.flightNumber}</h4>
        <p><strong>Airline:</strong> {flight.airline}</p>
        <p><strong>Origin:</strong> {flight.origin}</p>
        <p><strong>Destination:</strong> {flight.destination}</p>
        <p><strong>Departure Time:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`badge ${
            flight.status === "On Time" ? "bg-success" :
            flight.status === "Delayed" ? "bg-danger" :
            flight.status === "Boarding" ? "bg-warning" : "bg-secondary"
          }`}>
            {flight.status}
          </span>
        </p>
      </div>
      <Link to="/" className="btn btn-primary mt-3">⬅ Back to Flight Board</Link>
    </div>
  );
};

export default FlightDetail;
