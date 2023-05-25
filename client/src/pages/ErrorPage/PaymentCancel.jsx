import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentCancel() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <>
      <section className="flex justify-center items-center pt-12 px-20 gap-30">
        <div className="w-full">
          <p className="font-semibold text-4xl">Payment unsuccessful</p>
          <p className="font-semibold text-2xl mt-6">
            Transaction was declined. Please try again.
          </p>
          <div className="font-semibold text-2xl mt-10 w-40">
            <button
              className="primary hover:bg-secondary transition my-4"
              onClick={handleClick}
            >
              Home
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <img src="../404_error.gif" alt="404 Not Found" />
        </div>
      </section>
    </>
  );
}

export default PaymentCancel;
