import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer.js'
export default function Card(props) {

    let dispatch = useDispatchCart()
    let data = useCart()
    const priceRef = useRef()
    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item

                break;
            }
        }
        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty, })
                return
            }
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img })
        //console.log("hi", data)
    }

    let finalPrice = qty * (options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])


    return (
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "450px" }}>
            <img src={props.foodItem.img} className='card-img-top' alt='...' style={{ height: '220px', maxHeight: '220px', objectFit: "fill" }} />
            <div className="card-body">
                <h5 className='card-title'>{props.foodItem.name}</h5>
                <p className="card-text">This is some important text</p>
                <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                    {Array.from(Array(6), (e, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <select className='m-2 h-100 bg-success' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                    {priceOptions.map(data => (
                        <option key={data} value={data}>{data}</option>
                    ))}
                </select>
                <div className='d-inline h-100 fs-5'>
                    ₹{finalPrice}/-

                </div>
                <hr ></hr>
                <button className='btn btn-success justify-content-center ms-2' onClick={handleAddToCart}>Add to cart </button>

            </div>
        </div>
    );
}
