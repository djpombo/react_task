import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import '../CadastrarTarefas/styles.css';

function AtualizarTarefas(props){

    const [showModal, setShowModal] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [tarefa, setTarefa] = useState('');
    const [carregarTarefa, setCarregarTarefa] = useState(true);

    useEffect(() =>{
        //para executar o useEffect uma única vez e só recarrega-lo quando o state
        //carregarTarefa sofrer modificação
        if(carregarTarefa){
            const tarefasDb = localStorage['tarefas'];
            const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
            const tarefa = tarefas.filter(
                t => t.id === parseInt(props.id)
            )[0];//retorna somente um único elemento pois o id é unico, por isto indice=0
            setTarefa(tarefa.name);
            
            setCarregarTarefa(false);
        }

    }, [carregarTarefa, props.id]);

    function voltar(e){
        e.preventDefault();
        navigate('/');
    }

    function closeModal(){
        setShowModal(false);
        navigate('/');
    }

    function atualizar(e){
        e.preventDefault();
        setFormValidado(true);
        if(e.currentTarget.checkValidity() === true){
            //obter as tarefas
            const tarefasDb = localStorage['tarefas'];
            let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

            //persistir a tarefa atualizada
            tarefas = tarefas.map(tarefaObj =>{
                if(tarefaObj.id === parseInt(props.id)){
                    tarefaObj.name = tarefa;
                }
                return tarefaObj;

            });
            
            localStorage['tarefas'] = JSON.stringify(tarefas);//regravar o banco atualizado
            
            setShowModal(true);
        }
    }

    function handleTxtTarefa(e){
        setTarefa(e.target.value);
    }

    return(
        <div className="container">
            <h3 className="text-center">Atualizar</h3>
            <div className="Jumbo">
                <Form onSubmit={atualizar} noValidate validated={formValidado}>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="digite a tarefa"
                            minLength="5"
                            maxLength="100"
                            required
                            data-testid="txt-tarefa"
                            value={tarefa}
                            onChange={handleTxtTarefa}
                            />
                            <Form.Control.Feedback type="invalid">
                                A tarefa deve conter no mínimo 5 caracteres
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="buttons text-center">
                        <Button variant="success" type="submit" data-testid="btn-atualizar">
                            Atualizar
                        </Button>
                        <A href="/" className="btn btn-light" onClick={voltar}>
                            Voltar
                        </A>
                    </Form.Group>
                </Form>
                <Modal show={showModal} onHide={closeModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tarefa Atualizada com Sucesso!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="success"
                            onClick={closeModal}>
                                Continuar
                            </Button>

                    </Modal.Footer>

                </Modal>
            </div>

        </div>
    )
}

AtualizarTarefas.propTypes ={
    id: PropTypes.number.isRequired
}
export default AtualizarTarefas;