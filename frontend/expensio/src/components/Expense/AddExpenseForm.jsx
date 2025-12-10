import { useState } from 'react'
import Input from '../inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({onAddExpense}) => {
  const [expense, setExpense] = useState({
        category:"",
        expense:"",
        date:"",
        icon:""
    })
    const handleChange = (key, value) => setExpense({...expense, [key]:value})
  return (
    <div>
        <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon",selectedIcon)}
        />
      <Input
      value={expense.category}
      onChange={({ target }) => handleChange("category", target.value)}
      lable= "Expense Category"
      placeholder = "Rent, Fees, etc"
      type="text"
      />
      <Input
      value={expense.expense}
      onChange={({target}) => handleChange("expense", target.value)}
      lable="Expense"
      placeholder=""
      type="number"
      />
      <Input
      value={expense.date}
      onChange={({target}) => handleChange("date", target.value)}
      lable="Date"
      placeholder=""
      type="date"
      />
      <div className='flex justify-end mt-6'>
        <button type="button" className='add-btn add-btn-fill' onClick={()=>onAddExpense(expense)}>Add Expense</button>
      </div>

    </div>
  )
}

export default AddExpenseForm
