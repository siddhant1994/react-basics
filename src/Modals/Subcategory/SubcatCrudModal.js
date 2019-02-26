import React from "react";
import { Button, Modal } from "react-bootstrap";
import CategoryDropdown from "../../common/CategoryDropdown";

export default class CatCrudModal extends React.Component {
    constructor(props) {
        super(props);
        this.hideModal = this.hideModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            show : false,
            isEdit : undefined,
            value : {
                name:'',
                catId:'',
                subcategoryName:''
            }
        }
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount(){
        
        if(this.props.isEdit){
            this.update();
        }else{
            this.setState({
                show : true,
                value :{...this.state.value, catId : this.props.default ? this.props.default : null} 
            })
        }
    }
    
    componentWillReceiveProps() {
        this.update();
    }

    update(){
        this.setState({
            show: true,
            isEdit: this.props.isEdit,
            value: {...this.props.value,subcategoryName : this.props.value.name },
        });
    }

    handleClose(event) {
        event.preventDefault();
        this.setState({
            show: false
        });

        this.props.onModalSubmit({
            isEdit : this.state.isEdit,
            data : this.state.value
        });

    }

    hideModal() {
        this.setState({
            show: false
        });
        this.props.closePopUp();
    }

    onChange(e){
        let catId = e.target.value
        this.setState((prevState)=>{
            return {
                value : {...prevState.value,catId:catId} 
            }
        })
    }


    render() {
        
        return (
            <div>
                <Modal
                    show={this.state.show}
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
                                        placeholder="Subcategory Name"
                                        defaultValue={
                                            this.state.value.name
                                        } 
                                        onChange={(input)=>{
                                            let val = input.target.value;
                                            this.setState(prevState =>{
                                                prevState.value.subcategoryName = val;
                                                prevState.value.name = val;                                            
                                            });
                                        }
                                    }  
                                    />
                                </div>
                            : 
                                <React.Fragment>
                                    <div className="form-group">
                                        <label className="control-label">Select Category:</label>
                                        <CategoryDropdown 
                                            options={this.props.options ? this.props.options : []}
                                            onChange={this.onChange}
                                            class={"col-sm-10"}
                                            default = {this.props.default ?
                                                this.props.default :
                                                null 
                                            }
                                        />   
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Name:</label>
                                        <div className="col-sm-10">          
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Subcategory Name" 
                                                onChange={(input)=>{
                                                        let val = input.target.value;
                                                        this.setState(prevState =>{
                                                            prevState.value.subcategoryName = val;
                                                            prevState.value.name = val;                                            
                                                        });
                                                    }
                                                }    
                                            />
                                        </div>
                                    </div>
                                </React.Fragment>
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
