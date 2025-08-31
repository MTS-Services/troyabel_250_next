"use client";
import { useState } from "react";
import FirstModal from "./home/FirstModal";

const OpenAppointmentButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
      >
        Book a Free Discovery Call
      </button>

      <FirstModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default OpenAppointmentButton;
