export default function Sidebar() {
  return (
    <aside className="sidebar"> 
      <div className="nav-item active">
        <div className="nav-icon">📝</div> Create Quiz
      </div>
      <div className="nav-item">
        <div className="nav-icon">📜</div> My History
      </div>
      <div className="nav-item">
        <div className="nav-icon">👤</div> Profile
      </div>
      <div className="nav-item logout">
        <div className="nav-icon">🚪</div> Logout
      </div>
    </aside>
  );
}