import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';


function ConcluirTarefa(props){

    const [showModal, setShowModal] = useState(false);

    function handleShowModal(e){
        e.preventDefault();
        setShowModal(true);

    }

    function handleCloseModal(){
        setShowModal(false);
    }

    function handleConcluirTarefa(e){
        e.preventDefault();
        const tarefasDB = localStorage['tarefas'];
        let tarefas = tarefasDB ? JSON.parse(tarefasDB) : [];

        tarefas = tarefas.map(item =>{
            
                //acha o item que foi clicado pelo id e modifica o mesmo pra true
                if(item.id === props.tarefa.id){
                    item.isConcluded = true;
                }
                //retorna todos os itens com a modificação deste parametro
                return item;
            
        });
        localStorage['tarefas'] = JSON.stringify(tarefas);//regrava no localStorage com o novo array alterado
        setShowModal(false);
        props.recarregarTarefas(true);//atualiza a lista exibida
    }


    return(
        <span className={props.className}>
            <Button className="btn btn-sm" onClick={handleShowModal}
            data-testid='btn-abrir-modal'>
                <FontAwesomeIcon icon={faClipboardCheck} />
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Concluir Tarefa</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Deseja realmente concluir seguinte tarefa:<br /> 
                        <strong>{props.tarefa.name}?</strong>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={handleConcluirTarefa}
                            data-testid='btn-concluir'
                        >
                            Sim
                        </Button>
                        <Button
                            variant="light"
                            onClick={handleCloseModal}
                            data-testid='btn-fechar-modal'
                        >
                            Não
                        </Button>
                    </Modal.Footer>
            </Modal>

        </span>
    );
}

ConcluirTarefa.propTypes = {
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default ConcluirTarefa;