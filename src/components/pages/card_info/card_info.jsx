import './card_info.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "./card.jsx";
import AddCard from "./add_card.jsx";

export default function CardInfo({setComponents}) {
    const [cards, setCards] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:8000/api/v1/wallet', {
            headers: {
                Authorization: `Token ${localStorage.getItem('auth_token')}`
            }
        })
            .then(response =>  {
                console.log(response.data.results)
                setCards(response.data.results.filter((card) => card.user === parseInt(localStorage.getItem('user_id'))))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const [isActive, setIsActive] = useState(false)
    const [addCard, setAddCard] = useState(false)

    const handleAddCard = () => {
        setAddCard(!addCard)
    }

    const handleClick = () => {
        setIsActive(true)
    }
    const handleClick2 = () => {
        setIsActive(false)
    }

    const total = cards.map((card) => parseInt(card.balance)).reduce((a, b) => a + b, 0)

    return (
        <>
            <div className='card-info-header'>
                <div>
                    <i onClick={() => setComponents('main')} className='bx bx-arrow-back'></i>
                    <h5>Платежные карты</h5>
                </div>
                <p>{total} $</p>
                <i onClick={() => handleAddCard()} className='bx bx-credit-card-front'></i>
            </div>
            <div className='card-info-choose'>
                <p onClick={() => handleClick()}>ВАШИ КАРТЫ</p>
                <p onClick={() => handleClick2()}>ПЛАТЕЖИ</p>
            </div>
            {addCard && <AddCard handleAddCard={handleAddCard} setCards={setCards} cards={cards} />}
            {isActive && <Card cards={cards} />}
        </>
    )
}