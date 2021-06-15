import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext.js";
import RefereesImg from "./Referees.json";

export default function Referees() {
  const [referees, setReferees] = useState([]);
  const [search, setSearch] = useState("");
  const { countries, Countries, dropdown } = useAuth();
  const images = RefereesImg;

  const index = Math.floor(Math.random() * images.length);

  useEffect(() => {
    if (dropdown) {
      const URL = `https://app.sportdataapi.com/api/v1/soccer/referees?apikey=a8f07e90-c918-11eb-9b3b-abc29b57575d&country_id=${
        countries[dropdown] ? countries[dropdown].country_id : null
      }          `;
      axios
        .request(URL)
        .then(function (response) {
          setReferees(response.data.data);
          console.log(response.data.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [dropdown]);

  const filteredQuery = referees.filter((referee) =>
    referee.firstname.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <Countries />
      {dropdown ? (
        <>
          <div className="col text-center">
            <input
              placeholder="Referee name"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              style={{ textAlign: "center" }}
            />
          </div>
          <div className="container">
            <div className="row">
              {filteredQuery.map((referee) => (
                <div className="col pt-2 d-flex justify-content-center">
                  <div class="card" style={{ width: "18rem" }}>
                    <img
                      class="img-thumbnail image card-img-top"
                      key={referee.id}
                      src={images[index].Url}
                    />
                    <div class="card-body ">
                      <h5 class="card-title">{referee.name}</h5>
                      <li>Country: {referee.country.name}</li>
                      <li>Continent: {referee.country.continent}</li>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
