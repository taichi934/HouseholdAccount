import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

export default class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      amount: "",
      type: "foods",
      description: ""
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // onChange(e){
  //     if(e.target.id === 'amount'){
  //       var intAmount = parseInt(e.target.value);
  //       this.setState = ({ amount: intAmount })
  //     } else if(e.target.id === 'types'){
  //       this.setState = ({ type_name: e.target.value })
  //     } else if(e.target.id === 'description'){
  //       this.setState = ({ description: e.target.value })
  //     }
  // }
  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newItem = {
      amount: this.state.amount,
      //type_name: this.state.typename,
      type_name: this.state.type,
      description: this.state.description
    };
    //console.log(newItem);
    axios.post("/api/items", newItem).then(res => console.log(res.data));
    this.setState({ modal: false });
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Add Item
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <Form onSubmit={this.onSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="amount">Amount</Label>
                <Input
                  type="money"
                  name="amount"
                  value={this.state.amount}
                  id="amount"
                  //placeholder="Type an amount"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="types">Select Type</Label>
                <Input
                  type="select"
                  name="type"
                  id="types"
                  value={this.state.type_name}
                  onChange={this.onChange}
                >
                  <option>foods</option>
                  <option>books</option>
                  <option>daiily goods</option>
                  <option>clothings</option>
                  <option>medical</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="discription">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="dark">Submit</Button>
              <Button color="danger" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}
