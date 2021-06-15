import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext.js";
import { IoMdFootball } from "react-icons/io";

const API_KEY = "2ff0e990-cddc-11eb-8b17-2798f47b257a";
export const Leagues = ({ countryID }) => {
  const [leagues, setLeagues] = useState([]);
  const { countries, Countries, dropdown } = useAuth();

  useEffect(() => {
    if (dropdown) {
      const URL = `https://app.sportdataapi.com/api/v1/soccer/leagues?apikey=${API_KEY}&country_id=${
        countries[dropdown] ? countries[dropdown].country_id : null
      }`;
      axios
        .request(URL)
        .then(function (response) {
          setLeagues(response.data.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [dropdown]);

  if (leagues) {
    var leaguesArray = Object.keys(leagues).map(function (key) {
      return leagues[key];
    });
  }

  return (
    <>
      <Countries />
      {leagues ? (
        <>
          <div className="container pt-3">
            <div className="row">
              <div className="col" style={{ color: "black" }}>
                <ul>
                  {leaguesArray.map((leagues, index) => (
                    <li key={index} value={index}>
                      <IoMdFootball /> {leagues.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
