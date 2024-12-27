const { Row, Col } = require("antd");
const { default: axios } = require("axios");
const { useState, useEffect } = require("react");
const { useNavigate, useParams } = require("react-router-dom");






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
  
  








const SearchedProduct = () => {

    const [products, setProducts] = useState([])

    const navigate = useNavigate();
    const param = useParams("p_type")
    const type = param.type;

    const handleProduct = (productData:productInfo) => {
        navigate(`/item/${type}?name=${productData.p_name}&id=${productData.p_id}`)

    }


    useEffect(() => {


        async function fetchData() {
            await axios.get(`http://localhost:3321/getProductByType/${type}`)
                .then((response:any) => setProducts(response.data.products as productInfo))
                .catch((error:any) => console.error(error.response.data.message))
        }
        fetchData()
        // eslint-disable-next-line
    }, [])


    return (
        <div className="searchedProduct">
            <Row>
                <Col span={4}>
                </Col>
                <Col span={20}>
                    {
                        products.map((item:productInfo) => {
                            return (
                                <Row className="productDisplaying" key={item.p_id} onClick={() => handleProduct(item)}>

                                    <Col span={5}>
                                        <img src={item.p_image} alt={item.p_name} width={250} height={250} />
                                    </Col>
                                    <Col span={14}>
                                        <Row>{item.p_name}</Row>
                                    </Col>
                                    <Col span={5}>
                                        <Row>{item.p_price}</Row>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Col>
            </Row>

        </div>
    )
}

export default SearchedProduct;