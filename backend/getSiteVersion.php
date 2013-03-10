<?php
$url = $_GET['url'];
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);

preg_match( '/meta\s*name="generator"\s*content="([^"\']*)"/'
			,$output, $version);

echo $version[1];
