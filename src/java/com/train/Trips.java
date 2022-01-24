package com.train;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.db.Connector;

public class Trips {
    private String TrainID, SourceCity, DestinationCity, trainName, FromTime, ToTime, DateOfStart, DateOfEnd,
            Status;
    private int AC1, AC2, SL,TripID;
    private ArrayList<Map<String, String>> trips = new ArrayList<Map<String, String>>();
    private ArrayList<Map<String, String>> routesArray = new ArrayList<Map<String, String>>();
    private ArrayList<ArrayList<Map<String,String>>> routesTripsArray = new  ArrayList<ArrayList<Map<String,String>>>();
    private ArrayList<Map<String, ArrayList<Integer>>> seatsAvailable = new ArrayList<Map<String, ArrayList<Integer>>>();;

    

    public ArrayList<Map<String, String>> getRoutesArray() {
        return routesArray;
    }

    public void setRoutesArray(ArrayList<Map<String, String>> routesArray) {
        this.routesArray = routesArray;
    }

    public ArrayList<ArrayList<Map<String, String>>> getRoutesTripsArray() {
        return routesTripsArray;
    }

    public void setRoutesTripsArray(ArrayList<ArrayList<Map<String, String>>> routesTripsArray) {
        this.routesTripsArray = routesTripsArray;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public ArrayList<Map<String, ArrayList<Integer>>> getSeatsAvailable() {
        return seatsAvailable;
    }

    public void setSeatsAvailable(ArrayList<Map<String, ArrayList<Integer>>> seatsAvailable) {
        this.seatsAvailable = seatsAvailable;
    }

    public String getTrainName() {
        return trainName;
    }

    public void setTrainName(String trainName) {
        this.trainName = trainName;
    }

    public ArrayList<Map<String, String>> getTrips() {
        return trips;
    }

    public void setTrips(ArrayList<Map<String, String>> trips) {
        this.trips = trips;
    }

    public String getDateOfStart() {
        return DateOfStart;
    }

    public void setDateOfStart(String dateOfStart) {
        DateOfStart = dateOfStart;
    }

    public String getDateOfEnd() {
        return DateOfEnd;
    }

    public void setDateOfEnd(String dateOfEnd) {
        DateOfEnd = dateOfEnd;
    }

    public int getAC1() {
        return AC1;
    }

    public void setAC1(int aC1) {
        AC1 = aC1;
    }

    public int getAC2() {
        return AC2;
    }

    public void setAC2(int aC2) {
        AC2 = aC2;
    }

    public int getSL() {
        return SL;
    }

    public void setSL(int sL) {
        SL = sL;
    }

    public String getTrainID() {
        return TrainID;
    }

    public void setTrainID(String trainID) {
        TrainID = trainID;
    }

    public String getSourceCity() {
        return SourceCity;
    }

    public void setSourceCity(String sourceCity) {
        SourceCity = sourceCity;
    }

    public String getDestinationCity() {
        return DestinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        DestinationCity = destinationCity;
    }

    public int getTripID() {
        return TripID;
    }

    public void setTripID(int TripID) {
        this.TripID = TripID;
    }

    

    public String getFromTime() {
        return FromTime;
    }

    public void setFromTime(String fromTime) {
        FromTime = fromTime;
    }

    public String getToTime() {
        return ToTime;
    }

    public void setToTime(String toTime) {
        ToTime = toTime;
    }

    //CREATE TRIPS
    public String execute() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            Statement createTripStatement = (Statement) con.createStatement();
            ResultSet createTripResult = createTripStatement
                    .executeQuery("SELECT * from train where TrainID='" + TrainID + "'");
            while (createTripResult.next()) {
                AC1 = createTripResult.getInt("AC1");
                AC2 = createTripResult.getInt("AC2");
                SL = createTripResult.getInt("SL");
            }
            String INSERT_TRIPS = "INSERT INTO trips"
                    + "(TrainID, SourceCity, DestinationCity,FromTime,ToTime,DateOfStart,DateOfEnd,AC1,AC2,SL,Status) VALUES "
                    + " (?,?,?,?,?,?,?,?,?,?,?);";
            PreparedStatement preparedStatement = con.prepareStatement(INSERT_TRIPS);
            preparedStatement.setString(1, TrainID);
            preparedStatement.setString(2, SourceCity);
            preparedStatement.setString(3, DestinationCity);
            preparedStatement.setString(4, FromTime);
            preparedStatement.setString(5, ToTime);
            preparedStatement.setString(6, DateOfStart);
            preparedStatement.setString(7, DateOfEnd);
            preparedStatement.setInt(8, AC1);
            preparedStatement.setInt(9, AC2);
            preparedStatement.setInt(10, SL);
            preparedStatement.setString(11, Status);
            preparedStatement.executeUpdate();
            return "success";
        } catch (Exception e) {

            return "error";
        }
    }

    //SHOW RECENT SIX TRIPS TO USER
    public String TripsLimitSix() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            String INSERT_TRIPS = 
        "UPDATE trips set trips.Status = 'ADMIN' where TIMESTAMPDIFF(minute,now(),(CONVERT(CONCAT(CONVERT( trips.DateOfStart , CHAR),' ',CONVERT( trips.FromTime , CHAR)) , DATETIME))) <10";
        PreparedStatement preparedStatement = con.prepareStatement(INSERT_TRIPS);
        preparedStatement.executeUpdate();
            Statement get6TripsDetailsStatement = (Statement) con.createStatement();
            ResultSet get6TripsDetailsResult = get6TripsDetailsStatement.executeQuery(
                    "SELECT (trips.AC1-(SELECT COUNT(SeatNo) as AC1 from bookings WHERE bookings.Type='AC1' AND bookings.TripID=trips.TripID)) as AC1,(trips.AC2-(SELECT COUNT(SeatNo) as AC2 from bookings WHERE bookings.Type='AC2' AND bookings.TripID=trips.TripID)) as AC2, (trips.SL-(SELECT COUNT(SeatNo) as SL from bookings WHERE bookings.Type='SL' AND bookings.TripID=trips.TripID)) as SL,trips.TripID,trips.TrainID,trips.SourceCity,trips.DestinationCity,trips.FromTime,trips.ToTime,trips.DateOfStart,trips.DateOfEnd,train.TrainName FROM trips,train WHERE trips.TrainID=train.TrainID AND trips.Status='ALL' ORDER BY trips.DateOfStart,trips.FromTime LIMIT 6");
            trips.clear();
            while (get6TripsDetailsResult.next()) {
                Map<String, String> info = new HashMap<>();
                info.put("TripID", String.valueOf(get6TripsDetailsResult.getInt("TripID")));
                info.put("TrainID", get6TripsDetailsResult.getString("TrainID"));
                info.put("SourceCity", get6TripsDetailsResult.getString("SourceCity"));
                info.put("DestinationCity", get6TripsDetailsResult.getString("DestinationCity"));
                info.put("FromTime", get6TripsDetailsResult.getString("FromTime"));
                info.put("ToTime", get6TripsDetailsResult.getString("ToTime"));
                info.put("DateOfStart", get6TripsDetailsResult.getString("DateOfStart"));
                info.put("DateOfEnd", get6TripsDetailsResult.getString("DateOfEnd"));
                info.put("AC1", String.valueOf(get6TripsDetailsResult.getInt("AC1")));
                info.put("AC2", String.valueOf(get6TripsDetailsResult.getInt("AC2")));
                info.put("SL", String.valueOf(get6TripsDetailsResult.getInt("SL")));
                info.put("TrainName", get6TripsDetailsResult.getString("TrainName"));
                trips.add(info);
            }
            return "success";
        } catch (Exception e) {
            return "error";
        }
    }

    //SHOW ALL TRIPS TO ADMIN
    public String AdminTrips() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            Statement getTripStatement = (Statement) con.createStatement();
            ResultSet getTripResult = getTripStatement.executeQuery(
                    "SELECT (trips.AC1-(SELECT COUNT(SeatNo) as AC1 from bookings WHERE bookings.Type='AC1' AND bookings.TripID=trips.TripID)) as AC1,(trips.AC2-(SELECT COUNT(SeatNo) as AC2 from bookings WHERE bookings.Type='AC2' AND bookings.TripID=trips.TripID)) as AC2, (trips.SL-(SELECT COUNT(SeatNo) as SL from bookings WHERE bookings.Type='SL' AND bookings.TripID=trips.TripID)) as SL,trips.TripID,trips.TrainID,trips.SourceCity,trips.DestinationCity,trips.FromTime,trips.ToTime,trips.DateOfStart,trips.DateOfEnd,train.TrainName FROM trips,train WHERE trips.TrainID=train.TrainID ORDER BY trips.DateOfStart,trips.FromTime");

            trips.clear();
            while (getTripResult.next()) {
                Map<String, String> infos = new HashMap<>();
                infos.put("TripID", String.valueOf(getTripResult.getInt("TripID")));
                infos.put("TrainID", getTripResult.getString("TrainID"));
                infos.put("SourceCity", getTripResult.getString("SourceCity"));
                infos.put("DestinationCity", getTripResult.getString("DestinationCity"));
                infos.put("FromTime", getTripResult.getString("FromTime"));
                infos.put("ToTime", getTripResult.getString("ToTime"));
                infos.put("DateOfStart", getTripResult.getString("DateOfStart"));
                infos.put("DateOfEnd", getTripResult.getString("DateOfEnd"));
                infos.put("AC1", String.valueOf(getTripResult.getInt("AC1")));
                infos.put("AC2", String.valueOf(getTripResult.getInt("AC2")));
                infos.put("SL", String.valueOf(getTripResult.getInt("SL")));
                Statement statement22 = (Statement) con.createStatement();
                ResultSet restultTrain2 = statement22.executeQuery(
                        "SELECT TrainName from train where TrainID='" + getTripResult.getString("TrainID") + "'");
                while (restultTrain2.next())
                    infos.put("TrainName", restultTrain2.getString("TrainName"));
                trips.add(infos);
            }
            return "success";
        } catch (Exception e) {
            return "error";
        }
    }

    //SEARCH BY TRAIN NAME
    public String TrainNameSearch() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            Statement statementSearch = (Statement) con.createStatement();
            ResultSet TrainInfo = statementSearch.executeQuery(
                    "SELECT (trips.AC1-(SELECT COUNT(SeatNo) as AC1 from bookings WHERE bookings.Type='AC1' AND bookings.TripID=trips.TripID)) as AC1,(trips.AC2-(SELECT COUNT(SeatNo) as AC2 from bookings WHERE bookings.Type='AC2' AND bookings.TripID=trips.TripID)) as AC2, (trips.SL-(SELECT COUNT(SeatNo) as SL from bookings WHERE bookings.Type='SL' AND bookings.TripID=trips.TripID)) as SL,trips.TripID,trips.TrainID,trips.SourceCity,trips.DestinationCity,trips.FromTime,trips.ToTime,trips.DateOfStart,trips.DateOfEnd,train.TrainName FROM trips,train WHERE trips.TrainID=train.TrainID AND trips.Status='ALL' AND train.TrainName LIKE '%"+trainName+"%' ORDER BY trips.DateOfStart,trips.FromTime");
            trips.clear();
            
            while (TrainInfo.next()) {

                Map<String, String> info = new HashMap<String, String>();
                info.put("TrainName", TrainInfo.getString("TrainName"));
                info.put("TrainID", TrainInfo.getString("TrainID"));
                info.put("TripID", String.valueOf(TrainInfo.getInt("TripID")));
                info.put("TrainID", TrainInfo.getString("TrainID"));
                info.put("SourceCity", TrainInfo.getString("SourceCity"));
                info.put("DestinationCity", TrainInfo.getString("DestinationCity"));
                info.put("FromTime", TrainInfo.getString("FromTime"));
                info.put("ToTime", TrainInfo.getString("ToTime"));
                info.put("DateOfStart", TrainInfo.getString("DateOfStart"));
                info.put("DateOfEnd", TrainInfo.getString("DateOfEnd"));
                info.put("AC1", String.valueOf(TrainInfo.getInt("AC1")));
                info.put("AC2", String.valueOf(TrainInfo.getInt("AC2")));
                info.put("SL", String.valueOf(TrainInfo.getInt("SL")));
                trips.add(info);
            }
            return "success";
        } catch (Exception e) {

            return "error";
        }
    }

    //SEARCH BY FILTER
    public String TrainFilterSearch() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            Statement statementSearch = (Statement) con.createStatement();
            ResultSet TripInfo = statementSearch.executeQuery(
                    "SELECT (trips.AC1-(SELECT COUNT(SeatNo) as AC1 from bookings WHERE bookings.Type='AC1' AND bookings.TripID=trips.TripID)) as AC1,(trips.AC2-(SELECT COUNT(SeatNo) as AC2 from bookings WHERE bookings.Type='AC2' AND bookings.TripID=trips.TripID)) as AC2, (trips.SL-(SELECT COUNT(SeatNo) as SL from bookings WHERE bookings.Type='SL' AND bookings.TripID=trips.TripID)) as SL,trips.TripID,trips.TrainID,trips.SourceCity,trips.DestinationCity,trips.FromTime,trips.ToTime,trips.DateOfStart,trips.DateOfEnd,train.TrainName FROM trips,train WHERE trips.TrainID=train.TrainID AND trips.Status='ALL' AND trips.SourceCity LIKE '%"
                            + SourceCity + "%' AND trips.DestinationCity like '%"+DestinationCity+"%' and trips.DateOfStart='"+DateOfStart+"' ORDER BY trips.DateOfStart,trips.FromTime");
            trips.clear();
            while (TripInfo.next()) {
                Map<String, String> info = new HashMap<String, String>();
                info.put("TripID", String.valueOf(TripInfo.getInt("TripID")));
                info.put("TrainID", TripInfo.getString("TrainID"));
                info.put("SourceCity", TripInfo.getString("SourceCity"));
                info.put("DestinationCity", TripInfo.getString("DestinationCity"));
                info.put("FromTime", TripInfo.getString("FromTime"));
                info.put("ToTime", TripInfo.getString("ToTime"));
                info.put("DateOfStart", TripInfo.getString("DateOfStart"));
                info.put("DateOfEnd", TripInfo.getString("DateOfEnd"));
                info.put("AC1", String.valueOf(TripInfo.getInt("AC1")));
                info.put("AC2", String.valueOf(TripInfo.getInt("AC2")));
                info.put("SL", String.valueOf(TripInfo.getInt("SL")));
                info.put("TrainName", TripInfo.getString("TrainName"));
                trips.add(info);
            }
            return "success";
        } catch (Exception e) {
            return "error";
        }
    }

    //SHOW AVAILABLE SEATS
    public String BookSeatRendering() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            Statement statementBookSeatRendering = (Statement) con.createStatement();
            ResultSet BookSeatRenderingResult = statementBookSeatRendering
                    .executeQuery("SELECT * FROM trips WHERE TripID='" + TripID + "'");
            seatsAvailable.clear();
            ArrayList<?> AC1bookedArray = Booking.SeatsBookedArray("AC1", TripID);
            ArrayList<?>  AC2bookedArray = Booking.SeatsBookedArray("AC2", TripID);
            ArrayList<?>  SLbookedArray = Booking.SeatsBookedArray("SL", TripID);
            while (BookSeatRenderingResult.next()) {
                ArrayList<Integer> AC1LeftOutArray = new ArrayList<Integer>();
                ArrayList<Integer> AC2LeftOutArray = new ArrayList<Integer>();
                ArrayList<Integer> SLLeftOutArray = new ArrayList<Integer>();

                for (int i = 1; i <= BookSeatRenderingResult.getInt("AC1"); i++) {
                    AC1LeftOutArray.add(i);
                }
                for (int i = 1; i <= BookSeatRenderingResult.getInt("AC2"); i++) {
                    AC2LeftOutArray.add(i);
                }
                for (int i = 1; i <= BookSeatRenderingResult.getInt("SL"); i++) {
                    SLLeftOutArray.add(i);
                }

                AC1LeftOutArray.removeAll(AC1bookedArray);
                AC2LeftOutArray.removeAll(AC2bookedArray);
                SLLeftOutArray.removeAll(SLbookedArray);

                Map<String, ArrayList<Integer>> info = new HashMap<String, ArrayList<Integer>>();
                info.put("AC1", AC1LeftOutArray);
                info.put("AC2", AC2LeftOutArray);
                info.put("SL", SLLeftOutArray);

                seatsAvailable.add(info);
            }
            return "success";
        } catch (Exception e) {

            return "error";
        }
    }

    //SHOW TRIPS IN ROUTES ORDER
    public String TripsInfoBasedOnRoutes() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            String INSERT_TRIPS = 
        "UPDATE trips set trips.Status = 'ADMIN' where TIMESTAMPDIFF(minute,now(),(CONVERT(CONCAT(CONVERT( trips.DateOfStart , CHAR),' ',CONVERT( trips.FromTime , CHAR)) , DATETIME))) <10";
        PreparedStatement preparedStatement = con.prepareStatement(INSERT_TRIPS);
        preparedStatement.executeUpdate();
            Statement distinctRoutes = (Statement) con.createStatement();
            ResultSet distinctRoutesResult = distinctRoutes.executeQuery(
                    "SELECT DISTINCT trips.SourceCity ,trips.DestinationCity from trips where trips.Status='ALL'");
            routesArray.clear();
            routesTripsArray.clear();
            while (distinctRoutesResult.next()) {
                Map<String, String> info = new HashMap<>();
                info.put("SourceCity", distinctRoutesResult.getString("SourceCity"));
                info.put("DestinationCity", distinctRoutesResult.getString("DestinationCity"));
                routesArray.add(info);
                ArrayList<Map<String,String>> distinctTripsForDistinctRoutes = new ArrayList<Map<String,String>>();
                Statement RoutesTrips = (Statement) con.createStatement();
                ResultSet RoutesTripsResult = RoutesTrips.executeQuery(
                    "SELECT trips.*,train.TrainName FROM trips,train WHERE SourceCity='"+distinctRoutesResult.getString("SourceCity")+"' AND DestinationCity='"+distinctRoutesResult.getString("DestinationCity")+"' AND trips.TrainID=train.TrainID and Status='ALL';");
                while(RoutesTripsResult.next()){
                    Map<String, String> trips = new HashMap<String, String>();
                    trips.put("TripID", String.valueOf(RoutesTripsResult.getInt("TripID")));
                    trips.put("TrainID", RoutesTripsResult.getString("TrainID"));
                    trips.put("SourceCity", RoutesTripsResult.getString("SourceCity"));
                    trips.put("DestinationCity", RoutesTripsResult.getString("DestinationCity"));
                    trips.put("FromTime", RoutesTripsResult.getString("FromTime"));
                    trips.put("ToTime", RoutesTripsResult.getString("ToTime"));
                    trips.put("DateOfStart", RoutesTripsResult.getString("DateOfStart"));
                    trips.put("DateOfEnd", RoutesTripsResult.getString("DateOfEnd"));
                    trips.put("AC1", String.valueOf(RoutesTripsResult.getInt("AC1")));
                    trips.put("AC2", String.valueOf(RoutesTripsResult.getInt("AC2")));
                    trips.put("SL", String.valueOf(RoutesTripsResult.getInt("SL")));
                    trips.put("TrainName", RoutesTripsResult.getString("TrainName"));
                    distinctTripsForDistinctRoutes.add(trips);
                }
                routesTripsArray.add(distinctTripsForDistinctRoutes);
            }
            return "success";
        } catch (Exception e) {
            return "error";
        }
    }


}
