import React from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import './App.css'
import SingleTool from '../../components/Tools/SingleTool/SingleTool'
import Header from '../../components/Header/Header'
import LeftBar from '../../components/LeftBar/LeftBar'
import AddTool from '../../components/Tools/AddTool/AddTool'

Modal.setAppElement('#root')

class App extends React.Component {
  state = {
    tools: [],
    results: [],
    intervalIsSet: false,
    idToDelete: null,
    objectToUpdate: null,
  };

    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
          let interval = setInterval(this.getDataFromDb, 1000);
          this.setState({ intervalIsSet: interval });
        }
      }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
      }

    getDataFromDb = () => {
        fetch('http://localhost:3001/api/getData')
          .then((tools) => tools.json())
          .then((res) => this.setState({ tools: res.tools }));
      };

    handleBroken = (tool) => {
          console.log(tool, "old Tool")
          const newTool = {...tool, broken : !tool.broken}
          console.log(newTool, "new Tool")
          axios.put('http://localhost:3001/api/brokenUpdate', {
          tool: newTool})
          .then(res => console.log(res))
          .catch(err => console.log(err));
          console.log(newTool)
         }   
    handleCheckOut = (tool) => {
          const newTool = {...tool, checkOut : !tool.checkOut}
          axios.put('http://localhost:3001/api/brokenUpdate', {
          tool: newTool})
          .then(res => console.log(res))
          .catch(err => console.log(err));
          console.log(newTool)
         }
    handleMissing = (tool) => {
          const newTool = {...tool, missing : !tool.missing}
          axios.put('http://localhost:3001/api/brokenUpdate', {
          tool: newTool})
          .then(res => console.log(res))
          .catch(err => console.log(err));
          console.log(newTool)
         }      
    
    deleteTool = (_id) => {
      console.log("Deleted")
      axios.delete('http://localhost:3001/api/deleteTool', {
       params: {_id: _id }})
        .then(res => console.log(res))
    };

    createTool = (tool) => {
      console.log(tool)
      axios.post('http://localhost:3001/api/createTool', tool)
      .then(res => console.log(res))
    };
    getToolSearch = (toolSearch) => {
      console.log(toolSearch)
      axios.get('http://localhost:3001/api/searchTools', {params: {toolSearch}})

        .then((res) => this.setState({ results: res.data.results }));
        console.log(this.state.results)

    };

render() {
  return (

      <div className="app">
          <div className="header">
              <Header/>
          </div>

          <div className="belowheader">
          
          <div className="leftBar col">
              <LeftBar getToolSearch={this.getToolSearch}
                        results={this.state.results}
                        handleBroken={this.handleBroken}
                        handleMissing={this.handleMissing}
                        handleCheckOut={this.handleCheckOut}
                        comment={this.comment}
                        deleteTool={this.deleteTool}
              />
              <AddTool createTool={this.createTool}/>
          </div>

          <div className="main col">
                    { this.state.tools.map(tool => { 
                      return <SingleTool key={tool._id}
                                       tool={tool} 
                                       handleBroken={this.handleBroken}
                                       handleMissing={this.handleMissing}
                                       handleCheckOut={this.handleCheckOut}
                                       comment={this.comment}
                                       deleteTool={this.deleteTool}/>
                            }
                          )
                        }
                  </div>
                </div>
              </div>
          );
        }
      }


export default App;
