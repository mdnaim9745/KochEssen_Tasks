<?php
	function saveUrl($url) {
		$postData = array(
			'url' 			=> $url,
			'capture_all' 	=> 'on',
		);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://web.archive.org/save/$url");
		curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/x-www-form-urlencoded',
            )
        );
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
		curl_setopt($ch, CURLOPT_TIMEOUT, 20);
		// Ignore response
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);

		// Submit the request
		curl_exec($ch);

		// Close connection
		curl_close($ch);
	}

	function getUrls($url) {
		$urls = reset(json_decode(json_encode(simplexml_load_file($url)), true));
		echo json_encode($urls);
		
	}

	// Capture the request
	if (isset($_POST['url'])) {
		getUrls($_POST['url']);
	}

	// Save url
	if (isset($_GET['url']) && gettype($_GET['url']) === 'string') {
		saveUrl($_POST['url']);
	}
?>
