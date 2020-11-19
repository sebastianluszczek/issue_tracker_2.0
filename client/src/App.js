import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Home from './pages/Home';
import About from './pages/About';
import MenuBar from './components/layout/MenuBar';

import { IssueState } from './context/issue/issue.context';

function App() {
  return (
    <div className='App'>
      <IssueState>
        <Router>
          <Container>
            <MenuBar />
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
          </Container>
        </Router>
      </IssueState>
    </div>
  );
}

export default App;
