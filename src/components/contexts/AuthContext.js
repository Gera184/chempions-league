import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaHandPointUp } from "react-icons/fa";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [countries, setCountries] = useState();
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState();
  var API_KEY = "2ff0e990-cddc-11eb-8b17-2798f47b257a";
  const URL = `https://app.sportdataapi.com/api/v1/soccer/countries?apikey=${API_KEY}`;

  useEffect(() => {
    axios
      .request(URL)
      .then(function (response) {
        setCountries(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const Countries = () => {
    return (
      <>
        <div
          style={{ paddingTop: "10px" }}
          className="row justify-content-md-center"
        >
          <div className="col text-center">
            {countries ? (
              <>
                <span>Country Select</span>
                <select
                  className="form-select"
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
                    <>
                      {index > 7 && (
                        <option key={index} value={index}>
                          {country.name}
                        </option>
                      )}
                    </>
                  ))}
                </select>
              </>
            ) : null}
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
