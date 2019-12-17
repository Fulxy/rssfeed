<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "rssfeed";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get fields & Insert to db
if(isset($_POST["name"]))  
{  
    // Form-Field
    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $category = mysqli_real_escape_string($conn, $_POST["category"]);
    $bgColor = mysqli_real_escape_string($conn, $_POST["bgColor"]);
    $rssLink = mysqli_real_escape_string($conn, $_POST["rssLink"]);
    $favorit = mysqli_real_escape_string($conn, $_POST["favoritCheck"]);

    
    $query = "INSERT INTO `rssfeeds` (`id`, `name`, `category`, `backgroundcolor`, `rsslink`, `favorit`, `description`) 
    VALUES (NULL, '$name', '$category', '$bgColor', '$rssLink', '$favorit', '$name')";  
    
    if(mysqli_query($conn, $query))  
    {  
        echo '<p>Erfolgreich</p>'; 
    }  
}  
 
$conn->close();
?>