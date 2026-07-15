import "../assets/css/home.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function HomePage() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const fullName = user?.fullName ?? "";

    return (
        <div className="home-page">
            <Header />

            <div className="content-area">
                <Sidebar />

                <main className="main-content">
                    <h1>
                        Hoş geldiniz{fullName ? `, ${fullName}` : ""}!
                    </h1>

                    <p>
                        Bugün yönetim panelinde yapmak istediğiniz işlemi soldaki menüden seçebilirsiniz.
                    </p>
                </main>
            </div>

            <Footer />
        </div>
    );
}

export default HomePage;