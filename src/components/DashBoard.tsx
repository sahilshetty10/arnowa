import React from "react";

interface Session {
  usersEmail: string;
  login: string;
  logout: string | null;
  messages: [{ id: number; message: string }];
}

const DashBoard = ({ session }: { session: Session[] }) => {
  const getTime = (date: string) => {
    let time = new Date(date);
    return `${time.getDay()}/${time.getMonth()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
  };

  const getDuration = (login: string, logout: string | null) => {
    if (logout) {
      let newLogin = new Date(login);
      let newLogout = new Date(logout);
      let duration = (newLogout.getTime() - newLogin.getTime()) / 6000;
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
            <td>{s.usersEmail}</td>
            <td>{getTime(s.login)}</td>
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
