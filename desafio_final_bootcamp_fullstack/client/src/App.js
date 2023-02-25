import React, { useEffect, useState } from 'react';
import InfoMonth from './components/InfoMonth';
import Selection from './components/Selection';
import css from './components/styles.module.css';
import apiService from './consumer/transactionConsumer.js';
import Transactions from './components/Transactions';
import FormModal from './components/FormModal';

export default function App() {
  
  const [listaPeriodos, setListaPeriodos] = useState([]);
  const [listaTransactions, setListaTransactions] = useState([]);
  const [listaTransactionsFiltered, setListaTransactionsFiltered] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [period, setPeriod] = useState();

  useEffect(() => { 
    const getPeriodos = async () => {
      const periodos = await apiService.todosPeriodos();
      setListaPeriodos(periodos.data);
    }

    getPeriodos();
  }, []);

  const handleChangeSelection = async (period) => {
    const transactions = await apiService.getAll(period);
    setListaTransactions(transactions.data);
    setListaTransactionsFiltered(transactions.data);
    setPeriod(period);
  }

  const handleChangeInputText = (event) => {
    const transactionsFiltered = listaTransactions.filter(transaction => {
      return transaction.description.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setListaTransactionsFiltered(transactionsFiltered);
  }

  const handleClick = async (selected) => { 
    if (selected.typeClick === "edit") {
      alteraModalOpen(true);
      setSelectedTransaction(selected.selectedTransaction);
    }
    else if (selected.typeClick === "delete") {
      await apiService.remove(selected.selectedTransaction._id);
      handleChangeSelection(period);
    }
      
  }

  const handleCloseModal = (retorno) => {
    document.querySelector("#inputSelect").value = period;
    alteraModalOpen(retorno);
    handleChangeSelection(period);
  }
  
  const alteraModalOpen = (retorno = true) => {
    if (retorno === false)
      setSelectedTransaction({});

    setIsModalOpen(retorno);
  }

  return (
    <div className="container center">
      <h3><strong>Bootcamp Full Stack - Desafio Final</strong></h3>
      <h5>Controle Financeiro Pessoal</h5>
      <div>
        <Selection listaPeriodos={listaPeriodos} onChangeSelection={handleChangeSelection} />
        <InfoMonth listaTransactions={listaTransactions} />
        <div className={css.flexRowSelection}>
          <button onClick={alteraModalOpen} disabled={listaTransactionsFiltered.length !== listaTransactions.length} 
          className="waves-effect waves-light btn green darken-4">+ Novo Lancamento</button>
          <input style={{width: '78%', marginLeft: '5px'}} type="text" onChange={handleChangeInputText} placeholder="Filtro" /> 
        </div>
      </div>

      <Transactions onHandleClickType={handleClick} listaTransactions={listaTransactionsFiltered} />
     
      {isModalOpen && <FormModal transaction={selectedTransaction} onClose={handleCloseModal} />}  
    </div>
  );
}
