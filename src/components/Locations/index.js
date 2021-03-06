import React from "react";
import { ListGroup, Image } from 'react-bootstrap';
import './Locations.scss'

const Location =({name, picture}) => {

  return (

    <div>
      <ListGroup.Item className="ListGroupItem">{name}<Image className="locationImageSize" src={picture} roundedCircle /></ListGroup.Item>

    </div>

  )
}
export default Location