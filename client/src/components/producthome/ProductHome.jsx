import "./producthome.css"
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

export default function ProductHome(props) {

    var rating = parseFloat(props.rating);
    var left = 5 - Math.ceil(rating);
    var i = 0
    var fullArr = []
    var leftArr = []

    for (i = 1; i <= rating; i++) {
        fullArr.push(i)
    }

    rating -= i - 1;

    for (i = 1; i <= left; i++) {
        leftArr.push(i)
    }

    return (
        <div className="productContainer" style={props.product ? {} : {width:"300px"}}>
            {props.product ? "" : <p style={{fontSize:"20px", fontWeight:"bolder"}}>{props.name}</p>}
            <img className="productHomeImage" src={props.image} alt="product image" style={props.product ? {} : {maxHeight: "700px"}} />
            {props.product ? <div style={{display: "flex"}}><p>
                                {fullArr.map((i) => {
                                    return <StarIcon style={{height:"20px"}} htmlColor="orange" />
                                })}
                                {rating==0.5 ? <StarHalfIcon style={{height:"20px"}} htmlColor="orange" /> : ""}
                                {leftArr.map((i) => {
                                    return <StarOutlineIcon style={{height:"20px"}} htmlColor="orange" />
                                })}
                                </p> <p style={{fontSize: "13px", color: "teal"}}>{props.reviews}</p></div>
                                :
                                <span />}
            <div className="productInfo">
                {props.product ? <div className="productTitle">{props.name}</div> : <span />}
                {props.product ? <div className="productPrice"><span>₹</span>{props.price}.00</div> : <span />}
            </div>

            {props.product ? 
                <div>
                <input type="hidden" name="name" id="name" value={props.name} />
                <input type="hidden" name="price" id="price" value={props.price} />
                <input type="hidden" name="id" id="id" value={props.id} />
                <input type="hidden" name="reviews" id="reviews" value={props.reviews} />
                <input type="hidden" name="rating" id="rating" value={props.rating} />
                <input type="hidden" name="image" id="image" value={props.image} />
                </div>
            : ""}
            
            {props.product ? <button type="submit" className="addButton">Add To Cart</button> : <span />}
            {props.product ? <span /> : <a>See more...</a>}
        </div>
    );
}