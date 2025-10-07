// User Management System - Client Side Validation & Interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('User Management System initialized');
    
    // Initialize all functionality
    initFormValidation();
    initDeleteConfirmations();
    initPasswordStrength();
    initSearchFunctionality();
});

// Form Validation System
function initFormValidation() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            if (!validateRegistrationForm()) {
                e.preventDefault();
            }
        });
        
        // Real-time validation on input
        const inputs = registrationForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
}

function validateRegistrationForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    let isValid = true;
    
    if (!validateField(name)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(password)) isValid = false;
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous validation
    clearFieldValidation(field);
    
    switch(field.name) {
        case 'name':
            if (!value) {
                errorMessage = 'Name is required';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters long';
                isValid = false;
            }
            break;
            
        case 'email':
            if (!value) {
                errorMessage = 'Email address is required';
                isValid = false;
            } else if (!isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'password':
            if (!value) {
                errorMessage = 'Password is required';
                isValid = false;
            } else if (value.length < 6) {
                errorMessage = 'Password must be at least 6 characters long';
                isValid = false;
            }
            break;
    }
    
    // Apply validation styling
    if (!isValid) {
        field.classList.add('is-invalid');
        showFieldError(field, errorMessage);
    } else {
        field.classList.add('is-valid');
    }
    
    return isValid;
}

function clearFieldValidation(field) {
    field.classList.remove('is-valid', 'is-invalid');
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback d-block';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Password Strength Indicator
function initPasswordStrength() {
    const passwordField = document.getElementById('password');
    
    if (passwordField) {
        passwordField.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
}

function updatePasswordStrength(password) {
    const strengthText = document.getElementById('strengthText');
    const progressBar = document.getElementById('passwordProgress');
    
    if (!strengthText || !progressBar) return;
    
    let strength = 0;
    let feedback = 'Weak';
    let color = 'bg-danger';
    
    if (!password) {
        strengthText.textContent = 'Weak';
        progressBar.style.width = '30%';
        progressBar.className = 'progress-bar bg-danger';
        return;
    }
    
    // Length check
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    // Determine strength level
    if (strength < 40) {
        feedback = 'Weak';
        color = 'bg-danger';
    } else if (strength < 70) {
        feedback = 'Fair';
        color = 'bg-warning';
    } else if (strength < 90) {
        feedback = 'Good';
        color = 'bg-info';
    } else {
        feedback = 'Strong';
        color = 'bg-success';
    }
    
    strengthText.textContent = feedback;
    strengthText.className = `strength-text ${color.replace('bg-', 'text-')}`;
    progressBar.style.width = strength + '%';
    progressBar.className = `progress-bar ${color}`;
}

// Delete Confirmation System
function initDeleteConfirmations() {
    const deleteButtons = document.querySelectorAll('a[href*="/user/delete/"]');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
                e.preventDefault();
            }
        });
    });
}

// Search Functionality for Users Page
function initSearchFunctionality() {
    const usersTable = document.querySelector('table');
    
    if (usersTable) {
        // Add search input
        const searchHTML = `
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="fas fa-search"></i>
                        </span>
                        <input type="text" class="form-control" id="userSearch" placeholder="Search users by name or email...">
                        <button class="btn btn-outline-secondary" type="button" id="clearSearch">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-6 text-md-end">
                    <small class="text-muted" id="searchResults"></small>
                </div>
            </div>
        `;
        
        usersTable.parentNode.insertAdjacentHTML('beforebegin', searchHTML);
        
        // Search functionality
        const searchInput = document.getElementById('userSearch');
        const clearSearch = document.getElementById('clearSearch');
        const searchResults = document.getElementById('searchResults');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = usersTable.querySelectorAll('tbody tr');
            let visibleCount = 0;
            
            rows.forEach(row => {
                const rowText = row.textContent.toLowerCase();
                const isVisible = rowText.includes(searchTerm);
                row.style.display = isVisible ? '' : 'none';
                if (isVisible) visibleCount++;
            });
            
            // Update results counter
            const totalUsers = rows.length;
            searchResults.textContent = searchTerm ? 
                `Showing ${visibleCount} of ${totalUsers} users` : 
                `${totalUsers} total users`;
        });
        
        clearSearch.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.focus();
        });
    }
}

// Utility Functions
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Simple alert system
function showAlert(message, type = 'info') {
    alert(message); // Simple alert for now
}