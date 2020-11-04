import { PageHeader, Button, Modal, Input, notification, Popconfirm, Descriptions } from 'antd';
import { Skeleton } from 'antd';
import React from "react";
import "./css/custom.css"
export interface Iprops {
}
export interface Istate {
    dummy: string;
    isloading: boolean;
    isAddStockModalOpen: boolean;
    isUpdateOn: boolean;
    addbtnref: boolean;
    isUpdateStockModalOpen: boolean;
    updbtnref: boolean;
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
            isUpdateOn: false,
            addbtnref: false,
            isUpdateStockModalOpen: false,
            updbtnref: false
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
                <PageHeader
                    className="site-page-header"
                    title="Stock Management"
                    subTitle="stock name and quantity "
                    extra={[

                        <Button key="1" type="primary" onClick={this.OpenAddStckModal}>
                            Add stock
                        </Button>,
                    ]}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
                        <Descriptions.Item label="Association">
                            <a>421421</a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Creation Time">2020-01-10</Descriptions.Item>
                        <Descriptions.Item label="Effective Time">2020-11-10</Descriptions.Item>
                        <Descriptions.Item label="Remarks">
                            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                    </Descriptions>
                </PageHeader>
                {this.state.isloading ?
                    <Skeleton />
                    :
                    this.renderItem()
                }
                {this.state.isAddStockModalOpen ? this.renderAddStockModal() : null}
                {this.state.isUpdateStockModalOpen ? this.renderUpdateStockModal() : null}
            </div>
        );
    }
    public OpenAddStckModal = () => {
        this.setState({ isAddStockModalOpen: true });
    }

    public CloseAddStockModal = () => {
        this.setState({ isAddStockModalOpen: false });
        this.getdata();
    }

    public OpenUpdateStckModal = (item: IResult) => {
        this.Selectedlist = item;
        this.setState({ isUpdateStockModalOpen: true });
    }

    public CloseUpdateStockModal = () => {
        this.Selectedlist = this.getEmpty();
        this.setState({ isUpdateStockModalOpen: false });
        this.getdata();
    }

    public SuccessNotification = () => {
        notification['success']({
            message: 'Stock Added Successfully',
            description:
                'Multi-vendor Marketplace with multiple supplier accounts that can create, update, track and manage products, orders and shipments.',
        });
    };

    public faildNotification = () => {
        notification['error']({
            message: 'Stock not added',
            description:
                'Multi-vendor Marketplace with multiple supplier accounts that can create, update, track and manage products, orders and shipments.',
        });
    };

    public SuccessUpdateNotification = () => {
        notification['success']({
            message: 'Stock Updated Successfully',
            description:
                'Multi-vendor Marketplace with multiple supplier accounts that can create, update, track and manage products, orders and shipments.',
        });
    };

    public faildUpdateNotification = () => {
        notification['error']({
            message: 'Faild To Update',
            description:
                'Multi-vendor Marketplace with multiple supplier accounts that can create, update, track and manage products, orders and shipments.',
        });
    };
    public SuccessDeleteNotification = () => {
        notification['success']({
            message: 'Stock Deleted Successfully',
            description:
                'Multi-vendor Marketplace with multiple supplier accounts that can create, update, track and manage products, orders and shipments.',
        });
    };
    public faildDeletdNotification = () => {
        notification['error']({
            message: 'Faild To Delete',
            description:
                'Multi-vendor Marketplace with multiple supplier accounts that can create, update, track and manage products, orders and shipments.',
        });
    };

    public renderAddStockModal = () => {
        return (
            <Modal
                title="Add Stock"
                visible={true}
                width={500}
                maskClosable={false}
                // onOk={this.handleOk}
                onCancel={this.CloseAddStockModal}
                footer={[
                    <Button key="back" onClick={this.CloseAddStockModal}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={this.state.addbtnref} onClick={this.AddStock}>
                        Submit
                    </Button>,
                ]}
            >
                <div style={{ marginBottom: 16 }}>
                    <b>Enter Stock Name</b>
                    <Input
                        placeholder="Enter Name of stock"
                        allowClear
                        value={this.currentlist.ProductName}
                        name="ProductName"
                        onChange={(e) => this.handleInputChange(e.target.name, e.target.value)}
                    />
                </div>
                <b>Enter Quantity</b>
                <Input
                    placeholder="Enter stock quantity"
                    allowClear
                    value={this.currentlist.Quantity}
                    name="Quantity"
                    onChange={(e) => this.handleInputChange(e.target.name, e.target.value)} />
            </Modal>
        );
    }

    public renderUpdateStockModal = () => {
        return (
            <Modal
                title="Update Stock"
                visible={true}
                width={500}
                maskClosable={false}
                // onOk={this.handleOk}
                onCancel={this.CloseUpdateStockModal}
                footer={[
                    <Button key="back" onClick={this.CloseUpdateStockModal}>
                        Return
                    </Button>,
                    <Popconfirm
                        title="Are you sure delete this stock?"
                        onConfirm={this.deleteStock}

                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="back" danger type="primary">
                            Delete Stock
                    </Button>
                    </Popconfirm>,
                    <Button key="submit" type="primary" loading={this.state.updbtnref} onClick={this.UpdateStock}>
                        Update
                    </Button>,
                ]}
            >   <div style={{ marginBottom: 16 }}>
                    <b>Enter Stock Name</b>
                    <Input
                        placeholder="Enter Name of stock"
                        allowClear
                        value={this.Selectedlist.ProductName}
                        name="ProductName"
                        onChange={(e) => this.handleInputUpdateChange(e.target.name, e.target.value)}
                    />
                </div>
                <b>Enter Quantity</b>
                <Input
                    placeholder="Enter stock quantity"
                    allowClear
                    value={this.Selectedlist.Quantity}
                    name="Quantity"
                    onChange={(e) => this.handleInputUpdateChange(e.target.name, e.target.value)} />
            </Modal>
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
                    null
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
            <div className="column" >
                <div className="card" onClick={() => { this.OpenUpdateStckModal(item) }}>
                    <div className="container">
                        <h4><b>{item.ProductName}</b></h4>
                        <p>{item.Quantity}</p>
                    </div>
                </div>
            </div>
        );

    }

    public UpdateStock = () => {
        console.log("click");
        this.setState({ updbtnref: true });
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
                this.setState({ updbtnref: false });
                this.Selectedlist = this.getEmpty();
                this.SuccessUpdateNotification();
                this.CloseUpdateStockModal();
            },
                (error) => {
                    this.setState({ updbtnref: false });
                    console.log(error);
                    this.faildUpdateNotification();
                })
    }

    public deleteStock = () => {
        fetch(`http://sumit.com/api/delete?id=${this.Selectedlist.ID}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((result) => {

                console.log("log delte result", result);
                this.Selectedlist = this.getEmpty();
                this.SuccessDeleteNotification();
                this.CloseUpdateStockModal();
            }, (error) => {
                console.log("delete log error", error);
                this.faildDeletdNotification();
            })

    }


    public AddStock = () => {
        this.setState({ addbtnref: true });
        console.log("click");
        fetch("http://sumit.com/api/insertvalue", {
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
                this.SuccessNotification();
                this.setState({ addbtnref: false });
                this.currentlist = this.getEmpty();
                this.forceUpdate();
            },
                (error) => {
                    this.setState({ addbtnref: false });
                    this.faildNotification();
                    console.log(error);
                })
    }


    public handleInputChange = (name: string, value: any) => {
        this.currentlist[name] = value;
        this.forceUpdate();
        console.log(this.currentlist.ProductName);
        console.log(this.currentlist.Quantity);
    };

    public handleInputUpdateChange = (name: string, value: any) => {
        this.Selectedlist[name] = value;
        this.forceUpdate();
        console.log(this.Selectedlist.ProductName);

    }
}
export default HomeApp