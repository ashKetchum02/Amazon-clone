import "./productfooter.css"
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

export default function ProductFooter(props) {

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
        <div className="productFooterWrapper">
            <div className="productFooter">
                <div className="productFooterImageContainer"><img className="productFooterImage" src={props.image} alt="" /></div>
                <div className="productFooterInfo">
                    <p className="productFooterName">{props.name.substr(0, 19)}...</p>
                    <div className="stars">
                        {fullArr.map((i) => {
                            return <StarIcon style={{height:"20px"}} htmlColor="orange" />
                        })}
                        {rating==0.5 ? <StarHalfIcon style={{height:"20px"}} htmlColor="orange" /> : ""}
                        {leftArr.map((i) => {
                            return <StarOutlineIcon style={{height:"20px"}} htmlColor="orange" />
                        })}
                        <p>{props.reviews}</p>
                    </div>
                    <p className="productFooterPrice"><span>₹</span>{props.price}.00</p>
                    <input type="hidden" name="name" value={props.name}/>
                    <input type="hidden" name="price" value={props.price}/>
                    <input type="hidden" name="id" value={props.id}/>
                    <input type="hidden" name="reviews" value={props.reviews}/>
                    <input type="hidden" name="rating" value={props.rating}/>
                    <input type="hidden" name="image" value={props.image}/>
                    <button type="submit" className="productFooterAddToCartButton">Add to cart</button>
                </div>
            </div>
        </div>
    );
}