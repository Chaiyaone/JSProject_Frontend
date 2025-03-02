const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios'); // นำเข้า axios

const app = express();
const base_url = "http://localhost:5000"; // URL ของ Backend

// ตั้งค่า EJS เป็น template engine
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // ให้บริการไฟล์ static จากโฟลเดอร์ public

// Route สำหรับแสดงหน้า Register
app.get('/register', (req, res) => {
  res.render('register'); // แสดงหน้า register.ejs
});

// Route สำหรับแสดงหน้า Login
app.get('/', (req, res) => {
  res.render('login'); // แสดงหน้า login.ejs
});

// Route สำหรับส่งข้อมูลสมัครสมาชิกไปยัง Backend
app.post('/register', async (req, res) => {
  const { email, username, phone, password, confirmPassword } = req.body;

  // ตรวจสอบรหัสผ่าน
  if (password !== confirmPassword) {
    return res.status(400).send('รหัสผ่านไม่ตรงกัน');
  }

  try {
    // ส่งข้อมูลไปยัง Backend โดยใช้ axios
    const response = await axios.post(`${base_url}/register`, {
      email,
      username,
      phone,
      password
    });

    // หากสมัครสมาชิกสำเร็จ
    if (response.status === 201) {
      res.redirect('/login'); // เปลี่ยนเส้นทางไปยังหน้า Login
    } else {
      res.status(400).send('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).send(error.response?.data?.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
  }
});

// เริ่มต้นเซิร์ฟเวอร์
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Frontend server is running on http://localhost:${port}`);
});