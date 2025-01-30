import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Flight } from "../types";

const API_URL = "https://flight-status-mock.core.travelopia.cloud/flights";

const FlightTable: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = async () => {
    try {
      const response = await axios.get<Flight[]>(API_URL);
      setFlights(response.data);
      setError(null);
    } catch {
      setError("Failed to fetch flight data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">✈️ Flight Status Board</h1>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>
                <Link to={`/flight/${flight.id}`} className="text-primary">
                  {flight.flightNumber}
                </Link>
              </td>
              <td>{flight.airline}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{new Date(flight.departureTime).toLocaleString()}</td>
              <td>
                <span className={`badge ${
                  flight.status === "On Time" ? "bg-success" :
                  flight.status === "Delayed" ? "bg-danger" :
                  flight.status === "Boarding" ? "bg-warning" : "bg-secondary"
                }`}>
                  {flight.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
