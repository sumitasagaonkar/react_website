import logo from './logo.svg';
import './App.css';
import React from "react";
import HomeApp from './HomeApp'
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { PageHeader } from 'antd';
class App extends React.Component{
  render(){
    return(
      <div> 
      
       
        <HomeApp/>
      </div>
    );
  }
}

export default App;
