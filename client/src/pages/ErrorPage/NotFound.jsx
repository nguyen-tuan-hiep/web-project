import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <>
      {/* <!--dust particel--> */}
<div>
  <div className="starsec"></div>
  <div className="starthird"></div>
  <div className="starfourth"></div>
  <div className="starfifth"></div>
</div>
{/* <!--Dust particle end---> */}


<div className="lamp__wrap">
  <div className="lamp">
    <div className="cable"></div>
    <div className="cover"></div>
    <div className="in-cover">
      <div className="bulb"></div>
    </div>
    <div className="light"></div>
  </div>
</div>
{/* <!-- END Lamp --> */}
<section className="error">
  <div className="error__content">
    <div className="error__message message">
      <div className="message__title">404 Page Not Found</div>
      <div className="message__text">The page you were looking for doesn't exist. Please try again.</div>
    </div>
    <div className="error__nav e-nav">
    </div>
        </div>
        </section>
  {/* <!-- END Content --> */}
    </>
  );
}

export default NotFound;
