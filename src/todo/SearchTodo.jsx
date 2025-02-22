const SearchTodo = ({searchText,handleSearchTodo})=>{

    return (
        <input 
            type="text"
            className="p-5 bg-gray-900 rounded-lg w-[100%] focus:outline-none"
            placeholder="Search Todo"
            value={searchText}
            onChange={ e => {handleSearchTodo(e.target.value)}}
         /> 
    )
}

export default SearchTodo;