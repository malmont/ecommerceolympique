import styled from "styled-components";

export default function Card(props) {
  return (
    <Wrapper>
   <div className="card" >
    <img src={props.image} alt="" />
  <div class="card-body">
    <div className="row">
    <div className="col">
    {props.title}
   </div>
   <div className="col col-lg-3">
    ${props.price}
   </div>
    </div>
  
  </div>
  </div>
        
    </Wrapper>
  )
}
const Wrapper=styled.div `

width: 18rem;
`;