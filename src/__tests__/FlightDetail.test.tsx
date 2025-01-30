import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import FlightDetail from "../components/FlightDetail";
import React from "react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("FlightDetail Component", () => {
  it("renders flight details correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        id: "1",
        flightNumber: "AA123",
        airline: "American Airlines",
        origin: "JFK",
        destination: "LAX",
        departureTime: "2025-02-01T10:00:00Z",
        status: "On Time",
      },
    });

    render(
      <MemoryRouter initialEntries={["/flight/1"]}>
        <Routes>
          <Route path="/flight/:id" element={<FlightDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Flight Details")).toBeInTheDocument();
      expect(screen.getByText("Flight Number: AA123")).toBeInTheDocument();
      expect(screen.getByText("American Airlines")).toBeInTheDocument();
      expect(screen.getByText("JFK")).toBeInTheDocument();
      expect(screen.getByText("LAX")).toBeInTheDocument();
      expect(screen.getByText("On Time")).toBeInTheDocument();
    });
  });

  it("shows error message when API fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <MemoryRouter initialEntries={["/flight/1"]}>
        <Routes>
          <Route path="/flight/:id" element={<FlightDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch flight details.")).toBeInTheDocument();
    });
  });
});
