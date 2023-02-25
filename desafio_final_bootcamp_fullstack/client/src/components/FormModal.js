import React, {useEffect, useState} from 'react'
import Modal from 'react-modal'
import css from './styles.module.css'
import apiService from '../consumer/transactionConsumer.js';

Modal.setAppElement('#root');

export default function FormModal(props) {
    
    const [selectedTransaction, setSelectedTransaction] = useState(props.transaction);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);    
        }
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape')
            handleCloseModal();
    }

    const handleCloseModal = () => {
        props.onClose(false);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        if (selectedTransaction._id === undefined)
            await apiService.create(selectedTransaction);
        else 
            await apiService.update(selectedTransaction._id, selectedTransaction);

        props.onClose(false);
    }

    const handle = () => {

        const data = document.querySelector("#inputData").value;
        const type = document.querySelector("#rb_receita").checked ? "+" :
         (document.querySelector("#rb_despesa").checked ? "-" : "");
        const transactionAlterado = {
            _id: selectedTransaction._id,
            description: document.querySelector("#inputDescricao").value,
            category: document.querySelector("#inputCategoria").value,
            value: document.querySelector("#inputValor").value,
            year: data.split('-')[0],
            month: data.split('-')[1],
            day: data.split('-')[2],
            yearMonth: data.split('-')[0] + '-' + data.split('-')[1],
            yearMonthDay: data,
            type: type
        };

        setSelectedTransaction(transactionAlterado);
    }

    
    return (
        <div>
            <Modal style={customStyles} isOpen={true}>
                <div className={css.flex}>
                    <h6><strong>Inclusão de Lançamento</strong></h6>
                    <button onClick={handleCloseModal} className="waves-effect waves-light btn red darken-4">X</button>
                </div>
                <form className={css.borderModal} onSubmit={handleFormSubmit}>
                    <div className="center">
                        <label>
                            <input disabled={Object.keys(props.transaction).length !== 0} 
                            id="rb_despesa" name="tipo" type="radio" checked={selectedTransaction.type === "-"}
                            onChange={handle} />
                            <span className={css.despesa}>Despesa</span>
                        </label>
                        <label style={{marginLeft: '20px'}}>
                            <input id="rb_receita" disabled={Object.keys(props.transaction).length !== 0}
                            name="tipo" type="radio" checked={selectedTransaction.type === "+"}
                            onChange={handle} />
                            <span className={css.receita}>Receita</span>
                        </label>
                    </div>
                    <div className="input-field">
                        <input id="inputDescricao" onChange={handle} value={selectedTransaction.description}  type="text" />
                        <label className="active" htmlFor="inputDescricao">
                            Descrição:
                        </label>
                    </div>
                    <div className="input-field">
                        <input id="inputCategoria" onChange={handle} value={selectedTransaction.category} type="text" />
                        <label className="active" htmlFor="inputCategoria">
                            Categoria:
                        </label>
                    </div>
                    <div className={css.flex}>
                        <div className="input-field">
                            <input id="inputValor" onChange={handle} value={selectedTransaction.value} type="number" />
                            <label className="active" htmlFor="inputValor">
                                Valor:
                            </label>
                        </div>
                        <input style={{marginLeft: '10px'}} onChange={handle} value={selectedTransaction.yearMonthDay} id="inputData" type="date" />
                    </div>
                    <button className="waves-effect waves-light btn green darken-4"> Salvar </button>
                </form>
            </Modal>
        </div>
    )
}



const customStyles = {
    overlay: {zIndex: 1},
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
