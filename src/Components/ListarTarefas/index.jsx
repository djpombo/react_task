import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
//import { Button } from 'react-bootstrap';
import './listar-tarefas.css';
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from '../../services/paginacao';
import Order from '../../services/order';


function ListarTarefas() {

    const ITENS_POR_PAG = 3;

    const [filtroTarefa, setFiltroTarefa] = useState('');
    const [list, setList] = useState(['']);
    const [loadTask, setLoadTask] = useState(true);
    const [totalItens, setTotalItens] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [orderAsc, setOrderAsc] = useState(false);
    const [orderDesc, setOrderDesc] = useState(false);
    

    useEffect(() => {

        function handleList() {
            const listaDB = localStorage['tarefas'];
            let listaTarefas = listaDB ? JSON.parse(listaDB) : [];
            //filtrar
            listaTarefas = listaTarefas.filter(
                t => t.name.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
            );
            //ordenar
            if (orderAsc) {
                listaTarefas.sort((t1, t2) => (t1.name.toLowerCase() > (t2.name.toLowerCase()) ? 1 : -1));

            } else {
                listaTarefas.sort((t1, t2) => (t1.name.toLowerCase() < (t2.name.toLowerCase()) ? 1 : -1));

            }
            //paginar
            setTotalItens(listaTarefas.length);
            //LOGICA DO SPLICE: primeiro parametro é o inicio do splice pelo indice, segundo parametro
            //quantos indices serão exibidos
            setList(listaTarefas.splice((paginaAtual - 1) * ITENS_POR_PAG, ITENS_POR_PAG));



        }
        if (loadTask) {
            handleList();
            setLoadTask(false);

        }


    }, [loadTask, paginaAtual, orderAsc, orderDesc, filtroTarefa]);

    function handleMudarPagina(pagina) {

        setPaginaAtual(pagina);
        setLoadTask(true);
    }

    function handleOrder(e) {

        e.preventDefault();

        if (!orderAsc && !orderDesc) {
            setOrderAsc(true);
            setOrderDesc(false);
        } else if (orderAsc) {
            setOrderAsc(false);
            setOrderDesc(true);
        } else {
            setOrderAsc(false);
            setOrderDesc(false);
        }
        setLoadTask(true);

    }

    function handlerFilter(e){
        setFiltroTarefa(e.target.value);
        setLoadTask(true);
    }



    return (
        <div className="text-center">
            <h3>React-Task</h3>
            <Table striped bordered hover responsive data-textid='table'>
                <thead>
                    <tr>
                        <th>
                            <a href="/" onClick={handleOrder}>
                                Tarefa
                                &nbsp;
                                <Order ordenacaoUp={orderAsc} ordenacaoDown={orderDesc} />
                            </a>

                        </th>
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
                    <tr>
                        <th>
                            <Form.Control
                                type="text"
                                value={filtroTarefa}
                                onChange={handlerFilter}
                                className="formControl"
                                data-testid="filtro"
                            />
                        </th>
                        <th>
                            <></>
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <ItensListaTarefas
                        tarefas={list}
                        recarregarTarefas={setLoadTask} />


                </tbody>
            </Table>
            <div className="paginacao">
                <Paginacao
                    totalItens={totalItens}
                    itensPorPagina={ITENS_POR_PAG}
                    paginaAtual={paginaAtual}
                    mudarPagina={handleMudarPagina} />
            </div>
        </div>
    )
}
export default ListarTarefas;