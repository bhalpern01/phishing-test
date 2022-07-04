import React, { useEffect, useState } from 'react';
import Email from './Email';

export default function Dashboard() {

  const [emails, setEmails] = useState([]);

  const updateEmails = async () => {
    const emailResponse = await fetch("http://localhost:3300/get-emails").then(res => res.json());
    console.log(emailResponse.emails)
    setEmails( emailResponse.emails );
  }

  useEffect(() => {
    updateEmails();
  }, [])

  return (
    <>
      <h2>Dashboard</h2>
      <div className="emails-list">
        <div className="dashboard-headers" style={{display: "flex", flexDirection:"row", justifyContent: "space-around", fontWeight: "bold"}}>
          <span>Recipient Email</span>
          <span>Sender</span>
          <span>Recipient Email</span>
          <span>Got Phished?</span>
          <span>Email ID</span>
        </div>
      {
        emails.map(email => (<Email email={email} />))
      }
      </div>
    </>
  );
}
