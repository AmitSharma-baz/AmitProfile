<?php
/**
 * Contact Form Handler for Amit Sharma BJP Profile Website
 * 
 * This PHP script handles contact form submissions securely
 * with validation, spam protection, and email notifications.
 */

// Configuration
$config = [
    'recipient_email' => 'amit.sharma.bjp@gmail.com', // Change to actual email
    'subject_prefix' => '[Website Contact] ',
    'success_redirect' => 'index.html#contact',
    'error_redirect' => 'index.html#contact',
    'enable_email_notification' => true,
    'enable_auto_reply' => true,
    'max_message_length' => 1000,
    'allowed_origins' => ['yourdomain.com', 'localhost'] // Add your domain
];

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// CORS handling
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = false;
foreach ($config['allowed_origins'] as $allowed_origin) {
    if (strpos($origin, $allowed_origin) !== false) {
        $allowed = true;
        break;
    }
}

if ($allowed) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Rate limiting (simple implementation)
session_start();
$current_time = time();
$last_submission = $_SESSION['last_contact_submission'] ?? 0;
$min_interval = 60; // 1 minute between submissions

if ($current_time - $last_submission < $min_interval) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Please wait before submitting another message']);
    exit();
}

// Get and sanitize input data
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
} elseif (strlen($name) < 2 || strlen($name) > 50) {
    $errors[] = 'Name must be between 2 and 50 characters';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address';
}

if (empty($subject)) {
    $errors[] = 'Subject is required';
} elseif (strlen($subject) < 5 || strlen($subject) > 100) {
    $errors[] = 'Subject must be between 5 and 100 characters';
}

if (empty($message)) {
    $errors[] = 'Message is required';
} elseif (strlen($message) < 10) {
    $errors[] = 'Message must be at least 10 characters long';
} elseif (strlen($message) > $config['max_message_length']) {
    $errors[] = "Message must not exceed {$config['max_message_length']} characters";
}

// Basic spam detection
$spam_keywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here', 'free money'];
$message_lower = strtolower($message . ' ' . $subject);
foreach ($spam_keywords as $keyword) {
    if (strpos($message_lower, $keyword) !== false) {
        $errors[] = 'Message appears to be spam';
        break;
    }
}

// Check for suspicious patterns
if (preg_match('/https?:\/\//', $message) && substr_count($message, 'http') > 2) {
    $errors[] = 'Too many links in message';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit();
}

// Sanitize data for email
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Prepare email content
$email_subject = $config['subject_prefix'] . $subject;
$email_body = "
New contact form submission from BJP Profile Website

Name: $name
Email: $email
Subject: $subject

Message:
$message

---
Submitted on: " . date('Y-m-d H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
User Agent: " . $_SERVER['HTTP_USER_AGENT'] . "
";

// Email headers
$headers = [
    'From: noreply@' . $_SERVER['HTTP_HOST'],
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8',
    'X-Priority: 3'
];

$success = false;

// Send email notification
if ($config['enable_email_notification']) {
    $success = mail($config['recipient_email'], $email_subject, $email_body, implode("\r\n", $headers));
}

// Send auto-reply
if ($success && $config['enable_auto_reply']) {
    $auto_reply_subject = "Thank you for contacting Amit Sharma - BJP Ward 30";
    $auto_reply_body = "
Dear $name,

Thank you for reaching out through my website. I have received your message and will respond as soon as possible.

Your message:
Subject: $subject
Message: $message

I am committed to serving the people of Ward 30, Surat Mahanagar, and your input is valuable to me.

Best regards,
Amit Sharma
BJP Yuva Mahamantri
Ward 30 - Surat Mahanagar

---
This is an automated response. Please do not reply to this email.
For urgent matters, please call: +91 98765 43210
";

    $auto_reply_headers = [
        'From: Amit Sharma <amit.sharma.bjp@gmail.com>',
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];

    mail($email, $auto_reply_subject, $auto_reply_body, implode("\r\n", $auto_reply_headers));
}

// Update session to prevent spam
$_SESSION['last_contact_submission'] = $current_time;

// Log the submission (optional)
$log_entry = date('Y-m-d H:i:s') . " - Contact form submission from: $name ($email) - Subject: $subject\n";
file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);

// Return response
if ($success) {
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you for your message! I will get back to you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error sending your message. Please try again or contact directly.'
    ]);
}
?>