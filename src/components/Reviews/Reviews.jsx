import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import {getReviewsByRestaurantId, clearReviews} from "../../redux/actions/reviewActions";
import {AiFillStar} from "react-icons/ai"

function Review(){

    const { id } = useParams();
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(clearReviews()),
        dispatch(getReviewsByRestaurantId(id))

    }, [dispatch, id]);

    const reviewsState = useSelector((state) => {
        return Array.isArray(state.reviews.reviews)
        ? state.reviews.reviews
        : [state.reviews.reviews]
    });

    if (!reviewsState) {
        return <div>Loading...</div>;
    }

    function StarRating({ rating }) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<span className="star" key={i}><AiFillStar size={25}/></span>);
            } else {
                stars.push(<span className="star" key={i}>☆</span>);
            }
        }
        return <div>{stars}</div>;
    }

    return (
        <div>
                {reviewsState && reviewsState.length > 0 ? (
                reviewsState.map((review) => (
                    <div key={review.reviewId}>
                    <p>{review.commentReview}</p>
                    <StarRating rating={review.ratingReview}/>
                    <p>{review.userName}</p>
                    </div>
                ))
                ) : (
                <div>No hay reseñas</div>
            )}
        </div>
    )
}

export default Review;