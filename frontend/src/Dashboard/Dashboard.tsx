

import mobile from "../Assest/mobile.png"
import Fashion from "../Assest/Fashion.jpg"
import Electronics from "../Assest/Electronics.png"
import Grocery from "../Assest/Grocery.png"
import ToysAndBabies from "../Assest/ToysAndBabies.png"


import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

interface ProductInfo{
    key:String
}


const items = [
    {
        key: 'grocery',
        label: (
            <div>
                <img src={Grocery} alt="mobile" width={60} height={60} />
                {/* <br /> */}
                <p style={{ margin: 0 }}>Grocery</p>
            </div>
        ),
    },
    {
        key: 'mobile',
        label: (
            <div>
                <img src={mobile} alt="mobile" width={60} height={60} />
                {/* <br /> */}
                <p style={{ margin: 0 }}>Mobile</p>
            </div>
        ),
    },
    {
        key: 'fashion',
        label: (
            <div>
                <img src={Fashion} alt="fashion" width={60} height={60} />
                {/* <br /> */}
                <p style={{ margin: 0 }}>Fashion</p>
            </div>
        )
    },
    {
        key: 'electronics',
        label: (
            <div>
                <img src={Electronics} alt="electronics" width={60} height={60} />
                {/* <br /> */}
                <p style={{ margin: 0 }}>Electronics</p>
            </div>
        )
    },
    {
        key: 'beautyToys&More',
        label: (
            <div>
                <img src={ToysAndBabies} alt="beautyToys&More" width={60} height={60} />
                {/* <br /> */}
                <p style={{ margin: 0 }}>Beauty, Toys & More</p>
            </div>
        )
    }
];



const Dashboard = () => {

    const navigate = useNavigate();

    const onClick = (e:ProductInfo) => {
        navigate(`/product/${e.key}`)
    }

    return (
            <div className='dashboard'>
                <Menu
                    onClick={onClick}
                    mode='horizontal'
                    // theme="dark"
                    items={items}
                    className='dashboardMenu'
                />
            </div>
    );
};
export default Dashboard;