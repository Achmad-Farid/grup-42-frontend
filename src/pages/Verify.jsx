import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Verify() {
  const [verificationMessage, setVerificationMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`19.81.65.99:3000/verify/${token}`);
        setVerificationMessage(response.data.message);
        // Redirect to login page if verification is successful
        if (response.status === 200) {
          setTimeout(() => {
            navigate("/login");
          }, 3000); // Redirect after 3 seconds
        }
      } catch (error) {
        setVerificationMessage(error.message);
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Account Verification</h2>
        </div>
        <div className="mt-8">
          <div className="mt-6 text-center text-lg">{verificationMessage}</div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
