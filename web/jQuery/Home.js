$(function () {
  //CHECKING USER PREFERENCES
  let role = sessionStorage.getItem("Role");
  if (role == null) {
    $("#bookings").hide();
    $("#logout").hide();
    getRecentTrips();
  } else if (role === "0") {
    $("#login").hide();
    $("#signup").hide();
    $("#bookings").show();
    getRecentTrips();
  }

  // GLOBAL ACCESS
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  //MODAL FOR BOOKING FORM
  $("#bookForm").hide();

  //FOR HIDING FILTER SEARCH BAR
  $("#FilterSearch").toggle();
  $("#DateSearchBar").toggle();
  $("#DestinationCitySearchBar").toggle();
  $("#FilterSearchBar").toggle();
  $("#SourceCitySearchBar").toggle();

  //HIDING "NO RECORDS FOUND TEXT"
  $("#NORECORDFOUND").hide();

  //GETTING RECENT TRIPS
  function getRecentTrips() {
    $("#addTrip").empty();
    $.ajax({
      url: "get6Trips",
      method: "GET",
      success: (result) => {
        if (result.trips.length === 0) {
          $("#NORECORDFOUND").show();
          return;
        }
        $("#NORECORDFOUND").hide();
        $.each(result.trips, (index, trip) => {
          let DateOfStart = new Date(trip.DateOfStart).toDateString();
          let DateOfEnd = new Date(trip.DateOfEnd).toDateString();
          $("#addTrip").append(
            "<div class='col-12 my-4'>\n\
                <div class='card bg-warning text-dark'>\n\
                    <div class='card-header text-dark font-weight-bold' id='train-headers'>" +
              trip.TrainName +
              " (" +
              trip.TrainID +
              ")</div>\n\
                        <div class='card-body'>\n\
                            <div class='card-title d-flex justify-content-between'>\n\
                                <div class='d-flex google-Quicksand'>\n\
                                    <div class='d-none d-lg-block '>\n\
                                        <span class='align-self-center google-Quicksand font-weight-bold'>" +
              trip.FromTime +
              " |</span>\n\
                                    </div>\n\
                                    <div>\n\
                                        <span class='align-self-center google-Quicksand ml-2 '>" +
              trip.SourceCity +
              " |</span>\n\
                                    </div>\n\
                                    <div class='d-none d-lg-block '>\n\
                                        <span class='align-self-center google-Quicksand  ml-2'>" +
              DateOfStart +
              "</span>\n\
                                    </div>\n\
                                </div>\n\
                            <div class='d-flex google-Quicksand'>\n\
                                    <div class='d-none d-lg-block d'>\n\
                                        <span class='align-self-center google-Quicksand font-weight-bold'>" +
              trip.ToTime +
              " |</span>\n\
                                    </div>\n\
                                    <div>\n\
                                        <span class='align-self-center google-Quicksand ml-2 '>" +
              trip.DestinationCity +
              " |</span>\n\
                                    </div>\n\
                                    <div class='d-none d-lg-block '>\n\
                                        <span class='align-self-center google-Quicksand  ml-2'>" +
              DateOfEnd +
              "</span>\n\
                                    </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class='card-text d-flex justify-content-between my-4'>\n\
                            <div class='d-flex '>\n\
                                <div class='border card-header border-dark rounded  mr-2'>\n\
                                    <div>Sleeper (<span class='font-weight-bold'>" +
              trip.SL +
              "</span>)\n\
                                    </div>\n\
                                    <div class='mt-2 font-weight-bold'>&#8377; 500 /-</div>  \n\
                                </div>\n\
                                <div class='border card-header border-dark rounded  mx-2'>\n\
                                    <div>AC 2 Tier (<span class='font-weight-bold'>" +
              trip.AC2 +
              "</span>)</div> \n\
                                    <div class='mt-2 font-weight-bold'>&#8377; 1000 /-</div>  \n\
                                </div>\n\
                                <div class='border card-header border-dark rounded  mx-2'> \n\
                                    <div>AC 1 Tier (<span class='font-weight-bold'>" +
              trip.AC1 +
              "</span>)</div> \n\
                                    <div class='mt-2 font-weight-bold mx-auto'>&#8377; 1650 /-</div>  \n\
                                </div>   \n\
                            </div>\n\
                            <div class='d-flex'>\n\
                            <button type='submit' class='btn btn-outline-dark' id='" +
              trip.TripID +
              "'>\n\
                    BOOK SEATS\n\
                  </button>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>"
          );
          $("#" + trip.TripID).on("click", () => BookSeats(trip.TripID));
        });
      },
      error: (result) => {
        console.log(result);
      },
    });
  }

  // TRAIN NAME REVERT
  $("#trainNameSearch").change((e) => {
    if ($("#trainNameSearch").val() == "") {
      return getRecentTrips();
    }
  });

  //FILTER REVERT
  $("#SourceCity,#DestinationCity,#DateOfStart").change((e) => {
    if (
      $("#SourceCity").val() == "" &&
      $("#DestinationCity").val() == "" &&
      $("#DateOfStart").val() == ""
    ) {
      return getRecentTrips();
    }
  });

  //SEARCH BY TRAIN NAME
  $("#searchTrainName").click((e) => {
    e.preventDefault();
    let body = {
      trainName: $("#trainNameSearch").val(),
    };
    if (body.trainName === "") {
      return;
    }
    $.ajax({
      url: "getTrainByName",
      data: body,
      method: "POST",
      success: (result) => {
        $("#addTrip").empty();

        if (result.trips.length === 0) {
          $("#NORECORDFOUND").show();
          return;
        }
        $("#NORECORDFOUND").hide();
        $.each(result.trips, (index, trip) => {
          let DateOfStart = new Date(trip.DateOfStart).toDateString();
          let DateOfEnd = new Date(trip.DateOfEnd).toDateString();
          $("#addTrip").append(
            "<div class='col-12 my-4'>\n\
                <div class='card bg-warning text-dark'>\n\
                    <div class='card-header text-dark font-weight-bold' id='train-headers'>" +
              trip.TrainName +
              " (" +
              trip.TrainID +
              ")</div>\n\
                        <div class='card-body'>\n\
                            <div class='card-title d-flex justify-content-between'>\n\
                                <div class='d-flex google-Quicksand'>\n\
                                    <div class='d-none d-lg-block '>\n\
                                        <span class='align-self-center google-Quicksand font-weight-bold'>" +
              trip.FromTime +
              " |</span>\n\
                                    </div>\n\
                                    <div>\n\
                                        <span class='align-self-center google-Quicksand ml-2 '>" +
              trip.SourceCity +
              " |</span>\n\
                                    </div>\n\
                                    <div class='d-none d-lg-block '>\n\
                                        <span class='align-self-center google-Quicksand  ml-2'>" +
              DateOfStart +
              "</span>\n\
                                    </div>\n\
                                </div>\n\
                            <div class='d-flex google-Quicksand'>\n\
                                    <div class='d-none d-lg-block d'>\n\
                                        <span class='align-self-center google-Quicksand font-weight-bold'>" +
              trip.ToTime +
              " |</span>\n\
                                    </div>\n\
                                    <div>\n\
                                        <span class='align-self-center google-Quicksand ml-2 '>" +
              trip.DestinationCity +
              " |</span>\n\
                                    </div>\n\
                                    <div class='d-none d-lg-block '>\n\
                                        <span class='align-self-center google-Quicksand  ml-2'>" +
              DateOfEnd +
              "</span>\n\
                                    </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class='card-text d-flex justify-content-between my-4'>\n\
                            <div class='d-flex '>\n\
                                <div class='border card-header border-dark rounded  mr-2'>\n\
                                    <div>Sleeper (<span class='font-weight-bold'>" +
              trip.SL +
              "</span>)\n\
                                    </div>\n\
                                    <div class='mt-2 font-weight-bold'>&#8377; 500 /-</div>  \n\
                                </div>\n\
                                <div class='border card-header border-dark rounded  mx-2'>\n\
                                    <div>AC 2 Tier (<span class='font-weight-bold'>" +
              trip.AC2 +
              "</span>)</div> \n\
                                    <div class='mt-2 font-weight-bold'>&#8377; 1000 /-</div>  \n\
                                </div>\n\
                                <div class='border card-header border-dark rounded  mx-2'> \n\
                                    <div>AC 1 Tier (<span class='font-weight-bold'>" +
              trip.AC1 +
              "</span>)</div> \n\
                                    <div class='mt-2 font-weight-bold mx-auto'>&#8377; 1650 /-</div>  \n\
                                </div>   \n\
                            </div>\n\
                            <div class='d-flex'>\n\
                            <button type='submit' class='btn btn-outline-dark' id='" +
              trip.TripID +
              "'>\n\
                    BOOK SEATS\n\
                  </button>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>"
          );
          $("#" + trip.TripID).on("click", () => BookSeats(trip.TripID));
        });
      },
      error: (result) => {
        console.log(result);
      },
    });
  });

  //BOOKUI
  function BookSeats(tripId) {
    if (role == null) {
      $("#myModal").modal("toggle");
      return;
    }
    $("#bookingsSeats").modal("toggle");
    BookSeatButton(tripId);
  }

  //TOGGLING SEARCHBARS
  $("#Filter").click((e) => {
    $("#trainNameSearch").val("");
    $("#FilterSearch").toggle();
    $("#FilterSearchBar").toggle();
    $("#searchTrainNameBar").toggle();

    $("#DateSearchBar").toggle();
    $("#DestinationCitySearchBar").toggle();
    $("#SourceCitySearchBar").toggle();
    $("#TrainNameSearchBar").toggle();
    $("#SourceCity").val("");
    $("#DestinationCity").val("");
    $("#DateOfStart").val("");
    getRecentTrips();
  });

  //SEARCH BY FILTERS
  $("#FilterSearch").click((e) => {
    e.preventDefault();
    let body = {
      SourceCity: $("#SourceCity").val(),
      DestinationCity: $("#DestinationCity").val(),
      DateOfStart: $("#DateOfStart").val(),
    };

    if (body.SourceCity === "") {
      setTimeout(() => {
        $("#myToast").toast("hide");
      }, 3000);
      $("#toastBody").html("SOURCE CITY IS REQUIRED");
      $("#myToast").toast("show");
      return;
    }
    if (body.DestinationCity === "") {
      setTimeout(() => {
        $("#myToast").toast("hide");
      }, 3000);
      $("#toastBody").html("DESTINATION CITY IS REQUIRED");
      $("#myToast").toast("show");
      return;
    }
    if (body.DateOfStart === "") {
      setTimeout(() => {
        $("#myToast").toast("hide");
      }, 3000);

      $("#toastBody").html("DATE OF START IS REQUIRED");
      $("#myToast").toast("show");
      return;
    }

    $.ajax({
      url: "TrainByFilter",
      data: body,
      method: "POST",
      success: (result) => {
        $("#addTrip").empty();

        if (result.trips.length === 0) {
          $("#NORECORDFOUND").show();
          return;
        }
        $("#NORECORDFOUND").hide();
        $.each(result.trips, (index, trip) => {
          let DateOfStart = new Date(trip.DateOfStart).toDateString();
          let DateOfEnd = new Date(trip.DateOfEnd).toDateString();

          $("#addTrip").append(
            "<div class='col-12 my-4'>\n\
                <div class='card bg-warning text-dark'>\n\
                    <div class='card-header text-dark font-weight-bold' id='train-headers'>" +
              trip.TrainName +
              " (" +
              trip.TrainID +
              ")</div>\n\
                        <div class='card-body'>\n\
                            <div class='card-title d-flex justify-content-between'>\n\
                                <div class='d-flex google-Quicksand'>\n\
                                    <div class='d-none d-lg-block '>\n\
                                        <span class='align-self-center google-Quicksand font-weight-bold'>" +
              trip.FromTime +
              " |</span>\n\
                                    </div>\n\
                                    <div>\n\
                                        <span class='align-self-center google-Quicksand ml-2 '>" +
              trip.SourceCity +
              " |</span>\n\
                                    </div>\n\
                                    <div class='d-none d-lg-block '>\n\
                                        <span class='align-self-center google-Quicksand  ml-2'>" +
              DateOfStart +
              "</span>\n\
                                    </div>\n\
                                </div>\n\
                            <div class='d-flex google-Quicksand'>\n\
                                    <div class='d-none d-lg-block d'>\n\
                                        <span class='align-self-center google-Quicksand font-weight-bold'>" +
              trip.ToTime +
              " |</span>\n\
                                    </div>\n\
                                    <div>\n\
                                        <span class='align-self-center google-Quicksand ml-2 '>" +
              trip.DestinationCity +
              " |</span>\n\
                                    </div>\n\
                                    <div class='d-none d-lg-block '>\n\
                                        <span class='align-self-center google-Quicksand  ml-2'>" +
              DateOfEnd +
              "</span>\n\
                                    </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class='card-text d-flex justify-content-between my-4'>\n\
                            <div class='d-flex '>\n\
                                <div class='border card-header border-dark rounded  mr-2'>\n\
                                    <div>Sleeper (<span class='font-weight-bold'>" +
              trip.SL +
              "</span>)\n\
                                    </div>\n\
                                    <div class='mt-2 font-weight-bold'>&#8377; 500 /-</div>  \n\
                                </div>\n\
                                <div class='border card-header border-dark rounded  mx-2'>\n\
                                    <div>AC 2 Tier (<span class='font-weight-bold'>" +
              trip.AC2 +
              "</span>)</div> \n\
                                    <div class='mt-2 font-weight-bold'>&#8377; 1000 /-</div>  \n\
                                </div>\n\
                                <div class='border card-header border-dark rounded  mx-2'> \n\
                                    <div>AC 1 Tier (<span class='font-weight-bold'>" +
              trip.AC1 +
              "</span>)</div> \n\
                                    <div class='mt-2 font-weight-bold mx-auto'>&#8377; 1650 /-</div>  \n\
                                </div>   \n\
                            </div>\n\
                            <div class='d-flex'>\n\
                            <button type='submit' class='btn btn-outline-dark' id='" +
              trip.TripID +
              "'>\n\
                    BOOK SEATS\n\
                  </button>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>"
          );
          $("#" + trip.TripID).on("click", () => BookSeats(trip.TripID));
        });
      },
      error: (result) => {
        console.log(result.trips);
      },
    });
  });

  //SEATS UI
  function BookSeatButton(tripId) {
    $.ajax({
      url: "BookUI",
      data: { TripID: tripId },
      success: (result) => {
        $("#AC1ui").empty();
        $("#AC2ui").empty();
        $("#SLui").empty();
        $.map(result.seatsAvailable[0].AC1, (seat, index) => {
          $(
            "<div class='col-2 font-weight-bold text-center my-2'><button " +
              "class='btn btn-outline-dark'" +
              "id='AC1" +
              seat +
              "'>" +
              +seat +
              "</button></div>"
          ).appendTo("#AC1ui");
          $("#AC1" + seat).on("click", () =>
            BookTrainSeat(result.tripID, seat, "AC1")
          );
          return;
        });
        $.map(result.seatsAvailable[0].AC2, (seat, index) => {
          $(
            "<div class='col-2 font-weight-bold text-center my-2'><button " +
              "class='btn btn-outline-dark'" +
              "id='AC2" +
              seat +
              "'>" +
              +seat +
              "</button></div>"
          ).appendTo("#AC2ui");
          $("#AC2" + seat).on("click", () =>
            BookTrainSeat(result.tripID, seat, "AC2")
          );
          return;
        });
        $.map(result.seatsAvailable[0].SL, (seat, index) => {
          $(
            "<div class='col-2 font-weight-bold text-center my-2'><button " +
              "class='btn btn-outline-dark'" +
              "id='SL" +
              seat +
              "'>" +
              +seat +
              "</button></div>"
          ).appendTo("#SLui");
          $("#SL" + seat).on("click", () =>
            BookTrainSeat(result.tripID, seat, "SL")
          );
          return;
        });
      },

      error: (result) => {
        console.log(result);
      },
    });
  }

  //SHOWING THE FORMS TO BOOK SEAT
  function BookTrainSeat(tripID, seatNo, type) {
    $("#bookingsSeats").modal("toggle");
    $("#bookingForms").modal("toggle");
    $("#SeatNoForm").val(seatNo);
    $("#tripIDForm").val(tripID);
    $("#typeForm").val(type);
    $("#emailForm").val(sessionStorage.getItem("Email"));
  }

  //BOOKING THE SEATS
  $("#bookSeat").click((e) => {
    let body = {
      TripID: $("#tripIDForm").val(),
      Email: $("#emailForm").val(),
      PassengerName: $("#PassengerName").val(),
      Address: $("#Address").val(),
      PhoneNumber: $("#PhoneNumber").val(),
      SeatNo: parseInt($("#SeatNoForm").val()),
      Gender: $("#gender").find(":selected").val(),
      Type: $("#typeForm").val(),
    };
    if (body.PassengerName === "") {
      setTimeout(() => {
        $("#myToast2").toast("hide");
      }, 3000);
      $("#toastBody2").html("Passenger Name IS REQUIRED");
      $("#myToast2").toast("show");
      return;
    }
    if (body.Address === "") {
      setTimeout(() => {
        $("#myToast2").toast("hide");
      }, 3000);
      $("#toastBody2").html("Address IS REQUIRED");
      $("#myToast2").toast("show");
      return;
    }
    if (body.PhoneNumber === "") {
      setTimeout(() => {
        $("#myToast2").toast("hide");
      }, 3000);
      $("#toastBody2").html("Phone Number IS REQUIRED");
      $("#myToast2").toast("show");
      return;
    }

    $.ajax({
      url: "createBooking",
      method: "POST",
      data: body,
      success: (result) => {
        window.location.reload();
      },
      error: (result) => {},
    });
  });

  //LOGOUT
  $("#logout").click((e) => {
    e.preventDefault();
    sessionStorage.clear();
    let url = "/TRAINTICKETRESERVATION";
    $(location).attr("href", url);
    return;
  });
});
