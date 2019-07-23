import React from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import './App.css'
import ToolView from './components/tools/viewTools/ToolView'
import Header from './components/header/header'
import Leftbar from './components/leftbar/Leftbar'
import AddTools from './components/tools/addTools/AddTools'


class App extends React.Component {
  state = {
    tools: [],
    intervalIsSet: false,
    idToDelete: null,
    objectToUpdate: null,
  };

    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
          let interval = setInterval(this.getDataFromDb, 5000);
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

    missing = (_id) => {
      this.setState({ tools: this.state.tools.map(tool => {
        if(tool._id === _id && tool.broken === false) {
          tool.missing = !tool.missing
         }
          return tool
        })});
      } 

    broken = (tool) => {
          console.log("Not yet")
          axios.put('http://localhost:3001/api/brokenUpdate', {
          params: {tool: tool}})
          .then(res => console.log(res))
          .catch(err => console.log(err));
          console.log('complete')
         }   

    checkOut = (_id) => {
      console.log(this.props.tool.checkOut);
      this.setState({ tools: this.state.tools.map(tool => {
        if(tool._id === _id) {
          tool.checkOut = !tool.checkOut
        }
          return tool;
      })});
    } 

    comment = (_id) => {
      this.setState({ tools: this.state.tools.map(tool => {
        if(tool._id === _id) {
          tool.comment = Comment
        }
        return tool;
      })})
    }

    deleteTool = (_id) => {
      console.log("Deleted")
      axios.delete('http://localhost:3001/api/deleteTool', {
       params: {_id: _id }})
        .then(res => console.log(res))
    };

    createTool = (toolNumber, description) => {
      console.log(toolNumber, description)
      axios.post('http://localhost:3001/api/createTool', {
        toolNumber: toolNumber,
        description: description,
      })
      .then(res => console.log(res))
    };

render() {
  return (

      <div className="app">
          <div className="header">
              <Header/>
          </div>

          <div className="belowheader">
          
          <div className="leftBar col">
              <Leftbar />
              <AddTools createTool={this.createTool}/>
          </div>

          <div className="main col">
                    { this.state.tools.map(tool => { 
                      return <ToolView key={tool._id}
                                       tool={tool} 
                                       broken={this.broken}
                                       missing={this.missing}
                                       checkOut={this.checkOut}
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
