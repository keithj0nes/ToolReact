import React from 'react';
import './SingleTool.css';
import ReactModal from 'react-modal';

class SingleTool extends React.Component {

    constructor(props) {
    super(props);
        this.state = {
            showBrokenModal: false,
            showToolModal: false,
        };

        this.handleOpenModalBroken = this.handleOpenModalBroken.bind(this);
        this.handleCloseModalBroken = this.handleCloseModalBroken.bind(this);
        this.handleCloseToolModal = this.handleCloseToolModal.bind(this);
        this.handleOpenToolModal = this.handleOpenToolModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleCloseToolModal () {
        this.setState({ showToolModal: false});
    }

    handleOpenToolModal () {
        this.setState({ showToolModal: true});
    }

    handleOpenModalBroken () {
        this.setState({ showBrokenModal: true });
    }
      
    handleCloseModalBroken () {
        this.setState({ showBrokenModal: false });
    }

    brokenTag = () => {
       return {
            color: 'red',
            fontSize: '30px',
            display: this.props.tool.broken ?
            '' : 'none',
            textDecorationLine: 'underline',
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: 'red',
            width: '121px',
            marginBottom: 'auto',
            textAlign: 'center',
            alignContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: '-5px',
            marginTop: '5px',
        }
    }

    missingTag = () => {
    return {
         color: 'orange',
         fontSize: '30px',
         display: this.props.tool.missing ?
         '' : 'none',
         textDecorationLine: 'underline',
         borderStyle: 'solid',
         borderWidth: '2px',
         borderColor: 'red',
         width: '121px',
         marginBottom: 'auto',
         textAlign: 'center',
         alignContent: 'center',
         marginLeft: 'auto',
         marginRight: 'auto',
         padding: '-5px',
         marginTop: '5px',
        }
    }

    checkOutTag = () => {
        return {
             color: 'blue',
             fontSize: '30px',
             display: this.props.tool.checkOut ?
             '' : 'none',
             textDecorationLine: 'underline',
             borderStyle: 'solid',
             borderWidth: '2px',
             borderColor: 'red',
             width: '121px',
             marginBottom: 'auto',
             textAlign: 'center',
             alignContent: 'center',
             marginLeft: 'auto',
             marginRight: 'auto',
             padding: '-5px',
             marginTop: '5px',
            }
        }

        brokenTagModal = () => {
            return {
                color: 'red',
                display: this.props.tool.broken ?
                    '' : 'none',
            }
        }

        missingTagModal = () => {
            return {
                color: 'orange',
                display: this.props.tool.missing ?
                    '' : 'none',
            }
        }

        checkOutTagModal = () => {
            return {
                color: 'blue',
                display: this.props.tool.checkOut ?
                    '' : 'none',
            }
        }

        checkedOutClick = () => {
            return {
                backgroundColor: this.props.tool.checkOut ? 'orange' : ''
            } 
        }

        brokenClick = () => {
            return {
                backgroundColor: this.props.tool.broken ? 'red' : '',
            }
        }

        missingClick = () => {
            return {
                backgroundColor: this.props.tool.missing ? 'red' : '',
            }
        }

        checkedOutToolTag = () => {
            return {
                color: this.props.tool.checkOut ? 'red' : 'black'
            }
        }

        shadow = () => {
            return {
                boxShadow: this.props.tool.checkOut ? '0px 0px 8px 5px #f9a990' : '0px 0px 8px 3px grey',
                borderColor: this.props.tool.checkOut ?  '#f9f990' : 'rgba(0, 0, 0, .45)'
            } 
        }

        comment() {
            this.state.comment(this.state.comment)
        }

        onChange = (e) => this.setState({ [e.target.name]: e.target.value });

        onSubmit = (e) => {
            e.preventDefault();
            this.props.comment(this.state.comment);
            this.setState({ comment: ''});
        }

        handleDeleteTool = e => {
            e.preventDefault();
            this.props.deleteTool(this.props.tool._id)
        }

    render() { 
        const { _id, toolNumber, description, comment, usedCount, broken, checkOut } = this.props.tool;




return (
      <>
      <div className="card">
          <div className="card-tool-number">{toolNumber}</div>

          <div className="card-tool-description">{description}</div>

          <div className="card-option-container">

              <div className="card-option">{broken ? 'Yes' : 'No'} <br/> broken</div>
              <div className="card-option">{checkOut ? 'Yes' : 'No'} <br/> available </div>
              <div className="card-option">{usedCount} <br/> uses</div>

          </div>

          <div className="card-checkout" onClick={this.handleOpenToolModal} >
              View Tool
          </div>
      </div>

      <ReactModal 
          isOpen={this.state.showToolModal}
          contentLabel="Tool"
          style={toolModalStyle}
          >

          <div className="toolModal">

              <h1 className="toolNumberStyleModal">{toolNumber}</h1>

              <h2>{description}</h2>

              <h3>{comment}</h3>

              <h4 style={this.checkOutTagModal()}>CHECKED OUT</h4>

              <h4 style={this.brokenTagModal()}>BROKEN</h4>

              <h4 style={this.missingTagModal()}>MISSING</h4>

              <button onClick={() => this.props.broken.bind(this, _id)} 
                      className="brokenButton buttonModal" 
                      style={this.brokenClick()}>
                  Broken
              </button>

              <button onClick={() => this.props.missing.bind(this, _id)} 
                      className="missingButton buttonModal" 
                      style={this.missingClick()}>
                  Missing
              </button>

              <button className="buttonModal" 
                      onClick={this.handleCloseToolModal}>
                  X
              </button>
          </div>
      </ReactModal>

  </>
  )


  
    // return (
    //     <div className="toolStyle" style={this.shadow()}>

    //       <article style={{height: "100%"}}>

    //         <div>

    //             <button onClick={this.handleOpenToolModal} 
    //                     className="toolNumberStyle" 
    //                     style={this.checkedOutToolTag()}>{toolNumber}</button>
    //         </div>

    //         <div className="toolDescriptionStyle">
    //                 {description}
    //         </div>

    //         <div className="buttonsty">
    //             <button onClick={this.props.handleCheckOut.bind(this, this.props.tool)} 
    //                     className="checkOutButton" 
    //                     style={this.checkedOutClick()}> 
    //                 Check Out? 
    //             </button>
    //         </div>

    //             <button onClick={this.handleOpenModalBroken} 
    //                     className="brokenButton">
    //                 Broken or Missing
    //             </button>

    //             <button onClick={this.handleDeleteTool} 
    //                     className="brokenButton">
    //                 Delete
    //             </button>

    //         <div className="usedCountStyle">
    //             <article>Used Count: {usedCount}</article>
    //         </div>

    //             <h3 style={this.brokenTag()} className="brokenStyle">BROKEN</h3>

    //             <h3 style={this.missingTag()} className="brokenStyle">MISSING</h3>

    //         </article>

    //         <ReactModal 
    //                 isOpen={this.state.showToolModal}
    //                 contentLabel="Tool"
    //                 style={toolModalStyle}>

    //                 <div className="toolModal">

    //                     <h1 className="toolNumberStyleModal">{toolNumber}</h1>

    //                     <h2>{description}</h2>

    //                     <h3>{comment}</h3>

    //                     <h4 style={this.checkOutTagModal()}>CHECKED OUT</h4>

    //                     <h4 style={this.brokenTagModal()}>BROKEN</h4>

    //                     <h4 style={this.missingTagModal()}>MISSING</h4>

    //                     <button onClick={this.props.handleBroken.bind(this, this.props.tool)} 
    //                             className="brokenButton buttonModal" 
    //                             style={this.brokenClick()}>
    //                         Broken
    //                     </button>

    //                     <button onClick={this.props.handleMissing.bind(this, this.props.tool)} 
    //                             className="missingButton buttonModal" 
    //                             style={this.missingClick()}>
    //                         Missing
    //                     </button>

    //                     <button className="buttonModal" 
    //                             onClick={this.handleCloseToolModal}>
    //                         X
    //                     </button>
    //                     </div>
    //         </ReactModal>

    //         <ReactModal 
    //                 isOpen={this.state.showBrokenModal}
    //                 contentLabel="Broken or Missing"
    //                 style={brokenModalStyle}>

    //             <form onSubmit={this.onSubmit} 
    //                   className="modalBroken">

    //             <textarea type="text" 
    //                       name="comment"
    //                       placeholder="Description of failure" 
    //                       className="commentStyle" 
    //                       onChange={this.onChange}
    //                       value={this.state.comment}/>

    //             <button onClick={this.props.handleBroken.bind(this, this.props.tool)} 
    //                     className="brokenButton button" 
    //                     style={this.brokenClick()}>
    //                     Broken
    //             </button>

    //             <button onClick={this.props.handleMissing.bind(this, this.props.tool)} 
    //                     className="missingButton button" 
    //                     style={this.missingClick()}>
    //                     Missing
    //             </button>

    //             <input 
    //                 type="submit" 
    //                 value="Submit"
    //                 onClick={this.handleCloseModalBroken} 
    //                 className="submitButton button"/>

    //             <button onClick={this.handleCloseModalBroken} 
    //                     className="cancelButton button">
    //                 Cancel
    //             </button>
    //             </form>
    //         </ReactModal>
    //     </div>
    //     );
    }
}

const brokenModalStyle = {
    overlay: {
        top: 200,
        left: 250,
        right: 250,
        bottom: 250,
        width: '525px',
        height: '100px',
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        position: 'float',
        float: 'center',
        top: 200,
        left: 350,
        right: 350,
        bottom: 200,
        height: '100px',
        width: '525px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '10px'
      }
}
const toolModalStyle = {
    overlay: {
        position: 'fixed',
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

export default SingleTool;