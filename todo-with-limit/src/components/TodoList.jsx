import React, { useState } from 'react'

const TodoList = () => {
    const[input,setInput] = useState("")
    const[list,setList] = useState([])

    const limit = 5

    function handelAdd(){
        if(input.trim()!==""){
            setList([...list,input])
        }
        setInput("")
    }

    function handelDelete(id){
        const deletedList = list.filter((_,idx)=>idx!=id)
        setList(deletedList)
    }

  return (
   <div>
    <div className='input'>
        <input 
        type='text'
        placeholder='Enter your todo'
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        />

        <button className='addbtn'  onClick={handelAdd}
        disabled={list.length>=limit}
        >Add</button>
    </div>

    <div className='list'>
        <ul className='ul'>
{list.map((l,idx)=>(
    <li key={idx} > {l} 
    
    <span>
        <button className='dltbtn'  onClick={()=>handelDelete(idx)}>Delete</button>
    </span>
    </li>
))}
        </ul>
    </div>
   </div>
  )
}

export default TodoList