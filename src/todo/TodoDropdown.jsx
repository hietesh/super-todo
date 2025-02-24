const TodoDropdown = ({todoFilter,handleDropdownFilter,dropdownText})=> {
    return (
        <label className="border-1 border-gray-700 rounded-lg px-2">
            <select
                className="focus:outline-none h-15"
                value={dropdownText}
                onChange = {e => handleDropdownFilter(e.target.value)}
            >
                {
                    todoFilter.map( (item)=> {
                        return (
                            <option value={item.value} key={item.text}>{item.text}</option>
                        )
                    })
                }
            </select>
        </label>
    )
}

export default TodoDropdown;