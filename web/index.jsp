<%-- Document : index Created on : May 25, 2021, 10:11:09 PM Author : SIVA --%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <!-- bootstrap -->
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
    <link rel="stylesheet" href="style.css" />
    <!-- JQUERY -->
    <script src="./jQuery/Home.js"></script>

    <title>HOME</title>
  </head>
  <body class="bg-dark2 text-white">
    <!-- NAV BAR -->
    <nav class="navbar navbar-expand-lg navbar-light bg-dark2 border rounded">
      <a class="navbar-brand text-white" href="Home">INDIAN RAILWAYS</a>
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
            <a class="nav-link text-white" href=""
              >Home <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="History" id="bookings"
              >History <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item" id="login">
            <a class="nav-link text-warning" href="Signin"
              >Login <span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item" id="signup">
            <a class="nav-link text-warning" href="Signup"
              >Signup <span class="sr-only">(current)</span></a
            >
          </li>

          <li class="nav-item" name="button" id="logout">
            <a href="" class="nav-link text-warning">LOGOUT</a>

            <span class="sr-only bg-dark2">(current)</span>
          </li>
        </ul>
      </div>
    </nav>
    <!-- TOAST CONTAINER -->
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
    <!-- HEADINGS -->
    <h1 class="text-center mt-5 google-font">
      Welcome To INDIAN RAILWAYS SIVA SHANKAR
    </h1>
    <div class="text-center lead text-uppercase mb-5">
      for a safe and comfort journey
    </div>

    <!-- SEARCH BAR -->
    <div class="container my-5">
      <div class="form-row">
        <div class="col" id="TrainNameSearchBar">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="trainNameSearch"
              placeholder="Enter Train name..."
            />
          </div>
        </div>

        <div class="col" id="SourceCitySearchBar">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="SourceCity"
              placeholder="Enter Source City..."
            />
          </div>
        </div>
        <div class="col" id="DestinationCitySearchBar">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Destination City..."
              id="DestinationCity"
            />
          </div>
        </div>
        <div class="col" id="DateSearchBar">
          <div class="form-group">
            <input type="date" class="form-control" id="DateOfStart" />
          </div>
        </div>
        <div class="col-0" id="searchTrainNameBar">
          <button
            class="btn btn-outline-warning m-0"
            id="searchTrainName"
            data-toggle="tooltip"
            data-placement="top"
            title="Search by name"
          >
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
        <div class="col-0" id="FilterSearchBar">
          <button
            class="btn btn-outline-warning m-0"
            id="FilterSearch"
            data-toggle="tooltip"
            data-placement="top"
            title="Search by filters"
          >
            <i class="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>

        <div class="col-0">
          <button
            class="btn btn-outline-primary m-0"
            id="Filter"
            data-toggle="tooltip"
            data-placement="top"
            title="Filtered Search"
          >
            <i class="fa fa-filter" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- IF NO RECORDS FOUND -->
    <div class="container-fluid my-5" id="NORECORDFOUND">
      <div
        class="row justify-content-center align-item-center align-self-center"
      >
        <div
          class="col-12 col-lg-6 card rounded p-3 bg-dark2 shadow mt-5 mt-5 ml-3 ml-lg-0"
        >
          <div
            class="row m-2 text-center justify-content-center align-item-center align-self-center"
            id="col2"
          >
            <h3 class="google-font">No Records Found,Come back later</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- ALL TRIPS CARD -->
    <div class="container">
      <div class="row" id="addTrip"></div>
    </div>

    <!-- MODAL FOR USER CHECK -->
    <div
      class="modal fade"
      id="myModal"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-danger">
          <div class="modal-header text-center">
            <h5 class="modal-title" id="staticBackdropLabel">
              Registration Required !!!
            </h5>
            <button
              type="button "
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span class="text-white" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            You need to login or signup to book seats
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <a href="Signin" class="btn btn-primary">LOGIN</a>

            <a href="Signup" class="btn btn-primary">SIGNUP</a>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL FOR SEATS UI -->
    <div class="modal fade" id="bookingsSeats" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content bg-danger">
          <div class="modal-header text-center">
            <h5 class="modal-title google-font" id="bookingsSeatsLabel">
              Available Seats
            </h5>
            <button
              type="button "
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span class="text-white" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body custom-scrollbar-css">
            <div class="card-header text-center my-3">AC1</div>

            <div class="row" id="AC1ui"></div>
            <div class="card-header text-center my-3">AC2</div>
            <div class="row" id="AC2ui"></div>
            <div class="card-header text-center my-3">SL2</div>
            <div class="row" id="SLui"></div>
          </div>

          <div class="modal-footer">
            <a
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              id="testingBookingForm"
            >
              Close
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL FOR BOOKING DESIGN -->
    <div class="modal" id="bookingForms" data-backdrop="static" tabindex="-2">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content bg-danger">
          <div class="modal-header text-center">
            <h5 class="modal-title google-font" id="bookingFormsLabel">
              Book A Seat
            </h5>
          </div>

          <div class="modal-body custom-scrollbar-css">
            <div class="card shadow bg-danger p-4 m-2">
              <div style="margin: 20px">
                <div
                  class="toast bg-dark2"
                  id="myToast2"
                  style="position: absolute; bottom: 0; right: 0"
                  data-autohide="false"
                >
                  <div class="toast-body bg-dark2">
                    <div id="toastBody2" class="text-uppercase"></div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="text-white">Passenger name :</label>
                <input
                  id="PassengerName"
                  type="text"
                  placeholder="Enter the Passenger name"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label class="text-white">Address :</label>
                <input
                  id="Address"
                  type="text"
                  placeholder="Enter the Address"
                  class="form-control"
                />
              </div>
              <div class="form-row">
                <div class="col">
                  <div class="form-group">
                    <label class="text-white">Seat No :</label>
                    <input
                      id="SeatNoForm"
                      type="text"
                      placeholder="Choose a seat no."
                      class="form-control"
                      readonly
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label class="text-white">Class :</label>
                    <input
                      id="typeForm"
                      type="text"
                      placeholder="Type of Class"
                      class="form-control"
                      readonly
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="text-white">Gender :</label>
                <select class="form-control" id="gender">
                  <option value="Male">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
              </div>
              <div class="form-group">
                <label class="text-white">Phone Number :</label>
                <input
                  id="PhoneNumber"
                  type="text"
                  placeholder="Enter the phone number"
                  class="form-control"
                />
              </div>

              <input id="tripIDForm" type="hidden" />
              <input id="emailForm" type="hidden" />

              <button
                class="btn btn-block btn-outline-dark mt-4 font-weight-bold"
                type="submit"
                id="bookSeat"
              >
                BOOK SEAT
              </button>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              onclick="$(function () {
                $('#bookingsSeats').modal('toggle');
                $('#bookingForms').modal('toggle');
              });"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
