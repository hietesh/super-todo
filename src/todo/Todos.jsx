import { ArrowUpDown, Check, ChevronDown, ChevronUp, Edit, Plus, Rabbit, Trash, Trash2, X } from "lucide-react";
import { useState } from "react";
import SearchTodo from "./SearchTodo";
import TodoDropdown from "./TodoDropdown";

const Todos = () => {

    const [todos, setTodos] = useState([]);

    const [searchText, setSearchText] = useState("");

    const [dropdownText, setDropdownText] = useState("");

    const [labelFilter,setLabelFilter] = useState('general');

    const [todo, setTodo] = useState("");

    const handleTodoSubmit = (event) => {
        event.preventDefault();
        const newTodos = [
            ...todos, {
                id: crypto.randomUUID(),
                text: todo,
                complete: false,
                label:labelFilter
            }
        ]
        setTodos(newTodos);
        
        setTodo("");
        event.target.reset();
    }

    const handleInputChange = (event) => {
        setTodo(event.target.value);
    }

    const handleTodoCheck = (id, checked) => {

        const newTodos = todos.map(todo => {
            if (todo.id === id && todo.text.includes(searchText)) {
                return { ...todo, complete: checked };
            }
            return todo;
        });

        setTodos(newTodos);
        
    }

    const handleDropdownFilter = (value) => {
        setDropdownText(value);
    }

    const handleLabelFilter = (value) => {
        setLabelFilter(value);
    }

    const handleTodoDelete = (id) => {
        const newTodos = todos.filter(item => item.id !== id);
        setTodos(newTodos);
        
    }

    const EmptyState = () => (
        <div className="mt-8 flex gap-4 flex-col items-center text-secondary">
            <Rabbit size={70} />
            <p>Your Todo's are Empty</p>
        </div>
    )

    const compareTodos = (a, b) => {
        return a.text.localeCompare(b.text);
    }

    const handleSortTodos = () => {
        const sortTodos = [...todos];
        sortTodos.sort(compareTodos);
        setTodos(sortTodos);
        
    }

    const checkSorted = () => {
        return filteredTodos.every((item, index, arr) => {
            return index === 0 || compareTodos(arr[index - 1], item) <= 0;
        })
    }

    const completedTodos = () => {
        return todos.filter((item) => item.complete).length;
    }

    

    const updateCurrentTodo = (id, updateValue) => {
        const newTodo = todos.map(item => {
            if (item.id === id) {
                return {
                    ...item, text: updateValue
                }
            }
            return item;
        })

        setTodos(newTodo);
        
    }

    const moveDown = (index) => {
        const moveTodos = [...todos];
        if (index !== todos.length - 1) {
            [moveTodos[index], [moveTodos[index + 1]]] = [moveTodos[index + 1], [moveTodos[index]]]
        }
        setTodos(moveTodos);
        
    }

    const moveUp = (index) => {
        const moveTodos = [...todos];
        if (index !== 0) {
            [moveTodos[index], [moveTodos[index - 1]]] = [moveTodos[index - 1], [moveTodos[index]]]
        }
        setTodos(moveTodos);
        
    }

    const handleSearchTodo = (searchVal) => {
        setSearchText(searchVal);
    }

    const getFilterCriteria = (item)=>{ 
        switch (dropdownText) {
            case 'completed':
                return item.complete;
            case 'incomplete':
                return !item.complete;
            case 'all':
            default:
                return true;
        }    
    } 


    const filteredTodos = todos.filter( 
        item => {
            return item.text.toLowerCase().includes(searchText.toLowerCase().trim()) && getFilterCriteria(item);              
        }
    );

    const isTodoEmpty = () => filteredTodos.length === 0;

    const dropdownFilters = [
        {
            text : 'All',
            value : 'all'
        },
        {
            text : 'Incomplete',
            value : 'incomplete',
        },
        {
            text : 'Completed',
            value : 'completed', 
        }
    ];

    const labelFilters = [
        {
            text: '🟩 Important',
            value:'important'
        },
        {
            text: '🟥 Priority',
            value:'priority'
        },
        {
            text: '🟨 General',
            value:'general'
        }
    ]

        return (
        <div className="max-w-2xl mx-auto p-10 lg:p-12 space-y-6">
            <h1 className="text-center font-display text-6xl font-bold text-accent">Super Todo</h1>
            <p className="text-lg font-light text-secondary text-center italic">Manage your Todo's with Ease</p>
            <form
                onSubmit={handleTodoSubmit}
                className="bg-gray-700 px-6 py-4 round-lg flex justify-between gap-4 rounded-md"
            >
                <input
                    type="text"
                    name="addTodo"
                    id="todo"
                    value={todo}
                    onChange={handleInputChange}
                    placeholder="Add a Todo"
                    className="flex-1 font-body focus:outline-none"
                />
                <TodoDropdown 
                    todoFilter={labelFilters}
                    handleDropdownFilter={handleLabelFilter}
                    dropdownText={labelFilter}
                    className="border-1 border-accent"
                />
                <button
                    type="submit"
                    value="Add Todo"
                    disabled={todo.trim() === ""}
                    className="p-3 bg-accent text-black round-lg cursor-pointer rounded-lg hover:bg-accent-hover disabled:opacity-50"
                >
                    <Plus />
                </button>
            </form>

            {/* Search Todo Items */}
            <div className="flex items-center gap-3">
                <SearchTodo className="flex-1" handleSearchTodo={handleSearchTodo} searchText={searchText} />
                <TodoDropdown 
                    todoFilter={dropdownFilters} 
                    handleDropdownFilter={handleDropdownFilter}
                    dropdownText={dropdownText}
                />
                
            </div>
                      
            <div className="flex justify-center gap-6">
                {!checkSorted() && <button className="px-4 py-2 ring-2 ring-accent rounded-lg cursor-pointer hover:text-black hover:bg-accent flex gap-2 " onClick={e => handleSortTodos()}><ArrowUpDown /> Sort</button>}
                {!isTodoEmpty() && <button className="px-4 py-2 ring-2 ring-red-400 rounded-lg cursor-pointer flex gap-2 hover:bg-red-400 hover:text-black" onClick={e => setTodos([])}> <Trash /> Delete All</button>}
            </div>

            {!isTodoEmpty() && <p className="text-secondary text-right">{completedTodos()} / {todos.length} Completed</p>}
            
            {
        
                filteredTodos.length > 0 ? (
                    <>
                        <ul className="space-y-4">
                            {
                                filteredTodos.map((item, index) => {
                                    return (
                                        <li key={item.id}>
                                            <TodoItem
                                                item={item}
                                                index={index}
                                                handleTodoCheck={handleTodoCheck}
                                                handleTodoDelete={handleTodoDelete}
                                                updateCurrentTodo={updateCurrentTodo}
                                                moveDown={moveDown}
                                                moveUp={moveUp}
                                                length={todos.length - 1}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>

                    <p>Completed Task</p>
                    
                    <ul className="space-y-4">
                        {
                            filteredTodos.map((item, index) => {
                                return (
                                    item.complete ? (
                                        <li key={item.id}>
                                            <TodoItem
                                                item={item}
                                                index={index}
                                                handleTodoCheck={handleTodoCheck}
                                                handleTodoDelete={handleTodoDelete}
                                                updateCurrentTodo={updateCurrentTodo}
                                                moveDown={moveDown}
                                                moveUp={moveUp}
                                                length={todos.length - 1}
                                            />
                                        </li> 
                                    ) : ''
                                )
                            })
                        }
                    </ul>

                    <p>InComplete Task</p>
                    
                    <ul className="space-y-4">
                        {
                            filteredTodos.map((item, index) => {
                                return (
                                   
                                    !item.complete ? (
                                        <li key={item.id}>
                                            <TodoItem
                                                item={item}
                                                index={index}
                                                handleTodoCheck={handleTodoCheck}
                                                handleTodoDelete={handleTodoDelete}
                                                updateCurrentTodo={updateCurrentTodo}
                                                moveDown={moveDown}
                                                moveUp={moveUp}
                                                length={todos.length - 1}
                                            />
                                        </li> 
                                    ) : ''
                                    
                                )
                            })
                        }
                    </ul>
                            
                    </>

                ) : <EmptyState />
            }


        </div>
    )
}
export default Todos;


const TodoItem = ({ item, handleTodoCheck, handleTodoDelete, updateCurrentTodo, moveUp, moveDown, index, length }) => {

    const [showEdit, setshowEdit] = useState(false);

    const Item = () => {
        return (
            <div className={`
                flex 
                p-3 
                rounded-lg 
                justify-between 
                items-center 
                gap-3 
                hover:opacity-80 
                ${ 
                    item.label == 'general' ? 'bg-yellow-400' : item.label == 'priority' ? 'bg-red-400' 
                    : 'bg-green-400'
                }
                `}
            >
                <div className="flex flex-col gap-2 text-secondary">
                    <button
                        className="hover:bg-gray-700 rounded-md p-1 cursor-pointer disabled:opacity-50"
                        onClick={e => moveUp(index)} disabled={index == 0}>
                        <ChevronUp />
                    </button>
                    <button
                        className="hover:bg-gray-700 rounded-md p-1 cursor-pointer disabled:opacity-50"
                        onClick={e => moveDown(index)} disabled={index == length}>
                        <ChevronDown />
                    </button>
                </div>

                <div className="flex-1">
                    <label htmlFor={item.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                            className="size-5 hidden"
                            type="checkbox"
                            name={item.text}
                            id={item.id}
                            checked={item.complete}
                            onChange={e => handleTodoCheck(item.id, e.target.checked)}
                        />
                        <span className={`border-1 size-5 rounded-md ${item.complete && 'bg-accent text-black'}`}>
                            {item.complete && <Check size={18} />}
                        </span>
                        <span
                            className="flex-1"
                            style={
                                {
                                    textDecoration: item.complete ? 'line-through' : 'auto'
                                }
                            }
                        >{item.text}</span>
                    </label>
                </div>
                <div className="flex gap-4">
                    <button
                        className="text-accent cursor-pointer"
                        onClick={e => setshowEdit(true)}>
                        <Edit />
                    </button>
                    <button
                        onClick={e => handleTodoDelete(item.id)}
                        className="text-red-500 cursor-pointer"
                    >
                        <Trash2 />
                    </button>
                </div>
            </div>
        )
    }

    const EditTodo = () => {
        const [inputValue, setInputValue] = useState(item.text);

        const submitEditTodo = (e) => {
            e.preventDefault();
            const updatedValue = e.target['editVal'].value;
            updateCurrentTodo(item.id, updatedValue);
            setshowEdit(false);
        }

        return (
            <div className="bg-gray-900 px-4 py-4 rounded-lg min-h-22 flex items-center">
                <form className="flex flex-1" onSubmit={submitEditTodo}>
                    <input
                        type="text"
                        name="editVal"
                        value={inputValue}
                        onChange={e => { setInputValue(e.target.value) }}
                        className="flex-1 border-1 mr-4 rounded-lg border-text-secondary px-4 py-2 font-body focus:outline-none"
                    />
                    <div className="flex gap-3 items-center">
                        <button
                            className="bg-hover cursor-pointer"
                            disabled={inputValue.length == 0}><Check /></button>
                        <button
                            className="cursor-pointer text-red-400"
                            onClick={e => setshowEdit(false)}>
                            <X />
                        </button>
                    </div>
                </form>

            </div>
        )
    }

    return (
        <div className="border-t border-secondary pt-3">
            {showEdit ? <EditTodo /> : <Item />}
        </div>
    )
}

