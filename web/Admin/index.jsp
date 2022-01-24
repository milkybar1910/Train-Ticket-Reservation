<%-- Document : index Created on : May 25, 2021, 10:11:09 PM Author : SIVA --%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap"
      rel="stylesheet"
    />
    <!-- CSS -->
    <link rel="stylesheet" href="../style.css" />
    <!-- JQUERY -->
    <script src="../jQuery/AdminHome.js"></script>
    <title>HOME</title>
  </head>
  <body class="bg-dark2 text-white">
    <!-- NAV BAR -->
    <nav class="navbar navbar-expand-lg navbar-light bg-dark2 border rounded">
      <a class="navbar-brand text-white" href="/TRAINTICKETRESERVATION/Admin/"
        >SIVA SHANKAR</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a
              class="nav-link text-white mx-2"
              href="/TRAINTICKETRESERVATION/Admin/"
              >Home <span class="sr-only">(current)</span></a
            >
          </li>

          <li class="nav-item">
            <a class="nav-link text-white mx-2" href="Create"
              >Create User <span class="sr-only">(current)</span></a
            >
          </li>

          <li class="nav-item">
            <a class="nav-link text-white mx-2" href="Routes"
              >Routes <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-white mx-2" href="Trips"
              >Trips <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-white mx-2" href="Trains"
              >Train <span class="sr-only">(current)</span></a
            >
          </li>

          <li class="nav-item" name="button" id="logout">
            <a href="" class="nav-link text-warning mx-2">LOGOUT</a>

            <span class="sr-only bg-dark2">(current)</span>
          </li>
        </ul>
      </div>
    </nav>

    <!-- CREATE TRAIN  -->
    <div class="container-fluid my-5">
      <div class="row">
        <div
          class="col-12 col-lg-6 mt-md-5 align-self-center justify-content-centeR"
        >
          <div class="text-center align-self-center justify-content-center">
            <img
              src="../assests/CreateTrain.svg"
              class="img-fluid text-center mt-5"
            />
          </div>
        </div>

        <div
          class="col-12 col-lg-6 text-white mt-5 align-self-center justify-content-center"
        >
          <div class="ToastContainer">
            <div
              class="toast bg-danger"
              id="myToast"
              style="position: absolute; top: 0; right: 0"
              data-autohide="false"
            >
              <div class="toast-body bg-danger">
                <div id="toastBody"></div>
              </div>
            </div>
          </div>
          <h1 class="google-font text-center">Create Train</h1>
          <div class="card shadow bg-dark2 p-4 m-2">
            <div class="form-group">
              <label class="text-white">Train name :</label>
              <input
                id="trainName"
                type="text"
                placeholder="Enter the train name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label class="text-white">Train ID :</label>
              <input
                id="trainID"
                type="text"
                placeholder="Enter the tran Id"
                class="form-control"
              />
            </div>
            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label class="text-white">SL :</label>
                  <input
                    id="SL"
                    type="text"
                    placeholder="Enter no. of seats"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label class="text-white">AC1 :</label>
                  <input
                    id="AC1"
                    type="text"
                    placeholder="Enter no. of seats"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label class="text-white">AC2 :</label>
                  <input
                    id="AC2"
                    type="text"
                    placeholder="Enter no. of seats"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
            <button
              class="bg-warning btn btn-block mt-4 font-weight-bold"
              type="submit"
              id="createTrain"
            >
              Create Train
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- CREATE TRIP -->
    <div class="container-fluid my-5">
      <div class="row">
        <div
          class="col-12 col-lg-6 text-white mt-5 ml-lg-5 align-self-center justify-content-center order-2 order-lg-1"
        >
          <div class="ToastContainer">
            <div
              class="toast bg-danger"
              id="myToast2"
              style="position: absolute; top: 0; right: 0"
              data-autohide="false"
            >
              <div class="toast-body bg-danger">
                <div id="toastBody2"></div>
              </div>
            </div>
          </div>
          <h1 class="google-font text-center">Create Trip</h1>
          <div class="card shadow bg-dark2 p-4 m-2">
            <div class="form-group">
              <label class="text-white">Select Train :</label>
              <select class="form-control" id="trains">
                <option class="form-control" value="nothing">
                  Select Trains
                </option>
              </select>
            </div>
            <div class="form-group">
              <label class="text-white">Source :</label>
              <input
                id="SourceCity"
                type="text"
                placeholder="Enter the source"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label class="text-white">Destination :</label>
              <input
                id="DestinationCity"
                type="text"
                placeholder="Enter the destination"
                class="form-control"
              />
            </div>
            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label class="text-white">From :</label>
                  <input id="FromTime" type="time" class="form-control" />
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label class="text-white">To :</label>
                  <input id="ToTime" type="time" class="form-control" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="text-white">Date Of Start :</label>
              <input id="DateOfStart" type="date" class="form-control" />
            </div>
            <div class="form-group">
              <label class="text-white">Date Of End :</label>
              <input id="DateOfEnd" type="date" class="form-control" />
            </div>
            <input id="Status" type="hidden" value="ALL" />
            <button
              class="bg-warning btn btn-block mt-4 font-weight-bold"
              type="submit"
              id="createTrip"
            >
              CREATE TRIP
            </button>
          </div>
        </div>
        <div
          class="col-12 col-lg-5 mt-md-5 order-1 p-4 order-lg-2 align-self-center"
        >
          <div class="text-center align-self-center justify-content-center">
            <img
              src="../assests/Trip.svg"
              class="img-fluid text-center mt-lg-5"
            />
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
