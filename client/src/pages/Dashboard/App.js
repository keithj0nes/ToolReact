import React from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import './App.css'
import './Dashboard.scss';
import SingleTool from '../../components/Tools/SingleTool/SingleTool'
import Header from '../../components/Header/Header'
import LeftBar from '../../components/LeftBar/LeftBar'
import DashboardSidebarNav from '../../components/DashboardSidebarNav/DashboardSidebarNav'

import AddTool from '../../components/Tools/AddTool/AddTool'

Modal.setAppElement('#root')

class App extends React.Component {
  state = {
    tools: [],
    intervalIsSet: false,
    idToDelete: null,
    objectToUpdate: null,

    searchTools: ''
  };

    componentDidMount() {
        this.getDataFromDb();
        // if (!this.state.intervalIsSet) {
        //   let interval = setInterval(this.getDataFromDb);
        //   this.setState({ intervalIsSet: interval });
        // }
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
        .then(res => console.log(res), this.getDataFromDb())
        .catch(err => console.log(err));
    }   

    handleCheckOut = (tool) => {
      const newTool = {...tool, checkOut : !tool.checkOut}

      axios.put('http://localhost:3001/api/brokenUpdate', {tool: newTool})
        .then(res => console.log(res), this.getDataFromDb())
        .catch(err => console.log(err));
    }


    handleMissing = (tool) => {
      const newTool = {...tool, missing : !tool.missing}
      axios.put('http://localhost:3001/api/brokenUpdate', {tool: newTool})
        .then(res => console.log(res), this.getDataFromDb())
        .catch(err => console.log(err));
    }      
    
    deleteTool = (_id) => {
      console.log("Deleted")
      axios.delete('http://localhost:3001/api/deleteTool', {params: {_id: _id }})
        .then(res => console.log(res), this.getDataFromDb())
    };

    createTool = (tool) => {
      console.log(tool)
      axios.post('http://localhost:3001/api/createTool', tool)
        .then(res => console.log(res), this.getDataFromDb())
    };


    getToolSearch = (toolSearch) => {
      console.log(toolSearch)
      axios.get('http://localhost:3001/api/searchTools', {params: {toolSearch}})
        .then((res) => this.setState({ success: true, tools: res.data.results}))
        .catch(err => console.log(err))
        console.log(this.state.tools)
        
    };

    toggleNavSlider = () => {
      this.setState({navSliderVisible: !this.state.navSliderVisible})
    }





    //also added this handleChange which searches... again can be used in a component instead if you want
    handleChange = (e) => {
      this.setState({searchTools: e.target.value}, () => {
          const {searchTools} = this.state;
          this.getToolSearch(searchTools)})
    }
  
// render() {
//   return (

//       <div className="app">
//           <div className="header">
//               <Header/>
//               <button onClick={() => this.setState({navSliderVisible: !this.state.navSliderVisible})}>SHOW HIDE</button>
//           </div>


//           <DashboardSidebarNav {...this.props} navSliderVisible={this.state.navSliderVisible} >
//               {/* <DashboardNav {...this.props} /> */}

//               <div className="leftBar col">
//               <LeftBar getToolSearch={this.getToolSearch}
                       
//               />
//               <AddTool createTool={this.createTool}/>
//           </div>
//           </DashboardSidebarNav>

          
//           {/* <div className="leftBar col">
//               <LeftBar getToolSearch={this.getToolSearch}
                       
//               />
//               <AddTool createTool={this.createTool}/>
//           </div> */}

//           <div className="main col">
//                     { this.state.tools.map(tool => { 
//                       return <SingleTool key={tool._id}
//                                        tool={tool} 
//                                        handleBroken={this.handleBroken}
//                                        handleMissing={this.handleMissing}
//                                        handleCheckOut={this.handleCheckOut}
//                                        comment={this.comment}
//                                        deleteTool={this.deleteTool}/>
//                             }
//                           )
//                         }
//                   </div>
//                 </div>
//           );
//         }


    render() {
      return (

        <div className="dashboard-container">

          <DashboardSidebarNav {...this.props} navSliderVisible={this.state.navSliderVisible} toggleNavSlider={this.toggleNavSlider}>
              <Header />
              <LeftBar getToolSearch={this.getToolSearch} />
              <AddTool createTool={this.createTool}/>
          </DashboardSidebarNav>

          <div className="dashboard-content">

          {/* Added this */}
          {/* this can be created in its own component and just pass the getToolSearch component down just like LeftBar */}
            <div className="search-header">
              <div className="hamburger-container hide-desktop" onClick={this.toggleNavSlider}>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
              </div>

              <div className="search-icon"></div>
              <input type="text" value={this.state.searchTools} onChange={this.handleChange} placeholder="Search Tools"/>

            </div>
          {/* To this */}

            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                { this.state.tools.map(tool => { 
                  return <SingleTool key={tool._id}
                                      tool={tool} 
                                      handleBroken={this.handleBroken}
                                      handleMissing={this.handleMissing}
                                      handleCheckOut={this.handleCheckOut}
                                      comment={this.comment}
                                      deleteTool={this.deleteTool} />
                  })
                }
            </div>
          </div>
        </div>
      );
    }



}

export default App;
