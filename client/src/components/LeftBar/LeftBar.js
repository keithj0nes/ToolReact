import React from 'react';

class LeftBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTools: '',
        };
    }

    handleChange = (e) => {
        this.setState({searchTools: e.target.value}, () => {
            const {searchTools} = this.state;
            this.props.getToolSearch(searchTools)})
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({searchTools: ''})
    }

    render () {
      
        return (
            
            <div>
            <div style={searchBar}>
            <form onSubmit={this.onSubmit}>
                <input type="text" 
                       className="input" 
                       id="search"
                       value={this.searchTools}
                       onChange={this.handleChange}
                       placeholder="Enter Tool Number" 
                       style={searchText}
                       />
                <button className="searchEx" style={searchButton}>Search</button>
                </form>
            </div>
            </div>
        );
    }

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

export default LeftBar;