import { render, screen } from '@testing-library/react';
import GerenciadorTarefas from './Gerenciador-tarefas';
import ReactDOM from 'react-dom';


it('deve renderizar o projeto sem erros', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GerenciadorTarefas />, div);
  ReactDOM.unmountComponentAtNode(div);
});
