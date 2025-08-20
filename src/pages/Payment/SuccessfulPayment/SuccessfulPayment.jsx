import React from 'react'
import { motion } from "framer-motion";
import styles from "./SuccessfulPayment.module.css";
import { NavLink } from 'react-router-dom';
import checkImg from '../../../assets/images/check.png';

function SuccessfulPayment() {
  return (
    <div className={`flex items-center justify-center min-h-screen ${styles.bgCustom}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="card w-96 bg-base-100 shadow-xl text-center relative"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center -mt-12"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
            <img src={checkImg} alt="Success" />
          </div>
        </motion.div>

        {/* Card Body */}
        <div className="card-body mt-4">
          <h2 className="text-xl font-bold">Payment Successful 🎉</h2>
          <p className="text-gray-500 text-sm mt-2">
            Your payment has been successfully processed. Now you can go to your
            bookings page.
          </p>

          <div className="mt-4">
            <NavLink to='/myBookings' >
            <button className="btn btn-success w-full">My Bookings</button>
            </NavLink>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


export default SuccessfulPayment