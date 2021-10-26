import { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import './styles.css';

const CadastrarTarefas = ()=>{

    const [task, setTask] = useState('');
    const [formValidated, setFormValidate] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function cadastrar (e){
        setShowModal(true);
        e.preventDefault();
    }

    function handleTxtTask(e){
        setTask(e.target.value)
    }

    function closeModal(e){
        setShowModal(false);
        navigate('/');
    }

    return(
        <div className="container">
            <h3 className="text-center">Cadastrar</h3>
            <div className="Jumbo">
                <Form 
                validated={formValidated}
                noValidate
                onSubmit={cadastrar}
                >
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="digite a tarefa"
                                minLength="5"
                                maxLength="100"
                                required
                                value={task}
                                onChange={handleTxtTask}
                            />
                            <Form.Control.Feedback type="invalid">
                                A tarefa deve conter no mínimo 5 caracteres
                            </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="buttons text-center">
                        <Button
                            variant="success"
                            type="submit"
                        >
                            Cadastrar
                        </Button>
                        <A href='/' className="btn btn-light">Voltar</A>
                    </Form.Group>
                </Form>
                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Tarefa <strong>{task}</strong> adicionada com Sucesso!
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            variant="success"
                            onClick={closeModal}
                        >Continuar</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        </div>
    )
}
export default CadastrarTarefas;