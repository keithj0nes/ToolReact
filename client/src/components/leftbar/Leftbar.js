import React from 'react';
import ReactModal from 'react-modal'
import SingleTool from '../Tools/SingleTool/SingleTool'

class LeftBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTools: '',
            showSearchModal: false,
        };
    }
        handleSearchModal = () => {
            this.setState({ showSearchModal: !this.state.showSearchModal})
        }
    handleSubmit = e => {
        e.preventDefault();
        const toolSearch = this.state.searchTools;
        this.props.getToolSearch(toolSearch)
        this.handleSearchModal()
    }

    render () {
        const {results} = this.props
        return (
            <>
            <div>
            <div style={searchBar}>
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                       className="input" 
                       id="search"
                       key={this.searchTools}
                       onChange={(e) => this.setState({searchTools: e.target.value})}
                       placeholder="Enter Tool Number" 
                       style={searchText}
                       />
                <button className="searchEx" style={searchButton}>Search</button>
                </form>
            </div>
            </div>
            <ReactModal isOpen={this.state.showSearchModal}
                        style={searchModal}>
                     <SingleTool key={results._id}
                                tool={results}
              handleBroken={this.props.handleBroken}
              handleMissing={this.props.handleMissing}
              handleCheckOut={this.props.handleCheckOut}
              comment={this.props.comment}
              deleteTool={this.props.deleteTool}/>
              <button onClick={this.handleSearchModal} style={closeSearch}>Close</button>
            </ReactModal>
            </>
        );
    }

}
const closeSearch = {
    height: '25px',
}
const searchBar = {
    display: 'flex',
    flexDirection: 'column',
}
const searchButton = {
    fontSize: '20px',
    width: 'auto',
    height: '30px',
    borderRadius: '.25rem',
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: 'auto',
    padding: '3px 5px 15px 5px',
    marginTop: '8px',
    borderColor: 'black',
    boxShadow: '0px 0px 8px 3px grey',

}
const searchText = {
    borderRadius: '.5rem',
    height: '25px',
    alignSelf: 'center',
    marginLeft: '.5rem',
    width: '200px',
    flexShrink: '3',
    textAlign: 'center',
}

const searchModal = {
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
      },
      content: {
        position: 'fixed',
        top: 150,
        left: 450,
        right: 450,
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
        flexDirection: 'column',
        alignContent: 'center',
      }
    }

export default LeftBar;