import $ from '@/plugins/jquery';

// Import Select2 and explicitly attach it to jQuery
import select2Factory from 'select2';

// Initialize Select2 with the global jQuery instance
if (typeof select2Factory === 'function') {
    select2Factory(window.$);
}

// Import CSS
import 'select2/dist/css/select2.min.css';
// Import Bootstrap 5 theme for Select2
import 'select2-bootstrap-5-theme/dist/select2-bootstrap-5-theme.min.css';

// Export for use in components
export default $;

