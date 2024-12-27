import { Card, Col, Row, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const { Meta } = Card;




interface productInfo{
  
_id:string
p_id:number
p_name:string
p_price:number
p_image:string
p_type:string
p_stock:number
s_ids:Array<number>
__v:number
}








const BestOfElectronics = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const param = useParams();
  const type = param.p_type;


  const handleProduct = (productData:productInfo) => {
    navigate(`/item/${type}?name=${productData.p_name}&id=${productData.p_id}`);
  };

  // const viewMobile = () => {

  // }

  useEffect(() => {

    try {
      async function fetchData() {
        await axios
          .get(`http://localhost:3321/getProductByType/electronics`)
          .then((response) => setProducts(response.data.products.slice(0, 5)))
          .catch((error) => console.error(error.response.data.message));
      }
      fetchData();
    } catch (error) {
      console.log("Error in Fetching the Data -> ", error);
    }
    // eslint-disable-next-line
  }, [type]);

  return (
    <div className="bestOfEletronics">
      <div className="searchedProduct">
        <Row justify={"space-between"}>
          <Col style={{ fontSize: 25 }}>Best of Electronics</Col>
          <Col>
            <Link to="/product/electronics">

              <IoIosArrowDroprightCircle size={40} color="blue" />
            </Link>
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col span={20}>
            <Space size={[45, 45]}>
              {products.map((item:productInfo) => (
                <>
                  <Card
                    key={item.p_id}
                    style={{
                      width: 240,
                      height: 270,
                      verticalAlign: "center",
                    }}
                    hoverable
                    onClick={() => handleProduct(item)}
                    cover={
                      <img
                        src={item.p_image}
                        alt={item.p_name}
                        width={210}
                        height={210}
                        className="cardImage"
                      />
                    }
                    bordered={false}
                    className="homeProductCard"
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
    </div>
  );
};

export default BestOfElectronics;
