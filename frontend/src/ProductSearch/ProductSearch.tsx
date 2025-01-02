import { Button, Card, Col, Form, Input, Menu, Modal, Row, Space } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineRise, AiOutlineShop } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { GoCreditCard, GoTag } from "react-icons/go";
import { IoHeartOutline, IoNotificationsOutline } from "react-icons/io5";
import { LuCross } from "react-icons/lu";
import {
  PiDownloadSimpleThin,
  PiHeadsetLight,
  PiShoppingCart,
} from "react-icons/pi";
import { TbCoinRupeeFilled } from "react-icons/tb";

import Flipkart_logo_white from "../Assest/Flipkart_logo_white.png";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginBuyerDetails, logoutBuyerDetails } from "../Redux/Action_Create/ActionCreate";

const { Meta } = Card;




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

  _id?: string
  p_id?: number
  p_name: string
  p_price?: number
  p_image?: string
  p_type?: string
  p_stock?: number
  s_ids?: Array<number>
  __v?: number
}






const ProductSearch = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const param = useParams();
  const type: String = param.p_type as String;

  const [buyerInfo, setBuyerInfo] = useState<UserInfo>(useSelector((item: StoringDetail) => item.buyerAuthentication as UserInfo))
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const dispatch = useDispatch();


  const items = [
    {
      key: "logo",
      label: (
        <a href="/#" rel="noopener noreferrer">
          <img
            alt="logo"
            srcSet={Flipkart_logo_white}
            width={"95vw"}
            style={{ marginTop: 8 }}
          />
        </a>
      ),
    },
    {
      key: "search",
      label: (
        <>
          <Input
            prefix={<CiSearch size={23} />}
            placeholder="Search for Products, Brand and more"
            style={{ backgroundColor: "#e5edf7", width: "49.5vw" }}
          />
        </>
      ),
    },

    {
      label: `Account`,
      key: "SubMenu",
      icon: <CgProfile size={20} color="white" />,
      children: [
        {
          label: "My profile",
          key: "myProfile",
          icon: <CgProfile color="blue" />,
        },
        {
          label: "SuperCoin Zone",
          key: "superCoinZone",
          icon: <TbCoinRupeeFilled color="blue" />,
        },
        {
          label: "Flipkart Plus Zone",
          key: "flipkartPlusZone",
          icon: <LuCross color="blue" />,
        },
        {
          label: "Orders",
          key: "orders",
          icon: <BsBoxSeam color="blue" />,
        },
        {
          label: <>Wishlist {buyerInfo.u_whitelist.length ? `( ${buyerInfo.u_whitelist.length} )` : ""} </>,
          key: "wishlist",
          icon: <IoHeartOutline color="blue" />,
        },
        {
          label: "Coupons",
          key: "coupons",
          icon: <GoTag color="blue" />,
        },
        {
          label: "Gift Cards",
          key: "giftCards",
          icon: <GoCreditCard color="blue" />,
        },
        {
          label: "Notifications",
          key: "notifications",
          icon: <IoNotificationsOutline color="blue" />,
        },
        {
          label: "Logout",
          key: "logout",
          icon: <FiLogOut color="blue" />,
        },
      ],
    },
    {
      key: "more",
      label: "More",
      children: [
        {
          label: "Notification preferences",
          key: "notificationPreferences",
          icon: <IoNotificationsOutline color="blue" />,
        },
        {
          label: "24x7 Customer care",
          key: "customercare",
          icon: <PiHeadsetLight color="blue" />,
        },
        {
          label: "Advertise",
          key: "advertise",
          icon: <AiOutlineRise color="blue" />,
        },
        {
          label: "Download App",
          key: "downloadApp",
          icon: <PiDownloadSimpleThin color="blue" />,
        },
      ],
    },
    {
      key: "cart",
      icon: <span style={{ position: "relative" }}><PiShoppingCart size={20} color="white" /> <span style={{ color: "red", position: "absolute", paddingLeft: 7, paddingBottom: 10, fontWeight: 700 }} id="cardCount">{buyerInfo.u_carts.length ? buyerInfo.u_carts.length : ""} </span></span>,
      label: (
        <>
          Cart
        </>
      ),
    },
    {
      key: "becomeSeller",
      icon: <AiOutlineShop size={20} color="white" />,
      label: "Become a Seller",
    },
  ];

  const items1 = [
    {
      key: "logo",
      label: (
        <a href="/#" rel="noopener noreferrer">

          <img
            alt="logo"
            srcSet={Flipkart_logo_white}
            width={"95vw"}
            style={{ marginTop: 8 }}
          />
        </a>
      ),
    },
    {
      key: "search",
      label: (
        <>
          <Input
            prefix={<CiSearch size={23} />}
            placeholder="Search for Products, Brand and more"
            style={{ backgroundColor: "#e5edf7", width: "49.5vw" }}
          />
        </>
      ),
    },

    {
      // label: `Navigation Three - Submenu${return (</i>)}`,
      label: (<span style={{ paddingLeft: 5, paddingRight: 5, backgroundColor: "White", color: "blue", display: "flex", alignItems: "center" }}><CgProfile size={20} /> LOGIN</span>),
      key: "login",
      // icon: ,
    },
    {
      key: "more",
      label: "More",
      children: [
        {
          label: "Notification preferences",
          key: "notificationPreferences",
          icon: <IoNotificationsOutline color="blue" />,
        },
        {
          label: "24x7 Customer care",
          key: "customercare",
          icon: <PiHeadsetLight color="blue" />,
        },
        {
          label: "Advertise",
          key: "advertise",
          icon: <AiOutlineRise color="blue" />,
        },
        {
          label: "Download App",
          key: "downloadApp",
          icon: <PiDownloadSimpleThin color="blue" />,
        },
      ],
    },
    {
      key: "cart",
      icon: <span style={{ position: "relative" }}><PiShoppingCart size={20} color="white" /> <span style={{ color: "red", position: "absolute", paddingLeft: 7, paddingBottom: 10, fontWeight: 700 }} id="cardCount">{buyerInfo.u_carts.length ? buyerInfo.u_carts.length : ""} </span></span>,
      label: (
        <>
          Cart
        </>
      ),
    },
    {
      key: "becomeSeller",
      icon: <AiOutlineShop size={20} color="white" />,
      label: "Become a Seller",
    },
  ];

  const ProductItems = [
    {
      key: "grocery",
      label: "Grocery",
    },
    {
      key: "mobile",
      label: "Mobile",
    },
    {
      key: "fashion",
      label: "Fashion",
    },
    {
      key: "electronics",
      label: "Electronics",
    },
    {
      key: "beautyToys&More",
      label: "Beauty, Toys & More",
    },
  ];

  const onClick = (e: OptionInfo) => {
    if (e.key === "becomeSeller") {
      navigate("/seller");
    }
    else if (e.key === "login") {
      form.resetFields();
      setIsRegisterOpen(false)
      setIsLoginOpen(true)
    }
    else if (e.key === "logout") {
      dispatch(logoutBuyerDetails());
      setBuyerInfo({
        u_id: "",
        u_name: "",
        u_phoneNumber: "",
        u_emailAddress: "",
        u_password: '',
        u_carts: [],
        u_whitelist: [],
        u_loggedIn: false
      })
    }
  };



  const handleOnRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
    form1.resetFields();
  };

  const handleOnLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
    form.resetFields();
  };

  const onLogin = async (values: LoginInfo) => {

    await axios
      .post(`http://localhost:3321/userLogin`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch(loginBuyerDetails(response.data.user));
        alert(response.data.message);
        setBuyerInfo({ ...response.data.user, u_loggedIn: true });
        setIsLoginOpen(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error.response.data.message);
        alert(error.response.data.message);
      });
  };

  const onRegister = async (values: RegisterInfo) => {

    await axios
      .post("http://localhost:3321/createSeller", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert(response.data.message);
        setIsRegisterOpen(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error.response.data.message);
        alert("Something went wrong");
      });
  };


  const onSearch = (e: OptionInfo) => {
    navigate(`/product/${e.key}`);
  };

  const handleProduct = (productData: productInfo) => {
    navigate(`/item/${type}?name=${productData.p_name}&id=${productData.p_id}`);
  };

  useEffect(() => {

    try {
      async function fetchData() {
        await axios
          .get(`http://localhost:3321/getProductByType/${type}`)
          .then((response) => setProducts(response.data.products))
          .catch((error) => console.error(error.response.data.message));
      }
      fetchData();
    } catch (error) {
      console.log("Error in Fetching the Data -> ", error);
    }
    // eslint-disable-next-line
  }, [type]);

  return (
    <div className="searchingProduct">
      {buyerInfo.u_loggedIn ?
        <Menu
          onClick={onClick}
          style={{
            height: 70,
            paddingLeft: 62,
            paddingTop: 6,
            width: "100%",
            fontSize: 16,
            backgroundColor: "blue",
            color: "whitesmoke",
          }}
          className="productSearch header-menu"
          mode="horizontal"
          items={items}
        /> :
        <Menu
          onClick={onClick}
          style={{
            height: 70,
            paddingLeft: 62,
            paddingTop: 6,
            width: "100%",
            fontSize: 16,
            backgroundColor: "blue",
            color: "whitesmoke",
          }}
          className="productSearch header-menu"
          mode="horizontal"
          items={items1}
        />
      }

      <Menu
        onClick={onSearch}
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="horizontal"
        // theme="dark"
        items={ProductItems}
        className="dashboardMenu"
        defaultSelectedKeys={[type] as string[]}
      />

      <div className="searchedProduct">
        <Row>
          <Col span={24} key="Productss">
            <Space wrap size={[25, 31]}>
              {products.map((item: productInfo) => (
                <>
                  <Card
                    key={item.p_id}
                    style={{
                      width: 280,
                      height: 350,
                      verticalAlign: "center",
                    }}
                    hoverable
                    onClick={() => handleProduct(item)}
                    cover={
                      <><img
                        src={item.p_image}
                        alt={item.p_name}
                        height={250}
                        className="cardImage"
                      />
                      </>
                    }
                    className="ProductsearchCard"
                  >
                    <Meta
                      title={item.p_name.charAt(0).toUpperCase() + item.p_name.slice(1)}
                      description={<b style={{ color: "black" }}>&#8377; {item.p_price}</b>}
                      style={{ textAlign: "center" }}
                    />
                  </Card>
                </>
              ))}
            </Space>
          </Col>
        </Row>
      </div>
      <div>



        <Modal
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          centered
          title="Login"
          open={isLoginOpen}
          onCancel={() => setIsLoginOpen(false)}
          className="loginModal"
          // style={{wid}}
          width={"50vh"}
        >
          <Form
            form={form}
            method="post"
            name="validateOnly1"
            layout="vertical"
            size={"large"}
            autoComplete="off"
            className="addUserForm"
            onFinish={(Values) => onLogin(Values)}

          >
            <Row style={{ flexDirection: "column", width: "100%" }}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="u_emailAddress"
                    // className="addUserInput"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Email !",
                      },
                    ]}
                  >
                    <Input type="email" placeholder="Enter Your Email" />
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
                        message: "Please enter Password !",
                      },
                    ]}
                  >
                    <Input.Password
                      type="password"
                      placeholder="Enter Your Password"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      className="btnUser"
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify={"center"}>Don't have an account?</Row>
            </Row>
          </Form>
          <Button
            block
            style={{ marginTop: 10 }}
            onClick={() => handleOnRegister()}
          >
            Register for new account
          </Button>
        </Modal>



        <Modal
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          centered
          title="Register"
          open={isRegisterOpen}
          onCancel={() => setIsRegisterOpen(false)}
          className="loginModal"
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
            <Row style={{ flexDirection: "column", width: "100%" }}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    name="u_name"
                    // className="addUserInput"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Name !",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Enter Your Name" pattern="[A-Za-z][A-Za-z]+" />
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
                        message: "Please enter Phone Number !",
                      },
                      {
                        pattern: new RegExp('^[0]?[6789]\\d{9}$'),
                        message: "Invalid Phone Number"
                      }
                    ]}
                  >
                    <Input type="number" placeholder="Enter Your Phone Number" min={6000000000} max={9999999999} minLength={10} maxLength={10} />
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
                        message: "Please enter Email !",
                      },
                      {
                        pattern: new RegExp(/[a-z0-9]+@[a-z]+.in|.com|.co/),
                        message: "Please enter the valid Email !"
                      }
                    ]}
                  >
                    <Input type="email" placeholder="Enter Your Email" />
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
                        message: "Please enter Password !",
                      },
                      { min: 8, message: 'Password must have a minimum length of 8.' },
                      {
                        pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
                        message: 'Password must contain at least one lowercase letter, uppercase letter, number, and special chracter'
                      }
                    ]}
                  >
                    <Input.Password
                      type="password"
                      placeholder="Enter Your Password"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      className="btnUser"
                    >
                      Register
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify={"center"}>Already have an account?</Row>
            </Row>
          </Form>

          <Button block style={{ marginTop: 10 }} onClick={() => handleOnLogin()}>
            Login
          </Button>
        </Modal>
      </div>
    </div>
  );
};

export default ProductSearch;
