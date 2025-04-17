var express = require("express");
var router = express.Router();
var firstImage = require("../modules/firstimage");
var ChuDe = require("../models/chude");
var BaiViet = require("../models/baiviet");

// GET: Trang chủ
router.get("/", async (req, res) => {
  var cm = await ChuDe.find();
  var bv = await BaiViet.find({ KiemDuyet: 1 })
    .limit(12)
    .populate("ChuDe")
    .populate("TaiKhoan")
    .sort({ NgayDang: -1 })
    .exec();

  var xnn = await BaiViet.find({ KiemDuyet: 1 })
    .sort({ LuotXem: -1 })
    .limit(3)
    .populate("ChuDe")
    .populate("TaiKhoan")
    .exec();

  res.render("index", {
    title: "Trang chủ",
    baiviet: bv,
    chude: cm,
    xemnhieunhat: xnn,
    firstImage: firstImage,
  });
});

// GET: Lấy các bài viết cùng mã chủ đề
router.get("/baiviet/chude/:id", async (req, res) => {
  var id = req.params.id;
  var cm = await ChuDe.find();
  var cd = await ChuDe.findById(id);
  var bv = await BaiViet.find({ ChuDe: id, KiemDuyet: 1 })
    .limit(8)
    .populate("ChuDe")
    .populate("TaiKhoan")
    .sort({ NgayDang: -1 })
    .exec();
  var xnn = await BaiViet.find({ KiemDuyet: 1, ChuDe: id })
    .sort({ LuotXem: -1 })
    .limit(3)
    .populate("ChuDe")
    .populate("TaiKhoan")
    .exec();
  res.render("baiviet_chude", {
    title: "Bài viết theo chủ đề",
    baiviet: bv,
    chude: cd,
    chuyenmuc: cm,
    xemnhieunhat: xnn,
    firstImage: firstImage,
  });
});

// GET: Xem bài viết
router.get("/baiviet/chitiet/:id", async (req, res) => {
  var id = req.params.id;
  var cm = await ChuDe.find();
  var bv = await BaiViet.findById(id)
    .populate("ChuDe")
    .populate("TaiKhoan")
    .exec();
  var xnn = await BaiViet.find({ KiemDuyet: 1 })
    .sort({ LuotXem: -1 })
    .limit(3)
    .populate("ChuDe")
    .populate("TaiKhoan")
    .exec();

  res.render("baiviet_chitiet", {
    chuyenmuc: cm,
    baiviet: bv,
    xemnhieunhat: xnn,
    firstIamge: firstImage,
  });
});
// GET: Tin mới nhất
router.get("/tinmoi", async (req, res) => {
  res.render("tinmoinhat", {
    title: "Tin mới nhất",
  });
});

// POST: Kết quả tìm kiếm
router.post("/timkiem", async (req, res) => {
  var tukhoa = req.body.tukhoa;

  // Xử lý tìm kiếm bài viết
  var bv = [];

  res.render("timkiem", {
    title: "Kết quả tìm kiếm",
    baiviet: bv,
    tukhoa: tukhoa,
  });
});

// GET: Lỗi
router.get("/error", async (req, res) => {
  res.render("error", {
    title: "Lỗi",
  });
});

// GET: Thành công
router.get("/success", async (req, res) => {
  res.render("success", {
    title: "Hoàn thành",
  });
});

module.exports = router;
