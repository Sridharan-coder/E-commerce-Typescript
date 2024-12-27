import { Col, Row } from "antd";
import Link from "antd/es/typography/Link";

import { AiOutlineShop } from "react-icons/ai";
import { PiShootingStarBold } from "react-icons/pi";
import { TbHelp } from "react-icons/tb";
import { PiFacebookLogo } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutube } from "react-icons/tb";


import visa from "../Assest/visa.png"
import masterCard from "../Assest/masterCard.png"
import rupay from "../Assest/rupay.png"
import americanExpress from "../Assest/americanExpress.png"
import discover from "../Assest/discover.png"
import cashOnDelivery from "../Assest/cashOnDelivery.png"
import emiOption from "../Assest/emiOption.png"


const Footer = () => {

    return (
        <div className="footer">
            <Row className="footerInfo">

                <Col span={15} className="leftFooterContent">
                    <Row>

                        <Col span={6}>
                            <Row><p className="footerTitle">ABOUT</p></Row>
                            <Row><Link className="footerContent">Contact Us</Link></Row>
                            <Row><Link className="footerContent">About Us</Link></Row>
                            <Row><Link className="footerContent">Careers</Link></Row>
                            <Row><Link className="footerContent">Flipkart Stories</Link></Row>
                            <Row><Link className="footerContent">Press</Link></Row>
                            <Row><Link className="footerContent">Corporate Informaion</Link></Row>
                        </Col>

                        <Col span={6}>
                            <Row><p className="footerTitle">GROUP COMPANIES</p></Row>
                            <Row><Link className="footerContent">Myntra</Link></Row>
                            <Row><Link className="footerContent">Cleartrip</Link></Row>
                            <Row><Link className="footerContent">Shopsy</Link></Row>
                        </Col>

                        <Col span={6}>
                            <Row><p className="footerTitle">Help</p></Row>
                            <Row><Link className="footerContent">Payments</Link></Row>
                            <Row><Link className="footerContent">Shipping</Link></Row>
                            <Row><Link className="footerContent">Cancellation & Returns</Link></Row>
                            <Row><Link className="footerContent">FAQ</Link></Row>
                        </Col>

                        <Col span={6}>
                            <Row><p className="footerTitle">CONSUMER POLICY</p></Row>
                            <Row><Link className="footerContent">Cancellation & Returns</Link></Row>
                            <Row><Link className="footerContent">Terms Of Use</Link></Row>
                            <Row><Link className="footerContent">Security</Link></Row>
                            <Row><Link className="footerContent">Privacy</Link></Row>
                            <Row><Link className="footerContent">Sitemap</Link></Row>
                            <Row><Link className="footerContent">Grievance Redressal</Link></Row>
                            <Row><Link className="footerContent">EpR Compliance</Link></Row>
                        </Col>

                    </Row>

                </Col>
                {/* <Col span={1} ></Col> */}

                <Col span={9}>

                    <Row style={{paddingLeft:35}}>
                        <Col span={12}>
                            <Row><p className="footerTitle">Mail Us:</p></Row>
                            <Row><Link className="footerContent">Flipkart Internet Private Limited,</Link></Row>
                            <Row><Link className="footerContent">Building Alyssa, Begonia &</Link></Row>
                            <Row><Link className="footerContent">Clove Embassy Tech Village,</Link></Row>
                            <Row><Link className="footerContent">Outer Ring Road, Devarabeesanahalli Village,</Link></Row>
                            <Row><Link className="footerContent">Bengaluru, 560103,</Link></Row>
                            <Row><Link className="footerContent">Karnataka, India</Link></Row>
                            <Row><p className="footerTitle">Social:</p></Row>
                            <Row>
                                <Link className="footerLogoContent">
                                <PiFacebookLogo size={25} color="white"/>
                                </Link>
                                <Link className="footerLogoContent">
                                <FaXTwitter size={25} color="white"/>
                                </Link>
                                <Link className="footerLogoContent">
                                <TbBrandYoutube size={25} color="white"/>
                                </Link>
                                
                                </Row>
                        </Col>

                        <Col span={12}>
                            <Row><p className="footerTitle">Registered Office Address:</p></Row>
                            <Row><Link className="footerContent">Flipkart Internet Private Limited,</Link></Row>
                            <Row><Link className="footerContent">Building Alyssa, Begonia &</Link></Row>
                            <Row><Link className="footerContent">Clove Embassy Tech Village,</Link></Row>
                            <Row><Link className="footerContent">Outer Ring Road, Devarabeesanahalli Village,</Link></Row>
                            <Row><Link className="footerContent">Bengaluru, 560103,</Link></Row>
                            <Row><Link className="footerContent">Karnataka, India</Link></Row>
                            <Row><Link className="footerContent">CIN : U51109KA2012PTC066107</Link></Row>
                            <Row><Link className="footerContent">Telephone: <Link className="mobileNumbers">044-45614700</Link> / <Link className="mobileNumbers">044-67415800</Link></Link></Row>
                        </Col>
                    </Row>

                </Col>

            </Row>

            <Row className="footerInfo" justify={"space-evenly"} style={{lineHeight:2,}} >
                <Col style={{verticalAlign:"middle"}}>
                <AiOutlineShop color="gold" size={15} className="footerIcon"/> <Link className="footerContent">Seller</Link>
                </Col>

                <Col>
                <PiShootingStarBold color="gold" size={15} className="footerIcon"/> <Link className="footerContent"/> <Link className="footerContent">Advertise</Link>
                </Col>

                <Col>
                <TbHelp color="gold" size={15} className="footerIcon"/> <Link className="footerContent">Help Center</Link>
                </Col>

                <Col>
                    <p className="footerContent">&copy; 2024 localhost:3000</p>
                </Col>

                <Col>
                    <Row>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={visa} alt="visa" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={masterCard} alt="MasterCard" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={rupay} alt="Rupay" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={americanExpress} alt="AmericanExpress" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={discover} alt="Discover" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={cashOnDelivery} alt="cashOnDelivery" width={33} height={19} />
                        </Col>
                        <Col style={{ backgroundColor: "white",marginLeft:3 }}>
                            <img src={emiOption} alt="emiOption" width={33} height={19} />
                        </Col>
                        
                    </Row>

                </Col>


            </Row>
        </div>
    )

}

export default Footer;