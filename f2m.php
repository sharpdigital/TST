<?php

$to = 'info@tourismschooltoledo.com';
$toName = 'Tourism School Toledo';
$debug = false;
$debugTo = 'csikosjanos@gmail.com';
$debugName = 'Janos Csikos';

$success = false;
$subject = 'Message form the website';
$fromEmail = 'info@tourismschooltoledo.com';
$fromName = 'Website form';

// No need to edit below this line
if($to && !empty($_POST)) {

	$msg = '';
	foreach ($_POST as $field => $val) {
		$fld = strtoupper($field);
		$msg .= $fld . ":<br>" . htmlentities($val, ENT_QUOTES, "UTF-8") . "<br><br>\n";
	}
	date_default_timezone_set('Etc/UTC');

	require './libs/PHPMailer/PHPMailerAutoload.php';
	$mail = new PHPMailer;
	$mail->isSMTP();
	//Enable SMTP debugging
	// 0 = off (for production use)
	// 1 = client messages
	// 2 = client and server messages
	$mail->SMTPDebug = 0;
	//Ask for HTML-friendly debug output
	$mail->Debugoutput = 'html';
	$mail->Host = "smtp.zoho.com";
	$mail->Port = 465;
	$mail->SMTPSecure = 'ssl';
	$mail->SMTPAuth = true;
	$mail->Username = "info@tourismschooltoledo.com";
	$mail->Password = "Villaseca234";
	$mail->setFrom($fromEmail, $fromName);
	if ($debug) {
		$mail->addAddress($debugTo, $debugName);
	} else {
		$mail->addAddress($to, $toName);	
	}
	$mail->Subject = $subject;
	$mail->msgHTML($msg);

	$success = $mail->send();
	// var_dump($success);
	// echo $mail->ErrorInfo;
}

echo $success ? 'ok' : 'error';
