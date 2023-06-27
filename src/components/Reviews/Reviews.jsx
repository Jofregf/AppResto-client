import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getReviewsByRestaurantId, clearReviews, deleteReview} from "../../redux/actions/reviewActions";
import {AiFillStar, AiOutlineStar} from "react-icons/ai"
import CardReview from "../CardReview/CardReview";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

function Review({idResto}){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearReviews()),
        dispatch(getReviewsByRestaurantId(idResto))

    }, [dispatch, idResto]);

    const reviewsState = useSelector((state) => {
        return Array.isArray(state.reviews.reviews)
        ? state.reviews.reviews
        : [state.reviews.reviews]
    });

    let cookie = new Cookies();
    let tokenUser = cookie.get("user")?.accessToken;
    const idUser = cookie.get("user")?.id;

    if (!reviewsState) {
        return <div>Loading...</div>;
    }

    function StarRating({ rating }) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span className="starShow" key={i}><AiFillStar size={25}/></span>);
            } else {
                stars.push(<span className="starShow" key={i}><AiOutlineStar size={25}/></span>);
            }
        }
        return <div>{stars}</div>;
    }

    const handleDelete = (id) => {
        dispatch(
            deleteReview({ token: tokenUser, id: id })
        )
    };

    return (
        <div>
                {reviewsState && reviewsState.length > 0 ? (
                reviewsState.map((review) => (
                    <div key={review.reviewId}>
                    <p>{review.commentReview}</p>
                    <StarRating rating={review.ratingReview}/>
                    <p>{review.userName}</p>
                    {idUser === review.userId && (
                        <div>
                            <Button 
                                onClick={() => handleDelete(review.reviewId)}
                                variant="outline"
                                className="custom-review-button"
                            >
                                <AiFillDelete size={12} />
                            </Button>
                        </div>
                    )}
                    
                    </div>
                ))
                ) : (
                <div>No hay reseñas</div>
            )}
            <CardReview idResto={idResto}/>
        </div>
    )
}
export default Review;
