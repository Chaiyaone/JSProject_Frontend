const express = require('express');
const router = express.Router();
const User = require('../models/user'); // นำเข้า Model
const bcrypt = require('bcrypt');

// Route สมัครสมาชิก
router.post('/register', async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        // ตรวจสอบว่าอีเมลมีในระบบแล้วหรือไม่
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'อีเมลนี้ถูกใช้งานแล้ว' });
        }

        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // บันทึกลงฐานข้อมูล
        const newUser = await User.create({
            username,
            email,
            phone,
            password: hashedPassword
        });

        res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
});

module.exports = router;
