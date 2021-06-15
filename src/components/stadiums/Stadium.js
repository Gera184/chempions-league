import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext.js";

export default function Stadium() {
  const [stadiums, setStadiums] = useState([]);
  const [search, setSearch] = useState("");
  const { countries, Countries, dropdown } = useAuth();

  useEffect(() => {
    if (dropdown) {
      const URL = `https://app.sportdataapi.com/api/v1/soccer/venues?apikey=a8f07e90-c918-11eb-9b3b-abc29b57575d&country_id=${
        countries[dropdown] ? countries[dropdown].country_id : null
      }`;

      axios
        .request(URL)
        .then(function (response) {
          setStadiums(response.data.data);
          console.log(response.data.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [dropdown]);

  const filteredQuery = stadiums.filter((stadium) =>
    stadium.city.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <Countries />

      {dropdown ? (
        <>
          <div className="col text-center">
            <input
              placeholder="Search by city"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              style={{ textAlign: "center" }}
            />
          </div>

          <div className="container-fluid">
            <div className="row pt-3 ">
              <table class="table table-success table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col"># </th>
                    <th scope="col">City </th>
                    <th scope="col">Stadium</th>
                    <th scope="col">Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuery.map((stadium, index) => (
                    <tr>
                      <th scope="row"> {index}</th>
                      <td>{stadium.city}</td>
                      <td>{stadium.name}</td>
                      <td>{stadium.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
