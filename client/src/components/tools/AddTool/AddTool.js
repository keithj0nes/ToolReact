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
            this.props.createTool(this.state.toolNumber, this.state.description)
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