import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../Contexts/authContext';
import { clearCart } from '../../../../src/redux/cartSlice'; // Import the clearCart action
import {jwtDecode} from 'jwt-decode';

export default function Total() {
  const cart = useSelector((state) => state.cart);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch
  let taxe = 20;

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach(item => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
    } else {
      try {
        const decodedToken = jwtDecode(user.token);
        const userId = decodedToken.user_id;

        const promises = cart.map(item => {
          return fetch('https://backend-strapi.online/api.jeuxolympiques.com/api/achats/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
              ticket: item.id,
              nombre_tickets: item.quantity,
              prix_ticket: item.price,
              prix_total: item.price * item.quantity,
              user_acheteur: userId
            })
          }).then(response => {
            if (!response.ok) {
              return response.json().then(errorData => {
                throw new Error(errorData.detail || 'Failed to create purchase');
              });
            }
            return response.json();
          });
        });

        await Promise.all(promises);
        console.log('Achats créés avec succès');
        // Clear the cart
        dispatch(clearCart());

        // Redirect to the confirmation page with state
        navigate('/confirmation', { state: { cart, totalPrice: ((getTotal().totalPrice * taxe) / 100) + getTotal().totalPrice } });
      } catch (error) {
        console.error("Erreur lors de la création des achats", error);

        // Log the error details to understand the problem
        if (error.response) {
          const responseText = await error.response.text();
          console.error("Server response text:", responseText);
        }
      }
    }
  };

  return (
    <Wrapper>
      <div className="total ">
        <h4>Orders Summary</h4>
        <div className="trait"></div>
        <div className="height"></div>
        <div className="row">
          <div className="col">
            <p className="total__p">
              Cart Subtotal HT ({getTotal().totalQuantity} items)
            </p>
          </div>
          <div className="col-6 col-sm-4">
            <p className="total__p">
              <strong>${getTotal().totalPrice}</strong>
            </p>
          </div>
        </div>

        <div className="trait"></div>
        <div className="row">
          <div className="col">
            <p className="total__p">
              Taxe (20%)
            </p>
          </div>
          <div className="col-6 col-sm-4">
            <p className="total__p">
              <strong>${((getTotal().totalPrice * taxe) / 100)}</strong>
            </p>
          </div>
        </div>

        <div className="trait"></div>

        <div className="row">
          <div className="col">
            <p className="total__p">
              Shipping
            </p>
          </div>
          <div className="col-6 col-sm-4">
            <p className="total__p">
              <strong>free shipping</strong>
            </p>
          </div>
        </div>

        <div className="trait"></div>

        <div className="row">
          <div className="col">
            <p className="total__p">
              Total TTC
            </p>
          </div>
          <div className="col-6 col-sm-4">
            <p className="total__p">
              <strong>${((getTotal().totalPrice * taxe) / 100) + getTotal().totalPrice}</strong>
            </p>
          </div>
        </div>

        <button type="button" className="btn btn-success" onClick={handleCheckout}>Proceed to checkOut</button>
      </div>
      <div className="height"></div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
.total{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid #000;
  margin-bottom:10px;
  padding: 20px;
  background: white;
  border-radius: 3px;
  min-width: 350px;
}

.total > h2{
  font-weight: 400;
}
.height{
  height:10px;
}
.total__p{
  font-size: 20px;
  font-weight: 450;
  color: rgb(72, 77, 77);
}
.trait{
  border-top: 1px solid #000;
}
.total > button:active{
  background-color: unset;
  border: 1px solid #FFD814;
}

@media(max-width:800px){
  .total{
    width: unset;
    text-align: center;
  }
}

@media(max-width:900px){
  .total{
    min-width: unset;
  }
}
`;
