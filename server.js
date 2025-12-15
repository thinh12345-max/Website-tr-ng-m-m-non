const express = require('express');
const path = require('path');
const multer = require("multer");
const app = express();
const PORT = 3000;

// Cho phép truy cập thư mục public (CSS, images, JS…)
app.use(express.static(path.join(__dirname, 'public')));

// Trang chủ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// Thư mục lưu video
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "videos"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use("/videos", express.static("videos"));

// API upload video
app.post("/upload-video", upload.single("video"), (req, res) => {
    res.json({ 
        message: "Upload thành công!",
        url: "/videos/" + req.file.filename
    });
});
// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});
