"use client";

import React, { useEffect, useState } from "react";
import { bookingSchema, profileSchema } from "../Interface";
import { retrieveProfile } from "@/services/request";

const BookingProcessOne = ({
  setBookingInfo,
  bookingInfo,
  profile,
  setProfile,
}: {
  setBookingInfo: React.Dispatch<React.SetStateAction<bookingSchema>>;
  bookingInfo: bookingSchema;
  profile: profileSchema;
  setProfile: React.Dispatch<React.SetStateAction<profileSchema>>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  const getUserProfile = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const data = await retrieveProfile(accessToken);
      if (data) {
        setProfile(data);
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    // Automatically set the plan to JASPER on component mount
    setBookingInfo({ ...bookingInfo, plan: "JASPER" });
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl text-primary">Create Bookings</h1>
      </div>

      <form className="flex flex-col gap-5 mt-8">
        <div>
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={profile.first_name + " " + profile.last_name}
            disabled
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="Phone_number">WhatsApp Number</label>
          <input
            type="number"
            id="Phone_number"
            name="phone"
            value={bookingInfo.phone}
            onChange={handleChange}
            placeholder="+2348149055068"
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="plan">Plan</label>
          <input
            type="text"
            id="plan"
            name="plan"
            value="JASPER"  // Set the plan name to JASPER
            disabled={true}  // Disable the input to prevent user changes
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="shooting_date"
            value={bookingInfo.shooting_date}
            onChange={handleChange}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="time">Time (between 08:00 and 19:00)</label>
          <input
            type="time"
            id="time"
            name="shooting_time"
            value={bookingInfo.shooting_time}
            onChange={handleChange}
            className="w-full bg-white rounded-md min-h-12 mt-1.5 p-2 text-black"
          />
        </div>
      </form>
    </div>
  );
};

export default BookingProcessOne;
