import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import "./HomePage.css";
import { FaSearch } from "react-icons/fa";

const HomePage = () => {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!cityName) {
      setError("Please enter a city name");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:9000/?cityName=${cityName}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("Enter valid city name");
    }
  };

  return (
    <section className="vh-100 background">
      <MDBContainer className="h-100">
        <MDBRow
          className="justify-content-center align-items-center h-100"
          style={{ color: "#282828" }}
        >
          <MDBCol md="9" lg="7" xl="5">
            <MDBCard
              className="mb-4 gradient-custom"
              style={{ borderRadius: "25px" }}
            >
              <MDBCardBody className="p-4">
                <div className="d-flex justify-content-between pb-2">
                  <MDBInput
                    label="Enter City Name"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    style={{ marginBottom: "20px" }}
                  />
                  <MDBBtn onClick={handleSearch} style={{ marginLeft: "5px" }}>
                    <FaSearch />
                  </MDBBtn>
                </div>
                <br />

                {error && <p className="text-danger">{error}</p>}

                {weather && (
                  <>
                    <div data-aos="zoom-in-up">
                      <div className="d-flex justify-content-between pb-2">
                        <div>
                          <h2 className="display-2">
                            <strong>{weather.main.temp}°C</strong>
                          </h2>
                          <p className="text-muted mb-0">
                            {weather.name}, {weather.sys.country}
                          </p>
                          <p className="text-muted">
                            {weather.weather[0].description
                              .charAt(0)
                              .toUpperCase() +
                              weather.weather[0].description.slice(1)}
                          </p>
                        </div>
                        <div>
                          <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            width="100px"
                            alt="weather-icon"
                          />
                        </div>
                      </div>
                      <MDBTypography tag="h6" className="mb-4">
                        Feels like: {weather.main.feels_like}°C | Humidity:{" "}
                        {weather.main.humidity}% | Wind Speed:{" "}
                        {weather.wind.speed} m/s
                      </MDBTypography>
                    </div>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default HomePage;
