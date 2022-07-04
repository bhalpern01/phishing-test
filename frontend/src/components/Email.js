export default function Email({email}) {

    return(
        <div className="email" style={{display: "flex", flexDirection:"row", justifyContent: "space-around"}}>
            <span className="recipient">{email.to}</span>
            <span className="sender">{email.from}</span>
            <span className="subject">{email.subject}</span>
            <span className="fell-for-it">{email.clicked ? "Clicked" : "Ignored"}</span>
            <span className="email-id">{email.emailId}</span>
        </div>
    )
}