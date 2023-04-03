<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "THE URL TO THE SERVICE");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, POST DATA);
$result = curl_exec($ch);


print_r($result);
curl_close($ch);
?>