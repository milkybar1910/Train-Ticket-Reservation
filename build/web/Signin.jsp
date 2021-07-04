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

    <!-- CSS -->
    <link rel="stylesheet" href="style.css" />
    <!-- JQEURY -->
    <script src="./jQuery/Signin.js"></script>
    <title>SIGNIN</title>
  </head>

  <body class="bg-dark2 text-white">
    <!-- TOAST MESSAGE -->
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

    <h1 class="text-center mt-5 google-font">INDIAN RAILWAYS</h1>
    <div class="text-center lead text-uppercase mb-5">
      for a safe and comfort journey
    </div>

    <!-- SIGNIN FORM -->
    <div class="container-fluid my-5">
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
            shadow-lg
            mt-5 mt-5
            ml-3 ml-lg-0
          "
        >
          <div class="row m-2" id="col2">
            <div class="col-6">
              <a
                class="btn btn-outline-warning btn-block font-weight-bold lead"
                href="Signup"
                >SIGNUP</a
              >
            </div>
            <div class="col-6">
              <a
                class="btn btn-outline-warning btn-block font-weight-bold lead"
                href=""
                >SIGNIN</a
              >
            </div>
          </div>
          <div class="p-2 m-2">
            <div class="form-group">
              <div class="form-group">
                <label class="">Email :</label>
                <input
                  id="email"
                  class="form-control"
                  type="email"
                  required
                  placeholder="Enter the email"
                />
              </div>
              <div class="form-group">
                <label class="">Password :</label>
                <input
                  id="password"
                  class="form-control"
                  required
                  type="password"
                  placeholder="Enter the password"
                />
              </div>

              <button
                class="bg-warning btn btn-block mt-4 font-weight-bold"
                name="button"
                id="login"
              >
                SIGNIN
              </button>
              <a
                class="
                  btn btn-block btn-outline-secondary
                  mt-4
                  font-weight-bold
                "
                name="button"
                href="/TRAINTICKETRESERVATION"
              >
                GO HOME
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
