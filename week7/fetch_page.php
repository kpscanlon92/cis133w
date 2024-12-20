<?php
  $url = isset($_GET['url']) ? $_GET['url'] : "https://eloquentjavascript.net";
  $contents = base64_encode(mb_convert_encoding(file_get_contents($url), 'HTML-ENTITIES', "UTF-8"));
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Fetch Page</title>
  <link rel="stylesheet" href="fetch_page.css">
  <script src="fetch_page.js"></script>
  <script>
      let BASE = "<?php echo $url; ?>";
      let PAGE = "<?php echo $contents; ?>";
  </script>
 </head>
 <body>
   <div id="searchBox">Type a URL here: <input type="text" id="urlBox"> <span id="goButton">GO</span></input></div>
   <div id="tocContainer">
       <div id="toc"></div>
   </div>
   <div id="contents"></div>
 </body>
 </html>