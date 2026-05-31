import React from "react";

import axios from "axios";

import {
IoArrowBackOutline
} from "react-icons/io5";

import {
useNavigate
} from "react-router-dom";

import {
userDataContext
} from "../Context/UserContext";

function Contact() {

// =========================
// CONTEXT
// =========================

const {
    serverUrl
} = React.useContext(
    userDataContext
);

const navigate =
    useNavigate();

// =========================
// STATES
// =========================

const [name, setName] =
    React.useState("");

const [email, setEmail] =
    React.useState("");

const [type, setType] =
    React.useState(
        "Bug / Error"
    );

const [message, setMessage] =
    React.useState("");

const [
    successMessage,
    setSuccessMessage
] = React.useState("");

const [
    loading,
    setLoading
] = React.useState(false);

// =========================
// HANDLE SUBMIT
// =========================

const handleSubmit =
    async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const result =
                await axios.post(

                    `${serverUrl}/api/contact/send-contact`,

                    {
                        name,
                        email,
                        type,
                        message
                    }
                );

            if (
                result.data.success
            ) {

                setSuccessMessage(
                    "Your message was sent successfully"
                );

                // RESET FORM

                setName("");

                setEmail("");

                setType(
                    "Bug / Error"
                );

                setMessage("");

                // REMOVE MESSAGE AFTER 4 SEC

                setTimeout(() => {

                    setSuccessMessage("");

                }, 4000);
            }

        } catch (error) {

            console.log(error);

            setSuccessMessage(
                "Failed to send message"
            );

        } finally {

            setLoading(false);
        }
    };

return (

    <div className="w-full h-full bg-gradient-to-t from-black to-[#0d0da3] flex justify-center items-center px-4 py-10 relative overflow-hidden">

        {/* BACK BUTTON */}

        <IoArrowBackOutline
            className="absolute top-10 left-10 h-8 w-8 text-blue-300 hover:text-white cursor-pointer transition-all duration-300"
            onClick={() => {
                navigate("/");
            }}
        />

        {/* MAIN CARD */}

        <div className="w-full  max-w-[650px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-[50px] shadow-2xl p-10">

            {/* HEADING */}

            <div className="text-center mb-3">

                <h1 className="text-white text-[38px] font-bold tracking-widest">

                    Contact Developer

                </h1>

                <p className="text-gray-300  text-[16px] leading-8">

                    If you face any issue, bug, error,
                    or have any recommendation for
                    improving the assistant, feel free
                    to contact me anytime.

                </p>

            </div>

            {/* FORM */}

            <form
                onSubmit={handleSubmit}
                className="w-full  flex flex-col gap-3"
            >

                {/* NAME */}

                <div className="w-full ">

                    <label className="text-white text-[16px] font-semibold">

                        Your Name

                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        className="w-full mt-2 h-14 bg-white/10 border border-white/10 rounded-2xl px-5 text-white outline-none placeholder:text-gray-400 focus:border-blue-400 transition-all duration-300"
                    />

                </div>

                {/* EMAIL */}

                <div className="w-full">

                    <label className="text-white text-[16px] font-semibold">

                        Email Address

                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        className="w-full mt-3 h-14 bg-white/10 border border-white/10 rounded-2xl px-5 text-white outline-none placeholder:text-gray-400 focus:border-blue-400 transition-all duration-300"
                    />

                </div>

                {/* ISSUE TYPE */}

                <div className="w-full">

                    <label className="text-white text-[16px] font-semibold">

                        Type

                    </label>

                    <select
                        value={type}
                        onChange={(e) =>
                            setType(
                                e.target.value
                            )
                        }
                        className="w-full mt-2 h-14 bg-white/10 border border-white/10 rounded-2xl px-5 text-white outline-none focus:border-blue-400 transition-all duration-300"
                    >

                        <option className="bg-black">

                            Bug / Error

                        </option>

                        <option className="bg-black">

                            Recommendation

                        </option>

                        <option className="bg-black">

                            Feedback

                        </option>

                        <option className="bg-black">

                            Other

                        </option>

                    </select>

                </div>

                {/* MESSAGE */}

                <div className="w-full">

                    <label className="text-white text-[16px] font-semibold">

                        Message

                    </label>

                    <textarea
                        rows={6}
                        value={message}
                        onChange={(e) =>
                            setMessage(
                                e.target.value
                            )
                        }
                        placeholder="Describe your issue or recommendation..."
                        className="w-full mt-3 bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none placeholder:text-gray-400 focus:border-blue-400 transition-all duration-300 resize-none"
                    ></textarea>

                </div>

                {/* BUTTON */}

                <button
                    type="submit"
                    disabled={loading}
                    className={`

                        w-full
                        h-14
                        rounded-2xl
                        text-white
                        text-[18px]
                        font-bold
                        tracking-wide
                        shadow-lg
                        transition-all
                        duration-300

                        ${loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 hover:scale-[1.02] cursor-pointer"
                        }

                    `}
                >

                    {
                        loading
                            ? "Please Wait..."
                            : "Send Message"
                    }

                </button>

            </form>

            {/* SUCCESS MESSAGE */}

            {
                successMessage && (

                    <div className="w-full mt-5 bg-green-500/20 border border-green-400 text-green-300 rounded-2xl py-4 text-center font-semibold tracking-wide">

                        {successMessage}

                    </div>
                )
            }

            {/* FOOTER */}

            <div className="mt-6 text-center">

                <p className="text-gray-400 leading-7">

                    Your feedback and recommendations
                    help improve the assistant
                    experience and make the project
                    better.

                </p>

            </div>

        </div>

    </div>
);

}

export default Contact;
