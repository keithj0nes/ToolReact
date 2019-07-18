import React from 'react';
import ToolView from './ToolView';

class Tools extends React.Component {
    render() {
        console.log(this.props.tool)
        return (this.props.tool.map((tool) => (
            <ToolView
                key={tool.toolNumber}
                tool={tool} 
                broken={this.props.broken}
                missing={this.props.missing}
                checkOut={this.props.checkOut}
                comment={this.props.comment}
        />))) ; 
    }
}
export default Tools; 