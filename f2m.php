<?php

$to = 'janos@csikos.co.uk'; // Replace with your email address

$success = false;

// No need to edit below this line
if($to && !empty($_POST)) {

	$msg = "";
	foreach ($_POST as $field => $val) {
		$fld = strtoupper($field);
		$msg .= $fld . ":<br>" . htmlentities($val, ENT_QUOTES, "UTF-8") . "<br><br>\n";
	}
	
	$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
	$headers .= "From: Website form <noreply@tourismschooltoledo.com>\r\n";
	
	$msg = utf8_decode($msg);
	
	$success = mail($to, $subject, $msg, $headers);
	
	
}

echo $success ? 'ok' : 'error';

?>