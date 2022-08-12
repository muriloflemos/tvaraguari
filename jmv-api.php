<?php

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://ondemand-api.jmvtechnology.com/galleries/gktxJy5WSUjliGbKJz0xsb9HybNHVm",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_POSTFIELDS => "",
    CURLOPT_HTTPHEADER => array(
        "authorization: 24c5d811863edaa273e72afeef1e18f7",
        "jmvkey: 11umov0"
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
?>