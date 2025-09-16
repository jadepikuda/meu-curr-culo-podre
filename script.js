// Form handling and validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('culinary-form');
    const successMessage = document.getElementById('success-message');
    
    // Character counters for textareas
    const textareas = document.querySelectorAll('textarea[maxlength]');
    textareas.forEach(textarea => {
        const maxLength = parseInt(textarea.getAttribute('maxlength'));
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        textarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const currentLength = textarea.value.length;
            counter.textContent = `${currentLength}/${maxLength} caracteres`;
            
            if (currentLength > maxLength * 0.9) {
                counter.className = 'char-counter danger';
            } else if (currentLength > maxLength * 0.8) {
                counter.className = 'char-counter warning';
            } else {
                counter.className = 'char-counter';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial count
    });
    
    // Form validation
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#27ae60';
            }
        });
        
        // Custom validation for price
        const price = document.getElementById('price');
        if (price.value && (parseFloat(price.value) < 0 || parseFloat(price.value) > 10000)) {
            price.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        // Custom validation for prep time
        const prepTime = document.getElementById('prep-time');
        if (prepTime.value && (parseInt(prepTime.value) < 1 || parseInt(prepTime.value) > 9999)) {
            prepTime.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else if (this.value.trim()) {
                this.style.borderColor = '#27ae60';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                this.style.borderColor = '#e0e0e0';
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            return;
        }
        
        // Collect form data
        const formData = new FormData(form);
        const data = {};
        
        // Handle regular inputs
        for (let [key, value] of formData.entries()) {
            if (key !== 'features') {
                data[key] = value;
            }
        }
        
        // Handle checkboxes (features)
        const features = [];
        const featureCheckboxes = form.querySelectorAll('input[name="features"]:checked');
        featureCheckboxes.forEach(checkbox => {
            features.push(checkbox.value);
        });
        data.features = features;
        
        // Log the collected data (in a real application, you would send this to a server)
        console.log('Dados do produto coletados:', data);
        
        // Show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Reset form after 5 seconds and hide success message
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
            
            // Reset all field borders
            inputs.forEach(input => {
                input.style.borderColor = '#e0e0e0';
            });
            
            // Reset character counters
            textareas.forEach(textarea => {
                const counter = textarea.parentNode.querySelector('.char-counter');
                if (counter) {
                    counter.textContent = `0/${textarea.getAttribute('maxlength')} caracteres`;
                    counter.className = 'char-counter';
                }
            });
            
            // Scroll back to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 5000);
    });
    
    // Form reset handler
    form.addEventListener('reset', function() {
        setTimeout(() => {
            inputs.forEach(input => {
                input.style.borderColor = '#e0e0e0';
            });
            
            // Reset character counters
            textareas.forEach(textarea => {
                const counter = textarea.parentNode.querySelector('.char-counter');
                if (counter) {
                    counter.textContent = `0/${textarea.getAttribute('maxlength')} caracteres`;
                    counter.className = 'char-counter';
                }
            });
        }, 100);
    });
    
    // Add smooth scrolling for form sections
    const formSections = document.querySelectorAll('.form-section h2');
    formSections.forEach(section => {
        section.style.cursor = 'pointer';
        section.addEventListener('click', function() {
            this.parentElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Price formatting
    const priceInput = document.getElementById('price');
    priceInput.addEventListener('input', function() {
        let value = this.value;
        if (value && !isNaN(value)) {
            this.value = parseFloat(value).toFixed(2);
        }
    });
    
    // Auto-resize textareas
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
});