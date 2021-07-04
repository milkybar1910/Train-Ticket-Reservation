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
    <link rel="stylesheet" href="./style.css" />
    <script src="./jQuery/History.js"></script>
    <title>HISTORY</title>
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
            <a class="nav-link text-white mx-2" href="Home"
              >Home <span class="sr-only">(current)</span></a
            >
          </li>

          <li class="nav-item">
            <a class="nav-link text-white mx-2" href="History"
              >History <span class="sr-only">(current)</span></a
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

    <!-- NO RECORD TEXT -->
    <div class="container-fluid my-5" id="recordsText">
      <div
        class="row justify-content-center align-item-center align-self-center"
      >
        <div
          class="
            col-12 col-lg-6
            card
            rounded
            p-3
            bg-dark2
            shadow
            mt-5 mt-5
            ml-3 ml-lg-0
          "
        >
          <div
            class="
              row
              m-2
              text-center
              justify-content-center
              align-item-center align-self-center
            "
            id="col2"
          >
            <h3 class="google-font">No Records Found</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- TRIPS RECORD -->
    <div class="container">
      <div class="row" id="addTrip"></div>
    </div>
  </body>
</html>
