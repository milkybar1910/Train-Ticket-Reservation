$(function () {
  //CHECKING FOR ADMIN PREFERENCES
  if (sessionStorage.getItem("Role") !== "1") {
    $(location).attr("href", "/TRAINTICKETRESERVATION");
    return;
  }

  //GETTING TRAIN NAMES FOR CREATE TRIP SECTION
  $.ajax({
    url: "getTrainDetails",
    method: "POST",
    success: (result) => {
      $.each(result.trainInfo, (key, value) => {
        $("#trains").append(new Option(value, key));
      });
    },
    error: (result) => {
      console.log(result);
    },
  });

  //CREATE TRAIN
  $("#createTrain").click((e) => {
    e.preventDefault();
    let body = {
      trainName: $("#trainName").val(),
      trainID: $("#trainID").val(),
      SL: $("#SL").val() != null ? $("#SL").val() : 0,
      AC1: $("#AC1").val() != null ? $("#AC1").val() : 0,
      AC2: $("#AC2").val() != null ? $("#AC2").val() : 0,
    };
    if (body.trainName === "") {
      setTimeout(() => {
        $("#myToast").toast("hide");
      }, 3000);
      $("#toastBody").html("TRAIN NAME IS REQUIRED");
      $("#myToast").toast("show");
      return;
    }
    if (body.trainID === "") {
      setTimeout(() => {
        $("#myToast").toast("hide");
      }, 3000);
      $("#toastBody").html("TRAIN ID IS REQUIRED");
      $("#myToast").toast("show");
      return;
    }

    $.ajax({
      url: "createTrain",
      data: body,
      method: "POST",
      success: (result) => {
        if (result.error) {
          setTimeout(() => {
            $("#myToast").toast("hide");
            $(".toast-body").removeClass("bg-success");
          }, 3000);
          $("#toastBody").html(result.error);
          $("#myToast").toast("show");
          $(".toast-body").addClass("bg-success");
        } else {
          setTimeout(() => {
            $("#myToast").toast("hide");
            $(".toast-body").removeClass("bg-success");
            $(".toast-body").addClass("bg-danger");
          }, 3000);

          $("#toastBody").html("CREATED TRAIN NAMED AS " + result.trainName);
          $("#trains").append(new Option(result.trainName, result.trainID));
          $(".toast-body").addClass("bg-success");
          $(".toast-body").removeClass("bg-danger");
          $("#myToast").toast("show");
          $("#trainName").val("");
          $("#trainID").val("");
          $("#SL").val("");
          $("#AC1").val("");
          $("#AC2").val("");
        }
      },
      error: (result) => {
        console.log(result);
      },
    });
  });

  // CREATE TRIP
  $("#createTrip").click((e) => {
    e.preventDefault();
    let body = {
      TrainID: $("#trains").find(":selected").val(),
      SourceCity: $("#SourceCity").val(),
      DestinationCity: $("#DestinationCity").val(),
      FromTime: $("#FromTime").val(),
      ToTime: $("#ToTime").val(),
      DateOfStart: $("#DateOfStart").val(),
      DateOfEnd: $("#DateOfEnd").val(),
      Status: $("#Status").val(),
    };

    if (body.TrainID === "nothing") {
      setTimeout(() => {
        $("#myToast2").toast("hide");
      }, 3000);
      $("#toastBody2").html("TRAIN IS NOT SELECTED");
      $("#myToast2").toast("show");
      return;
    }
    if (body.SourceCity === "") {
      setTimeout(() => {
        $("#myToast2").toast("hide");
      }, 3000);
      $("#toastBody2").html("SourceCity IS REQUIRED");
      $("#myToast2").toast("show");
      return;
    }
    if (body.DestinationCity === "") {
      setTimeout(() => {
        $("#myToast2").toast("hide");
      }, 3000);
      $("#toastBody2").html("DestinationCity IS REQUIRED");
      $("#myToast2").toast("show");
      return;
    }
    if (body.FromTime === "") {
      setTimeout(() => {
        $("#myToast2").toast("hide");
      }, 3000);
      $("#toastBody2").html("FromTime IS REQUIRED");
      $("#myToast2").toast("show");
      return;
    }
    if (body.ToTime === "") {
      setTimeout(() => {
        $("#myToast2").toast("hide");
      }, 3000);
      $("#toastBody2").html("ToTime IS REQUIRED");
      $("#myToast2").toast("show");
      return;
    }
    if (body.DateOfStart === "") {
      setTimeout(() => {
        $("#myToast2").toast("hide");
      }, 3000);
      $("#toastBody2").html("Date Of Start IS REQUIRED");
      $("#myToast2").toast("show");
      return;
    }
    if (body.DateOfEnd === "") {
      setTimeout(() => {
        $("#myToast2").toast("hide");
      }, 3000);
      $("#toastBody2").html("Date Of End IS REQUIRED");
      $("#myToast2").toast("show");
      return;
    }

    $.ajax({
      url: "createTrip",
      data: body,
      method: "POST",
      success: (result) => {
        setTimeout(() => {
          $("#myToast2").toast("hide");
          $(".toast-body2").removeClass("bg-success");
          $(".toast-body2").addClass("bg-danger");
        }, 3000);

        $("#toastBody2").html("TRIP CREATED");
        $(".toast-body2").removeClass("bg-danger");
        $(".toast-body2").addClass("bg-success");
        $("#myToast2").toast("show");
        $("#SourceCity").val("");
        $("#DestinationCity").val("");
        $("#FromTime").val("");
        $("#ToTime").val("");
        $("#DateOfStart").val("");
        $("#DateOfEnd").val("");
      },
      error: (result) => {
        console.log(result);
      },
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
