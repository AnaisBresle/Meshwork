const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");
const profileDiv = document.getElementById("profile");
const forgotForm = document.getElementById("forgotForm");
const messageDiv = document.getElementById("message"); // Add a div for messages

const API_BASE = "http://localhost:3001/api/users";

// Helper function to display messages
function showMessage(msg, type = "success") {
  messageDiv.textContent = msg;
  messageDiv.style.color = type === "error" ? "red" : "green";
}

// --- Signup ---
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  const userData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    localStorage.setItem("token", data.token);
    alert("Signup successful!");
    displayProfile(data.user); // Pass the returned user object
  } catch (err) {
    alert("Signup failed: " + err.message);
  }
});

// --- Login ---
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const { email, password } = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    localStorage.setItem("token", data.token);
    alert("Login successful!");
    displayProfile(data.user); // Pass the returned user object
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});

// --- Logout ---
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    profileDiv.innerHTML = "";
    showMessage("Logged out successfully", "success");
    window.location.href = "/"; // redirect to homepage
  });
}

// --- Fetch and display current user ---
async function displayProfile(user = null) {
  const profileDiv = document.getElementById("profile");
  const token = localStorage.getItem("token");

  if (!user && !token) return;

  if (!user) {
    try {
      const response = await fetch(`${API_BASE}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      user = await response.json();
    } catch (err) {
      profileDiv.innerHTML = `<p>Error: ${err.message}</p>`;
      return;
    }
  }

  profileDiv.innerHTML = `
    <p><strong>Name:</strong> ${user.first_name} ${user.last_name}</p>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
  `;
}

// --- Forgot Password ---
forgotForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  showMessage("");
  const formData = new FormData(forgotForm);
  const { email } = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${API_BASE}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (!response.ok) {
      showMessage(data.message || "Error sending reset link", "error");
      return;
    }

    showMessage(data.message, "success");
    forgotForm.reset();

  } catch (err) {
    showMessage("Error: " + err.message, "error");
  }
});

// --- Redirect after signup/login ---
function redirectAfterAuth() {
  window.location.href = "/blog.html"; // change to your blogging page
}

// Show profile on page load if token exists
window.addEventListener("load", displayProfile);
