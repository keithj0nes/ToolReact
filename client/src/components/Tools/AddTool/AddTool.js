import React from 'react';
import ReactModal from 'react-modal';
import './AddTool.css';

const initialState = {
    showAddToolModal: false,
    chevrolet: false,
    corvette: false,
    volt: false,
    spark: false,
    buick: false,
    gmc: false,
    cadillac: false,
    mediumDuty: false,
    essential: false,
    recommended: false,
    location: '',
    notes: '',
    quantity: 1,

};
class AddTool extends React.Component {

   state = initialState;

    handleAddToolModal = () => {
        this.setState({ showAddToolModal: !this.state.showAddToolModal});
    }



    handleSubmit = e => {
        e.preventDefault();
        const newTool = {...this.state}
        delete newTool.showAddToolModal;
        this.props.createTool(newTool)
        this.handleAddToolModal();
        this.setState(initialState);
    }

    render() {
        return (
            <div>
                <button onClick={this.handleAddToolModal} 
                        style={openModal}> 
                    Add Tool 
                </button>

                <ReactModal isOpen={this.state.showAddToolModal}
                            contentLabel="Add Tools Modal"
                            style={addToolsStyle}
                            >
                    <div className="card-add-tool">

                    <form onSubmit={this.handleSubmit} 
                          className="addToolForm">

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

                    <input type="number"
                              name="quantity"
                              key={this.quantity}
                              className="descriptionStyle"
                              value={this.state.quantity}
                              onChange={(e) => this.setState({quantity: e.target.value})}/>

                    <textarea type="text" 
                              name="location"
                              placeholder="Location" 
                              key={this.location}
                              className="descriptionStyle" 
                              onChange={(e) => this.setState({location: e.target.value})}/>

                    <textarea type="text" 
                              name="notes"
                              placeholder="Notes" 
                              key={this.notes}
                              className="descriptionStyle" 
                              onChange={(e) => this.setState({notes: e.target.value})}/>
                    <div className="addTool-checkboxes">
                    <label>Chevrolet</label>

                    <input type="checkbox" 
                           name="chevrolet" 
                           key={this.chevrolet}
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
                           defaultChecked={this.state.false}
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
                    </div>
                    <button>
                        Submit
                    </button>

                    <button onClick={this.handleAddToolModal} 
                            className="cancelButton button">
                        Cancel
                    </button>
                    </form>
                    </div>
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
      }
}
const openModal = {
    alignContent: 'center',
    marginLeft: '30px',
    fontSize: '30px',
    color: 'blue',
} 

export default AddTool