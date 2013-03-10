<?php
$url = "wordpress.org";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);


preg_match( '/class="button\s*download-button"\s*href="\/download\/"\s*>Download&nbsp;WordPress&nbsp;([[:digit:].]*)/'
			,$output, $version);

echo $version[1];
