$(function () {
  if (sessionStorage.getItem("Role") !== "1") {
    $(location).attr("href", "/TRAINTICKETRESERVATION");
    return;
  }

  //GET ALL TRIPS
  $.ajax({
    url: "getTripsDetails",
    method: "POST",
    success: (result) => {
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
                    VIEW DETAILS\n\
                  </button>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>"
        );
        $("#" + trip.TripID).on("click", () => ViewDetails(trip.TripID));
      });
    },
    error: (result) => {
      console.log(result);
    },
  });

  //GET ALL TRIPS
  function ViewDetails(TripID) {
    $("#TripDetails").modal("toggle");
    $.ajax({
      url: "TripDetails",
      method: "POST",
      data: { TripID: TripID },
      success: (result) => {
        $("#bookingsInfo").empty();
        var template = Handlebars.templates.example;
        
        $.map(result.bookedTrips, (info, index) => {
          $('#bookingsInfo').append(template(info))
          // return $(
          //   "<tr>\n\
          //             <td>" +
          //     info["Seat No"] +
          //     "</td>\n\
          //     <td>" +
          //     info.Type +
          //     "</td>\n\
          //             <td>" +
          //     info["Passenger Name"] +
          //     "</td>\n\
          //             <td>" +
          //     info.Gender +
          //     "</td>\n\
          //             <td>" +
          //     info.Address +
          //     "</td></tr>"
          // ).appendTo("#bookingsInfo");
        });
      },
      error: (result) => {},
    });
  }

  //LOGOUT
  $("#logout").click((e) => {
    e.preventDefault();
    sessionStorage.clear();
    let url = "/TRAINTICKETRESERVATION";
    $(location).attr("href", url);
    return;
  });
});
