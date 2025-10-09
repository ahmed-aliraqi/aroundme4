<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during authentication for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'failed' => 'These credentials do not match our records.',
    'password' => 'The provided password is incorrect.',
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
    'logout' => 'Log Out',

    'register' => [
        'page_title' => 'Register',
        'title' => 'Adventure starts here 🚀',
        'subtitle' => 'Make your app management easy and fun!',
        'have_account' => 'Already have an account?',
        'actions' => [
            'submit' => 'Sign up',
            'login' => 'Sign in instead',
        ],
        'attributes' => [
            'name' => 'Name',
            'email' => 'Email',
            'phone' => 'Phone Number',
            'password' => 'Password',
            'password_confirmation' => 'Confirm Password',
            'remember' => 'Remember me',
        ],
    ],
    'login' => [
        'page_title' => 'Login',
        'title' => 'Welcome to :app 👋',
        'subtitle' => 'Please sign-in to your account and start the adventure',
        'actions' => [
            'submit' => 'Sign in',
            'forget' => 'Forget Password',
            'register' => 'Sign up',
        ],
        'attributes' => [
            'email' => 'Email',
            'password' => 'Password',
            'remember' => 'Remember me',
        ],
    ],
    'forget_password' => [
        'page_title' => 'Forgot Password',
        'title' => 'Forgot Password? 🔒',
        'subtitle' => 'Enter your email and we\'ll send you instructions to reset your password',
        'actions' => [
            'submit' => 'Send Reset Link',
            'login' => 'Back to login',
        ],
        'attributes' => [
            'email' => 'Email',
        ],
    ],
    'reset_password' => [
        'page_title' => 'Reset Password',
        'title' => 'Reset Password 🔒',
        'for' => 'for',
        'actions' => [
            'submit' => 'Set new password',
            'login' => 'Back to login',
        ],
        'notifications' => [
            'otp' => 'Your OTP for :app reset password is: :code expires at :expireAt',
        ],
        'attributes' => [
            'email' => 'Email',
            'password' => 'New Password',
            'password_confirmation' => 'Confirm Password',
        ],
    ],
    'verify_email' => [
        'page_title' => 'Verify Email',
        'title' => 'Verify your email ✉️',
        'subtitle' => 'Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.',
        'messages' => [
            'sent' => 'A new verification link has been sent to the email address you provided during registration.',
        ],
        'actions' => [
            'send' => 'Resend verification link',
        ],
    ],
    'confirm_password' => [
        'page_title' => 'Confirm Password',
        'title' => 'Confirm Password 🔒',
        'subtitle' => 'This is a secure area of the application. Please confirm your password before continuing.',
        'actions' => [
            'submit' => 'Confirm',
        ],
    ],
    'verify' => [
        'title' => 'Verify phone number 💬',
        'sub-title' => 'We sent a verification code to your mobile. Enter the code from the mobile in the field below.',
        'attributes' => [
            'otp' => 'Type your 4 digit security code',
            'submit' => 'Verify my account',
        ],
        'actions' => [
            'resend-note' => 'Didn\'t get the code?',
            'resend' => 'Resend',
            'logout-note' => 'or sign in with another account',
            'logout' => 'Logout',
        ],
        'messages' => [
            'already-verified' => 'Your phone number is already verified.',
            'sent' => 'We sent a verification code to your mobile',
            'resent' => 'The OTP has been resent successfully.',
        ],
        'notifications' => [
            'otp' => 'Your OTP for :app registration is: :code expires at :expireAt',
        ],
        'validation' => [
            'otp' => [
                'exists' => 'Invalid OTP',
                'rate-limit' => 'You may try again in :seconds seconds.',
            ],
        ],
    ],
];
