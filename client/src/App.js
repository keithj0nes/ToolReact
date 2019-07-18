import React from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import './App.css'
import Tools from './components/tools/viewTools/ToolView'
import Header from './components/header/header'
import Leftbar from './components/leftbar/Leftbar'
import AddTools from './components/tools/addTools/AddTools'



class App extends React.Component {
  state = {
    tools:[{
    id: '',
    toolNumber: '',
    description: '',
    usedCount: 0,
    checkOut: false,
    broken: false,
    missing: false,
    comments: '',
    }],
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
    missing = (id) => {
      this.setState({ tools: this.state.tools.map(tool => {
        if(tool.id === id && tool.broken === false) {
          tool.missing = !tool.missing
         }
          return tool
        })});
      } 
    broken = (id) => {
      this.setState({ tools: this.state.tools.map(tool => {
        if(tool.id === id && tool.missing === false) {
          tool.broken = !tool.broken
         }
          return tool;
        })});
      }   
    checkOut = (id) => {
      this.setState({ tools: this.state.tools.map(tool => {
        if(tool.id === id) {
          tool.checkOut = !tool.checkOut
        }
          return tool;
      })});
    } 
    comment = (id) => {
      this.setState({ tools: this.state.tools.map(tool => {
        if(tool.id === id) {
          tool.comment = Comment
        }
        return tool;
      })})
    }

    putDataToDB = (toolNumber, description) => {
      console.log(Tools)
      let currentIds = this.state.tools.map((tools) => tools.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }
      axios.post('http://localhost:3001/api/putData', {
        id: idToBeAdded,
        toolNumber: toolNumber,
        description: description,
        usedCount: this.state.usedCount,
        checkOut: this.state.checkOut,
        broken: this.state.broken,
        missing: this.state.missing,
        comments: this.state.comments,
      });
    };
render() {
  return (
    <div className="app">
      <div className="header">
        <Header />
      </div>
      <div className="belowheader">
      <div className="leftBar col">
        <Leftbar />
        <AddTools 
                  putDataToDB={this.putDataToDB}
        />
      </div>
      <div className="main col">
        <React.Fragment>
          <Tools tool={this.state.tools}
                 broken={this.broken}
                 missing={this.missing}
                 checkOut={this.checkOut}
                 comment={this.comment}
                 />
        </React.Fragment>
      </div>
      </div>
    </div>
  );
}
}


export default App;
