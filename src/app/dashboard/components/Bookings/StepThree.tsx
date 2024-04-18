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

  // Specify the type for the event parameter
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingInfo({ ...bookingInfo, [name]: value });

    // Automatically calculate the amount if it's related to number_of_shoots
    if (name === "number_of_shoot" && value) {
      calculateShootAmount(parseInt(value));
    }
  };

  const calculateShootAmount = async (numberOfShoots: number) => {
    if (numberOfShoots > 0) {
      setLoading(true);
      const data = await calculateAmount({
        number_of_shoot: numberOfShoots,
      });
      setLoading(false);
      if (data && data.price) {
        setBookingInfo(prevState => ({ ...prevState, amount: data.price }));
      }
    }
  };

  useEffect(() => {
    // Initial setup or cleanup actions
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-3xl text-primary">Create Bookings</h1>
      {/* Additional form elements and inputs go here */}
    </div>
  );
};

export default BookingProcessOne;
