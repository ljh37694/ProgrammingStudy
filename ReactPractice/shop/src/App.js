import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import data from "./data.js";
import { useState } from "react";

function ShoesItems(props) {
    let itemData = props.data;

    return (
        <div>
            <div className="row">
                {itemData.map((item, idx) => {
                    return (
                        <div className="col-md-4" key={idx}>
                            <img
                                src={`https://codingapple1.github.io/shop/shoes${idx + 1}.jpg`}
                                width="80%"
                            />
                            <h4>{item.title}</h4>
                            <p>{item.content}</p>
                            <p>{item.price}원</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function App() {
    let [itemData, setItemData] = useState(data);
    return (
        <div className="App">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container className="ms-0">
                    <Navbar.Brand href="#home">Shoeshop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Cart</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="더보기" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="main-image w-100 m-0"></div>
            <ShoesItems data={itemData}/>
        </div>
    );
}

export default App;
