const express = require("express")
const { addIncome, deleteIncome, getAllIncome, downloadIncomeExel } = require("../controllers/incomeController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/add", protect, addIncome)
router.get("/get", protect, getAllIncome)
router.delete("/:id", protect, deleteIncome)
router.get("/downloadexel", protect, downloadIncomeExel)

module.exports = router