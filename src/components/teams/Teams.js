import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext.js";
import { GiLaurelsTrophy } from "react-icons/gi";

export const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const { countries, Countries, dropdown } = useAuth();

  useEffect(() => {
    if (dropdown) {
      const URL = `https://app.sportdataapi.com/api/v1/soccer/teams?apikey=a8f07e90-c918-11eb-9b3b-abc29b57575d&country_id=${
        countries[dropdown] ? countries[dropdown].country_id : null
      }`;
      axios
        .request(URL)
        .then(function (response) {
          setTeams(response.data.data);
          console.log(teams);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [dropdown]);

  const filteredQuery = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <Countries />
      {dropdown ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <input
                  placeholder="Search team"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  style={{ textAlign: "center" }}
                />
              </div>
            </div>
          </div>

          <div className="container pt-3">
            <div className="row">
              <div className="col" style={{ color: "black" }}>
                <ul>
                  {filteredQuery.map((teams, index) => (
                    <li className="pt-1" key={index} value={index}>
                      <img
                        style={{ width: "20px", height: "20px" }}
                        src={teams.logo}
                      />{" "}
                      {teams.name}
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
