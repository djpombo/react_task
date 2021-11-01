import ReactDOM from 'react-dom';
import AtualizarTarefas from './index';
import '@testing-library/jest-dom/extend-expect';


describe('deve renderizar o update das tarefas sem erros', ()=>{
    it('deve renderizar o componente sem erros', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<AtualizarTarefas id={1}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    

})