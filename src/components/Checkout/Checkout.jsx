import { useState, useContext } from "react"
import FormCheckout from "./FormCheckout.jsx"
import { CartContext } from "../../context/CartContext.jsx"
import { Timestamp, addDoc, collection, setDoc, doc } from "firebase/firestore"
import db from "../../db/db.js"
import BuySuccess from "./BuySuccess.jsx"
import Swal from "sweetalert2"

const Checkout = () => {
    const [dataForm, setDataForm] = useState({
        name: "",
        surname:"",
        email: "",
        address: "",
        number:"",
        floor:"",
        department:"",
        province:"",
        locality: "",
        zipcode:"",
        areacode:"",
        phone: "",
        repeatemail:""
    })
    const [orderId, setOrderId] = useState(null)
    const { cart, totalPriceCart, deleteCart } = useContext(CartContext)

    const handleChangeInput = (event) => {
        setDataForm({ ...dataForm, [event.target.name]: event.target.value })

    }

    const handleSubmitForm = (event) => {
        event.preventDefault()
        const order = {
            buyer: { ...dataForm },
            products: [...cart],
            date: Timestamp.fromDate(new Date()),
            total: totalPriceCart()
        }
        if (dataForm.email === dataForm.repeatemail){
            uploadOrder(order)
        } else {
            emailHandleToast()
        }
    }

    let emailHandleToast = ()=>{
        Swal.fire({
            icon: "warning",
            title: "Email erróneo   ",
            text: "Verificá si el email que ingresaste es correcto",
            confirmButtonColor: "#00916E"
        })
    }

    const uploadOrder = (newOrder) => {
        const orderCollection = collection(db, "orders")
        addDoc(orderCollection, newOrder)
            .then((response) => {
                setOrderId(response.id)
            })
            .finally(() => {
                updateStock()
            })
    }

    const updateStock = () => {
        cart.map(({ quantity, id, ...productCart }) => {
            const productRef = doc(db, "productos", id)
            setDoc(productRef, { ...productCart, cantidad: productCart.cantidad - quantity })
        })
        deleteCart()
    }

    return (
        <div className="flex flex-wrap justify-center">
            <div className="flex content-center">
            {
                orderId ?
                    <BuySuccess orderId={orderId}/>
                    :
                    <FormCheckout dataForm={dataForm} handleSubmitForm={handleSubmitForm} handleChangeInput={handleChangeInput} />

            }
            </div>
            
        </div>
    )
}

export default Checkout