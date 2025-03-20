using System;
using System.Data.SqlClient;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Enter username:");
        string username = Console.ReadLine();
        
        AWS_ACCESS_KEY_ID="AKIAZBQE345LKPTEAHQD"
        AWS_SECRET_ACCESS_KEY="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"

        string connectionString = "Server=myServer;Database=myDB;User Id=myUsername;Password=myPassword;";
        string query = $"SELECT * FROM Users WHERE Username = '{username}'"; // Vulnerable to SQL Injection

        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            SqlCommand command = new SqlCommand(query, connection);
            connection.Open();
            var reader = command.ExecuteReader();
            while (reader.Read())
            {
                Console.WriteLine(reader["Name"]);
            }
        }
    }
}
