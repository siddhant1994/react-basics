import React from "react";
import axios from "axios";
import Loader from "../common/Loader";
import CatCrudModal from "../Modals/Category/CatCrudModal";
import Config from "../common/Config";

export default class Category extends React.Component {
    constructor(props) {
        super(props);
        // 
        this.state = {
            categories: [],
            loading: false,
            showComponent: false,
            item: {}
        };

        this.modalSubmit = this.modalSubmit.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
    }

    modalSubmit(data) {
        
        this.props.closePopUp();

        this.setState({
            loading: true
        });

        if (data.isEdit) {
            return this.updateCategory(data.data)
        } else {
            return this.addCategory(data.data);
        }
    }

    addCategory(data) {
        let self = this;

        axios
            .request({
                url: Config.BASE_URL + "/categories",
                data: data,
                headers: {
                    customheader: true
                },
                method: "POST"
            })
            .then(res => {
                

                self.setState(prevState => {
                    let categories = prevState.categories.slice();

                    categories.push({
                        name: res.data.categoryName,
                        categoryId: res.data.categoryId,
                        createdTime: Date.now(),
                        modifiedTime: Date.now()
                    });

                    

                    return {
                        categories: categories,
                        loading: false
                    };
                });
            })
            .catch(function(err) {
                

                self.setState({
                    categories: [],
                    loading: false
                });
            });
    }

    updateCategory(data){
        let self = this;
        
        axios
            .request({
                url: Config.BASE_URL + "/categories/"+data.categoryId,
                data: data,
                headers: {
                    customheader: true
                },
                method: "PUT"
            })
            .then(res => {

                self.setState(prevState => {

                    let categories = prevState.categories.map((item) => {
                        if (item.categoryId === data.categoryId) {
                            item = data
                        }
                        return item
                    })

                    

                    return {
                        categories: categories,
                        loading: false
                    }

                });
            })
            .catch(function(err) {
                

                self.setState({
                    categories: [],
                    loading: false
                });
            });
    }

    deleteRow(value) {
        this.setState(prevState => {
            let categories = prevState.categories.filter(item => {
                if (item.categoryId === value.categoryId) return false;
                return item;
            });

            

            return {
                ...prevState,
                categories: categories
            };
        });
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
                <div>
                    <button
                        className="btn btn-info"
                        onClick={() => {
                            self.props.showPopUp(
                                <CatCrudModal
                                    showModal={true}
                                    onModalSubmit={self.modalSubmit}
                                    isEdit={false}
                                    closePopUp={self.props.closePopUp}
                                />
                            );
                        }}
                    >
                        Add
                    </button>
                </div>
                {this.state.loading && false ? <Loader /> : ""}
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
                        {this.state.categories &&
                            this.state.categories.map(function(item, key) {
                                return (
                                    <tr key={key}>
                                        <td>{item.categoryId}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            {self.formatDate(item.createdTime)}
                                        </td>
                                        <td>
                                            {self.formatDate(item.modifiedTime)}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-info"
                                                onClick={() =>
                                                    self.props.showPopUp(
                                                        <CatCrudModal
                                                            showModal={true}
                                                            onModalSubmit={
                                                                self.modalSubmit
                                                            }
                                                            value={item}
                                                            isEdit={true}
                                                            closePopUp={self.props.closePopUp}
                                                        />
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() =>
                                                    self.deleteRow(item)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}
