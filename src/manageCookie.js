// Function to set a cookie with a specified name, value, and expiration in days
function setCookie(name, value, days) {
    let expires = ""; // Initialize the expiration string
    if (days) {
        // If a number of days is provided, calculate the expiration date
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
        expires = "; expires=" + date.toUTCString(); // Format the expiration date
    }
    // Set the cookie with the name, value, and expiration (if provided)
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to retrieve the value of a cookie by its name
function getCookie(name) {
    const cookies = document.cookie.split("; "); // Split all cookies into an array
    for (const cookie of cookies) {
        const [key, value] = cookie.split("="); // Split each cookie into key and value
        if (key === name) return value; // Return the value if the key matches the specified name
    }
    return null; // Return null if the cookie is not found
}

// Function to delete a cookie by its name
function deleteCookie(name) {
    // Set the cookie's expiration date to a past date to remove it
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}
