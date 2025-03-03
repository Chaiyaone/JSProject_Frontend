const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const base_url = "http://localhost:5000"; // URL ของ Backend

app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res) => {
  res.render("login")
})
app.get("/main", (req, res) => {
  try {
    res.render("main")
  } catch (error) {
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

//  ------------------------ Equipment Controller ------------------

// app.get("/eq", async (req, res) => {
//   try {
//     const response = await axios.get(base_url + "/equipment");
//     res.render("eq", { equipment: response.data });
//   } catch (err) {
//     res.status(500).send("Error");
//   }
// });

app.get("/eq", async (req, res) => {
  let page = parseInt(req.query.page) || 1; // หน้าเริ่มต้นที่ 1
  let limit = 10; // จำนวนอุปกรณ์ต่อหน้า

  try {
    const response = await axios.get(
      `${base_url}/equipment?page=${page}&limit=${limit}`
    );
    res.render("eq", {
      equipment: response.data.equipment,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    });
  } catch (err) {
    res.status(500).send("Error");
  }
});

app.get("/eq/delete/:id", async (req, res) => {
  try {
    await axios.delete(base_url + "/equipment/" + req.params.id);
    //console.log("Delete!!"); Test Log
    res.redirect("/eq");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.get("/eq_add", (req, res) => {
  res.render("eq_add");
});

app.post("/eq_add", async (req, res) => {
  try {
    const data = {
      equipment_name: req.body.equipment_name,
      equipment_type: req.body.equipment_type,
    };
    await axios.post(base_url + "/equipment", data);
    res.redirect("/eq");
  } catch (err) {
    res.status(500).send("Error");
  }
});

app.get("/eq_edit/:id", async (req, res) => {
  try {
    const response = await axios.get(base_url + "/equipment/" + req.params.id);
    res.render("eq_edit", { equipment: response.data }); // ใช้ชื่อไฟล์ EJS ที่ถูกต้อง
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/eq_edit/:id", async (req, res) => {
  try {
    const data = {
      equipment_name: req.body.equipment_name,
      equipment_type: req.body.equipment_type,
    };
    await axios.put(base_url + "/equipment/" + req.params.id, data);
    res.redirect("/eq");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

// เริ่มต้นเซิร์ฟเวอร์
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Frontend server is running on http://localhost:${port}`);
});
