import {useState } from "react";
import axios from "axios";

import { Form, Menu, Modal, Row, Col, Input, Button, Select, Space } from "antd";

import logo_flipkart_210 from "../Assest/logo_flipkart_210.png";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  loginSellerDetails,
  logoutSellerDetails,
} from "../Redux/Action_Create/ActionCreate";

import { TiTick } from "react-icons/ti";
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


interface imageInfo {
  lastModified: number
  lastModifiedDate?: Array<unknown>
  name: String
  size: number
  type: string
  webkitRelativePath?: String
}













const Seller = () => {
  const navigate = useNavigate();

  // const buyerInfo = useSelector(detail => detail.sellerAuthentication);

  const items = [
    {
      key: "logo",
      label: (
        <a href="/#" rel="noopener noreferrer">
          <img alt="logo" srcSet={logo_flipkart_210} width={"95vw"} />
        </a>
      ),
    },
    {
      key: "login",
      label: <p>Login</p>,
    },
    {
      key: "register",
      label: <p>Register</p>,
    },
  ];

  const items1 = [
    {
      key: "logo",
      label: (
        <a href="/#" rel="noopener noreferrer">
          <img alt="logo" srcSet={logo_flipkart_210} width={"95vw"} />
        </a>
      ),
    },
    {
      key: "logout",
      label: <p>Logout</p>,
    },
    {
      key: "startSelling",
      label: (
        <p
          style={{
            backgroundColor: "orange",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          Start Selling
        </p>
      ),
    },
  ];





  const options = [
    {
      label: 'Grocery',
      value: 'grocery',
      emoji: 'GR',
      desc: 'Grocery',
    },
    {
      label: 'Mobile',
      value: 'mobile',
      emoji: 'MB',
      desc: 'Mobile',
    },
    {
      label: 'Electronics',
      value: 'electronics',
      emoji: 'ELE',
      desc: 'Electronics',
    },
    {
      label: 'Fashion',
      value: 'fashion',
      emoji: 'FS',
      desc: 'Fashion',
    },
    {
      label: 'Beauty, Toys & More',
      value: 'beautyToys&More',
      emoji: 'BTM',
      desc: 'Beauty, Toys & More',
    },
  ];


  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [imageFile, setImageFile] = useState<imageInfo>();

  const [sellerInfo, setSellerInfo] = useState<SellerInfo>(
    useSelector((detail: StoringDetail) => detail.sellerAuthentication as SellerInfo)
  );

  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  const onClick = (e: OptionInfo) => {

    if (e.key === "login") {
      form.resetFields();
      form1.resetFields();
      setIsLoginOpen(true);
    } else if (e.key === "startSelling") {
      form.resetFields();
      form1.resetFields();
      setIsAddProduct(true);
    } else if (e.key === "register") {
      form.resetFields();
      form1.resetFields();
      setIsRegisterOpen(true);
    } else if (e.key === "logout") {
      dispatch(logoutSellerDetails());
      setSellerInfo({
        s_id: "",
        s_name: "",
        s_phoneNumber: "",
        s_password: "",
        s_emailAddress: "",
        s_loggedIn: false,
      });
      navigate("/seller");
    }
  };

  const onLogin = async (values: LoginInfo) => {

    await axios
      .post(`http://localhost:3321/sellerLogin`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch(loginSellerDetails(response.data.seller));
        alert(response.data.message);
        setIsLoginOpen(false);
        navigate("/seller");
        setSellerInfo({ ...response.data.seller, s_loggedIn: true });
        // sessionStorage.setItem("token",response.data.token)
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
        navigate("/seller");
      })
      .catch((error) => {
        console.error(error.response.data.message);
        alert("Something went wrong");
      });
  };
  console.log(imageFile)
  const onAddProduct = (values: any) => {
    console.log(values)
    if (sellerInfo.s_loggedIn) {
      const formData = new FormData();
      formData.append("file", imageFile as never);

      Object.keys(values).forEach((key) => {
        if (key !== "p_image") {
          formData.append(key, values[key]);
        }
      });

      formData.append("s_ids", [sellerInfo.s_id] as any);

      axios
        .post("http://localhost:3321/addProduct", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response.data.message);
          setIsAddProduct(false);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error Add Product :", error);
          alert("Error Add Product");
        });
    } else {
      alert("Login first");
      form.resetFields();
      setIsRegisterOpen(false);
      setIsAddProduct(false);
      setIsLoginOpen(true);
    }
  };

  const handleOnRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
    form.resetFields();
    form1.resetFields();
  };

  const handleOnLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
    form.resetFields();
    form1.resetFields();
  };



  return (
    <>
      {!sellerInfo.s_loggedIn ? (
        <Menu
          onClick={onClick}
          style={{
            paddingLeft: 62,
            paddingTop: 6,
            width: "100%",
            fontSize: 16,
            display: "flex",
            alignItems: "flex-end",
          }}
          mode="horizontal"
          items={items}
          className="header-menu"
        />
      ) : (
        <Menu
          onClick={onClick}
          style={{
            paddingLeft: 62,
            paddingTop: 6,
            width: "100%",
            fontSize: 16,
            display: "flex",
            alignItems: "flex-end",
          }}
          mode="horizontal"
          items={items1}
          className="header-menu"
        />
      )}

      <div className="sellerContent">
        <Row style={{ flexDirection: "column" }}>
          <Row className="sellerContentTitle">Create Account</Row>
          <Row className="sellerContentInfo">
            Creating your Flipkart seller account is a quick process, taking
            less than 10 minutes, and requires only 3 documents. Follow the
            checklist to ensure a seamless account creation experience. By
            having these documents ready, you can streamline the account
            creation process and get started on Flipkart as an online seller in
            no time.
          </Row>
          <Row className="sellerContentInfo">
            Flipkart offers a diverse range of over 3000+ categories where you
            can sell your products. These categories represent just a fraction
            of the wide variety available on Flipkart, providing ample
            opportunities for sellers to showcase their products to a large
            customer base. Here are some popular categories to consider for
            online selling:
          </Row>
        </Row>
        <Row style={{ flexDirection: "column" }}>
          <Row className="sellerContentTitle">List Products</Row>
          <Row className="sellerContentInfo">
            What is a listing? A listing refers to the process of registering
            your product on the Flipkart platform, making it visible to
            customers, and enabling them to view and purchase your product. It
            involves creating a detailed product page that includes essential
            information such as product title, description, images, pricing, and
            other relevant details. A well-crafted listing helps attract
            potential customers and facilitates the sale of your product on
            Flipkart.
          </Row>
        </Row>

        <Row style={{ flexDirection: "column" }}>
          <Row className="sellerContentTitle">Storage & Shipping</Row>
          <Row className="sellerContentInfo">
            Congratulations on receiving your first order! When it comes to
            shipping your products to customers, Flipkart understands the
            importance of fast and reliable delivery in secure packaging.
          </Row>
          <Row className="sellerContentInfo">We provide two fulfilment options for you to choose from</Row>
          <Row className="sellerContentInfo">
            <TiTick /> Fulfilment by Flipkart (FBF)
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Non Fulfilment by Flipkart (NFBF)
          </Row>
          <Row className="sellerContentInfo">
            Consider the fulfilment option that best suits your needs and
            preferences to ensure timely and secure delivery of your products to
            Flipkart customers.
          </Row>
          <Row className="sellerContentTitle">Fulfilment by Flipkart (FBF)</Row>
          <Row className="sellerContentInfo">
            Eliminate worries about storage, packing, shipping, and delivery by
            leveraging Flipkart's Fulfilment by Flipkart (FBF) service. FBF
            offers a comprehensive solution that handles all your shipping needs
            under one roof. With FBF, you can entrust Flipkart to efficiently
            manage the entire process, from storing your products to expertly
            packing and shipping them to customers. Enjoy a hassle-free
            experience and focus on growing your business while Flipkart takes
            care of the logistics.
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Pick-up from seller location to Flipkart warehouse
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> FAssured badge
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Faster delivery to customer
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Seamless order processing
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Customer returns handled end to end
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Warehouse space
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Quality selection recommendation
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Rigorous quality checks
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Quality packaging materials
          </Row>
          <Row className="sellerContentTitle">Non Fulfilment by Flipkart (NFBF)</Row>
          <Row className="sellerContentInfo">
            With Non-Fulfillment by Flipkart (NFBF), you can benefit from
            end-to-end delivery of your products directly from your location to
            the customer. In NFBF, it is the responsibility of the seller to
            ensure that the product is properly packed and ready for dispatch
            before the Flipkart agent arrives at the seller's location. This
            service allows you to maintain control over the packaging process
            while leveraging Flipkart's logistics network for efficient and
            reliable delivery.
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Delivery to 19000+ pin codes across India
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Tracking of your product
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Customer returns support
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Logistics support from community warehouse available
          </Row>
        </Row>
        <Row style={{ flexDirection: "column" }}>
          <Row className="sellerContentTitle">Grow Faster</Row>
          <Row className="sellerContentInfo">
            At Flipkart, we recognize that there may be times when you require
            additional assistance for your online business. That's why, with
            your Flipkart seller account, you gain access to a diverse range of
            tools and support functions designed to foster business growth.
            These include:
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Price Recommendation Tool : Helps you determine optimal
            pricing for your products.
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Product Recommendation Tool : Suggests popular and
            trending products to expand your product selection.
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Flipkart Ads : Enables you to advertise your products and
            reach a larger customer base.
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Paid Account Management services : Offers dedicated
            account management support for personalised guidance.
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Catalog & Photoshoot services : Assists with creating
            high-quality product catalogues and images.
          </Row>
          <Row className="sellerContentInfo">
            <TiTick /> Shopping Festivals and more : Participate in exciting
            sales events and promotional campaigns.
          </Row>
        </Row>
        <Row style={{ flexDirection: "column" }}>
          <Row className="sellerContentTitle">Help & Support</Row>
          <Row className="sellerContentInfo">
            What sets us apart is our exceptional Flipkart seller support
            assistance. We prioritise your needs and are committed to providing
            you with prompt assistance, whether you have questions, doubts, or
            require any kind of support for your business. Our dedicated team is
            here to help you every step of the way, ensuring that you have a
            smooth and successful selling experience on Flipkart. Feel free to
            reach out to us whenever you need assistance - we're always here to
            support you.
          </Row>
          <Row className="sellerContentInfo">
            A step-by-step guide to help with your Flipkart account creation can
            be downloaded from here.
          </Row>
        </Row>
      </div>

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
          name="validateOnly"
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
                  name="s_emailAddress"
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
                  name="s_password"
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
                  name="s_name"
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
                  name="s_phoneNumber"
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
                  <Input type="text" placeholder="Enter Your Phone Number" min={6000000000} max={9999999999} minLength={10} maxLength={10} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  name="s_emailAddress"
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
                  name="s_password"
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

      <Modal
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        centered
        title="Add Product"
        open={isAddProduct}
        onCancel={() => setIsAddProduct(false)}
        className="loginModal"
        width={"50vh"}
      >
        <Form
          form={form}
          method="post"
          name="validateOnly"
          layout="vertical"
          size={"large"}
          autoComplete="off"
          className="addUserForm"
          onFinish={(Values) => onAddProduct(Values)}
        >
          <Row style={{ flexDirection: "column", width: "100%" }}>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="p_name"
                  // className="addUserInput"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Product Name !",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Enter Your product Name" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  name="p_type"
                  // className="addUserInput"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Product Type !",
                    },
                  ]}
                  initialValue={['electronics']}
                >
                  {/* <Input type="text" placeholder="Enter Your Product Type" /> */}
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="select Atleast One Type"
                    // defaultValue={['china']}
                    // onChange={handleChange}
                    options={options}
                    optionRender={(option) => (
                      <Space>
                        <span role="img" aria-label={option.data.label}>
                          {option.data.emoji}
                        </span>
                        {option.data.desc}
                      </Space>
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  name="p_price"
                  // className="addUserInput"
                  rules={[
                    {
                      required: true,
                      message: "Please enter product Price !",
                    },
                  ]}
                >
                  <Input type="Number" placeholder="Enter Your product Price" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  name="p_image"
                  // className="addUserInput"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Product Image !",
                    },
                  ]}
                >
                  <Input
                    type="file"
                    placeholder="Enter Your Product Image"
                    onChange={(e) => setImageFile((e.target as HTMLInputElement)?.files?.[0] as imageInfo)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  name="p_stock"
                  // className="addUserInput"
                  rules={[
                    {
                      required: true,
                      message: "Please enter product Stock !",
                    },
                  ]}
                >
                  <Input type="Number" placeholder="Enter Your product Stock" />
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
                    Sell Product
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default Seller;
