// Package state management
let currentPackage = {
    name: '',
    type: '',
    status: '',
    validityPeriods: []
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSavedPackages();
    setupFormListeners();
});

// Load saved packages
async function loadSavedPackages() {
    try {
        const response = await fetch('/byop/packages');
        const packages = await response.json();
        updatePackagesList(packages);
    } catch (error) {
        console.error('Error loading packages:', error);
    }
}

// Update packages list in sidebar
function updatePackagesList(packages) {
    const packagesList = document.getElementById('packagesList');
    packagesList.innerHTML = packages.map(pkg => `
        <li class="nav-item">
            <a class="nav-link" href="#" data-package-id="${pkg.id}">
                ${pkg.name}
            </a>
        </li>
    `).join('');
}

// Setup form listeners
function setupFormListeners() {
    const basicInfoForm = document.getElementById('basicInfoForm');
    
    // Basic info form changes
    basicInfoForm.addEventListener('change', (e) => {
        const { id, value } = e.target;
        currentPackage[id.replace('package', '').toLowerCase()] = value;
    });

    // New package button
    document.getElementById('newPackageBtn').addEventListener('click', () => {
        currentPackage = {
            name: '',
            type: '',
            status: '',
            validityPeriods: []
        };
        resetForms();
    });
}

// Reset all forms
function resetForms() {
    document.getElementById('basicInfoForm').reset();
    // Reset other forms as they are implemented
}

// Save package
async function savePackage() {
    try {
        const response = await fetch('/byop/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentPackage)
        });
        
        if (response.ok) {
            const savedPackage = await response.json();
            loadSavedPackages(); // Refresh the list
            alert('Package saved successfully!');
        } else {
            throw new Error('Failed to save package');
        }
    } catch (error) {
        console.error('Error saving package:', error);
        alert('Failed to save package. Please try again.');
    }
}