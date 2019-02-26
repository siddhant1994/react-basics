import React from "react";
import axios from "axios";
import Loader from "../common/Loader";
import Config from "../common/Config";
import CategoryDropdown from "../common/CategoryDropdown";
import SubcatCrudModal from "../Modals/Subcategory/SubcatCrudModal";

export default class Subcategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
        this.modalSubmit = this.modalSubmit.bind(this);
    }

    componentDidMount() {
        let self = this;
        this.setState({
            loading: true
        });
        axios
            .request({
                url: Config.BASE_URL + "/categories",
                method: "get",
                headers: {
                    customheader: true
                }
            })
            .then(function(res) {
                self.setState({
                    categories: res.data.categories ? res.data.categories : [],
                    loading: false
                });
            })
            .catch(function(err) {

                self.setState({
                    categories: [],
                    loading: false
                });
            });
    }
    onChange(e) {
        let catId = e.target.value;
        let self = this;
        this.setState({
            loading: true,
            defaultOption : catId
        });
        axios
            .request({
                url: Config.BASE_URL + "/subcategories/" + catId,
                method: "get",
                headers: {
                    customheader: true
                }
            })
            .then(function(res) {
                self.setState({
                    subcategories: res.data.subcategories
                        ? res.data.subcategories
                        : [],
                    loading: false
                });
            })
            .catch(function(err) {

                self.setState({
                    categories: [],
                    loading: false
                });
            });
    }
    modalSubmit(data) {
        this.props.closePopUp();
        this.setState({
            loading: true
        });

        if (data.isEdit) {
            return this.updateSubcategory(data.data);
        } else {
            return this.addSubcategory(data.data);
        }
    }
    updateSubcategory(data) {
        let self = this;
        axios
            .request({
                url: Config.BASE_URL + "/subcategories/" + data.catId,
                data: data,
                headers: {
                    customheader: true
                },
                method: "PUT"
            })
            .then(res => {
                self.setState(prevState => {
                    let subcategories = prevState.subcategories.map(item => {
                        if (item.subcategoryId === data.subcategoryId) {
                            item = data;
                        }
                        return item;
                    });

                    return {
                        subcategories: subcategories,
                        loading: false
                    };
                });
            })
            .catch(function(err) {

                self.setState({
                    subcategories: [],
                    loading: false
                });
            });
    }
    addSubcategory(data) {
        let self = this;
        data = {
            ...data,
            categoryId: data.catId
        };
        axios
            .request({
                url: Config.BASE_URL + "/subcategories",
                method: "POST",
                data: data,
                headers: {
                    customheader: true
                }
            })
            .then(function(res) {
                self.onChange({
                    target: {
                        value: data.catId
                    }
                });
                self.setState({
                    defaultOption : data.catId
                })
            });
    }
    formatDate(date) {
        date = new Date(parseInt(date));
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        var d_split = date.toString().split(" ");

        if (dd < 10) {
            dd = "0" + dd;
        }

        if (mm < 10) {
            mm = "0" + mm;
        }
        return mm + "-" + dd + "-" + yyyy + " " + d_split[4];
    }
    render() {
        let self = this;
        return (
            <div>
                <CategoryDropdown
                    options={this.state.categories ? this.state.categories : []}
                    onChange={this.onChange}
                    default = {this.state.defaultOption ?
                        this.state.defaultOption :
                        null 
                    }
                />
                <div>
                    <button
                        className="btn btn-info"
                        onClick={() => {
                            self.props.showPopUp(
                                <SubcatCrudModal
                                    showModal={true}
                                    onModalSubmit={self.modalSubmit}
                                    isEdit={false}
                                    closePopUp={self.props.closePopUp}
                                    options={self.state.categories}
                                    default = {this.state.defaultOption ?
                                        this.state.defaultOption :
                                        null 
                                    }
                                />
                            );
                        }}
                    >
                        Add
                    </button>
                </div>
                {this.state.subcategories ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Created At</td>
                                <td>Edited at</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.subcategories.map(function(item, key) {
                                return (
                                    <tr key={key}>
                                        <td>{item.subcategoryId}</td>
                                        <td>{item.name}</td>
                                        <td>{self.formatDate(item.createdTime)}</td>
                                        <td>{self.formatDate(item.modifiedTime)}</td>
                                        <td>
                                            <button
                                                className="btn btn-info"
                                                onClick={() =>
                                                    self.props.showPopUp(
                                                        <SubcatCrudModal
                                                            showModal={true}
                                                            options={
                                                                self.state
                                                                    .categories
                                                            }
                                                            onModalSubmit={
                                                                self.modalSubmit
                                                            }
                                                            value={item}
                                                            isEdit={true}
                                                            closePopUp={
                                                                self.props
                                                                    .closePopUp
                                                            }
                                                        />
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button className="btn btn-warning">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : null}
            </div>
        );
    }
}
