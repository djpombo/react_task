import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import './listar-tarefas.css';
import ItensListaTarefas from './itens-lista-tarefas';
import Pagination from '../../services/pagination';


function ListarTarefas() {

    const [list, setList] = useState(['']);
    const [loadTask, setLoadTask] = useState(true);

    useEffect(() => {

        function handleList() {
            const listaDB = localStorage['tarefas'];
            let listarTarefas = listaDB ? JSON.parse(listaDB) : [];
            setList(listarTarefas);


        }
        if (loadTask) {
            handleList();
            setLoadTask(false);
       
        } 


    }, [loadTask]);



    return (
        <div className="text-center">
            <h3>React-Task</h3>
            <Table striped bordered hover responsive data-textid='table'>
                <thead>
                    <tr>
                        <th>Tarefa</th>
                        <th>

                            <A href='/cadastrar'
                                className='btn btn-success btn-sm'
                                data-textid='btnNewTask'
                            >
                                <FontAwesomeIcon icon={faPlus} className='btnIcon' />
                                Nova Tarefa
                            </A>
                        </th>
                    </tr>

                </thead>
                <tbody>
                    
                    <ItensListaTarefas 
                        tarefas={list}
                        recarregarTarefas={setLoadTask} />
                        

                </tbody>
            </Table>
            <Pagination />
        </div>
    )
}
export default ListarTarefas;