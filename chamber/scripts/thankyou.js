
const queryParams = new URLSearchParams(window.location.search);

// Set the content of each span with the corresponding query parameter value
document.getElementById('firstName').textContent = queryParams.get('firstName') || 'N/A';
document.getElementById('lastName').textContent = queryParams.get('lastName') || 'N/A';
document.getElementById('email').textContent = queryParams.get('email') || 'N/A';
document.getElementById('mobile').textContent = queryParams.get('mobile') || 'N/A';
document.getElementById('organization').textContent = queryParams.get('organization') || 'N/A';
document.getElementById('timestamp').textContent = queryParams.get('timestamp') || 'N/A';