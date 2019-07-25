import React from 'react';
import ReactModal from 'react-modal';

class AddTool extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddToolModal: false,

        };

        this.handleOpenAddToolModal = this.handleOpenAddToolModal.bind(this);
        this.handleCloseAddToolModal = this.handleCloseAddToolModal.bind(this);
    }

    handleCloseAddToolModal () {
        this.setState({ showAddToolModal: false});
    }

    handleOpenAddToolModal () {
        this.setState({ showAddToolModal: true});
    }

    handleSubmit = e => {
        e.preventDefault();
            this.props.createTool(this.state.toolNumber, 
                                  this.state.description, 
                                  this.state.chevrolet,
                                  this.state.corvette,
                                  this.state.volt,
                                  this.state.spark,
                                  this.state.buick,
                                  this.state.gmc,
                                  this.state.cadillac,
                                  this.state.mediumDuty,
                                  this.state.essential,
                                  this.state.recommended)
            this.handleCloseAddToolModal();
            this.setState({ toolNumber: '', description: ''});
    }

    render() {
        return (
            <div>
                <button onClick={this.handleOpenAddToolModal} 
                        style={openModal}> 
                    Add Tool 
                </button>

                <ReactModal isOpen={this.state.showAddToolModal}
                            contentLabel="Add Tools Modal"
                            style={addToolsStyle}
                            >

                    <form onSubmit={this.handleSubmit} 
                          className="addtoolmodal">

                    <textarea type="text"
                              name="toolNumber"
                              key={this.toolNumber}
                              className="toolNumberStyle"
                              onChange={(e) => this.setState({toolNumber: e.target.value})}/>

                    <textarea type="text" 
                              name="description"
                              placeholder="Description" 
                              key={this.description}
                              className="descriptionStyle" 
                              onChange={(e) => this.setState({description: e.target.value})}/>
                    <label>Chevrolet</label>
                    <input type="checkbox" 
                           name="chevrolet" 
                           key={this.chevrolet}
                           defaultChecked={(e) => this.setState({chevrolet: false})}
                           onChange={(e) => this.setState({chevrolet: e.target.checked})}
                           />
                           <label>Corvette</label>
                    <input type="checkbox" 
                           name="corvette" 
                           key={this.corvette}
                           onChange={(e) => this.setState({corvette: e.target.checked})}
                           />
                           <label>Volt</label>
                    <input type="checkbox" 
                           name="volt" 
                           key={this.volt}
                           onChange={(e) => this.setState({volt: e.target.checked})}
                           />
                           <label>Spark</label>
                    <input type="checkbox" 
                           name="spark" 
                           key={this.spark}
                           onChange={(e) => this.setState({spark: e.target.checked})}
                           />
                           <label>Buick</label>
                    <input type="checkbox" 
                           name="buick" 
                           key={this.buick}
                           onChange={(e) => this.setState({buick: e.target.checked})}
                           />
                           <label>GMC</label>
                    <input type="checkbox" 
                           name="gmc" 
                           key={this.gmc}
                           onChange={(e) => this.setState({gmc: e.target.checked})}
                           />
                           <label>Cadillac</label>
                    <input type="checkbox" 
                           name="cadillac" 
                           key={this.cadillac}
                           onChange={(e) => this.setState({cadillac: e.target.checked})}
                           />
                           <label>Medium Duty</label>
                    <input type="checkbox" 
                           name="mediumDuty" 
                           key={this.mediumDuty}
                           onChange={(e) => this.setState({mediumDuty: e.target.checked})}
                           />
                           <label>Essential</label>
                    <input type="checkbox" 
                           name="essential" 
                           key={this.essential}
                           onChange={(e) => this.setState({essential: e.target.checked})}
                           />
                           <label>Recommended</label>
                    <input type="checkbox" 
                           name="recommended" 
                           key={this.recommended}
                           onChange={(e) => this.setState({recommended: e.target.checked})}
                           />

                    <button>
                        Submit
                    </button>

                    <button onClick={this.handleCloseAddToolModal} 
                            className="cancelButton button">
                        Cancel
                    </button>
                    </form>
                </ReactModal>
            </div>
        )
    }
} 
const addToolsStyle = {
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        position: 'fixed',
        top: 150,
        left: 300,
        right: 300,
        bottom: 150,
        height: '250px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
      }
}
const openModal = {
    alignContent: 'center',
    marginLeft: '30px',
    fontSize: '30px',
    color: 'blue',
} 

export default AddTool