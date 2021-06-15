import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext.js";
import { IoMdFootball } from "react-icons/io";

export const Leagues = ({ countryID }) => {
  const [leagues, setLeagues] = useState([]);
  const { countries, Countries, dropdown } = useAuth();

  useEffect(() => {
    if (dropdown) {
      const URL = `https://app.sportdataapi.com/api/v1/soccer/leagues?apikey=a8f07e90-c918-11eb-9b3b-abc29b57575d&country_id=${
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
