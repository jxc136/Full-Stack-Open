const Notification = ({ message }) => {
  const NotificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  };
  if (message === null) {
    return null;
  }
  return (
    <div className="message" style={NotificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
