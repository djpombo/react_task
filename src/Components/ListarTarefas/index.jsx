import React, { useEffect, useState } from 'react';
import { A } from 'hookrouter';



const ListarTarefas = ()=>{

    const [task, setTask] = useState('');
    
    useEffect(()=>{

    }, [])

    return(
     <A href="/cadastrar" className="btn btn-success btn-sm">Nova Tarefa</A>   
    )
}
export default ListarTarefas;