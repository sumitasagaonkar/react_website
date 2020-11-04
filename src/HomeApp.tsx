import { Row, Col } from 'antd';

import React from "react";
import "./css/custom.css"



export interface Iprops {

}

export interface Istate {
    dummy: string;
    isloading: boolean;
    isAddStockModalOpen: boolean;
    isUpdateOn: boolean;

}

export interface IResult {
    ID: string;
    ProductName: string;
    Quantity: string;
    [key: string]: string;
}


class HomeApp extends React.Component<Iprops, Istate>{
    private resultList: IResult[] = [];
    private currentlist: IResult;
    private Selectedlist: IResult;
    constructor(props: Iprops) {
        super(props);
        this.state = {
            dummy: "",
            isloading: true,
            isAddStockModalOpen: false,
            isUpdateOn: false

        }
        this.currentlist = this.getEmpty();
        this.Selectedlist = this.getEmpty();
    }

    private getEmpty = () => {
        const retval: IResult = {
            ID: "",
            ProductName: "",
            Quantity: ""

        };
        return retval;
    }

    public async componentDidMount() {
        this.getdata();

    }

    public getdata = () => {
        this.setState({ isloading: true });

        fetch("http://sumit.com/api/getvalues", {
            method: 'GET',
            // mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            }

        })
            .then(res => res.json())
            .then((data) => {
                console.log("data from api ", data);
                this.resultList = [...data.result]
                console.log("datain result list", this.resultList);
                this.setState({ isloading: false });




            },
                (error) => {

                    console.log(error);

                })

    }

    public render() {
        return (
            <div>
                <div>

                    <div className="row">
                        {this.state.isloading ?

                            <h1> loading</h1>
                            :
                            this.renderItem()
                        }
                    </div>




                </div>

                <div className="row">
                    {this.renderrText()}

                </div>


            </div>


        );

    }

    public renderrText = () => {
        return (
            <div>

                {this.state.isUpdateOn ?
                    <div className="stock-card">
                        <input type="text" name="ProductName" value={this.Selectedlist.ProductName} onChange={(e) => this.handleInputUpdateChange(e.target.name, e.target.value)}></input>

                        <input type="text" name="Quantity" value={this.Selectedlist.Quantity} onChange={(e) => this.handleInputUpdateChange(e.target.name, e.target.value)} ></input>
                        <button
                            onClick={this.UpdateStock}
                        >
                            Update stock
                        </button>
                    </div>

                    :
                    <div className="stock-card">
                        <input type="text" name="ProductName" value={this.currentlist.ProductName} onChange={(e) => this.handleInputChange(e.target.name, e.target.value)}></input>

                        <input type="text" name="Quantity" value={this.currentlist.Quantity} onChange={(e) => this.handleInputChange(e.target.name, e.target.value)} ></input>

                        <button
                            onClick={this.AddStock}
                        >
                            Add Stock
                        </button>
                    </div>

                }
            </div>
        );
    }



    // All public method start here
    public renderItem = () => {
        return (




            <div className="row">

                {this.resultList.map(this.renderList)}

            </div>



        );
    }
    public renderList = (item: IResult, index: number) => {
        return (

            <div className="column">
                <div className="card" onClick={() => { this.renderCLick(item) }}>

                    <div className="container">
                        <h4><b>{item.ProductName}</b></h4>
                        <p>{item.Quantity}</p>
                    </div>
                </div>
            </div>


        );

    }
    public renderCLick = (item: IResult) => {
        this.Selectedlist = item;
        this.setState({ isUpdateOn: true });
        this.forceUpdate();



    }
    public UpdateStock = () => {
        console.log("click");
        fetch(`http://sumit.com/api/updateValue?id=${this.Selectedlist.ID}`, {
            method: 'PUT',
            //  mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                name: this.Selectedlist.ProductName,
                value: this.Selectedlist.Quantity
            })
        })
            .then(res => res.json())
            .then((result) => {
                console.log(" log", result);
                this.currentlist = this.getEmpty();




            },
                (error) => {

                    console.log(error);

                })



        this.getdata();
        this.forceUpdate();

    }
    public AddStock = () => {
        console.log("click");
        fetch("https://localhost:44310/api/insertvalue", {
            method: 'POST',
            //  mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                name: this.currentlist.ProductName,
                value: this.currentlist.Quantity
            })
        })
            .then(res => res.json())
            .then((result) => {
                console.log(" log", result);
                this.currentlist = this.getEmpty();




            },
                (error) => {

                    console.log(error);

                })



        this.getdata();
        this.forceUpdate();




    }
    public OpenAddStockModal = () => {
        return (
            <h1>hello</h1>
        );

    }
    public handleInputChange = (name: string, value: any) => {
        this.currentlist[name] = value;
        this.forceUpdate();
        console.log(this.currentlist.ProductName);

        // alert(this.currentlist);


    };
    public handleInputUpdateChange = (name: string, value: any) => {
        this.Selectedlist[name] = value;
        this.forceUpdate();
        console.log(this.Selectedlist.ProductName);

    }
}
export default HomeApp