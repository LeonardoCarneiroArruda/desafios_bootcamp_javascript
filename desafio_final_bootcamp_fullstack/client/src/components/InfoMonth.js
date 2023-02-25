import React from 'react'
import css from './styles.module.css';

export default function InfoMonth({listaTransactions}) {
    
    let receita = 0, despesa = 0, saldo = 0;
    listaTransactions.forEach(item => {
        if (item.type === "+") 
            receita += item.value;
        else if (item.type === "-")
            despesa += item.value;
    }); 
    
    saldo = receita - despesa;
    
    return (
        <div className={css.flexRow}>
            <div>
                Lançamentos: {listaTransactions.length}
            </div>
            <div>
            Receitas: <span className={css.receita}>R$ {receita}</span>
            </div>
            <div>
            Despesas: <span className={css.despesa}>R$: {despesa}</span>
            </div>
            <div>
            Saldo: <span className={css.receita}>R$: {saldo}</span>
            </div>
        </div>
    )
}
