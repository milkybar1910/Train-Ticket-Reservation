$(function () {
  //HIDING "NO RECORDS FOUND TEXT"
  $("#recordsText").hide();
  function getHistory() {
    let body = {
      Email: sessionStorage.getItem("Email"),
    };
    $("#addTrip").empty();
    $.ajax({
      url: "BookedSeats",
      method: "POST",
      data: body,
      success: (result) => {
        $("#addTrip").empty();
        if (result.bookedTrips.length === 0) {
          $("#recordsText").show();
          return;
        }
        $.each(result.bookedTrips, (index, trip) => {
          let DateOfStart = new Date(trip.DateOfStart).toDateString();
          let DateOfEnd = new Date(trip.DateOfEnd).toDateString();

          if (trip.error == null && trip.FromTime) {
            $("#addTrip").append(
              "<div class='col-12 my-4 " +
                trip.BookingID +
                "' >\n\
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
                                    <div> <span class='font-weight-bold'>NAME" +
                "</span>\n\
                                    </div>\n\
                                    <div class='mt-2 '>" +
                trip.PassengerName +
                "</div>  \n\
                                </div>\n\
                                <div class='border card-header border-dark rounded  mx-2'>\n\
                                    <div><span class='font-weight-bold'>TYPE" +
                "</span></div> \n\
                                    <div class='mt-2 '>" +
                trip.Type +
                "</div>  \n\
                                </div>\n\
                            </div>\n\
                            <div class='d-flex'>\n\
                            <button type='submit' class='btn btn-outline-dark' id='" +
                trip.BookingID +
                "'>\n\
                    CANCEL\n\
                  </button>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>"
            );
            if (trip.Status == "ALL") {
              $("#" + trip.BookingID).on("click", () =>
                DeleteSeat(trip.BookingID)
              );
            } else {
              $("#" + trip.BookingID).prop("disabled", true);
              $("#" + trip.BookingID).html("BOOKING CLOSED");
            }
          }
        });
      },
      error: (result) => {
        console.log(result);
      },
    });
  }

  //CANCEL TICKET
  const DeleteSeat = (BookingID) => {
    $.ajax({
      url: "BookedSeatDelete",
      data: { BookingID: BookingID },
      method: "POST",
      success: (result) => {
        $("." + BookingID).remove();
        if ($("#addTrip").children().length == 0) {
          $("#recordsText").show();
        }
      },
      error: (result) => {},
    });
  };

  getHistory();
  //LOGOUT
  $("#logout").click((e) => {
    e.preventDefault();
    sessionStorage.clear();
    let url = "/TRAINTICKETRESERVATION";
    $(location).attr("href", url);
    return;
  });
});
