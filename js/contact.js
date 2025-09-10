// Contact Form JavaScript for Sahil Bajaj Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFormAnimations();
    initAutoComplete();
    // initFormPersistence(); // Removed since it's handled in initContactForm
});

// Initialize contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Real-time validation
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => clearFieldError(field));
        field.addEventListener('focus', () => highlightField(field));
    });
    
    // Auto-save form data
    formFields.forEach(field => {
        field.addEventListener('input', () => saveFormData());
    });
    
    // Load saved form data
    loadFormData();
}

// Handle form submission
async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.submit-button');
    const originalButtonText = submitButton.innerHTML;
    
    // Validate form
    if (!validateForm(form)) {
        showFormError('Please correct the errors before submitting.');
        return;
    }
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate API call (replace with actual endpoint)
        const response = await submitFormData(data);
        
        if (response.success) {
            showFormSuccess('Thank you! Your message has been sent successfully.');
            form.reset();
            clearSavedFormData();
            
            // Redirect to thank you page after delay
            setTimeout(() => {
                window.location.href = 'pages/thank-you.html';
            }, 2000);
        } else {
            throw new Error(response.message || 'Submission failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormError('Sorry, there was an error sending your message. Please try again.');
    } finally {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
}

// Simulate form submission (replace with actual API call)
async function submitFormData(data) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success (replace with actual API call)
    return {
        success: true,
        message: 'Form submitted successfully'
    };
    
    // Example of actual API call:
    /*
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    return await response.json();
    */
}

// Enhanced field validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(field)} is required`;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation (international format)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Date validation
    if (field.type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Please select a future date';
        }
    }
    
    // Message length validation
    if (field.name === 'message' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
        if (value.length > 1000) {
            isValid = false;
            errorMessage = 'Message must be less than 1000 characters';
        }
    }
    
    // Name validation
    if (field.name === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
            isValid = false;
            errorMessage = 'Name can only contain letters and spaces';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
        showFieldSuccess(field);
    }
    
    return isValid;
}

// Get field label for error messages
function getFieldLabel(field) {
    const label = field.parentNode.querySelector('label');
    return label ? label.textContent.replace('*', '').trim() : 'This field';
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    field.classList.remove('success');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    field.parentNode.appendChild(errorDiv);
    
    // Add shake animation
    field.classList.add('shake');
    setTimeout(() => field.classList.remove('shake'), 500);
}

// Show field success
function showFieldSuccess(field) {
    field.classList.remove('error');
    field.classList.add('success');
    
    // Remove existing success message
    const existingSuccess = field.parentNode.querySelector('.field-success');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'field-success';
    successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Looks good!';
    field.parentNode.appendChild(successDiv);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
        field.classList.remove('success');
    }, 3000);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error', 'shake');
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Highlight field on focus
function highlightField(field) {
    field.parentNode.classList.add('focused');
    
    field.addEventListener('blur', function() {
        field.parentNode.classList.remove('focused');
    }, { once: true });
}

// Validate entire form
function validateForm(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show form success message
function showFormSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    insertFormMessage(successDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 5000);
}

// Show form error message
function showFormError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    insertFormMessage(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

// Insert form message
function insertFormMessage(messageDiv) {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.submit-button');
    
    // Remove existing messages
    const existingMessages = form.querySelectorAll('.form-success, .form-error');
    existingMessages.forEach(msg => msg.remove());
    
    // Insert before submit button
    submitButton.parentNode.insertBefore(messageDiv, submitButton);
    
    // Add entrance animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 10);
}

// Form animations
function initFormAnimations() {
    const formFields = document.querySelectorAll('.form-group');
    
    // Stagger animation for form fields
    formFields.forEach((field, index) => {
        field.style.opacity = '0';
        field.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            field.style.transition = 'all 0.6s ease';
            field.style.opacity = '1';
            field.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Auto-complete functionality
function initAutoComplete() {
    const eventTypeSelect = document.getElementById('eventType');
    const cityInput = document.getElementById('city');
    
    // Popular cities for auto-complete
    const popularCities = [
        'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
        'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat',
        'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
        'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara'
    ];
    
    if (cityInput) {
        cityInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const suggestions = popularCities.filter(city => 
                city.toLowerCase().includes(value)
            );
            
            showCitySuggestions(suggestions, this);
        });
    }
}

// Show city suggestions
function showCitySuggestions(suggestions, input) {
    // Remove existing suggestions
    const existingSuggestions = document.querySelector('.city-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
    
    if (suggestions.length === 0 || input.value.length < 2) return;
    
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'city-suggestions';
    
    suggestions.slice(0, 5).forEach(city => {
        const suggestion = document.createElement('div');
        suggestion.className = 'suggestion';
        suggestion.textContent = city;
        suggestion.addEventListener('click', () => {
            input.value = city;
            suggestionsDiv.remove();
        });
        suggestionsDiv.appendChild(suggestion);
    });
    
    input.parentNode.appendChild(suggestionsDiv);
}

// Form data persistence
function saveFormData() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Save to localStorage
    localStorage.setItem('sahilContactForm', JSON.stringify(data));
}

// Load saved form data
function loadFormData() {
    const savedData = localStorage.getItem('sahilContactForm');
    if (!savedData) return;
    
    try {
        const data = JSON.parse(savedData);
        const form = document.getElementById('contactForm');
        
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field && data[key]) {
                field.value = data[key];
            }
        });
    } catch (error) {
        console.error('Error loading saved form data:', error);
    }
}

// Clear saved form data
function clearSavedFormData() {
    localStorage.removeItem('sahilContactForm');
}

// Add CSS for form enhancements
const formStyles = `
    .form-group {
        position: relative;
        transition: all 0.3s ease;
    }
    
    .form-group.focused {
        transform: translateY(-2px);
    }
    
    .form-group input.success,
    .form-group textarea.success,
    .form-group select.success {
        border-color: #4CAF50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }
    
    .field-error,
    .field-success {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: slideIn 0.3s ease;
    }
    
    .field-error {
        color: #ff6b6b;
    }
    
    .field-success {
        color: #4CAF50;
    }
    
    .form-error,
    .form-success {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
        font-weight: 500;
    }
    
    .form-error {
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        color: #ff6b6b;
    }
    
    .form-success {
        background: rgba(76, 175, 80, 0.1);
        border: 1px solid rgba(76, 175, 80, 0.3);
        color: #4CAF50;
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    .city-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-tertiary);
        border: 1px solid var(--glass-border);
        border-radius: var(--border-radius);
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
        box-shadow: var(--shadow-md);
    }
    
    .suggestion {
        padding: 0.75rem 1rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    
    .suggestion:hover {
        background: var(--glass-bg);
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .submit-button i {
        margin-right: 0.5rem;
    }
    
    .submit-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none !important;
    }
`;

// Inject form styles
    const contactStyleSheet = document.createElement('style');
    contactStyleSheet.textContent = formStyles;
    document.head.appendChild(contactStyleSheet);

// Handle form field changes for real-time validation
document.addEventListener('input', function(e) {
    if (e.target.closest('#contactForm')) {
        const field = e.target;
        
        // Clear error on input
        if (field.classList.contains('error')) {
            clearFieldError(field);
        }
        
        // Auto-save form data
        saveFormData();
    }
});

// Handle form field blur for validation
document.addEventListener('blur', function(e) {
    if (e.target.closest('#contactForm')) {
        const field = e.target;
        
        // Validate field on blur
        if (field.value.trim()) {
            validateField(field);
        }
    }
}, true);

// Close city suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.city-suggestions') && !e.target.closest('#city')) {
        const suggestions = document.querySelector('.city-suggestions');
        if (suggestions) {
            suggestions.remove();
        }
    }
}); 