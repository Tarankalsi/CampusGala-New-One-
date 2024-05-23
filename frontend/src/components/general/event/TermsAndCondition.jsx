import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <ol className="list-decimal list-inside space-y-2 mb-4">
        <li>Tickets once booked cannot be exchanged or refunded.</li>
        <li>
          An Internet handling fee per ticket may be levied. Please check the total amount before payment.
        </li>
        <li>
          We recommend that you arrive at least 30 minutes prior at the venue for a seamless entry.
        </li>
        <li>
          It is mandatory to wear masks at all times and follow social distancing norms.
        </li>
        <li>Please do not purchase tickets if you feel sick.</li>
        <li>
          Unlawful resale (or attempted unlawful resale) of a ticket would lead to seizure or cancellation of that ticket without refund or other compensation.
        </li>
        <li>Rights of admission reserved.</li>
        <li>
          These terms and conditions are subject to change from time to time at the discretion of the organizer.
        </li>
      </ol>
      <h2 className="text-xl font-semibold mb-2">COVID Safety Guidelines</h2>
      <p className="mb-2">
        Owing to the recent conditions surrounding the COVID-19 pandemic, as a pre-condition to gaining access to the venue (events and theatres) you are required to be fully vaccinated and may be required to display your COVID-19 certificate at the venue as per the various norms/regulations prevailing in the said State. The venue provider and governing authorities reserve the right to exclude any user from the venue if there are sufficient grounds to believe so for failure to abide by the protocols. You agree to exit without protest or refund. Users are required to check the restrictions as applicable in their State.
      </p>
      <p className="mb-2">
        Use of masks is mandatory at all times and the visitors are required to maintain social distancing norms. The venue and Bigtree reserve the right to change/modify the terms and conditions.
      </p>
      <p className="mb-2">
        Bigtree does not assume any responsibility with regards to any injury or complications due to COVID-19 accrued as a result of your participation.
      </p>
      <p className="mb-2">
        The above guidelines are currently mandatory for Delhi/NCR, Maharashtra, and Karnataka. These terms and conditions may vary depending on the state where the event is held and are subject to changes.
      </p>
    </div>
  );
};

export default TermsAndConditions;
