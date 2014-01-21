<?php
$definition = $_POST['definition'];
$url = 'http://api.datasift.com/stream';
$username = 'eddyedwards';
$apiKey = '43e55fdc649b51c0709d4ac7c30f548c';
$hash = '7a971db7b26e4c4b30709091d5b74a11';
$fieldsString = '';


// if we don't have a definition return a 404
/*
if (empty($_POST)) {
	header("HTTP/1.0 404 Not Found", false, 404);
	exit;
}
*/

$fields = array(
	'username' 	=> $username,
	'api_key'	=> $apiKey,
	'hash' => $hash
);

// url-ify the data for the POST
foreach($fields as $key=>$value) { 
	$fieldsString .= $key.'='.$value.'&'; 
}
rtrim($fieldsString, '&');


// open connection
$ch = curl_init();

// set the url, number of POST vars, POST data
curl_setopt($ch,CURLOPT_URL, $url);
curl_setopt($ch,CURLOPT_POST, count($fields));
curl_setopt($ch,CURLOPT_POSTFIELDS, $fieldsString);

// execute post
$result = curl_exec($ch);

// close connection
curl_close($ch);


?>
