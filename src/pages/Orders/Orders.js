import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import Order from "./Order";

const Orders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(
      `https://genius-car-server-kohl.vercel.app/orders?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("Genius-token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => setOrders(data));
  }, [user?.email, logOut]);

  //delete function
  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure, you want to cancel this order?"
    );
    if (proceed) {
      fetch(`https://genius-car-server-kohl.vercel.app/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            alert("Deleted successfully!");
            const remaining = orders.filter((odr) => odr._id !== id);
            setOrders(remaining);
          }
        });
    }
  };

  const handleStatusUpdate = (id) => {
    fetch(`https://genius-car-server-kohl.vercel.app/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("Genius-token")}`,
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = orders.filter((odr) => odr._id !== id);
          const approving = orders.find((odr) => odr._id === id);
          approving.status = "Approved";
          const newOrders = [...remaining, approving];
          setOrders(newOrders);
        }
      });
  };
  return (
    <div>
      <h2 className="text-5xl">{orders.length}</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name & Phone</th>
              <th>Service & Cost</th>
              <th>Service Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <Order
                key={order?._id}
                order={order}
                handleDelete={handleDelete}
                handleStatusUpdate={handleStatusUpdate}
              ></Order>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
