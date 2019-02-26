import React from "react";
import { Button, Modal } from "react-bootstrap";

export default class CatCrudModal extends React.Component {
    constructor(props) {
        super(props);
        this.hideModal = this.hideModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            show : false,
            value : {
                categoryId : '',
                name : '',
                categoryName : ''
            },
            isEdit : undefined
        }
    }

    componentWillMount(){
        console.log(this.props.isEdit)
        if(this.props.isEdit){
            this.update();
        }else{
            if (this.props.showModal) {
                this.setState({
                    show : true 
                })
            }
        }
    }
    
    componentWillReceiveProps() {
        this.update();
    }

    update(){
        this.setState({
            show: true,
            value: {...this.props.value,categoryName : this.props.value.name },
            isEdit: this.props.isEdit
        });
        console.log({...this.props.value,categoryName : this.props.value.name})
    }

    handleClose(event) {
        event.preventDefault();
        this.setState({
            show: false
        });

        this.props.onModalSubmit({
            data : this.state.value,
            isEdit : this.state.isEdit
        });

    }

    hideModal() {
        this.setState({
            show: false
        });
        this.props.closePopUp();
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.props.showModal && this.state.show}
                    onHide={this.hideModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            {this.state.isEdit ? 
                                <div className="form-group">
                                    <label>Name: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Category Name" 
                                        onChange={(input)=>{
                                                let val = input.target.value;
                                                this.setState(prevState =>{
                                                    prevState.value.categoryName = val;
                                                    prevState.value.name = val; 
                                                });
                                            }
                                        } 
                                        defaultValue={
                                            this.state.value.name
                                        }
                                    />
                                </div>
                            : 
                                <div>
                                <div className="form-group">
                                <label className="control-label col-sm-2">ID:</label>
                                    <div className="col-sm-10">
                                        <input 
                                            type="numer" 
                                            className="form-control" 
                                            placeholder="Category ID" 
                                            onChange={(input)=>{
                                                    let val = input.target.value;
                                                    this.setState(prevState =>{
                                                        console.log(prevState)
                                                        prevState.value.categoryId = val;
                                                    });
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-2">Name:</label>
                                    <div className="col-sm-10">          
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Category Name" 
                                            onChange={(input)=>{
                                                    let val = input.target.value;
                                                    this.setState(prevState =>{
                                                        prevState.value.categoryName = val;
                                                    });
                                                }
                                            }    
                                        />
                                    </div>
                                </div>
                                </div>
                            }
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{
                                this.setState({show:false})
                                this.props.closePopUp();
                            }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
