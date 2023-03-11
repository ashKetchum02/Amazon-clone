import "./homecard.css"

export default function HomeCard(props) {

    const zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);

    const a = zip(props.images, props.spans)

    return (
        <div className="cardContainer">
            <div className="cardTitle">{props.title}</div>
            <div className="imageContainer">

                {a.map((item) => {
                    return (
                        <div className="oneimage">
                            <div className="imageHead">
                            <img src={item[0]} alt="" className="cardImage" />
                            </div>
                            <div className="imageFoot">
                                <span>{item[1] ? item[1]: ""}</span>
                            </div>
                        </div>
                    )
                })}

                {/* <div className="oneimage">
                    <div className="imageHead">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-2-372-232._SY232_CB636110853_.jpg" alt="" className="cardImage" />
                    </div>
                    <div className="imageFoot">
                        <span>Clothing</span>
                    </div>
                </div>
                <div className="oneimage">
                    <div className="imageHead">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-3-372-232._SY232_CB636110853_.jpg" alt="" className="cardImage" />
                    </div>
                    <div className="imageFoot">
                        <span>Clothing</span>
                    </div>
                </div>
                <div className="oneimage">
                    <div className="imageHead">
                    <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF_4-372-232._SY232_CB636110853_.jpg" alt="" className="cardImage" />
                    </div>
                    <div className="imageFoot">
                        <span>Clothing</span>
                    </div>
                </div> */}

            </div>
            <div className="link">
                <a href="#">{props.link}</a>
            </div>
        </div>
    );
}