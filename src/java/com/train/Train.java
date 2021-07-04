package com.train;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import com.db.Connector;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Train {
    private String trainName, trainID, error;
    private int AC1, AC2, SL;
    private HashMap<String, String> trainInfo = new HashMap<String, String>(); 
    private ArrayList<Map<String,String>> adminTrainDetails = new ArrayList<Map<String,String>>();

    public ArrayList<Map<String, String>> getAdminTrainDetails() {
        return adminTrainDetails;
    }

    public void setAdminTrainDetails(ArrayList<Map<String, String>> adminTrainDetails) {
        this.adminTrainDetails = adminTrainDetails;
    }

    public HashMap<String, String> getTrainInfo() {
        return trainInfo;
    }

    public void setTrainInfo(HashMap<String, String> trainInfo) {
        this.trainInfo = trainInfo;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getTrainName() {
        return trainName;
    }

    public void setTrainName(String trainName) {
        this.trainName = trainName;
    }

    public String getTrainID() {
        return trainID;
    }

    public void setTrainID(String trainID) {
        this.trainID = trainID;
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

    // CREATE TRAIN
    public String execute() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            Statement statement = (Statement) con.createStatement();
            String duplicate = null;
            ResultSet rs = statement.executeQuery("SELECT * from train where TrainID='" + trainID + "'");
            while (rs.next())
                duplicate = rs.getString(1);
            if (duplicate == null) {
                String INSERT_TRAIN = "INSERT INTO train" + "(TrainName, TrainID, SL,AC1,AC2) VALUES "
                        + " (?,?,?,?,?);";
                PreparedStatement preparedStatement = con.prepareStatement(INSERT_TRAIN);
                preparedStatement.setString(1, trainName);
                preparedStatement.setString(2, trainID);
                preparedStatement.setInt(3, SL);
                preparedStatement.setInt(4, AC1);
                preparedStatement.setInt(5, AC2);
                preparedStatement.executeUpdate();
            } else {
                error = "TRAIN ID ALREADY EXISTS";
            }
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    //GET TRAIN DETAILS FOR TRIP SECTION IN ADMIN SIDE
    public String TrainDetailsAdminHome() throws Exception {
        try {
            System.out.println("CAME to getTrainDetails");
            Connection con = Connector.initializeDatabase();
            Statement statement = (Statement) con.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * from train");
            trainInfo.clear();
            while (rs.next())
                trainInfo.put(rs.getString("TrainID"), rs.getString("TrainName"));
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    //GET ALL TRAIN FOR ADMIN
    public String TrainsAdminDetails() throws Exception{
        try {
            System.out.println("CAME to TrainsAdminDetails");
            Connection con = Connector.initializeDatabase();
            Statement statementAllTrain = (Statement) con.createStatement();
            ResultSet AllTrainResult = statementAllTrain.executeQuery("SELECT * from train");
            adminTrainDetails.clear();
            while (AllTrainResult.next()){
                Map<String,String> trainObject = new HashMap<String,String>();
                trainObject.put("TrainName", AllTrainResult.getString("TrainName"));
                trainObject.put("TrainID", AllTrainResult.getString("TrainID"));
                trainObject.put("AC1", AllTrainResult.getString("AC1"));
                trainObject.put("AC2", AllTrainResult.getString("AC2"));
                trainObject.put("SL", AllTrainResult.getString("SL"));
                adminTrainDetails.add(trainObject);
            }
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
    
}
