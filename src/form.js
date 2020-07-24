import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter , Col, Row, Form, FormGroup, Label, Input , Alert} from 'reactstrap';
import {itemsFromBackend as ifb , columnsFromBackend as cfb , handleAdd}  from "./App";

const ModalExample = (props) => {
  const {
    className
  } = props;



  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

  const check =() => { console.log(cfb);};

  const [columns, setColumns] = useState(cfb);
  const [items, setItems] = useState(ifb);
  

  return (
  <div>
    <Button color="success" onClick={toggle}>+</Button>
    <Modal isOpen={modal} toggle={toggle} className={className}>
      <Alert color="primary"><ModalHeader toggle={toggle} close={closeBtn}>Add Lead</ModalHeader></Alert>
      <ModalBody>
      <Form>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label >Lead Title</Label>
            <Input  placeholder="Title" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label >Person Name</Label>
            <Input placeholder="Name" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label>Organisation</Label>
        <Input />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="1234@gmail.com" />
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label >Value</Label>
            <Input />
          </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
        <Label for="exampleSelect">Currency</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>Rupee</option>
          <option>Dollar</option>
          <option>Euro</option>
          <option>Dhiram</option>
          <option>Yen</option>
        </Input>
      </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label for="exampleAddress">Address</Label>
        <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
      </FormGroup>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCity">City</Label>
            <Input type="text" name="city" id="exampleCity"/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleState">State</Label>
            <Input type="text" name="state" id="exampleState"/>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <Label for="exampleZip">Zip</Label>
            <Input type="text" name="zip" id="exampleZip"/>
          </FormGroup>  
        </Col>
      </Row>
    </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={toggle}>Save</Button>{' '}
        <Button color="danger" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  </div>
);
}

export default ModalExample;