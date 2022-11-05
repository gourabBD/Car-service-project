import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const CheckOut = () => {
  const { title, price, _id } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "Unregistered";
    const message = form.message.value;
    const phone = form.phone.value;
    const order = {
      service: _id,
      serviceName: title,
      price: price,
      customer: name,
      email,
      phone,
      message,
    };
    // if(phone.length>10){
    //     alert('Phone number should be 10 characters or longer')
    // }
    // else{

    // }
    fetch("https://genius-car-server-kohl.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Oreder Placed Successfully!");
          form.reset();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <form onSubmit={handlePlaceOrder}>
        <h2 className="text-4xl">{title}</h2>
        <h4 className="text-3xl">Price:$ {price}</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full "
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full "
          />
          <input
            name="phone"
            type="text"
            placeholder="Your Phone"
            className="input input-bordered w-full "
            required
          />
          <input
            name="email"
            type="text"
            placeholder="Your Email"
            className="input input-bordered w-full "
            defaultValue={user?.email}
            readOnly
          />
        </div>
        <textarea
          name="message"
          className="textarea textarea-bordered h-24 w-full"
          placeholder="Your Message"
          required
        ></textarea>
        <input
          className="btn bg-orange-600"
          type="submit"
          value="Place Your Order"
        />
      </form>
    </div>
  );
};

export default CheckOut;
