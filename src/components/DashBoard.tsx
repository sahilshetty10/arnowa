import React from "react";

interface Session {
  user: string;
  login: Date;
  logout?: Date;
  messages: string[];
}

const DashBoard = ({ session }: { session: Session[] }) => {
  const getDuration = (login: Date, logout: Date | undefined) => {
    if (logout) {
      let duration = (login.getTime() - logout.getTime()) / 6000;
      let durationInMins = `${Math.abs(Math.round(duration))} minutes`;
      return durationInMins;
    } else {
      return "5 minutes";
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Login</th>
          <th>Duration</th>
          <th>No. of Messages</th>
        </tr>
      </thead>
      <tbody>
        {session.map((s, index) => (
          <tr key={index}>
            <td>{s.user}</td>
            <td>{`${s.login.getDate()}/${s.login.getMonth()}/${s.login.getFullYear()} ${s.login.getHours()}:${s.login.getMinutes()}`}</td>
            {/* <td>{s.login.toLocaleString()}</td> */}
            <td>{getDuration(s.login, s.logout)}</td>
            <td>{s.messages.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DashBoard;
