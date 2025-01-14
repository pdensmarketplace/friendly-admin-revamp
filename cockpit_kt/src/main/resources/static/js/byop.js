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
    setupResourceHandlers();
    setupPricingHandlers();
    setupPreviewHandlers();
    setupSliderHandlers();
});

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

// Setup resource handlers
function setupResourceHandlers() {
    const addResourceBtn = document.getElementById('addResourceBtn');
    if (addResourceBtn) {
        addResourceBtn.addEventListener('click', () => {
            const resourcesList = document.getElementById('resourcesList');
            const resourceTemplate = `
                <div class="card resource-item">
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-md-3">
                                <label class="form-label">Type</label>
                                <select class="form-select resource-type">
                                    <option value="data">Data</option>
                                    <option value="voice">Voice</option>
                                    <option value="sms">SMS</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Amount</label>
                                <input type="number" class="form-control resource-amount">
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Unit</label>
                                <input type="text" class="form-control resource-unit">
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Jump</label>
                                <input type="number" class="form-control resource-jump">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            resourcesList.insertAdjacentHTML('beforeend', resourceTemplate);
        });
    }
}

// Setup pricing handlers
function setupPricingHandlers() {
    const addPriceSlabBtn = document.getElementById('addPriceSlabBtn');
    if (addPriceSlabBtn) {
        addPriceSlabBtn.addEventListener('click', () => {
            const pricingSlabs = document.getElementById('pricingSlabs');
            const slabTemplate = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Price Slab</h5>
                        <div class="row g-3">
                            <div class="col-md-4">
                                <label class="form-label">From</label>
                                <input type="number" class="form-control" placeholder="0">
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">To</label>
                                <input type="number" class="form-control" placeholder="100">
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Price</label>
                                <input type="number" class="form-control" placeholder="0.00">
                            </div>
                        </div>
                    </div>
                </div>
            `;
            pricingSlabs.insertAdjacentHTML('beforeend', slabTemplate);
        });
    }
}

// Setup preview handlers
function setupPreviewHandlers() {
    const previewElement = document.getElementById('packagePreview');
    if (previewElement) {
        // Update preview when package changes
        const updatePreview = () => {
            previewElement.textContent = JSON.stringify(currentPackage, null, 2);
        };
        
        // Add listeners to form elements that update the preview
        document.querySelectorAll('input, select').forEach(element => {
            element.addEventListener('change', updatePreview);
        });
    }
}

// Setup slider handlers
function setupSliderHandlers() {
    const resourceSliders = document.getElementById('resourceSliders');
    const totalPriceElement = document.getElementById('totalPrice');
    
    function updateTotalPrice() {
        // Calculate total price based on slider values and price slabs
        let total = 0;
        document.querySelectorAll('.resource-slider').forEach(slider => {
            const value = parseFloat(slider.value);
            // Add price calculation logic here
            total += value; // Simplified calculation
        });
        
        if (totalPriceElement) {
            totalPriceElement.textContent = `₹${total.toFixed(2)}`;
        }
    }
    
    // Update sliders when resources change
    const updateSliders = () => {
        if (resourceSliders) {
            resourceSliders.innerHTML = '';
            currentPackage.validityPeriods.forEach(period => {
                period.resources.forEach(resource => {
                    const sliderTemplate = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${resource.type}</h5>
                                <input type="range" class="form-range resource-slider" 
                                       min="0" max="${resource.amount}" step="${resource.jump}"
                                       value="0">
                                <div class="d-flex justify-content-between">
                                    <span>0</span>
                                    <span>${resource.amount} ${resource.unit}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    resourceSliders.insertAdjacentHTML('beforeend', sliderTemplate);
                });
            });
            
            // Add event listeners to new sliders
            document.querySelectorAll('.resource-slider').forEach(slider => {
                slider.addEventListener('input', updateTotalPrice);
            });
        }
    };
    
    // Initial setup
    updateSliders();
}
