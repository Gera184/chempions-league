import React from "react";
import "./Header.css";
import { BiFootball } from "react-icons/bi";

export default function Header() {
  return (
    <>
      <div class="fixed-top body">
        <header class="topbar">
          <div class="container">
            <div class="row">
              <div class="col-sm-12">
                <ul class="social-network">
                  <li>
                    <a class="waves-effect waves-dark">
                      <i class="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a class="waves-effect waves-dark">
                      <i class="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a class="waves-effect waves-dark">
                      <i class="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a class="waves-effect waves-dark">
                      <i class="fa fa-pinterest"></i>
                    </a>
                  </li>
                  <li>
                    <a class="waves-effect waves-dark">
                      <i class="fa fa-google-plus"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <nav class="navbar navbar-expand-lg navbar-dark mx-background-top-linear">
          <div class="container">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/leagues">
                    Leagues
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/stadiums">
                    Stadiums
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/referees">
                    Referees
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/teams">
                    Teams
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link" href="/players">
                    Players
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
