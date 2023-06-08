<?php

function getRandomString() {
    $length = rand(3,12);
    $characters = 'abcdefghijklmnopqrstuvwxyz';
    $randomString = '';

    for ($i=0; $i < $length; $i++) {
        $index = rand(0, strlen($characters) - 1);
        $randomString .= $characters[$index];
    }

    return ucfirst($randomString);
}

function getScores() {
    $rv = [];
    $tot = rand(25, 250);
    for ($i=0; $i<$tot; $i++) {
        $score = rand  (10,255);
        $rv[] = $score;
    }
    return $rv;
}

$tot = [];
for ($i=0; $i<rand(100, 400); $i++) {
    $name = getRandomString() . " " . getRandomString();
    $tot[] = [ "name" => $name, "scores" => getScores() ];
}

try {
    $hash_check = password_hash('OpDeTank', null);
    if ($_POST['username']=='Henk' && password_verify($_POST['password'], $hash_check)) {
        header("Content-Type:Application/json");
        print json_encode($tot);
    } else {
       header ('HTTP/1.0 401 Unauthorized');
    }
} catch (Exception $e) {
   header ('HTTP/1.0 400 Illegal Request');
}

