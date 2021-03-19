<?php
require_once("../../common.php");

$msg='';$data=array();
// check if the form is submitted or not.
if (is_array($_POST) && (count($_POST) > 0)){
	
	$url = "https://www.google.com/recaptcha/api/siteverify";
	$data = ['secret' => RCV3_SECRET,'response' => $_POST['token']];

	$options = array(
		'http' => array('header'=>"Content-type: application/x-www-form-urlencoded\r\n",'method'=>'POST','content'=>http_build_query($data))
	);

	$context  = stream_context_create($options);
	$response = file_get_contents($url, false, $context);
	$res = json_decode($response, true);
	
	if($res['success'] == true){
		$from='service@zamenhof.net';
		$to='service@zamenhof.net';
		$subject='New school request';
		$body='Email : '.$_POST['email'];
		$attachment=array();
		sl_mail($subject,$to,$from,$body,$attachment);
		$ret=array(
		'str'=>utf8_encode('Thank you for your interest. We will contact you soon!'),
		'success'=>1
		);
	}	else {
		$ret=array(
		'str'=>utf8_encode('Captcha is not validated'),
		'success'=>0
		);
	}
	echo json_encode($ret);
}	


?>