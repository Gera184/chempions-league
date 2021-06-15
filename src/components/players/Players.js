import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext.js";

const API_KEY = "2ff0e990-cddc-11eb-8b17-2798f47b257a";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [search, setSearch] = useState("");
  const { countries, Countries, dropdown } = useAuth();

  useEffect(() => {
    if (dropdown) {
      const URL = `https://app.sportdataapi.com/api/v1/soccer/players?apikey=${API_KEY}&country_id=${
        countries[dropdown] ? countries[dropdown].country_id : null
      }&min_age=${minAge}&max_age=${maxAge}`;
      axios
        .request(URL)
        .then(function (response) {
          setPlayers(response.data.data);
          console.log(response.data.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [dropdown, minAge, maxAge]);

  const filteredQuery = players.filter((player) =>
    player.firstname.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const MaxAge = ({ step, min, max, value, onChangeValue }) => {
    const handleChangeMaxAge = (max) => (e) => {
      onChangeValue(e);
    };
    return (
      <>
        <label for="customRange3" class="form-label">
          Max Age: {maxAge}
        </label>
        <input
          type="range"
          class="form-range"
          type="range"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={handleChangeMaxAge(max)}
          id="customRange3"
        />
      </>
    );
  };

  const MinAge = ({ step, min, max, value, onChangeValue }) => {
    const handleChangeMinAge = (min) => (e) => {
      onChangeValue(e);
    };
    return (
      <>
        <label for="customRange3" class="form-label">
          Min Age: {minAge}
        </label>
        <input
          type="range"
          class="form-range"
          type="range"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={handleChangeMinAge(min)}
          id="customRange3"
        />
      </>
    );
  };

  if (minAge > maxAge) {
    alert("no way jose");
    setMinAge(15);
  }

  return (
    <>
      <Countries />
      {dropdown ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <input
                  placeholder="Player name"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  style={{ textAlign: "center" }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <MaxAge
                  min={15}
                  max={70}
                  step={1}
                  value={maxAge}
                  onChangeValue={(e) => {
                    setMaxAge(parseInt(e.target.value, 10));
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <MinAge
                  min={15}
                  max={70}
                  step={1}
                  value={minAge}
                  onChangeValue={(e) => {
                    setMinAge(parseInt(e.target.value, 10));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {filteredQuery.map((player) => (
                <div className="col pt-2 d-flex justify-content-center">
                  <div class="card" style={{ width: "18rem" }}>
                    <img
                      class="img-thumbnail image card-img-top"
                      style={{ width: "70px", height: "70px" }}
                      key={player.player_id}
                      src={player.img}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://www.mtzion.lib.il.us/kids-teens/question-mark.jpg/@@images/image.jpeg";
                      }}
                    />
                    <div class="card-body ">
                      <h5 class="card-title">
                        {player.firstname} {player.lastname}{" "}
                      </h5>
                      <li>Age: {player.age}</li>
                      <li>Height: {player.height}</li>
                      <li>Birthday: {player.birthday}</li>
                      <li>Country: {player.country.name}</li>
                      <li>Continent: {player.country.continent}</li>
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
