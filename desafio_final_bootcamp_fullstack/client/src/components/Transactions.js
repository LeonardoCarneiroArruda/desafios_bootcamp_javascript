import React from 'react'
import Transaction from './Transaction'

export default function Transactions({listaTransactions, onHandleClickType}) {
    const handleClick = (selected) => {
        onHandleClickType(selected);
    }

    return (
        <div>
            {
                listaTransactions.map(transaction => {
                    return (<Transaction 
                        key={transaction._id} 
                        transaction={transaction}
                        handleClickChange={handleClick} />)
                })
            }
        </div>
    )
}
