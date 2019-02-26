import React from "react";

export default class CategoryDropdown extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(){
    }

    render() {
        return(
            <div 
                className={(this.props.class ? this.props.class  : "col-sm-4")}
            >
                <select 
                    className="form-control"
                    onChange={this.props.onChange}
                    value={this.props.default ? this.props.default : undefined }
                >
                    <option value={null}>Select Category</option>
                    {
                        this.props.options.map((element,index) => {
                            return (
                                <option key={index} value={element.categoryId}>{element.name}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }
}
