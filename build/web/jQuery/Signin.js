$(function () {
  sessionStorage.clear();
  //LOGIN
  $("#login").click((e) => {
    e.preventDefault();
    let body = {
      email: $("#email").val(),
      password: $("#password").val(),
    };
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
      url: "HOME",
      type: "POST",
      data: body,
      dataType: "JSON",
      success: function (result) {
        if (result.error) {
          setTimeout(() => {
            $("#myToast").toast("hide");
          }, 3000);
          $("#toastBody").html(result.error);
          $("#myToast").toast("show");
        } else {
          sessionStorage.setItem("Email", result.email);
          sessionStorage.setItem("Role", result.role);
          setInterval(() => {
            if (result.role == 1) {
              $(location).attr("href", "/TRAINTICKETRESERVATION/Admin/Home");
            } else {
              $(location).attr("href", "/TRAINTICKETRESERVATION/Home");
            }
          }, 2000);
          $("#toastBody").html("LOGGED IN AS " + result.name);
          $(".toast-body").addClass("bg-success");
          $(".toast-body").removeClass("bg-danger");
          $("#myToast").toast("show");
          $("#email").val("");
          $("#password").val("");
        }
      },
      error: function (result) {
        console.log(result);
      },
    });
  });
});
