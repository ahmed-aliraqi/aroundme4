<?php

return [
    'title' => 'الإعدادات',
    'note' => [
        'mail' => [
            'title' => 'ملاحظة',
            'body' => 'تستخدم هذه البيانات فقط لإعدادات SMTP.',
        ],
    ],
    'tabs' => [
        'main' => 'الإعدادات الرئيسية',
        'mail' => 'إعدادات البريد',
        'sms' => 'إعدادات الرسائل القصيرة',
    ],
    'actions' => [
        'save' => 'حفظ',
        'logo' => [
            'upload' => 'رفع الشعار',
            'reset' => 'إعادة تعيين',
        ],
        'favicon' => [
            'upload' => 'رفع أيقونة الموقع',
            'reset' => 'إعادة تعيين',
        ],
    ],
    'messages' => [
        'updated' => 'تم تحديث إعدادات التطبيق بنجاح.',
    ],
    'attributes' => [
        'APP_NAME' => 'اسم التطبيق',
        '%APP_NAME%' => 'اسم التطبيق',
        'APP_COPYRIGHT' => 'حقوق النشر',
        '%APP_COPYRIGHT%' => 'حقوق النشر',
        'APP_LOCALE' => 'لغة التطبيق',
        'LOGO' => 'الشعار',
        'FAVICON' => 'أيقونة الموقع',
        'MAIL_HOST' => 'المضيف',
        'MAIL_PORT' => 'المنفذ',
        'MAIL_USERNAME' => 'اسم المستخدم',
        'MAIL_PASSWORD' => 'كلمة المرور',
        'MAIL_FROM_NAME' => 'اسم المرسل',
        'MAIL_FROM_ADDRESS' => 'عنوان المرسل',
        'SMS_ENABLED' => 'تفعيل خدمة الرسائل القصيرة',
        'SMS_ENDPOINT' => 'رابط الخدمة',
        'SMS_API_KEY' => 'مفتاح API',
    ],
    'notes' => [
        'LOGO' => 'الشعار الرئيسي لموقعك (يفضل بصيغة PNG)',
        'FAVICON' => 'أيقونة الموقع في المتصفح (32×32px)',
        'MAIL_PORT' => 'أدخل رقم منفذ SMTP صالح بين (1 - 65535)',
    ],
];
