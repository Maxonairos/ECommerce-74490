import { FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";

const CartWidget = () => {
  let infoToast =()=>{
    Swal.fire({
      icon: "info",
      title: "Página en desarrollo, vuelve más tarde!!!",
      confirmButtonColor: "#00916E"
    })
  }

  return (
    <button className="cartwidget bg-success-subtle hover:bg-gray-700 rounded-md px-2" onClick={infoToast}>
        <FaShoppingCart size={30} color="gray"/>
    </button>
  )
}

export default CartWidget