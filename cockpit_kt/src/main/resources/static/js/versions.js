// Filter functionality
document.getElementById('platformFilter').addEventListener('change', filterVersions);
document.getElementById('channelFilter').addEventListener('change', filterVersions);

function filterVersions() {
    const platform = document.getElementById('platformFilter').value;
    const channel = document.getElementById('channelFilter').value;
    
    const rows = document.querySelectorAll('.custom-table tbody tr');
    rows.forEach(row => {
        const rowPlatform = row.querySelector('td:nth-child(2) .platform-badge').textContent.trim();
        const rowChannel = row.querySelector('td:nth-child(3)').textContent.trim();
        
        const platformMatch = platform === 'All' || rowPlatform === platform;
        const channelMatch = channel === 'All' || rowChannel === channel;
        
        row.style.display = platformMatch && channelMatch ? '' : 'none';
    });
}

// Add new version
function submitVersion() {
    const form = document.getElementById('addVersionForm');
    const formData = new FormData(form);
    
    const version = {
        platform: formData.get('platform'),
        channel: formData.get('channel'),
        versionNumber: formData.get('versionNumber'),
        themeName: formData.get('themeName')
    };

    fetch('/versions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(version)
    })
    .then(response => response.json())
    .then(() => {
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add version');
    });
}

// Delete version
function deleteVersion(id) {
    if (confirm('Are you sure you want to delete this version?')) {
        fetch(`/versions/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to delete version');
        });
    }
}

// Search functionality
document.querySelector('.search-box').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.custom-table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});