const Expense = require("../models/Expense")
const xlsx = require("xlsx")

exports.addExpense = async (req, res) => {
    const userId = req.user.id
    try{
        const { icon, category, expense, date } = req.body
        if(!category || !expense || !date){
            return res.status(400).json({ message: "All fields are required"})
        }

        const newExpense = new Expense({
            userId,
            icon, 
            category,
            expense,
            date: new Date(date)
        })

        await newExpense.save()
        res.status(200).json(newExpense)
    }catch(err){
        res.status(500).json({message: "Server Erorr", erorr: err.message})
    }
}

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 })
        res.json(expense)
    }catch(err){
        res.status(500).json({message: "Server Erorr", erorr: err.message})
    }
    
}

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.json({ message: "Expense deleted successfully"})
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message})
    }
}

exports.downloadExpenseExel = async (req, res) => {
    const userId = req.user.id
    try {
        const expense = await Expense.find({userId}).sort({date: -1})
    
        const data = expense.map((item)=>({
            Sorce: item.category,
            expense: item.expense,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, ws, "Expense")
        xlsx.writeFile(wb, 'expense_details.xlsx')
        res.download('expense_details.xlsx')
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message})
    }
}