import { useState } from "react";
import "../assets/css/login.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleRegister = async () => {

        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullName,
                email,
                password,
            }),
        });


        const result = await response.json();


        if (!response.ok) {

            setErrorMessage(result.message);
            return;

        }


        setErrorMessage(result.message);


        setTimeout(() => {

            setIsLogin(true);

            setFullName("");
            setEmail("");
            setPassword("");

        }, 1500);

    };



    const handleLogin = async () => {

        const response = await fetch("http://localhost:3000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                email,
                password,
            }),

        });



        const result = await response.json();



        if (!response.ok) {

            setErrorMessage(result.message);
            return;

        }



        setErrorMessage("");

        navigate("/home");

    };



    return (

        <div className="page">

            <div className="login-container">


                {/* SOL TARAF */}

                <div className="image-section">

                    <div className="overlay">

                    </div>

                </div>



                {/* SAĞ TARAF */}

                <div className="form-section">

                    <h1>
                        British Town Dil Kursu
                        <br />
                        Yönetim Sistemi
                    </h1>



                    <h3>
                        {isLogin ? "Yönetici Girişi" : "Yeni Hesap Oluştur"}
                    </h3>
                    {
                        !isLogin && (
                            <p className="register-info">
                                Bu alan yönetici kayıtları içindir.
                                Öğretmen hesapları kurum yöneticisi tarafından oluşturulur
                                ve kendilerine verilen bilgiler ile giriş yapabilirler.
                            </p>
                        )
                    }



                    {!isLogin && (

                        <>
                            <label>Ad Soyad</label>

                            <div className="input-box">

                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />

                                <span>👤</span>

                            </div>
                        </>

                    )}


                    <label>Email</label>

                    <div className="input-box">

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <span>✉</span>

                    </div>


                    <label>Şifre</label>

                    <div className="input-box">

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span>🔒</span>

                    </div>





                    {
                        errorMessage && (
                            <p className="error-message">
                                {errorMessage}
                            </p>
                        )
                    }




                    {
                        isLogin ?

                            <button onClick={handleLogin}>
                                Giriş Yap
                            </button>

                            :

                            <button onClick={handleRegister}>
                                Kayıt Ol
                            </button>
                    }




                    <div className="switch-text">


                        {
                            isLogin ?

                                <>
                                    Henüz bir hesabınız yok mu?

                                    <span
                                        onClick={() => {
                                            setErrorMessage("");
                                            setIsLogin(false);
                                        }}
                                    >
                                        Kayıt Ol
                                    </span>

                                </>


                                :

                                <>

                                    Zaten bir hesabınız var mı?

                                    <span
                                        onClick={() => {
                                            setErrorMessage("");
                                            setIsLogin(true);
                                        }}
                                    >
                                        Giriş Yap
                                    </span>

                                </>

                        }


                    </div>


                </div>


            </div>


        </div>

    );

}


export default LoginPage;