import { useState} from "react"
import { Accordion, Card, Form, FormControl, Button} from "react-bootstrap"
import { postReview, getReviewsByRestaurantId} from "../../redux/actions/reviewActions"
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";


function CardReview({idResto}){

    const dispatch = useDispatch()

    const cookie = new Cookies();
    const tokenUser = cookie.get("user")?.accessToken


    const [rating, setRating] = useState(0);

    const [hover, setHover] = useState(0);

    const [input, setInput] = useState({

        commentReview:"",
    });

    const [accordionOpen, setAccordionOpen] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(postReview({commentReview: input.commentReview, ratingReview: rating, token: tokenUser, id: idResto}))
        setRating(0);
        setHover(0);
        setInput({
            commentReview: "",
        })
        setAccordionOpen(false);
        setTimeout(() => {
            dispatch(getReviewsByRestaurantId(idResto));
        }, 100);
    }

    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        });
    }

    function toggleAccordion() {
        setAccordionOpen(!accordionOpen);
    }

    return (
        
        <div>
            <Card
                style={{ "alignItems": "center", color: "#F15422"}}
            >
                <Card.Footer
                    style={{ width: "250px", padding: "0px"}}
                >
                    <small className="text-muted">
                    <Accordion
                        style={{ width: "250px", display: "flex"}}
                        activeKey={accordionOpen ? "0" : null} 
                    >
                        <Accordion.Item 
                            eventKey="0"
                            style={{ width: "250px"}}
                        >
                            <Accordion.Header
                                style={{ color: "#F15422"}}
                                onClick={toggleAccordion}
                            >
                                Desplegar comentarios
                            </Accordion.Header>
                            <Accordion.Body
                                style={{padding: "0px"}}
                            >
                                <Form onSubmit={ (event) => handleSubmit(event)}>
                                    <FormControl
                                        style={{ width: "248px"}}
                                        as="textarea"
                                        aria-label="With textarea"
                                        placeholder="Escribe tu comentario"
                                        name="commentReview"
                                        value={input.commentReview}
                                        onChange={(event) => handleChange(event)}
                                    />
                                    <div className="star-rating">
                                        {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                className={`star-button ${index <= (hover || rating) ? "on" : "off"}`}
                                                value={input.rating}
                                                name="rating"
                                                onChange={(event) => handleChange(event, setRating(index))}
                                                onClick={() => setRating(index)}
                                                onMouseEnter={() => setHover(index)}
                                                onMouseLeave={() => setHover(rating)}
                                            >
                                            <span className="star">&#9733;</span>
                                            </button>
                                        );
                                        })}
                                    </div>
                                    <Button
                                        variant="outline" 
                                        className="custom-button" 
                                        type="submit"
                                        style={{ margin: "0% 0 0 0", padding: "0px 5px"}}
                                        onClick={() => setInput({
                                        ...input,
                                        })}
                                    >
                                        Enviar
                                    </Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    </small>
                </Card.Footer>
            </Card>
        </div>
    )
}


export default CardReview; 