import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/TeacherSchedulePage.css";

const days = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
];

// Takvim ayarları
const calendarStartHour = 9;
const calendarEndHour = 22;
const hourHeight = 50;

const totalCalendarHeight =
    (calendarEndHour - calendarStartHour + 1) * hourHeight;

interface Lesson {
    id: number;
    day: string;
    title: string;
    start: string;
    end: string;
    color: string;
}

interface Subject {
    title: string;
    color: string;
}

export default function TeacherSchedulePage() {
    const { id } = useParams();
    const teacherId = Number(id);


    const [lessons, setLessons] = useState<Lesson[]>([]);

    useEffect(() => {

        if (!teacherId) return;


        const getLessons = async () => {

            try {

                const response = await fetch(
                    `http://localhost:3000/teachers/${teacherId}/lessons`
                );


                const data = await response.json();


                setLessons(data);


            } catch (error) {

                console.log("Dersler alınamadı:", error);

            }

        };


        getLessons();


    }, [teacherId]);

    const [subjects, setSubjects] = useState<Subject[]>([]);

    const [showForm, setShowForm] = useState(false);

    const [title, setTitle] = useState("");

    const [day, setDay] = useState(days[0]);

    const [start, setStart] = useState(
        `${String(calendarStartHour).padStart(2, "0")}:00`
    );

    const [end, setEnd] = useState(
        `${String(calendarStartHour + 1).padStart(2, "0")}:00`
    );

    const [color, setColor] = useState("#4f46e5");

    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const hours = Array.from(
        {
            length:
                calendarEndHour -
                calendarStartHour +
                1
        },
        (_, i) => calendarStartHour + i
    );



    const addLesson = async () => {

        if (!title.trim()) {

            alert("Ders adı giriniz.");

            return;

        }

        if (end <= start) {

            alert(
                "Bitiş saati başlangıç saatinden sonra olmalıdır."
            );

            return;

        }

        const conflict = lessons.some(

            lesson =>

                lesson.day === day &&

                start < lesson.end &&

                end > lesson.start

        );

        if (conflict) {

            alert("Bu saat aralığında ders var.");

            return;

        }

        const existingSubject = subjects.find(

            subject =>

                subject.title === title

        );

        let lessonColor = color;

        if (existingSubject) {

            lessonColor = existingSubject.color;

        }

        else {

            setSubjects(prev => [

                ...prev,

                {

                    title,

                    color

                }

            ]);

        }

        try {

            const response = await fetch(
                `http://localhost:3000/teachers/${teacherId}/lessons`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        title,
                        day,
                        start,
                        end,
                        color: lessonColor
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data.message);

                return;

            }


            setLessons(prev => [
                ...prev,
                data.lesson
            ]);


        }
        catch (error) {

            console.log(error);

        }


        setTitle("");

        setDay(days[0]);
        setStart(`${String(calendarStartHour).padStart(2, "0")}:00`);

        setEnd(`${String(calendarStartHour + 1).padStart(2, "0")}:00`);

        setColor("#4f46e5");

        setShowForm(false);

    };


    const deleteLesson = async (id: number) => {

        if (

            !window.confirm(

                "Dersi silmek istediğinize emin misiniz?"

            )

        ) return;

        try {

            const response = await fetch(
                `http://localhost:3000/lessons/${id}`,
                {
                    method: "DELETE"
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data.message);

                return;

            }


            setLessons(prev =>
                prev.filter(
                    lesson => lesson.id !== id
                )
            );


        }
        catch (error) {

            console.log("Ders silinemedi:", error);

        }

    };


    const getLessonStyle = (

        lesson: Lesson

    ) => {

        const startHour =

            Number(
                lesson.start.split(":")[0]
            )

            +

            Number(
                lesson.start.split(":")[1]
            ) / 60;

        const endHour =

            Number(
                lesson.end.split(":")[0]
            )

            +

            Number(
                lesson.end.split(":")[1]
            ) / 60;

        return {

            top:

                (startHour - calendarStartHour)

                *

                hourHeight,

            height:

                (endHour - startHour)

                *

                hourHeight

        };

    };


    return (

        <div className="schedule-page">

            <div className="schedule-header">

                <div>

                    <h2>Haftalık Ders Programı</h2>

                    <p>

                        Öğretmenin haftalık ders planı

                    </p>

                </div>

                <button

                    className="add-lesson-btn"

                    onClick={() =>

                        setShowForm(

                            !showForm

                        )

                    }

                >

                    +

                </button>

            </div>

            {/* DERS EKLE FORMU */}

            {

                showForm && (

                    <div className="schedule-form">

                        <input

                            list="subjects"

                            value={title}

                            placeholder="Ders Adı"

                            onChange={(e) =>
                                setTitle(e.target.value)
                            }

                        />

                        <datalist id="subjects">

                            {

                                subjects.map(subject => (

                                    <option

                                        key={subject.title}

                                        value={subject.title}

                                    />

                                ))

                            }

                        </datalist>

                        <select

                            value={day}

                            onChange={(e) =>
                                setDay(e.target.value)
                            }

                        >

                            {

                                days.map(day => (

                                    <option key={day}>

                                        {day}

                                    </option>

                                ))

                            }

                        </select>

                        <input
                            type="time"
                            value={start}
                            min="09:00"
                            max="22:00"
                            onChange={(e) =>
                                setStart(e.target.value)
                            }
                        />

                        <input
                            type="time"
                            value={end}
                            min="09:00"
                            max="22:00"
                            onChange={(e) =>
                                setEnd(e.target.value)
                            }
                        />

                        <input

                            type="color"

                            value={color}

                            onChange={(e) =>
                                setColor(e.target.value)
                            }

                        />

                        <button

                            className="save-lesson-btn"

                            onClick={addLesson}

                        >

                            ✓

                        </button>

                    </div>

                )

            }

            {/* TAKVİM */}

            <div

                className="calendar-wrapper"

                style={{

                    height: totalCalendarHeight + 50

                }}

            >

                {/* Saat Sütunu */}

                <div className="time-column">

                    <div className="time-header"></div>

                    {

                        hours.map(hour => (

                            <div

                                key={hour}

                                className="time-cell"

                            >

                                {String(hour).padStart(2, "0")}:00

                            </div>

                        ))

                    }

                </div>

                {/* Günler */}

                {

                    days.map(day => (

                        <div

                            key={day}

                            className="day-column"

                        >

                            <h3>

                                {day}

                            </h3>

                            <div
                                className="day-body"
                                style={{
                                    height: totalCalendarHeight
                                }}
                            >
                                {lessons
                                    .filter(
                                        lesson => lesson.day === day
                                    )
                                    .sort(
                                        (a, b) => a.start.localeCompare(b.start)
                                    )
                                    .map(lesson => (
                                        <div
                                            key={lesson.id}
                                            className="lesson-card"
                                            onClick={() => setSelectedLesson(lesson)}
                                            style={{
                                                ...getLessonStyle(lesson),
                                                borderLeft: `5px solid ${lesson.color}`
                                            }}
                                        >
                                            <div className="lesson-content">
                                                <strong>{lesson.title}</strong>
                                                {
                                                    getLessonStyle(lesson).height >= 70 && (

                                                        <span>

                                                            {lesson.start} - {lesson.end}

                                                        </span>

                                                    )
                                                }
                                            </div>

                                            <button
                                                className="delete-lesson-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteLesson(lesson.id);
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}