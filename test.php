<?php
	/*	Lade Zugangsdaten:
		$MySQLDB 
		$MySQLHost 
		$MySQLUsername 
		$MySQLPassword
	*/
	include ('mysql-connect.php');
	
	// Variabeln
	$strSQL="SELECT * FROM rssfeeds";
	
	// Connect to Database
	define('HOST',$MySQLHost);
	define('USER',$MySQLUsername);
	define('PASS',$MySQLPassword);
	define('DB',$MySQLDB);
	$con = mysqli_connect(HOST,USER,PASS,DB) or die('Unable to Connect');
	
	// Set Charset to UTF8
	mysqli_set_charset($con, "utf8");
	
	// Read Data
	$query = mysqli_query($con,$strSQL);
    while($row = $query->fetch_assoc()){
        $output[]=$row;
	}
	
	// Json Output
    print(json_encode($output,JSON_UNESCAPED_UNICODE));
    mysqli_close($con);
?>