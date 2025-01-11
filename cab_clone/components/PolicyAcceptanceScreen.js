import React, { useState } from 'react';
import "./PolicyAcceptanceScreen.css";
import Image from 'next/image';

const PolicyAcceptanceScreen = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  const handleCheckboxChange = () => {
    setAccepted(!accepted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accepted) {
      onAccept();
    } else {
      alert("You must accept the policy to proceed.");
    }
  };

  return (
    <div className="policy-acceptance-screen">
      <div className="user-icon">
       <div className='bg'>
          <Image src="/icn.png" width={138} height={138}/>
       </div>
      </div>
      <div className="des">
        By tapping the arrow below, you agree to Uber’s Terms of Use and acknowledge that you have read the Privacy Policy
      </div>
      <form onSubmit={handleSubmit}>
        <p>Check the box to indicate that you are atleast 18 years of age, agree to the Terms & Conditions and acknowledge the <a href=''> Privacy Policy.</a></p>
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={accepted}
            onChange={handleCheckboxChange}
          /><label>I accept the policy.</label>
       
        </div>
        <button type="submit">Accept</button>
      </form>
    </div>
  );
};

export default PolicyAcceptanceScreen;
