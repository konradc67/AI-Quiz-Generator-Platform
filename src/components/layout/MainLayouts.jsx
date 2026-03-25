import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout({children}){
return (

<div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
);

}