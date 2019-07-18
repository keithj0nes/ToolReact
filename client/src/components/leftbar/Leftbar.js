import React from 'react';
import ToolView from '../tools/viewTools/ToolView';
import Tools from '../tools/viewTools/Tools';
//change loadId import files to match accurate database
class Leftbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            toolNumber: "",
            results: [],
            lines: [],
        };
    }
    render () {
        const { results, toolNumber } = this.state;

        return (
            <div>
            <div style={searchBar}>
                <input type="text" 
                       className="input" 
                       id="search"
                       value={toolNumber}
                       onChange={e => this.onChange(e)}
                       placeholder="Enter Tool Number" 
                       style={searchText}
                       />
                <button className="searchEx" style={searchButton}>Search</button>
            </div>
            <div style={resultStyles}>
                <Results results={results}/>
            </div>
            </div>
        );
    }
onChange({ target: {toolNumber} }) {
    const { id, lines } = this.state;
    this.setState(() => ({ toolNumber}));
    if(lines && id) {
        return this.setState(() => ({
            results: this.search(lines, id, toolNumber),
        }));
    }
    loadId() 
        .then(({ id, lines }) => {
            this.setState(() => ({
                id, 
                lines, 
                results: this.search(lines, id, toolNumber),
            }));
        })
    .catch(err => console.error(err)); 
    }
    search(lines, id, query) {
        return id 
            .search(query.trim())
            .map(match => lines[match.ref]);
    }
}
const Results = ({ results }) => {
    if(results.length) {
        return (
            <ul>
                {results.map((result, i) => 
                <li key={i}>{result}</li>)}
            </ul>
        );
    }
    return <span>No Results</span>;
};
function loadId() {
    return Promise.all([
        import(Tools),
        import(ToolView),
    ]).then(([{ Id }, { id, lines }]) => {
        return {
            id: Id.load(id),
            lines,
        };
    });
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
    marginLeft: '.25rem',
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
const resultStyles = {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '40px',
}

export default Leftbar;