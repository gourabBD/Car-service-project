import React from "react";
import person from '../../assets/images/about_us/person.jpg'
import parts from '../../assets/images/about_us/parts.jpg'

const About = () => {
  return (
    <div className="hero my-20">
      <div className="hero-content flex-col lg:flex-row ">
        <div className="relative w-1/2">
        <img
          src={person} alt=""
          className=" rounded-lg shadow-2xl w-4/5 h-full"
        />
        <img
          src={parts} alt=""
          className=" rounded-lg shadow-2xl absolute w-3/5 right-5 top-1/2 border-8 border-red-100"
        />
        </div>
        <div className="w-1/2">
        <p className=" text-2xl font-bold text-orange-600">About Us</p>
          <h1 className="my-5 text-5xl font-bold">We are qualified <br /> & of experience <br /> in this field</h1>
          <p className="py-6">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
          
          </p>
          <p className="py-6">
          The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
          </p>
          <button className="btn bg-orange-600 border-none">Get More Info</button>
        </div>
      </div>
    </div>
  );
};

export default About;
