"use client";

import React, { useState, useEffect } from "react";
import { bookingSchema } from "../Interface";
import { calculateAmount } from "@/services/request";
import Loader from "@/Loader/Loader";

const BookingProcessOne = ({
  setBookingInfo,
  bookingInfo,
}: {
  setBookingInfo: React.Dispatch<React.SetStateAction<bookingSchema>>;
  bookingInfo: bookingSchema;
}) => {
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({ ...bookingInfo, [name]: value });

    // Automatically calculate the price when number of shoots changes
    if (name === "number_of_shoot" && value > 0) {
      calculateShootAmount(value);
    }
  };

  const calculateShootAmount = async (numberOfShoots) => {
    setLoading(true);
    const data = await calculateAmount({
      number_of_shoot: numberOfShoots,
    });
    setLoading(false);
    if (data && data.price) {
      setBookingInfo(prevState => ({ ...prevState, amount: data.price }));
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-3xl text-primary">Create Bookings</h1>
      <form className="flex flex-col gap-5 mt-8">
        <div className="flex flex-col gap-1">
          <label htmlFor="shoot_type">Shoot Type</label>
          <select
            name="shoot_type"
            id="shoot_type"
            value={bookingInfo.shoot_type}
            onChange={handleChange}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          >
            <option value="OUTDOOR">OUTDOOR</option>
            <option value="INDOOR">INDOOR</option>
          </select>
        </div>
        <div>
          <label htmlFor="no_of_shoot">Number of Shoots</label>
          <input
            type="number"
            id="no_of_shoot"
            name="number_of_shoot"
            value={bookingInfo.number_of_shoot}
            onChange={handleChange}
            placeholder="e.g 20"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={bookingInfo.amount || ''}
            disabled
            placeholder="Calculated automatically"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        {bookingInfo.shoot_type.toLowerCase() === "outdoor" && (
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={bookingInfo.location}
              onChange={handleChange}
              placeholder="e.g Lagos"
              className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingProcessOne;
