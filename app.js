const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const base_url = "http://localhost:5000"; // URL ของ Backend

// ตั้งค่า EJS เป็น template engine
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/equipment', async (req, res) => {
  try {
    const response = await axios.get(base_url + "/equipment");
    //console.log(response.data); // ตรวจสอบข้อมูลที่ได้รับ
    res.render('equipment', { equipment: response.data });
  } catch (err) {
    console.error(err); // แสดง error ใน console
    res.status(500).send('Error');
  }
});
app.get("/equipment/delete/:id", async (req, res) => {
  try {
    await axios.delete(base_url + '/equipment/' + req.params.id);
    console.log("Delete!!")
    res.redirect("/equipment");
  } catch (err) {
    console.log(err);
    res.status(500).send('Error');
  }
});

app.get("/equipment_add", (req, res) => {
  res.render("equipment_add");
});

app.get("/login",(req,res) => {
  res.render("login")
})

app.post("/equipment_add", async (req, res) => {
  try {
    const data = {
      equipment_name: req.body.equipment_name , equipment_type: req.body.equipment_type}
    console.log('Data to be sent:', data); // Debug
    await axios.post(base_url + '/equipment', data);
    res.redirect("/equipment");
  } catch (err) {
    console.error('Error adding equipment:', err); // Debug
    res.status(500).send('Error');
  }
});

// เริ่มต้นเซิร์ฟเวอร์
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Frontend server is running on http://localhost:${port}`);
});