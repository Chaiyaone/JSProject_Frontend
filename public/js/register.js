document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('รหัสผ่านไม่ตรงกัน');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', { // เปลี่ยนเป็น URL ของ Backend
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, phone, password })
        });

        const result = await response.json();
        console.log("Server response:", result);

        if (!response.ok) {
            throw new Error(result.message);
        }

        alert('สมัครสมาชิกสำเร็จ');
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
});
