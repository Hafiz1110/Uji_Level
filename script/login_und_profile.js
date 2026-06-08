
// login sama logout
let user = [];

async function MemuatUser() {
    try {
        const response = await fetch("/script/user.json");
        if (!response.ok) {throw new Error("Network response was not ok");}
        user = await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}
MemuatUser();

async function login() {

    if (user.length === 0) {
        await MemuatUser();
    }

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let found = false;
    for (let i = 0; i < user.length; i++) {
        if (user[i].email === email && user[i].password === password) {
            sessionStorage.setItem("name", user[i].name);
            window.location.href = "../index.html";
            found = true;
            break;
        }
    }
    if (!found) {
        alert("Email atau password salah");
    }
    
}


//profile

  const profilePanel = document.getElementById('profile-panel');
        const profileBackdrop = document.getElementById('profile-backdrop');
        const profileGreeting = document.getElementById('profile-greeting');
        const profileUsername = document.getElementById('profile-username');
        const profileLoginLink = document.getElementById('profile-login-link');
        const profileLoggedIn = document.getElementById('profile-logged-in');

        function updateProfilePanel() {
            const name = sessionStorage.getItem('name');
            if (name) {
                profileGreeting.textContent = `Welcome, ${name}`;
                profileUsername.textContent = name;
                profileLoginLink.classList.add('hidden');
                profileLoggedIn.classList.remove('hidden');
            } else {
                profileGreeting.textContent = 'You are not logged in.';
                profileUsername.textContent = '';
                profileLoginLink.classList.remove('hidden');
                profileLoggedIn.classList.add('hidden');
            }
        }

        function toggleProfilePanel(force) {
            const isOpen = !profilePanel.classList.contains('translate-x-full');
            const shouldOpen = typeof force === 'boolean' ? force : !isOpen;
            profilePanel.classList.toggle('translate-x-full', !shouldOpen);
            profileBackdrop.classList.toggle('hidden', !shouldOpen);
            if (shouldOpen) {
                updateProfilePanel();
            }
        }

        function logout() {
            sessionStorage.removeItem('name');
            toggleProfilePanel(false);
            updateProfilePanel();
        }

        document.addEventListener('DOMContentLoaded', updateProfilePanel);

