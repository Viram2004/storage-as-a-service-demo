document.addEventListener('DOMContentLoaded', function() {
    // Simulate storage usage (would come from actual storage service in real app)
    updateStorageUsage(7.5, 100);
    
    // Handle success message after form submission
    if (window.location.search.includes('success=true')) {
        alert("File successfully uploaded to cloud storage!");
        // Remove the query parameter
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Setup event handlers for download buttons
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fileName = this.closest('tr').querySelector('td:first-child').textContent;
            simulateDownload(fileName);
        });
    });
    
    // Setup event handlers for delete buttons
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const fileName = row.querySelector('td:first-child').textContent;
            const fileSize = parseFloat(row.querySelector('td:nth-child(2)').textContent);
            
            if (confirm(`Are you sure you want to delete ${fileName} from cloud storage?`)) {
                // Remove the row from the table
                row.remove();
                
                // Update storage usage
                const currentUsage = parseFloat(document.getElementById('used-storage').textContent);
                updateStorageUsage(currentUsage - fileSize, 100);
                
                alert(`${fileName} has been deleted from cloud storage.`);
            }
        });
    });
});

// Function to update storage usage display
function updateStorageUsage(used, total) {
    const usedElement = document.getElementById('used-storage');
    const meterElement = document.getElementById('storage-meter');
    
    usedElement.textContent = used.toFixed(1);
    
    // Update the meter fill width based on percentage
    const percentage = (used / total) * 100;
    meterElement.style.width = `${percentage}%`;
    
    // Change color based on usage
    if (percentage > 80) {
        meterElement.style.backgroundColor = '#e74c3c'; // Red
    } else if (percentage > 60) {
        meterElement.style.backgroundColor = '#f39c12'; // Orange
    } else {
        meterElement.style.backgroundColor = '#3498db'; // Blue
    }
}

// Function to simulate file download
function simulateDownload(fileName) {
    alert(`Downloading ${fileName} from cloud storage...\n\nIn a real STaaS implementation, this would start a file download from the storage service.`);
}