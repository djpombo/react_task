import React from "react";
import  ReactDOM  from "react-dom";
import ListarTarefas from "./index";

describe('teste do componente de Listar as tarefas', ()=>{

    it('deve renderizar o componente sem erros', ()=>{
        const div = document.createElement('div');//cria a div
        ReactDOM.render(<ListarTarefas />, div);//tenta renderizar o componente nesta div
        ReactDOM.unmountComponentAtNode(div);
    })

})