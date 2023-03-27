<?php

header("Content-Type: application/json");

$person = array(
    'name' => 'John Doe',
    'age' => 30,
    'email' => 'john.doe@example.com'
);

$json = json_encode($person);

echo $json;
?>