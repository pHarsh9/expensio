import Input from '../inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'
import { useState } from 'react'

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source:"",
        amount:"",
        date:"",
        icon:""
    })
    const handleChange = (key, value) => setIncome({...income, [key]:value})
  return (
    <div>
        <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon",selectedIcon)}
        />
      <Input
      value={income.source}
      onChange={({ target }) => handleChange("source", target.value)}
      lable= "Income Source"
      placeholder = "Freelance, Salary, etc"
      type="text"
      />
      <Input
      value={income.amount}
      onChange={({target}) => handleChange("amount", target.value)}
      lable="Amount"
      placeholder=""
      type="number"
      />
      <Input
      value={income.date}
      onChange={({target}) => handleChange("date", target.value)}
      lable="Date"
      placeholder=""
      type="date"
      />
      <div className='flex justify-end mt-6'>
        <button type="button" className='add-btn add-btn-fill' onClick={()=>onAddIncome(income)}>Add Income</button>
      </div>

    </div>
  )
}

export default AddIncomeForm
