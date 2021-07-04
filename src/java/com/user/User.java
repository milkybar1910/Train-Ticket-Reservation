package com.user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import com.db.Connector;

public class User {

    private String name, email, password, role, error;

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    //USER CREATION
    public String execute() throws Exception{
        try {
            Connection con = Connector.initializeDatabase();
            Statement statement = (Statement) con.createStatement();
            String duplicate = null;
            ResultSet rs = statement.executeQuery("SELECT * from user where Email='" + email + "'");
            while (rs.next()) 
                duplicate = rs.getString(1);
            if (duplicate == null) {
                String INSERT_USERS = "INSERT INTO user" + "(UserName, Email, Password,Role) VALUES " + " (?, ?, ?,?);";
                PreparedStatement preparedStatement = con.prepareStatement(INSERT_USERS);
                preparedStatement.setString(1, name);
                preparedStatement.setString(2, email);
                preparedStatement.setString(3, password);
                preparedStatement.setString(4, role);
                preparedStatement.executeUpdate();
            } else 
                error = "EMAIL ALREADY EXISTS";
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    //USER LOGIN
    public String login() throws Exception {
        try {
            Connection con = Connector.initializeDatabase();
            Statement statement = (Statement) con.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * from user where Email='" + email + "'");
            if (rs.next()) {
                ResultSet rs1 = statement
                        .executeQuery("SELECT * from user where Email='" + email + "' AND Password='" + password + "'");
                if (rs1.next()) {
                    name = rs1.getString("UserName");
                    role=rs1.getString("Role");
                    return "success";
                } else {
                    error = "EMAIL AND PASSWORD DOESNOT MATCH";
                    return "error";
                }
            } else {
                error = "EMAIL DOESNOT EXISTS";
                return "error";
            } 
        } catch (Exception e) {
            return "error";
        }
    }
}
