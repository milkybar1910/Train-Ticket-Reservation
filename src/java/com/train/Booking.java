package com.train;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import com.db.Connector;

public class Booking {
    
    private String TripID,Email,PassengerName,Address,PhoneNumber,Gender,Type,BookingID;
    private int SeatNo;
    private ArrayList<Map<String, String>> bookedTrips = new ArrayList<Map<String, String>>();
    
    public String getBookingID() {
        return BookingID;
    }
    public void setBookingID(String bookingID) {
        BookingID = bookingID;
    }
    public ArrayList<Map<String, String>> getBookedTrips() {
        return bookedTrips;
    }
    public void setBookedTrips(ArrayList<Map<String, String>> bookedTrips) {
        this.bookedTrips = bookedTrips;
    }
    public String getTripID() {
        return TripID;
    }
    public void setTripID(String tripID) {
        TripID = tripID;
    }
    public String getEmail() {
        return Email;
    }
    public void setEmail(String email) {
        Email = email;
    }
    public String getPassengerName() {
        return PassengerName;
    }
    public void setPassengerName(String passengerName) {
        PassengerName = passengerName;
    }
    public String getAddress() {
        return Address;
    }
    public void setAddress(String address) {
        Address = address;
    }
    public String getPhoneNumber() {
        return PhoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        PhoneNumber = phoneNumber;
    }
    public String getGender() {
        return Gender;
    }
    public void setGender(String gender) {
        Gender = gender;
    }
    public int getSeatNo() {
        return SeatNo;
    }
    public void setSeatNo(int seatNo) {
        SeatNo = seatNo;
    }
    public String getType() {
        return Type;
    }
    public void setType(String type) {
        Type = type;
    }
    
    // ARRAY OF SEAT NUMBER FOR TRIPS.JAVA
    public static ArrayList<Integer> SeatsBookedArray(String category,String tripID) throws Exception{
        ArrayList<Integer> seatsBookedArray = new ArrayList<Integer>();
        try {
            Connection con = Connector.initializeDatabase();
            Statement getSeatBookedArray = (Statement) con.createStatement();
            ResultSet SeatBookedArrayResult = getSeatBookedArray.executeQuery("SELECT SeatNo from bookings WHERE Type='"+category+"' AND TripID='"+tripID+"'");
            while(SeatBookedArrayResult.next())
                seatsBookedArray.add(SeatBookedArrayResult.getInt("SeatNo"));
            return seatsBookedArray; 
        } catch (Exception e) {
            return seatsBookedArray;
        }
        
    }

    // BOOKING THE SEAT
    public String execute() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
                String INSERT_BOOKING = "INSERT INTO bookings" + "(TripID, Email,PassengerName,Address,PhoneNumber,SeatNo,Gender,Type) VALUES "
                        + " (?,?,?,?,?,?,?,?);";
                PreparedStatement preparedStatement = con.prepareStatement(INSERT_BOOKING);
                preparedStatement.setString(1, TripID);
                preparedStatement.setString(2, Email);
                preparedStatement.setString(3, PassengerName);
                preparedStatement.setString(4, Address);
                preparedStatement.setString(5, PhoneNumber);
                preparedStatement.setInt(6, SeatNo);
                preparedStatement.setString(7, Gender);
                preparedStatement.setString(8, Type);
                preparedStatement.executeUpdate();
            return "success";
        } catch (Exception e) {

            e.printStackTrace();
            return "error";
        }
    }

    // HISTORY OF BOOKED TICKETS
    public String UserBookingSearch() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            Statement statementSearchBooking = (Statement) con.createStatement();
            ResultSet BookInfo = statementSearchBooking
                    .executeQuery("select bookings.*,trips.*,train.TrainName from bookings,trips,train WHERE bookings.Email ='"+Email+"' and bookings.TripID=trips.TripID and trips.TrainID=train.TrainID");
            bookedTrips.clear();
            while (BookInfo.next()) {
                Map<String, String> info = new HashMap<String, String>();
                info.put("PassengerName", BookInfo.getString("PassengerName"));
                info.put("Address", BookInfo.getString("Address"));
                info.put("SeatNo",String.valueOf(BookInfo.getInt("SeatNo")));
                info.put("Type", BookInfo.getString("Type"));
                info.put("Gender", BookInfo.getString("Gender"));
                info.put("BookingID", BookInfo.getString("BookingID"));
                info.put("TripID", BookInfo.getString("TripID"));
                info.put("TrainID", BookInfo.getString("TrainID"));
                info.put("SourceCity", BookInfo.getString("SourceCity"));
                info.put("DestinationCity", BookInfo.getString("DestinationCity"));
                info.put("FromTime", BookInfo.getString("FromTime"));
                info.put("ToTime", BookInfo.getString("ToTime"));
                info.put("DateOfStart", BookInfo.getString("DateOfStart"));
                info.put("DateOfEnd", BookInfo.getString("DateOfEnd"));
                info.put("TrainName", BookInfo.getString("TrainName"));
                info.put("Status",BookInfo.getString("Status"));
                bookedTrips.add(info);
            }
            return "success";
        } catch (Exception e) {
            return "error";
        }
    }

    // TRIPS DETAILS FOR ADMIN
    public String TripDetails() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            Statement statementSearchBooking = (Statement) con.createStatement();
            ResultSet BookInfo = statementSearchBooking
                    .executeQuery("SELECT * FROM bookings WHERE TripID ='"+TripID+"' ORDER BY Type DESC,SeatNo");
            bookedTrips.clear();
            while (BookInfo.next()) {
                Map<String, String> info = new HashMap<String, String>();
                info.put("Passenger Name", BookInfo.getString("PassengerName"));
                info.put("Address", BookInfo.getString("Address"));
                info.put("Seat No",String.valueOf(BookInfo.getInt("SeatNo")));
                info.put("Type", BookInfo.getString("Type"));
                info.put("Gender", BookInfo.getString("Gender"));
                info.put("BookingID", BookInfo.getString("BookingID"));
                bookedTrips.add(info);
            }
            return "success";
        } catch (Exception e) {
            return "error";
        }
    }
    
    // CANCEL BOOKING
    public String BookedSeatDelete() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            PreparedStatement preparedStatement = con.prepareStatement(
                "DELETE FROM bookings WHERE BookingID ='"+BookingID+"' and  bookings.TripID = (select trips.TripID from trips where trips.TripID=bookings.TripID and trips.Status ='ALL')");
            preparedStatement.executeUpdate();
            return "success";
        } catch (Exception e) {
            return "error";
        }
    }
    
}
