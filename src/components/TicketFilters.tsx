import React, { useState } from 'react'
interface FilterProps{
  onFilterChange:(filterName: string, value: string) => void;
  onReset:()=>void;
}
export default function TicketFilters({onFilterChange,onReset}: FilterProps) {
  const[select,setselect]=useState('');

  return (<><div>
  <input type="text"
          placeholder="חפש בנושא או תיאור..."
  onChange={(e) => onFilterChange('search',e.target.value)} />
     </div>
     <div>
      <label>  סטטוס: </label>
  <select onChange={(e) => onFilterChange('status',e.target.value)}>
        <option value="all">הכל</option>
        <option value="1">Open</option>
        <option value="2">In Progress</option>
        <option value="3">Closed</option>
      </select>
      </div>
      <div>
      <label>  עדיפות: </label>
  <select onChange={(e) => onFilterChange('priority',e.target.value)}>
        <option value="all">הכל</option>
        <option value="3">High</option> 
  <option value="2">Medium</option>
  <option value="1">Low</option>
      </select>
      </div>
<div>
      <label>  תאריך: </label>
      <input 
          type="date" 
          onChange={(e) => onFilterChange('date', e.target.value)} 
        />
       
       <button onClick={() => onFilterChange('date', '')} style={{fontSize: '10px'}}>נקה תאריך</button>
       </div>
       <button onClick={() => resetFilters()} style={{fontSize: '10px'}}>נקה הכל</button></>

  )
}
