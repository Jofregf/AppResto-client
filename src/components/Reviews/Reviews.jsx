import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getReviewsByRestaurantId, clearReviews, deleteReview, editReview} from "../../redux/actions/reviewActions";
import CardReview from "../CardReview/CardReview";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";
import { AiFillStar, AiOutlineStar, AiFillDelete, AiFillEdit, AiFillSave } from "react-icons/ai";
import {GiCancel} from "react-icons/gi";
function Review({idResto}){

    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [editContent, setEditContent] = useState("");
    const [editRating, setEditRating] = useState("");


    useEffect(() => {
        dispatch(clearReviews()),
        dispatch(getReviewsByRestaurantId(idResto))

    }, [dispatch, idResto]);

    useEffect(() => {
        console.log("editMode:", editMode);
    }, [editMode]);

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

    function StarRating({ rating, onRatingChange }) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(
                    <span
                        className="starShow"
                        key={i}
                        onClick={() => onRatingChange(i)}
                    >
                        <AiFillStar size={25} />
                    </span>
                );
            } else {
                stars.push(
                <span
                    className="starShow"
                    key={i}
                    onClick={() => onRatingChange(i)}
                >
                    <AiOutlineStar size={25} />
                </span>
                );
            }
        }
            return <div>{stars}</div>;
    }

    const handleDelete = (id) => {
        dispatch(
            deleteReview({ token: tokenUser, id: id })
        )
    };

    const handleRatingChange = (rating) => {
        setEditRating(rating);
    };
    
    const handleEdit = (content, rating) => {
        console.log(content)
        console.log(rating)
        setEditMode(true);
        setEditContent(content);
        setEditRating(rating);
        console.log(editMode)
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleUpdate = (id) => {
        dispatch(
            editReview({ ratingReview: editRating, commentReview: editContent, token: tokenUser, id: id })
        );
        setEditMode(false);
        setTimeout(() => {
            dispatch(getReviewsByRestaurantId(idResto));
        }, 10)
      };

    return (
        
        <div>
            {reviewsState && reviewsState.length > 0 ? (
                reviewsState.map((review) => (
                    <div key={review.reviewId}>
                        {editMode && idUser === review.userId ? (
                        <>
                            <textarea
                                className="edit-textarea"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <StarRating rating={editRating} onRatingChange={handleRatingChange} />
                        </>
                        ) : (
                        <>
                            <p>{review.commentReview}</p>
                            <StarRating rating={review.ratingReview} />
                        </>
                        )}
                        <p>{review.userName}</p>
                        {idUser === review.userId && (
                        <div>
                            {!editMode && (
                            <Button
                                onClick={() => handleEdit(review.commentReview, review.ratingReview)}
                                variant="outline"
                                className="custom-review-button"
                            >
                                <AiFillEdit/>
                            </Button>
                            )}
                            {editMode  && (
                            <>
                                <Button
                                onClick={() => handleUpdate(review.reviewId)}
                                variant="outline"
                                className="custom-review-button"
                                >
                                    <AiFillSave/>
                                </Button>
                                <Button
                                onClick={handleCancel}
                                variant="outline"
                                className="custom-review-button"
                                >
                                    <GiCancel/>
                                </Button>
                            </>
                            )}
                            <Button
                            onClick={() => handleDelete(review.reviewId)}
                            variant="outline"
                            className="custom-review-button"
                            >
                            <AiFillDelete/>
                            </Button>
                        </div>
                        )}
                    </div>
                ))
            ) : (
                    <div className="alert-resto">
                    <p>No hay reseñas</p>
                    </div>
                )
            }
            <CardReview idResto={idResto} />
        </div>
    )
}
export default Review;
