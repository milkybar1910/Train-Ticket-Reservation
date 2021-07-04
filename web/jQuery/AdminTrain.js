$(function () {
    if (sessionStorage.getItem("Role") !== "1") {
      $(location).attr("href", "/TRAINTICKETRESERVATION");
      return;
    }
  
    //GET ALL TRAINS
    $.ajax({
      url: "TrainInfoAdmin",
      method: "POST",
      success: (result) => {
        $.each(result.adminTrainDetails, (index, trip) => {
            
            
                $("#addTrip").append(
                  "<div class='col-sm-12 col-md-4 my-4'>\n\
                        <div class='card shadow bg-warning text-dark'>\n\
                                <div class='card-body'>\n\
                                    <div class='card-title d-flex justify-content-between'>\n\
                                        <div class='d-flex google-font'>"
                                            +trip.TrainName+
                                        "</div>\n\
                                        <div class='d-flex google-font'>"
                                            +" "+trip.TrainID+
                                        "</div>\n\
                                    </div>\n\
                                    <div class='card-text row justify-content-between  mt-4 mb-2'>\n\
                                            <div class='border  col-sm-12 col-lg-3 my-sm-2 my-lg-0 border-dark align-self-center rounded  text-center py-2 mx-auto'>\n\
                                                SL (<span class='font-weight-bold'>" +trip.SL +"</span>)\n\
                                                \n\
                                            </div>\n\
                                            <div class='border col-sm-12 col-lg-4 my-sm-2 my-lg-0 border-dark  align-self-center  rounded text-center py-2 mx-auto '>\n\
                                                <div>AC2 (<span class='font-weight-bold'>" +trip.AC2 +"</span>)\n\
                                                </div> \n\
                                            </div>\n\
                                            <div class='border  col-sm-12 col-lg-4 my-sm-2 my-lg-0 border-dark align-self-center  rounded  text-center py-2 mx-auto'> \n\
                                                <div>AC1 (<span class='font-weight-bold'>" +trip.AC1 +"</span>)\n\
                                                </div> \n\
                                            </div>   \n\
                                    </div>\n\
                                </div>\n\
                        </div>\n\
                    </div>"
                );
           
         
          
        });
      },
      error: (result) => {
        console.log(result);
      },
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
  