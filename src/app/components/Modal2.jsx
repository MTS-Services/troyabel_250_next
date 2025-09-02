"use client"
import { Dialog, Transition, DialogPanel } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import FirstModal from "./home/FirstModal";



const Modal2 = ({ setIsEditModalOpen, isOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEditModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
 
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-7xl  transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Main content: 2 sections */}
                {/* Main content: 2 sections */}
                <div className="flex flex-col md:flex-row p-0">
                  {/* Left section: Event Details */}
                  <div className="md:w-1/3 w-full  text-white  bg-[#A63EE7] flex flex-col justify-center">
                  <h1 className="text-9xl mb-4  flex justify-center">  <FaRegCheckCircle /></h1>
                 <p className="text-center text-2xl">  This meeting is scheduled We've emailed everyone a calendar invite.</p>
                  </div>
 
                  {/* Right section: Form */}
                  <div className="md:w-2/3 w-full p-6 mt-4 space-y-6 max-h-[500px] overflow-y-auto">
                    <div>
                      <label className="block text-xl font-semibold text-gray-700">
                        Event Name
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-full border border-gray-300 rounded-md p-5 text-xl"
                        placeholder="Your Event Name "
                      />
                    </div>
                    <div>
                      <label className="block text-xl font-semibold text-gray-700">
                        Event Date/Time
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-full border border-gray-300 rounded-md p-5 text-xl"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-xl font-semibold text-gray-700">
                        Attendees
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-full border border-gray-300 rounded-md p-5 text-xl"
                        placeholder="Google Meet"
                      />
                    </div>
                    <div>
                      <label className="block text-xl font-semibold text-gray-700">
                        Confrimed Details
                      </label>
                      <textarea
                        className="mt-2 block w-full border border-gray-300 rounded-md p-5 text-xl"
                        rows={3}
                        placeholder="Your answer"
                      />
                    </div>
 
                    <div className="text-center">
                      <span>
                        Need to make a change?{" "}
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="underline cursor-pointer "
                        >
                          Reschedule 
                        </button>  <span> or </span><button className="underline cursor-pointer">cancel</button>
                      </span>
                    </div>
 
                    <FirstModal
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                    />
                  </div>
                </div>
 
                {/* Footer / Buttons */}
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
 
export default Modal2;