import React from 'react';
import CreatePoll from './CreatePoll';
import ShowPoll from './ShowPoll';
import ResultPoll from './ResultPoll';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// Route vers les différentes sections du site
const App = () => (
    <Router>
        <Header />
        <Route path="/" exact component={CreatePoll} />
        <Route path="/:id" exact component={ShowPoll} />
        <Route path="/:id/results" exact component={ResultPoll} />
        <Footer />
    </Router>
);

export default App;
