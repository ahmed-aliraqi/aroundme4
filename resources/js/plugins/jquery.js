import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
    },
});

export default $;
