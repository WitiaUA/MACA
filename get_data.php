<?php
header('Content-Type: application/json');

// Тимчасове значення (повинно братися з бази даних)
$value = 30;

echo json_encode(["value" => $value]);
?>
