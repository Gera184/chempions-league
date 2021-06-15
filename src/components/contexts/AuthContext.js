import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaHandPointUp } from "react-icons/fa";
import { Leagues } from "../leagues/Leagues";
import { Teams } from "../teams/Teams";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [countries, setCountries] = useState();
  const [dropdown, setDropdown] = useState();
  var API_KEY = "a8f07e90-c918-11eb-9b3b-abc29b57575d";
  const URL = `https://app.sportdataapi.com/api/v1/soccer/countries?apikey=${API_KEY}`;

  useEffect(() => {
    axios
      .request(URL)
      .then(function (response) {
        setCountries(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const Countries = () => {
    return (
      <>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col">
              {countries ? (
                <select
                  class="form-select"
                  size="7"
                  style={{
                    fontSize: "large",
                    textAlign: "center",
                    background: "whitesmoke",
                    color: "black ",
                  }}
                  value={dropdown}
                  onChange={(e) => {
                    setDropdown(e.target.value);
                  }}
                >
                  {countries.map((country, index) => (
                    <option key={index} value={index}>
                      {country.name}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col text-center pt-5">
              <h1 style={{ borderBottom: "1px solid black" }}>
                {" "}
                Choose a Country <FaHandPointUp />
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  };

  const value = {
    countries,
    Countries,
    dropdown,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
