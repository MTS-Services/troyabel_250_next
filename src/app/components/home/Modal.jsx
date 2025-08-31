import { Dialog, Transition, DialogPanel } from "@headlessui/react";
import { Fragment } from "react";
import { FaArrowLeft } from "react-icons/fa6";
 
const Modal = ({ setIsEditModalOpen, isOpen }) => {
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
              <DialogPanel className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <Dialog.Title
                  as="h3"
                  className="text-3xl font-bold text-white bg-purple-950 p-6 rounded-t-2xl"
                >
                  Consultation (45-minutes)
                </Dialog.Title>
 
                {/* Main content: 2 sections */}
                <div className="flex flex-col md:flex-row gap-6 p-6">
                  {/* Left section: Event Details */}
                  <div className="flex-1 bg-gray-50 p-6 rounded-lg flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-4">
                      {/* Rounded Image */}
                      <img
                        src="https://via.placeholder.com/60" // replace with actual image
                        alt="Dr. Troy Abel"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <p className="font-bold text-2xl text-gray-800">
                        Dr. Troy Abel
                      </p>
                    </div>
                    <p className="text-gray-700 text-lg">
                      Thursday, September 25, 2025, 1:00 am
                    </p>
                    <p className="text-gray-700 text-lg">45 mins</p>
                    <p className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
                      <span>📅</span> Google Meet
                    </p>
                    <p className="text-gray-500 text-lg">Asia/Dhaka</p>
                  </div>
 
                  {/* Right section: Form */}
                  <div className="flex-1 bg-gray-50 p-6 rounded-lg space-y-6 max-h-[500px] overflow-y-auto">
                    <div>
                      <label className="block text-xl font-semibold text-gray-700">
                        Your Name*
                      </label>
                      <input
                        type="text"
                        className="mt-2 block w-full border border-gray-300 rounded-md p-5 text-xl"
                        placeholder="Enter your name"
                      />
                    </div>
 
                    <div>
                      <label className="block text-xl font-semibold text-gray-700">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        className="mt-2 block w-full border border-gray-300 rounded-md p-5 text-xl"
                        placeholder="Enter your email"
                      />
                    </div>
 
                    <div>
                      <label className="block text-xl font-semibold text-gray-700">
                        What's the #1 thing you're hoping to get out of our
                        conversation?
                      </label>
                      <textarea
                        className="mt-2 block w-full border border-gray-300 rounded-md p-5 text-xl"
                        rows={3}
                        placeholder="Your answer"
                      />
                    </div>
 
                    <div>
                      <label className="block text-xl font-semibold text-gray-700">
                        Which area of UX are you most interested in?
                      </label>
                      <select className="mt-2 block w-full border border-gray-300 rounded-md p-5 text-xl">
                        <option>UX/UI Design</option>
                        <option>UX Research</option>
                        <option>UX Strategy</option>
                        <option>I'm still figuring it out!</option>
                      </select>
                    </div>
 
                    <div>
                      <label className="block text-xl font-semibold text-gray-700">
                        Your Phone Number
                      </label>
                      <input
                        type="tel"
                        className="mt-2 block w-full border border-gray-300 rounded-md p-5 text-xl"
                        placeholder="+880123456789"
                      />
                    </div>
                  </div>
                </div>
 
                {/* Footer / Buttons */}
                <div className="mt-6 flex justify-end p-6 gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center bg-white rounded-md border-2 border-black px-6 py-3 text-lg font-medium hover:bg-gray-200 transition"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    <FaArrowLeft className="mr-2 text-2xl" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent text-white bg-purple-800 px-6 py-3 text-lg font-medium hover:bg-purple-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition"
                  >
                    Confirm
                  </button>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
 
export default Modal;
 
 