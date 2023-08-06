import React, { Component } from "react";
import {MdOutlineCreditCard , MdOutlineSearch , MdFreeCancellation , MdAirplanemodeActive} from "react-icons/md";
import './img/services.css';


export default class Services extends Component {
  state = {
    services: [
      {
        icon: <MdOutlineSearch />,
        title: "The World's Travel Search Engine",
        info:
          "You can use our serach enginr to find any flight you want and select a desired destination and price."
        
      },
      {
        icon: <MdAirplanemodeActive />,
        title: "Cheap and Beneficail Air Tickets",
        info:
          "You provide tickets to the flights of almost all existing airlines so you don't need to look for them."
      },
      {
        icon: <MdOutlineCreditCard />,
        title: "Convenient Payment Methods For You",
        info:
          "We provide a variety of payment methods including cash, and credit cards."
      },
      {
        icon: <MdFreeCancellation />,
        title: "Free Cancellation",
        info:
          "We provide free cancellation on all flights."
      }
    ]
  };
  render() {
    return (
      <section className="services">
        
        <div className="services-center" >
          {this.state.services.map(item => {
            return (
              <article key={`item-${item.title}`} className="service">
                <span>{item.icon}</span>
                <h6 >{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}