import { Button, Col, Form, Input, Menu, Modal, Row } from "antd";
import Flipkart_logo_white from "../Assest/Flipkart_logo_white.png"
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { loginBuyerDetails } from "../Redux/Action_Create/ActionCreate";
// @ts-ignore
import { load } from '@cashfreepayments/cashfree-js';
import { FaBell, FaTruck } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";



interface UserInfo {
    u_id: string,
    u_name: string,
    u_phoneNumber: number | string,
    u_emailAddress: string,
    u_password: string,
    u_carts: Array<number>,
    u_whitelist: Array<number>,
    u_loggedIn: boolean
    _id?: String
    __v?: number
}
interface SellerInfo {
    s_id: string,
    s_name: string,
    s_phoneNumber: number | string,
    s_emailAddress: string,
    s_password: string,
    s_loggedIn: boolean
    _id?: String
    __v?: number
}

interface StoringDetail {
    buyerAuthentication?: UserInfo
    sellerAuthentication?: SellerInfo
}



interface OptionInfo {
    key: String
}

interface LoginInfo {
    u_emailAddress: String
    u_password: String
}

interface RegisterInfo {
    u_name: String
    u_phoneNumber: Number
    u_emailAddress: String
    u_password: String
}


interface productInfo {

    _id: string
    p_id: number
    p_name: string
    p_price: number
    p_image: string
    p_type: string
    p_stock: number
    s_ids: Array<number>
    __v: number
}

interface EmptyData {
    name?: string,
    mobileNumber?: number,
    pincode?: number,
    alternatePhoneNumber?: number,
    address?: string

}






const PaymentPage = () => {

    const location = useLocation()

    const [productDetails, SetProductDetails] = useState(location.state.productDetails || []);

    const buyerInfo: UserInfo | any = useSelector((detail: StoringDetail) => detail.buyerAuthentication);

    const dispatch = useDispatch()

    const [form] = Form.useForm();
    const [form1] = Form.useForm();
// eslint-disable-next-line 
    const [buyerDetail, SetBuyerDetail] = useState(buyerInfo)

    const [buyerAddress, setBuyerAddress] = useState<EmptyData>({})
    const [isLogin, setIsLogin] = useState(buyerInfo.u_loggedIn)
    const [isAddress, setIsAddress] = useState(!buyerInfo.u_loggedIn);
    const [isOrderSummary, setIsOrderSummary] = useState(isLogin && !isAddress);
    const [isPaymentOption, setIsPaymentOption] = useState(isLogin && !isAddress && !isOrderSummary);


    const [orderPrice, setOrderPrice] = useState([])
    // eslint-disable-next-line 
    const [discount, setDiscount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const [orderCount, setorderCount] = useState([]);
    const [orderId, setOrderId] = useState()



    const [isRegisterOpen, setIsRegisterOpen] = useState(false)


    const items = [
        {
            key: 'logo',
            label: (
                <a href="/#" rel='noopener noreferrer'>
                    <img alt="logo" srcSet={Flipkart_logo_white} width={"95vw"} style={{ marginTop: 8 }} />
                </a>
            ),
        }
    ];

    const onClick = (e: OptionInfo) => {
        console.log(e.key);

    }


    const onLogin = async (values: LoginInfo) => {

        await axios.post(`http://localhost:3321/userLogin`, values, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                dispatch(loginBuyerDetails(response.data.user))
                alert(response.data.message);
                setIsLogin(true);
                setIsAddress(false);
                // setIsLoginOpen(false)
                // navigate("/seller")
            })
            .catch(error => {
                console.error(error.response.data.message)
                alert(error.response.data.message)
            })


    }

    const deliveryAddress = (values: EmptyData) => {
        console.log("values", values)
        setIsAddress(true)
        setBuyerAddress(values)
        setIsOrderSummary(false)

    }





// eslint-disable-next-line 
    const handleDeleteCartToUser = async (value: number) => {
        if (productDetails.length) {

            buyerInfo.carts.splice(value, 1);

            await axios.put(`http://localhost:3321/updateUser/${buyerInfo.u_id}`, buyerInfo, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => console.error(error.response.data.message))
        }
        else {
            SetProductDetails([])
        }

    }


    const handleOrderCount = (value: number, index: number) => {
        const count: Array<number> = orderCount;
        count[index] = value;
        setorderCount([...count as never])
    }


    const onRegister = async (values: RegisterInfo) => {
        await axios.post("http://localhost:3321/createUser", values, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                alert(response.data.message)
                setIsRegisterOpen(false)
            })
            .catch(error => {
                console.error(error.response.data.message)
                alert(error.response.data.message)
            })
    }



    const handleStocks = async (item: productInfo, index: number) => {
        item.p_stock = item.p_stock - orderCount[index]
        await axios.put(`http://localhost:3321/updateProduct/${item.p_id}`, item, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }








    let cashfree: any;

    const initializeSDK = async () => {
        cashfree = await load({ mode: "sandbox" });
    };


    initializeSDK();


    const getSessionId = async () => {
        try {
            const res = await axios.get(`http://localhost:3321/payment/${totalPrice}`);
            if (res.data && res.data.payment_session_id) {

                setOrderId(res.data.order_id);
                return res.data.payment_session_id;
            }
        } catch (error) {
            console.error("Error fetching session ID:", error);
        }
    };

    const verifyPayment = async () => {
        try {
            console.log(orderId, "+++++++");

            const res = await axios.post("http://localhost:3321/verify", { orderId });
            if (res && res.data) {
                alert("Payment verified");
                console.log(res);

                productDetails.map((item: productInfo, index: number) => handleStocks(item, index))
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
        }
    };


    const handleClick = async (e: any) => {
        e.preventDefault();
        try {
            const sessionId = await getSessionId();
            const checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_modal",
            };
            cashfree.checkout(checkoutOptions).then(async () => {
                console.log("Payment initialized");
                verifyPayment();
            });
        } catch (error) {
            console.error("Error handling payment:", error);
        }
    };


    useEffect(() => {
        productDetails.forEach((item: productInfo) => {
            setorderCount([...orderCount, 1 as never])
            setOrderPrice([...orderPrice, item.p_price as never])
        })
        form.resetFields();
// eslint-disable-next-line 
    }, [])

    useEffect(() => {
        const amt = orderPrice.reduce((acc, curr, index) => {
            return acc + (curr * orderCount[index])
        }, 0)
        setTotalPrice(amt)
    }, [discount, orderPrice, orderCount])


    console.log("buyerAddress", buyerAddress)

    return (
        <>
            <Menu
                onClick={onClick}
                style={{ height: 70, paddingLeft: 62, paddingTop: 6, width: "100%", fontSize: 16, backgroundColor: "blue", color: "whitesmoke" }}
                className="productSearch"
                mode="horizontal"
                items={items}
            />

            <div className="paymentPage" >
                <Row>
                    <Col span={16}>


                        {isLogin ?

                            <Row justify={"space-between"} className="paymentSummary">
                                <Col >
                                    <Row style={{ fontWeight: 700, color: "grey" }}>
                                    
                                        <span style={{ border: "0px solid black", marginRight: 10, padding: 1, paddingRight: 5, paddingLeft: 5, borderRadius: 3, backgroundColor: "#e0d8d7", color: "blue", fontWeight: 700 }}>1</span> LOGIN
                                    </Row>
                                    <Row>
                                        {buyerDetail.b_phoneNumber}
                                    </Row>
                                </Col>
                                <Col>
                                    <Button className="changeNumber" onClick={() => { setIsLogin(false); setIsAddress(true); setIsOrderSummary(true); setIsPaymentOption(true) }} color="default" variant="outlined" style={{ paddingLeft: 30, paddingRight: 30, fontWeight: 600, color: "#4287f5" }}>CHANGE</Button>
                                </Col>
                            </Row>
                            :
                            <Row className="paymentSummary">

                                <Col span={24} >
                                    <Row className="paymentSummaryTitle" style={{ fontWeight: 700, color: "whitesmoke", backgroundColor: "blue", padding: 18 }}>
                                        <span style={{ border: "0px solid black", marginRight: 10, padding: 1, paddingRight: 5, paddingLeft: 5, borderRadius: 3, backgroundColor: "whitesmoke", color: "blue", fontWeight: 700 }}>1</span>LOGIN OR SIGNUP
                                    </Row>

                                    <Row justify={"space-around"} className="paymentSummaryContent" style={{ padding: 10 }}>
                                        <Col>
                                            <Row>

                                                <Form
                                                    form={form}
                                                    method="post"
                                                    name="validateOnly"
                                                    layout="vertical"
                                                    size={"large"}
                                                    autoComplete="off"
                                                    className="addUserForm"
                                                    onFinish={(Values) => onLogin(Values)}
                                                >
                                                    <Row style={{ flexDirection: 'column', width: "100%" }}>

                                                        <Row>
                                                            <Col span={24}>

                                                                <Form.Item
                                                                    name="u_emailAddress"
                                                                    // className="addUserInput"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Please enter Email !"
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input type='email' placeholder="Enter Your Email" />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>


                                                        <Row>
                                                            <Col span={24}>

                                                                <Form.Item
                                                                    name="u_password"
                                                                    // className="addUserInput"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Please enter Password !"
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input.Password type='password' placeholder="Enter Your Password" />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>


                                                        <Row>
                                                            <Col span={24}>
                                                                <Form.Item >
                                                                    <Button type="primary" htmlType='submit' block className='btnUser'>Login</Button>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                    </Row>
                                                </Form>

                                            </Row>
                                            <Row>
                                                <Button block style={{ marginTop: 10 }} onClick={() => setIsRegisterOpen(true)}>Register for new account</Button>
                                            </Row>

                                        </Col>
                                        <Col>
                                            <Row style={{ marginTop: 25, color: "grey" }} gutter={[30, 30]}>
                                                Advantages of our secure login
                                            </Row>
                                            <Row style={{ marginTop: 25 }} gutter={[30, 30]}>
                                                <span style={{ marginRight: 10 }}><FaTruck color="blue" /> </span>Easily Track Orders, Hassle free Returns
                                            </Row>
                                            <Row style={{ marginTop: 25 }} gutter={[30, 30]}>
                                                <span style={{ marginRight: 10 }}><FaBell color="blue" /></span> Get Relevant Alerts and Recommendation.
                                            </Row>
                                            <Row style={{ marginTop: 25 }} gutter={[30, 30]}>
                                                <span style={{ marginRight: 10 }}><IoStar color="blue" /></span> Wishlist, Reviews, Rating and more.
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        }


                        {
                            isAddress ?
                                <Row justify={"space-between"} className="paymentSummary">
                                    <Col >
                                        <Row style={{ fontWeight: 700, color: "grey" }}>
                                            <span style={{ border: "0px solid black", marginRight: 10, padding: 1, paddingRight: 5, paddingLeft: 5, borderRadius: 3, backgroundColor: "#e0d8d7", color: "blue", fontWeight: 700 }}>2</span>DELIVERY ADDRESS
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Row>{buyerAddress?.name}</Row>
                                                <Row>{buyerAddress?.address}</Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Button className="changeNumber" onClick={() => { setIsAddress(false); setIsOrderSummary(true); if (!isLogin) setIsLogin(true); setIsPaymentOption(true) }} color="default" variant="outlined" style={{ paddingLeft: 30, paddingRight: 30, fontWeight: 600, color: "#4287f5" }}>CHANGE</Button>
                                    </Col>
                                </Row>
                                :
                                <Row className="paymentSummary">

                                    <Col span={24} >

                                        <Row className="paymentSummaryTitle" style={{ fontWeight: 700, color: "whitesmoke", backgroundColor: "blue", padding: 18 }}>
                                            <span style={{ border: "0px solid black", marginRight: 10, padding: 1, paddingRight: 5, paddingLeft: 5, borderRadius: 3, backgroundColor: "#e0d8d7", color: "blue", fontWeight: 700 }}>2</span>DELIVERY ADDRESS
                                        </Row>

                                        <Row justify={"space-around"} className="paymentSummaryContent" style={{ padding: 10 }}>
                                            <Col span={24}>
                                                <Form
                                                    form={form1}
                                                    method="post"
                                                    name="validateOnly"
                                                    layout="vertical"
                                                    size={"large"}
                                                    autoComplete="off"
                                                    // className="addUserForm"
                                                    onFinish={(Values) => deliveryAddress(Values)}
                                                >
                                                    <Row style={{ flexDirection: 'column', width: "100%" }}>

                                                        <Row justify={"space-evenly"} style={{ marginTop: 10 }}>
                                                            <Col span={11}>

                                                                <Form.Item
                                                                    name="name"
                                                                    // className="addUserInput"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Please enter name !"
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input type='text' placeholder="Enter Your name" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={11}>

                                                                <Form.Item
                                                                    name="mobileNumber"
                                                                    // className="addUserInput"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Please enter Mobile Number !"
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input type='number' placeholder="Enter Your Mobile Number" />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>


                                                        <Row justify={"space-evenly"} style={{ marginTop: 10 }}>
                                                            <Col span={11}>

                                                                <Form.Item
                                                                    name="pincode"
                                                                    // className="addUserInput"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Please enter pincode !"
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input type='number' placeholder="Enter Your pincode" />
                                                                </Form.Item>
                                                            </Col>
                                                            <Col span={11}>

                                                                <Form.Item
                                                                    name="alternatePhoneNumber"
                                                                    // className="addUserInput"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Please enter Alternate PhoneNumber !"
                                                                        },
                                                                    ]}

                                                                >
                                                                    <Input type='number' placeholder="Enter Your Alternate Number" />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>


                                                        <Row justify={"space-evenly"} style={{ marginTop: 10 }}>
                                                            <Col span={23}>

                                                                <Form.Item
                                                                    name="address"
                                                                    // className="addUserInput"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Please enter Address !"
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Input type='text' placeholder="Enter Your Address" />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>


                                                        <Row justify={"space-evenly"} style={{ marginTop: 10 }}>
                                                            <Col span={23}>
                                                                <Form.Item >
                                                                    <Button type="primary" htmlType='submit' block className='btnUser'>Login</Button>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                    </Row>
                                                </Form>

                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                        }



                        {
                            isOrderSummary ?
                                <Row justify={"space-between"} className="paymentSummary">
                                    <Col >
                                        <Row className="paymentSummaryTitle" style={{ fontWeight: 700, color: "grey" }}>
                                            <span style={{ border: "0px solid black", marginRight: 10, padding: 1, paddingRight: 5, paddingLeft: 5, borderRadius: 3, backgroundColor: "#e0d8d7", color: "blue", fontWeight: 700 }}>3</span>ORDER SUMMARY
                                        </Row>
                                        <Row style={{ paddingLeft: 30, fontWeight: 700 }}>
                                            {orderCount.length} Items
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Button className="changeNumber" onClick={() => { if (buyerAddress) setIsAddress(true); setIsOrderSummary(false); if (!isLogin) setIsLogin(true); setIsPaymentOption(true) }} color="default" variant="outlined" style={{ paddingLeft: 30, paddingRight: 30, fontWeight: 600, color: "#4287f5" }}>CHANGE</Button>
                                    </Col>
                                </Row>
                                :
                                <Row className="paymentSummary">

                                    <Col span={24} >
                                        <Row className="paymentSummaryTitle" style={{ fontWeight: 700, color: "whitesmoke", backgroundColor: "blue", padding: 18 }}>
                                            <span style={{ border: "0px solid black", marginRight: 10, padding: 1, paddingRight: 5, paddingLeft: 5, borderRadius: 3, backgroundColor: "#e0d8d7", color: "blue", fontWeight: 700 }}>3</span>ORDER SUMMARY
                                        </Row>
                                        {productDetails.map((item: productInfo, index: number) => {
                                            return (
                                                <>
                                                    <Row className="cartInfo" key={item.p_id}>
                                                        <Col span={4}>
                                                            <img src={item.p_image} alt={item.p_name} width={120} height={120} />
                                                        </Col>
                                                        <Col span={14}>
                                                            <Row>{item.p_name}</Row>
                                                            <Row>Seller Id :
                                                                {item.s_ids.map(vendor => {
                                                                    return (

                                                                        <Row>{vendor}</Row>
                                                                    )
                                                                })}
                                                            </Row>
                                                            <Row>
                                                                &#8377; {item.p_price}
                                                            </Row>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Row>

                                                                Delivery by Mon Dec 18 | <del>&#8377; 40</del>
                                                            </Row>
                                                            <Row>
                                                                <Button onClick={() => { setIsOrderSummary(true); setIsPaymentOption(false) }}>Ok</Button>
                                                            </Row>

                                                        </Col>
                                                        <Row gutter={[30, 30]} align={"middle"}>
                                                            <Col>
                                                                <Row style={{ flexDirection: "row" }}>
                                                                    <Button style={{ borderRadius: 100 }} onClick={() => handleOrderCount((orderCount[index] - 1), index)} disabled={orderCount[index] === 0}>-</Button>
                                                                    <Input type="text" style={{ width: 40 }} onChange={(value) => handleOrderCount(Number(value.target.value), index)} value={orderCount[index]}></Input>
                                                                    <Button style={{ borderRadius: 100 }} onClick={() => handleOrderCount(orderCount[index] + 1, index)} disabled={orderCount[index] === item.p_stock}>+</Button>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Row>
                                                </>
                                            )
                                        })}


                                        <Row>
                                            Order confiramtion email will be sent to : <span><b> {buyerDetail.u_emailAddress}</b></span>
                                        </Row>

                                    </Col>

                                </Row>
                        }


                        {
                            isPaymentOption ?
                                <Row justify={"space-between"} className="paymentSummary">
                                    <Col >
                                        <Row className="paymentSummaryTitle" style={{ fontWeight: 700, color: "grey" }}>
                                            <span style={{ border: "0px solid black", marginRight: 10, padding: 1, paddingRight: 5, paddingLeft: 5, borderRadius: 3, backgroundColor: "#e0d8d7", color: "blue", fontWeight: 700 }}>4</span>PAYMENT OPTIONS
                                        </Row>
                                    </Col>
                                </Row>
                                :
                                <Row className="paymentSummary">
                                    <Col span={24} >
                                        <Row className="paymentSummaryTitle" style={{ fontWeight: 700, color: "whitesmoke", backgroundColor: "blue", padding: 18, alignItems: "center" }} >
                                            <span style={{ border: "0px solid black", borderRadius: 3, marginRight: 10, padding: 1, paddingRight: 5, paddingLeft: 5, backgroundColor: "#e0d8d7", color: "blue", fontWeight: 700 }}>4</span>PAYMENT OPTIONS
                                        </Row>

                                        <Row className="cartInfo" justify={"center"}>

                                            <Col span={4}>
                                                <Button type='primary' danger onClick={handleClick} block>Proceed Pay</Button>
                                            </Col>

                                        </Row>



                                    </Col>

                                </Row>
                        }

                    </Col>
                    <Col style={{ marginLeft: 0, marginTop: 20 }}>
                        <Row style={{ backgroundColor: "white", height: 50, width: "25vw", fontWeight: 700, color: "grey" }} justify={"center"} align={"middle"}>PRICE DETAILS </Row>
                        <Row style={{ backgroundColor: "white", padding: 10, width: "25vw", marginTop: 5, height: "20vh" }}>
                            <Col span={24}>
                                <Row justify={"space-between"} style={{ marginBottom: 10 }}>
                                    <Col>Price ({orderCount.reduce((acc, curr) => {
                                        return acc + curr
                                    }, 0)} time)</Col>
                                    <Col>
                                        &#8377; {totalPrice}
                                    </Col>
                                </Row>

                                <Row justify={"space-between"} style={{ marginBottom: 10 }}>
                                    <Col>
                                        Discount
                                    </Col>
                                    <Col>
                                        &#8377; {discount}
                                    </Col>
                                </Row>

                                <Row justify={"space-between"} style={{ marginBottom: 10 }}>
                                    <Col>
                                        Delivery Charges
                                    </Col>
                                    <Col>
                                        <del>&#8377; 120</del> <span style={{ color: "green" }}> FREE</span>
                                    </Col>
                                </Row>

                                <Row justify={"space-between"} style={{ paddingTop: 10, paddingBottom: 10, marginBottom: 10, borderTop: "1px dotted black", borderBottom: "1px dotted black", fontWeight: 700 }}>
                                    <Col>
                                        Total Payable
                                    </Col>
                                    <Col>
                                        &#8377; {totalPrice - discount}
                                    </Col>
                                </Row>



                            </Col>
                        </Row>


                    </Col>
                </Row>
                <Modal
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                    centered
                    title="Register"
                    open={isRegisterOpen}
                    onCancel={() => setIsRegisterOpen(false)}
                    className='loginModal'
                    width={"50vh"}
                >
                    <Form
                        form={form1}
                        method="post"
                        name="validateOnly"
                        layout="vertical"
                        size={"large"}
                        autoComplete="off"
                        className="addUserForm"
                        onFinish={(Values) => onRegister(Values)}
                    >
                        <Row style={{ flexDirection: 'column', width: "100%" }}>


                            <Row>
                                <Col span={24}>

                                    <Form.Item
                                        name="u_name"
                                        // className="addUserInput"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter Name !"
                                            },
                                        ]}
                                    >
                                        <Input type='text' placeholder="Enter Your Name" pattern="[A-Za-z][A-Za-z]+" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>

                                    <Form.Item
                                        name="u_phoneNumber"
                                        // className="addUserInput"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter Phone Number !"
                                            },
                                            {
                                                pattern: new RegExp('^[0]?[6789]\\d{9}$'),
                                                message: "Invalid Phone Number"
                                            }
                                        ]}
                                    >
                                        <Input type='text' placeholder="Enter Your Phone Number" min={6000000000} max={9999999999} minLength={10} maxLength={10} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>

                                    <Form.Item
                                        name="u_emailAddress"
                                        // className="addUserInput"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter Email !"
                                            },
                                            {
                                                pattern: new RegExp(/[a-z0-9]+@[a-z]+.in|.com|.co/),
                                                message: "Please enter the valid Email !"
                                            }
                                        ]}
                                    >
                                        <Input type='email' placeholder="Enter Your Email" />
                                    </Form.Item>
                                </Col>
                            </Row>


                            <Row>
                                <Col span={24}>

                                    <Form.Item
                                        name="u_password"
                                        // className="addUserInput"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter Password !"
                                            },
                                            { min: 8, message: 'Password must have a minimum length of 8.' },
                                            {
                                                pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
                                                message: 'Password must contain at least one lowercase letter, uppercase letter, number, and special chracter'
                                            }
                                        ]}
                                    >
                                        <Input.Password type='password' placeholder="Enter Your Password" />
                                    </Form.Item>
                                </Col>
                            </Row>


                            <Row>
                                <Col span={24}>
                                    <Form.Item >
                                        <Button type="primary" htmlType='submit' block className='btnUser'>Register</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row justify={'center'}>
                                Already have an account?
                            </Row>
                        </Row>
                    </Form>
                    <Button block style={{ marginTop: 10 }} onClick={() => setIsRegisterOpen(false)}>Login</Button>
                </Modal>

            </div>
        </>
    )
}

export default PaymentPage;