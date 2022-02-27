import React from 'react';
import './App.css';
import {Main} from "./Main";
import {store} from "./bll/store";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import {RoutesComponent} from "./ui/routes/Routes";

const App = () => {
    return (
        <div className="App">
            <Provider store={store}>
                <HashRouter>
                    <Main/>
                    <RoutesComponent/>
                </HashRouter>
            </Provider>
        </div>
    );
};

export default App;
