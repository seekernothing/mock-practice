import { useEffect, useState } from "react"
import users from "./userlist.json"

const UserList = () => {

  const[input,setInput] = useState("")
     const[list,setList] = useState([])

     useEffect(()=>{
        const visible = users.filter((u)=>u.isVisible===true)
        setList(visible)
     },[] )

       const filterdUsers = list.filter((l)=>l.name.toLowerCase().includes(input.toLowerCase()))

   
     

  return (
    <>
      <div className="serachbox">

        <input 
        type="text"
        placeholder="Enter the name"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        />

      </div>

      <div className="users">
        <ul className="ul">{filterdUsers.map((u)=>(
            <li key={u.id}>{u.name}</li>
        ))}</ul>
      </div>
    </>
  );
}

export default UserList