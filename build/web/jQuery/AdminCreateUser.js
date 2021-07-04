$(function () {
  //CHECKING FOR ADMIN PREFERENCES
  if (sessionStorage.getItem("Role") !== "1") {
    $(location).attr("href", "/TRAINTICKETRESERVATION");
    return;
  }
  //CREATE USER
  $("#create").click((e) => {
    e.preventDefault();
    let body = {
      name: $("#username").val(),
      password: $("#password").val(),
      email: $("#email").val(),
      role: $("#role").val(),
    };
    if (body.name === "") {
      setTimeout(() => {
        $("#myToast").toast("hide");
      }, 3000);
      $("#toastBody").html("NAME IS REQUIRED");
      $("#myToast").toast("show");
      return;
    }
    if (body.email === "") {
      setTimeout(() => {
        $("#myToast").toast("hide");
      }, 3000);
      $("#toastBody").html("EMAIL IS REQUIRED");
      $("#myToast").toast("show");
      return;
    }
    if (body.password === "") {
      setTimeout(() => {
        $("#myToast").toast("hide");
      }, 3000);
      $("#toastBody").html("PASSWORD IS REQUIRED");
      $("#myToast").toast("show");
      return;
    }

    $.ajax({
      url: "register",
      type: "POST",
      data: body,
      success: (result) => {
        if (result.error) {
          setTimeout(() => {
            $("#myToast").toast("hide");
          }, 3000);
          $("#toastBody").html(result.error);
          $("#myToast").toast("show");
        } else {
          setTimeout(() => {
            $("#myToast").toast("hide");
          }, 3000);

          $("#toastBody").html("CREATED ADMIN NAMED " + result.name);
          $(".toast-body").addClass("bg-success");
          $(".toast-body").removeClass("bg-danger");
          $("#myToast").toast("show");
          $("#username").val("");
          $("#email").val("");
          $("#password").val("");
        }
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
