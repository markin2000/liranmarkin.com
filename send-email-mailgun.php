<?php
# Include the Autoloader (see "Libraries" for install instructions)
require 'Mailgun/vendor/autoload.php';
use Mailgun\Mailgun;

include 'mailgun-settings.php';

$name = strip_tags(trim($_POST["name"]));
$name = str_replace(array("\r","\n"),array(" "," "),$name);
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$subject = strip_tags(trim($_POST["subject"]));
$message = trim($_POST["message"]);

// Only process POST reqeusts.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Check that data was sent.
    if ( empty($name) OR empty($message) OR empty($subject) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        echo "Oops! There was a problem with your submission. Please complete the form and try again.";
        exit;
    }

    # Instantiate the client.
    $mgClient = new Mailgun($mailgunKey);
    $domain = $mailgunDomain;

    # Make the call to the client.
    $result = $mgClient->sendMessage("$domain",
                      array('from'    => "Website <postmaster@$mailgunDomain>",
                            'to'      => $yourEmail,
                            'subject' => $subject,
                            'text'    => $message));

    $httpResponseCode = $result->http_response_code;

    if($httpResponseCode==200){
        echo "Thank You! Your message has been sent.";
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}

?>