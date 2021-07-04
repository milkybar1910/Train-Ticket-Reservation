<%-- Document : index Created on : May 25, 2021, 10:11:09 PM Author : SIVA --%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
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
      href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap"
      rel="stylesheet"
    />
    <!-- CSS -->
    <link rel="stylesheet" href="../style.css" />
    <!-- JQUERY -->
    <script src="../jQuery/AdminRoutes.js"></script>

    <title>Trips</title>
  </head>

  <body class="bg-dark2 text-white">
    <!-- NAV BAR -->
    <nav class="navbar navbar-expand-lg navbar-light bg-dark2 border rounded">
      <a class="navbar-brand text-white" href="/TRAINTICKETRESERVATION/Admin/"
        >INDIAN RAILWAYS</a
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
              >Create <span class="sr-only">(current)</span></a
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
              >Trains <span class="sr-only">(current)</span></a
            >
          </li>

          <li class="nav-item" name="button" id="logout">
            <a href="" class="nav-link text-warning mx-2">LOGOUT</a>

            <span class="sr-only bg-dark2">(current)</span>
          </li>
        </ul>
      </div>
    </nav>

    <!-- TOAST MESSAGES -->
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

    <!-- TRIPS RECORD -->
    <div class="container">
      <div class="row justify-content-center" id="addTrip"></div>
    </div>

    <!-- MODAL FOR VIEWING -->
    <div
      class="modal fade"
      id="TripDetails"
      data-backdrop="static"
      tabindex="-1"
    >
      <div
        class="
          modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable
        "
      >
        <div class="modal-content bg-danger">
          <div class="modal-header text-center">
            <h5 class="modal-title" id="bookingFormsLabel">TRIP DETAILS</h5>
          </div>

          <div class="modal-body custom-scrollbar-css">
            <div class="card shadow bg-danger p-4 m-2">
              <div class="table-responsive custom-scrollbar-css2">
                <table class="table table-bordered text-white">
                  <thead>
                    <tr>
                      <th scope="col">Seat No</th>
                      <th scope="col">Type</th>
                      <th scope="col">Passenger</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Address</th>
                    </tr>
                  </thead>
                  <tbody id="bookingsInfo"></tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
