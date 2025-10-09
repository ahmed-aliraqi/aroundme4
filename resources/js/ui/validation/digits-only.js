if (typeof document !== 'undefined') {
    // Wait for the DOM to be fully loaded before attaching event listeners
    document.addEventListener('DOMContentLoaded', () => {
        /**
         * Select all elements with class 'digits-only'.
         *
         * Basic numeric input:
         * <input type="text" class="digits-only">
         *
         *  Numeric input with max value of 100:
         * <input type="text" class="digits-only" data-max="100">
         */
        document.querySelectorAll('.digits-only').forEach((el) => {
            // Add input event listener to each element to handle real-time validation
            el.addEventListener('input', function () {
                // Store current cursor position before making changes
                let pos = this.selectionStart;
                // Get the current input value
                let val = this.value;
                // Remove all non-numeric characters using regex
                let newVal = val.replace(/[^0-9]/g, '');

                // Check if element has a max value constraint (data-max attribute)
                if (this.dataset.max) {
                    // If the value is not empty and exceeds the max value
                    if (newVal !== '' && Number(newVal) > this.dataset.max) {
                        // Remove the last digit to keep the value within limits
                        newVal = newVal.slice(0, -1);
                    }
                }

                // Calculate the difference in length between old and new value
                // This is used to adjust the cursor position
                let diff = val.length - newVal.length;
                // Update the input value with the cleaned numeric value
                this.value = newVal;
                // Restore cursor position, adjusting for any removed characters
                this.setSelectionRange(pos - diff, pos - diff);
            });
        });
    });
}

