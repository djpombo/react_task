import React from "react";
import  ReactDOM  from "react-dom";
import CadastrarTarefas from "./index";

describe('teste do componente de Cadastrar as tarefas', ()=>{

    it('deve renderizar o componente sem erros', ()=>{
        const div = document.createElement('div');//cria a div
        ReactDOM.render(<CadastrarTarefas />, div);//tenta renderizar o componente nesta div
        ReactDOM.unmountComponentAtNode(div);
    })

})