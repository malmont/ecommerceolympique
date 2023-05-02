import styled from "styled-components";
import Mode1 from "./mode1.jpg";
import Mode2 from "./model2.jpg";
import React, { useState, useEffect } from "react";
import CarouselComp from "../Carousel/CarouselComp";
import Feature from "./Feature";
import Product from "../Products/Product";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const changeBool = () => {
    setIsActive((isActive) => !isActive);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      changeBool();
      console.log(isActive);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <div className={isActive ? "div_principal" : "div_principal2"}>
        <div className="text-light divHeader ">
          <div className="textHeader ">
            <h4>NEW ARRIVALS</h4>
            <h1>DENIM JACKETS</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            ducimus deleniti mollitia reiciendis dolores doloribus? Sunt tempora
            enim adipisci. Delectus?Amet ducimus deleniti mollitia reiciendis
            dolores doloribus? Sunt tempora enim adipisci. Delectus?
            <button type="button" class="btn btn-info m-3">
              Discover
            </button>
            <button type="button" class="btn btn-info">
              Add To Cart
            </button>
          </div>

          <div className="priceHeader ">
            <div className="priceDiv">
            From
            <h1>$29</h1>
            Shop
            </div>
          
          </div>
        </div>
      </div>
     
      <Feature />

      <h1 className="m-4 p-4 text-center">LATEST PRODUCTS  </h1>
      <div className="featureCenter">
      <CarouselComp/>
      </div>

    
      <h1 className="m-4 p-4 text-center">LATEST PRODUCTS  </h1>
      <div className="widthUl">
      <ul className="ulListe">
            <li className="m-3">
                <a className="btn btn-dark m-2" href="">Top</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">JumSuit</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">Lingerie</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">Jeans</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">Dresses</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">Jumpers</a>
            </li>
            <li className="m-3">
            <a className="btn btn-dark  m-2" href="">Leggins</a>
            </li>
        </ul>
      </div>
    
      <div className="featureCenter">
        <div className="container">
        <div className="row">
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
        </div>

        <div className="row">
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
          <div className="col">
          <Product/>
          </div>
        </div>
        </div>
    
  
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .div_principal {
    height: 780px;
    background: url(${Mode1});
    background-repeat: no-repeat;
    background-size: auto;
  }
  .div_principal2 {
    height: 780px;
    background: url(${Mode2});
    background-repeat: no-repeat;
    background-size: auto;
  }
  .textHeader {
    width: 390px;
    /* margin-left: 30%;
    margin-right: 50%; */
    position: absolute;
    top: 300px;
    left: 300px;
    animation: fly-ball 4s infinite;
  }
  .divHeader {
    /* display: flex;

    align-items: center; */
    position: relative;
  }
  .priceHeader {
    position: absolute;
    top: 300px;
    right: 450px;
    background-color: blueviolet;
 
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    animation: rorateDiv 4s infinite;
  }
  .featureCenter{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ul {
    list-style-type: none;
  }
  .priceDiv{
    text-align:center;
  }
  .ulListe {
    list-style-type: none;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
   
  }


  @keyframes fly-ball {
    100% {
      transform: translateY(-100px);
    }
  }

  @keyframes rorateDiv {
    100% {
      transform: rotate(-360deg);
    }
  }
`;