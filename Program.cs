using System;
using System.Data.SqlClient;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Enter username:");
        string username = Console.ReadLine();

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
