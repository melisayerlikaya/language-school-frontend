import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../assets/css/teachers.css";
import { useNavigate } from "react-router-dom";

interface Teacher {
    id: number;
    fullName: string;
    email: string;
    role: string;
}


function TeachersPage() {


    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const [showForm, setShowForm] = useState(false);

    const [editId, setEditId] = useState<number | null>(null);

    const [fullName, setFullName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const getTeachers = async () => {


        const response = await fetch("http://localhost:3000/teachers");


        const data = await response.json();


        setTeachers(data);


    };
    useEffect(() => {


        getTeachers();


    }, []);

    // ÖĞRETMEN EKLEME

    const addTeacher = async () => {



        const response = await fetch("http://localhost:3000/teachers", {


            method: "POST",


            headers: {

                "Content-Type": "application/json",

            },



            body: JSON.stringify({

                fullName,

                email,

                password

            })


        });

        const result = await response.json();

        if (!response.ok) {


            setMessage(result.message);

            return;


        }

        setMessage("Öğretmen başarıyla eklendi.");


        setFullName("");

        setEmail("");

        setPassword("");



        setShowForm(false);



        getTeachers();



    };

    // FORMU DOLDURMA

    const editTeacher = (teacher: Teacher) => {



        setFullName(teacher.fullName);

        setEmail(teacher.email);

        setPassword("");

        setEditId(teacher.id);

        setShowForm(true);

    };


    // ÖĞRETMEN GÜNCELLEME

    const updateTeacher = async () => {



        const response = await fetch(

            `http://localhost:3000/teachers/${editId}`,

            {

                method: "PUT",
                headers: {

                    "Content-Type": "application/json",

                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password
                })
            }
        );

        const result = await response.json();


        if (!response.ok) {
            setMessage(result.message);
            return;

        }


        setMessage("Öğretmen güncellendi.");
        setFullName("");
        setEmail("");
        setPassword("");
        setEditId(null);
        setShowForm(false);
        getTeachers();
    };


    // ÖĞRETMEN SİLME

    const deleteTeacher = async (id: number) => {

        const response = await fetch(


            `http://localhost:3000/teachers/${id}`,

            {
                method: "DELETE"
            }


        );

        const result = await response.json();
        if (!response.ok) {
            setMessage(result.message);
            return;
        }

        setMessage("Öğretmen silindi.");
        getTeachers();

    };

    return (

        <div className="home-page">

            <Header />

            <div className="content-area">

                <Sidebar />
                <main className="main-content">

                    <div className="page-header">


                        <h1>

                            Öğretmenler

                        </h1>


                        <button
                            className="add-btn"

                            onClick={() => {


                                setShowForm(!showForm);


                                setEditId(null);


                                setFullName("");

                                setEmail("");

                                setPassword("");

                            }}

                        >

                            Öğretmen Ekle

                        </button>

                    </div>

                    {

                        showForm && (

                            <div className="teacher-form">

                                <input

                                    type="text"

                                    placeholder="Ad Soyad"

                                    value={fullName}

                                    onChange={(e) => setFullName(e.target.value)}

                                />


                                <input

                                    type="email"

                                    placeholder="Email"

                                    value={email}

                                    onChange={(e) => setEmail(e.target.value)}

                                />


                                <input

                                    type="password"

                                    placeholder="Şifre"

                                    value={password}

                                    onChange={(e) => setPassword(e.target.value)}

                                />


                                <button
                                    className="save-btn"

                                    onClick={editId ? updateTeacher : addTeacher}
                                >

                                    {

                                        editId ? "Güncelle" : "Kaydet"

                                    }


                                </button>






                            </div>



                        )

                    }

                    {

                        message && (


                            <p className="message">

                                {message}

                            </p>


                        )


                    }

                    <div className="teacher-list">

                        {

                            teachers.map((teacher) => (

                                <div

                                    className="teacher-card"
                                    key={teacher.id}

                                >

                                    <h3>

                                        {teacher.fullName}

                                    </h3>

                                    <p>

                                        {teacher.email}

                                    </p>

                                    <span>

                                        {teacher.role}

                                    </span>


                                    <div className="teacher-actions">


                                        <button
                                            className="edit-btn"

                                            onClick={() => editTeacher(teacher)}
                                            title="Düzenle"
                                        >
                                            ✏️
                                        </button>


                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteTeacher(teacher.id)}
                                            title="Sil"
                                        >
                                            🗑️
                                        </button>
                                        <button
                                            className="schedule-btn"
                                            onClick={() => navigate(`/teachers/${teacher.id}/schedule`)}
                                            title="Ders Programı"
                                        >
                                            📚
                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                </main>


            </div>

            <Footer />
        </div>

    );

}

export default TeachersPage;