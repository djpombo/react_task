import { PropTypes } from "prop-types";
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


function RemoverTarefas(props){

    const [showModal, setShowModal] = useState(false);

    function handleDelete(e){
        e.preventDefault();
        const tarefasDB = localStorage['tarefas'];
        let tarefas = tarefasDB ? JSON.parse(tarefasDB) : [];

        tarefas = tarefas.filter(item => item.id !== props.tarefa.id)


        localStorage['tarefas'] = JSON.stringify(tarefas);//regrava no localStorage com o novo array alterado
        setShowModal(false);
        props.recarregarTarefas(true);//atualiza a lista exibida
    }
    
    function handleCloseModal(){
        setShowModal(false );
    }

    function handleShowModal(e){
        e.preventDefault();
        setShowModal(true)
    }

    return(
        <><Button className="btn btn-danger btn-sm"
           onClick={handleShowModal} data-testid='btn-delete'>
            <FontAwesomeIcon icon={faTrash} />
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} data-testid="modal-delete">
                    <Modal.Header closeButton>
                        <Modal.Title>Excluir Tarefa</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Deseja realmente excluir a seguinte tarefa:<br /> 
                        <strong>{props.tarefa.name}?</strong>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="primary"
                            onClick={handleDelete}
                            data-testid='btn-concluir-del'
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
        </>
    );
}

RemoverTarefas.propTypes ={
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired
}

export default RemoverTarefas;