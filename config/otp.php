<?php

return [
    /**
     * We will generate a fixed OTP for these phone numbers instead of being sent via SMS.
     *
     * Fixed OTP will be "1234"
     */
    'test_phones' => array_filter(explode(',', env('OTP_TEST_PHONES', ''))),
];
