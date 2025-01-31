import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Navbar,
  Nav,
  Offcanvas,
  Accordion
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { mockData } from "./data/mockAccounts.js";

const Dashboard = () => {
  //state hook to control whether filter bar is showing or not
  const [showFilters, setShowFilters] = useState(false);
  //state hook to control filters
  const [filters, setFilters] = useState({ company: "", status: "", email: "", date: "" });
  //state hook to apply filter changes upon enter or button click
  const [appliedFilters, setAppliedFilters] = useState({
    company: "",
    status: "",
    email: "",
    date: "",
  });

  //only apply filters upon enter key press or button click
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setAppliedFilters({ ...filters });
    }
  }

  //function called to clear all filters and apply them
  //need to manually specify empty filters to apply in case setFilters hasn't finished
  //executing yet...
  const clearAllFilters = () => {
    setFilters({ company: "", status: "", email: "", date: "" });
    setAppliedFilters({ company: "", status: "", email: "", date: "" });
  };

  //data to display on the screen after filters
  let filteredData = mockData.filter(
    (item) =>
      (appliedFilters.company === "" ||
        item.company
          .toLowerCase()
          .includes(appliedFilters.company.toLowerCase())) &&
      (appliedFilters.status === "" || item.status === appliedFilters.status) &&
      (appliedFilters.email === "" ||
        item.email.toLowerCase().includes(appliedFilters.email.toLowerCase())) &&
      (appliedFilters.date === "" || item.date === appliedFilters.date)
  );

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-light p-3 vh-100" style={{ width: "250px" }}>
        <h4 className="mb-4">BillMax 2024</h4>
        {/* Dummy Nav bar -- no other current components */}
        {/* Active tab will be blue and all others gray. */}
        <Nav className="flex-column">
          <Nav.Link style={{ color: "gray" }} href="#">
            Dashboard
          </Nav.Link>
          <Nav.Link style={{ color: "blue" }} href="#" className="active">
            Accounts
          </Nav.Link>
          <Nav.Link style={{ color: "gray" }} href="#">
            Users
          </Nav.Link>
          <Nav.Link style={{ color: "gray" }} href="#">
            Services
          </Nav.Link>
          <Nav.Link style={{ color: "gray" }} href="#">
            Tickets
          </Nav.Link>
          <Nav.Link style={{ color: "gray" }} href="#">
            Appointments
          </Nav.Link>
          <Nav.Link style={{ color: "gray" }} href="#">
            My Options
          </Nav.Link>
          <Nav.Link style={{ color: "gray" }} href="#">
            Settings
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <Container fluid className="flex-grow-1 overflow-auto">
        {/* Top Navbar */}
        <Navbar className="bg-white shadow-sm px-3 mb-3">
          <Nav className="ms-auto">
            <Nav.Link href="#">Reports</Nav.Link>
            <Nav.Link href="#">Billing Administration</Nav.Link>
            <Nav.Link href="#">Correspondence</Nav.Link>
            <Nav.Link href="#">System</Nav.Link>
          </Nav>
        </Navbar>

        <h3 style={{ marginBottom: "20px" }}>Accounts</h3>

        {/* Action Buttons - Only filter button currently works. Others are placement dummies */}
        <Row className="mb-3">
          <Col>
            <Button variant="primary" className="me-2">
              + New Account
            </Button>
            <Button variant="outline-secondary">Edit Columns</Button>
          </Col>
          <Col className="text-end">
            <Button variant="outline-secondary" className="me-2">
              Export
            </Button>
            <Button variant="outline-secondary" className="me-2">
              Save Options
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => setShowFilters(true)}
            >
              Filters
            </Button>
          </Col>
        </Row>

        {/* Table - Main component storing the data*/}
        <div className="overflow-auto bg-white p-2 rounded shadow-sm">
          <Table bordered hover className="w-100">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
              {/* Searching functionality supported here */}
              <tr>
                <th>
                  <Form.Control type="text" placeholder="Search" />
                </th>
                <th>
                  <Form.Control type="text" placeholder="Search" />
                </th>
                <th>
                  <Form.Control type="text" placeholder="Search" />
                </th>
                <th>
                  <Form.Control type="text" placeholder="Search" />
                </th>
                <th>
                  <Form.Control type="text" placeholder="Search" />
                </th>
                <th>
                  <Form.Select>
                    <option>All</option>
                    <option>Closed</option>
                    <option>Open</option>
                    <option>Collections</option>
                    <option>Suspended</option>
                  </Form.Select>
                </th>
                <th>
                  <Form.Control type="text" placeholder="Search" />
                </th>
              </tr>
            </thead>
            {/*Display filtered mock data here*/}
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.company}</td>
                  <td>{item.contact}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.status}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      {/* Filter Sidebar */}
      <Offcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Accordions are the dropdowns you can click to expand the filters.
          Currently 4 filters of 3 different times are supported - company, status, email, and date.
          Company and email are text-based, status is a checkbox, and date is a date format. */}
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Company</Accordion.Header>
              <Accordion.Body>
                <Form.Control
                  type="text"
                  placeholder="Search company"
                  value={filters.company}
                  onChange={(e) =>
                    setFilters({ ...filters, company: e.target.value })
                  }
                  onKeyUp={handleKeyPress}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Status</Accordion.Header>
              <Accordion.Body>
                <Form.Select
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Collections">Collections</option>
                  <option value="Suspended">Suspended</option>
                </Form.Select>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Email</Accordion.Header>
              <Accordion.Body>
                <Form.Control
                  type="email"
                  placeholder="Search email"
                  value={filters.email}
                  onChange={(e) =>
                    setFilters({ ...filters, email: e.target.value })
                  }
                  onKeyUp={handleKeyPress}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Date</Accordion.Header>
              <Accordion.Body>
                <Form.Control
                  type="date"
                  value={filters.date}
                  onChange={(e) =>
                    setFilters({ ...filters, date: e.target.value })
                  }
                />
                {/* Added a clear date button because it's hard to clear the date otherwise */}
                <Button
                  variant="outline-secondary"
                  className="mt-2 w-100"
                  onClick={() => setFilters({ ...filters, date: "" })}
                >
                  Clear Date
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {/* Buttons to apply all filters and clear all filters */}
          <Button
            variant="primary"
            className="w-100 mt-3"
            onClick={() => setAppliedFilters({ ...filters })}
          >
            Apply Filters
          </Button>

          <Button
            variant="danger"
            className="w-100 mt-3"
            onClick={clearAllFilters}
          >
            Clear All Filters
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Dashboard;
