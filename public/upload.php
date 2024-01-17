<?php

// echo "<pte>";
// print_r($_POST);
// print_r($_FILES["file"]);


if(!is_query_file()){
  $res_data = [
    "status" => "error",
    "datas"  => [],
    "message" => "no-query",
  ];
  exit();
}
make_file_dir();
$save_data = save_files();
$res_data = [
  "status" => $save_data && count($save_data) ? "success" : "error",
  "datas"  => $save_data,
];

echo json_encode($res_data , JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);


function is_query_file(){
  return isset($_FILES['file']) ? true : false;
}

function save_files(){
  $uuid = uniqid();
  $res_datas = [];
  for($i=0; $i<count($_FILES['file']['name']); $i++){
    $save_file = save_file($uuid , $i , [
      "name"      => $_FILES['file']['name'][$i],
      "full_path" => $_FILES['file']['full_path'][$i],
      "type"      => $_FILES['file']['type'][$i],
      "tmp_name"  => $_FILES['file']['tmp_name'][$i],
      "error"     => $_FILES['file']['error'][$i],
      "size"      => $_FILES['file']['size'][$i],
    ]);
    array_push($res_datas , [
      "base" => $_FILES['file']['name'][$i],
      "size" => $_FILES['file']['size'][$i],
      "path" => $save_file,
    ]);
  }
  return $res_datas;
}

function get_file_dir(){
  return "data/files/".date("Ymd")."/";
}

function make_file_dir(){
  $dir = get_file_dir();
  if(is_dir($dir)){return;}
  mkdir($dir , 0777 , true);
}

function get_ext($filename=null){
  $sp = explode(".", $filename);
  return implode(".", array_slice($sp , -1));
}

function save_file($uuid=null, $num=null, $file=[]){
  $ext = get_ext($file["name"]);
  $new_file = $uuid ."_". $num.".".$ext;
  $new_path = get_file_dir().$new_file;
  move_uploaded_file($file["tmp_name"], $new_path);
  return $new_path;
}


