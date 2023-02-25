import React from 'react'
import css from './styles.module.css'

export default function Selection(props) {
    
    const handleChange = (event) => {
        props.onChangeSelection(event.target.value);
    }
    
    const listaPeriodos = props.listaPeriodos;
    let id = 0;
    return (
        <div className={css.flexRowSelection}>
        <button className="waves-effect waves-light btn green darken-4"> Anterior </button>    
        <select id="inputSelect" style={{width: '15%', marginLeft: '20px', marginRight: '20px'}} className="browser-default" onChange={handleChange}>
            {
                listaPeriodos.map(periodo => {
                return (
                    <option key={id++} value={periodo}>{periodo}</option>
                    )
                })
            }
            
        </select>
        <button className="waves-effect waves-light btn green darken-4"> Proximo </button>          
        
        </div>
    )
}
