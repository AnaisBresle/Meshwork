const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const profileDiv = document.getElementById("profile");

const API_BASE = "http://localhost:3001/api/users";

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
    displayProfile();
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
    displayProfile();
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});

// --- Fetch and display current user ---
async function displayProfile() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const response = await fetch(`${API_BASE}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    profileDiv.innerHTML = `
      <p><strong>Name:</strong> ${data.first_name} ${data.last_name}</p>
      <p><strong>Username:</strong> ${data.username}</p>
      <p><strong>Email:</strong> ${data.email}</p>
    `;
  } catch (err) {
    profileDiv.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

// Optionally, show profile on page load if token exists
window.addEventListener("load", displayProfile);
