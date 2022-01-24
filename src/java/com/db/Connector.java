
package com.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Connector {
    public static Connection initializeDatabase()
		throws SQLException, ClassNotFoundException
	{
            System.out.print("CAME");
		String dbDriver = "com.mysql.cj.jdbc.Driver";
		String dbURL = "jdbc:mysql://localhost:3306/trainreservation?zeroDateTimeBehavior=CONVERT_TO_NULL ";
		String dbUsername = "root";
		String dbPassword = "root";
		Class.forName(dbDriver);
		Connection con = DriverManager.getConnection(dbURL ,dbUsername,dbPassword);
		return con;
	}
}
