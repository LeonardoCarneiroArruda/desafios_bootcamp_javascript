import React from 'react'
import css from './styles.module.css'

export default function Transaction(props) {
    const transaction = props.transaction;
    const colorTransaction = transaction.type === "+" ? "#a5d6a7" : "#ef5350"

    const handleClickEdit = () => {
        props.handleClickChange({typeClick: "edit", 
                                selectedTransaction: transaction});
    }

    
    const handleClickDelete = () => {
        props.handleClickChange({typeClick: "delete", 
                                selectedTransaction: transaction});
    }

    return (
        <div className={css.flexRowTransaction} style={{backgroundColor: colorTransaction}}>
            <div className={css.flexRowLeft}>
                <div><strong>{transaction.day}</strong></div>
                <div style={{marginLeft: '30px'}}>
                    <div>
                        <strong>{transaction.category}</strong>
                    </div>
                    <div>
                        {transaction.description}
                    </div>
                </div>
            </div>
            <div className={css.flexRowRight}>
                <div>
                    R$ {(+transaction.value).toFixed(2)}
                </div>
                <div style={{marginLeft: '30px'}}>
                    <span 
                       onClick={handleClickEdit} 
                        className="material-icons" 
                        style={{cursor: 'pointer'}}>
                            {'edit'}
                    </span>
                    <span 
                        onClick={handleClickDelete}
                        className="material-icons" 
                        style={{cursor: 'pointer'}}>
                            {'delete'}
                    </span>
                </div>    
            </div>    
        </div>
    )
}
