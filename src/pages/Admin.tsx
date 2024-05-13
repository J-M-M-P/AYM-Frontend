import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Inventory from "../components/Admin/Inventory";
import B2B from "../components/Admin/B2B";
import Orders from "../components/Admin/Orders";

function Admin() {
  const [key, setKey] = useState<string>("inventory");

  return (
    <div>
      <style>
        {`
          .nav-pills .nav-link {
            color: black !important;
          }

          .nav-pills .nav-link.active {
            color: white !important;
            background-color: black !important;
          }

          .nav-pills .nav-link:hover {
            color: black !important;
            background-color: lightgray !important;
          }
        `}
      </style>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => k && setKey(k)}
        className="mb-3"
        variant="pills"
      >
        <Tab eventKey="inventory" title="Lager">
          <Inventory />
        </Tab>
        <Tab eventKey="b2b" title="B2B">
          <B2B />
        </Tab>
        <Tab eventKey="orders" title="Ordrer">
          <Orders />
        </Tab>
      </Tabs>
    </div>
  );
}
export default Admin;
