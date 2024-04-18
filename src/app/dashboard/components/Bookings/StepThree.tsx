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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingInfo(prev => ({
      ...prev,
      [name]: value,
      ...(name === "shoot_type" && value === "indoor" ? { location: "" } : {}),
    }));
  };

  useEffect(() => {
    const fetchAmount = async () => {
      if (bookingInfo.number_of_shoot > 0) {
        setLoading(true);
        try {
          const data = await calculateAmount("accessTokenPlaceholder", {
            number_of_shoot: bookingInfo.number_of_shoot,
          });
          setBookingInfo(prev => ({
            ...prev,
            amount: data.price,
          }));
        } catch (error) {
          console.error("Failed to fetch amount:", error);
          // Optionally handle the error by showing an error message to the user
        }
        setLoading(false);
      }
    };

    fetchAmount();
  }, [bookingInfo.number_of_shoot, setBookingInfo]);

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
            <option>OUTDOOR</option>
            <option>INDOOR</option>
          </select>
        </div>
        <div>
          <label htmlFor="no_of_shoot">Number of Shoots</label>
          <input
            type="number"
            id="no_of_shoot"
            name="number_of_shoot"
            placeholder="e.g., 20"
            value={bookingInfo.number_of_shoot}
            onChange={handleChange}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div className="w-full flex items-center gap-[10px]">
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
          {loading && <Loader />}
        </div>
        {bookingInfo.shoot_type.toLowerCase() === "outdoor" && (
          <div>
            <label htmlFor="location"> Your Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={bookingInfo.location}
              onChange={handleChange}
              placeholder="e.g., Lagos"
              className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingProcessOne;
