import { Carousel } from "antd";

import sareeCollection from "../Assest/sareeCollection.webp"
import Offers from "../Assest/Offers.webp"
import NewLaunch from "../Assest/NewLaunch.webp"

const Carousal = () => {

    return (
        <>
            <Carousel arrows autoplay style={{ padding: 10 }}>
                <div>
                    <img src={sareeCollection} alt="sareeCollection" className="corosoalImage" width={"100%"} />
                </div>
                <div>
                    <img src={Offers} alt="Offers" className="corosoalImage" width={"100%"} />
                </div>
                <div>
                    <img src={NewLaunch} alt="NewLaunch" className="corosoalImage" width={"100%"} />
                </div>
            </Carousel>
        </>
    )
}

export default Carousal;