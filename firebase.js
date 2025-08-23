import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, writeBatch, doc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyA30Q6z6ie0638eXlxyIAmE-IqyBlXsT3U",
  authDomain: "learnify-1d003.firebaseapp.com",
  projectId: "learnify-1d003",
  storageBucket: "learnify-1d003.firebasestorage.app",
  messagingSenderId: "1000285999353",
  appId: "1:1000285999353:web:2989172f44d431cf5e9228",
  measurementId: "G-DVTR024Q4G",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

async function addTeachers() {
  const batch = writeBatch(db);

  const teachers = [
    {
      Image: "https://i.ibb.co/Y4zLbRSq/Gamal.jpg",
      name: "Gamal Abdelsatar",
      subject: "Math",
      gradeLevel: "Secondary",
      rating: 4.3,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 120,
      sessions: 100,
      earning: 22000,
      firstLessonFree: true,
      overview:
        "Jamal Abdel Sattar is a dedicated high school mathematics teacher with a strong passion for helping students understand and enjoy the subject. He has extensive experience in explaining complex mathematical concepts in a clear and engaging way, ensuring that students of all levels can grasp the material and achieve academic success.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Omar Khaled",
          rating: 4.2,
          comment: "Explains concepts very clearly.",
        },
        {
          studentName: "Sara Mohamed",
          rating: 3.8,
          comment: "Good teacher, but sessions could be more interactive.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/QvcztwQw/Mohamed.jpg",
      name: "Mohamed Ali",
      subject: "English",
      gradeLevel: "Preparatory",
      rating: 4.7,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 100,
      sessions: 10,
      earning: 3000,
      firstLessonFree: false,
      overview:
        "Mohamed Ali is a dedicated middle school English teacher who is passionate about helping students improve their language skills. He focuses on building a strong foundation in grammar, vocabulary, and communication, while creating a supportive and engaging classroom environment that encourages students to express themselves confidently in English.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Samar Khaled",
          rating: 4.2,
          comment:
            "Mr. Mohamed Ali makes learning English so much easier. He explains everything clearly and gives us many examples to practice. I feel more confident speaking and writing in English because of his lessons.",
        },
        {
          studentName: "Ola Mohamed",
          rating: 3.8,
          comment:
            "I really enjoy Mr. Mohamed Ali’s classes. He is patient, friendly, and always encourages us to do our best. Thanks to him, my English grades have improved a lot.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/7LGhvgM/Anna.jpg",
      name: "Anna Lotfy",
      subject: "Italy",
      gradeLevel: "Secondary",
      rating: 5,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 150,
      sessions: 50,
      earning: 12000,
      firstLessonFree: true,
      overview:
        "Anna Lotfy is an enthusiastic Italian language teacher with a talent for making lessons interactive and enjoyable. She is committed to helping students develop strong language skills in speaking, reading, and writing, while also introducing them to Italian culture and traditions to enhance their learning experience.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Youssef Adel",
          rating: 4.2,
          comment: "Makes learning very enjoyable.",
        },
        {
          studentName: "Aya Magdy",
          rating: 3.8,
          comment: "Good teacher, but sessions could be more interactive.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/0ytPBGxr/Asmaa.jpg",
      name: "Asmaa Gamal",
      subject: "Science",
      gradeLevel: "Preparatory",
      rating: 4.1,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 100,
      sessions: 60,
      earning: 10000,
      firstLessonFree: true,
      overview:
        "Asmaa Gamal is a passionate middle school science teacher who is committed to making learning exciting and accessible for her students. She uses creative teaching methods and real-life examples to help students understand scientific concepts and develop a love for discovery.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Nada Adel",
          rating: 4.2,
          comment:
            "Ms. Asmaa Gamal makes science really interesting. She explains topics in a way that is easy to understand and always gives us fun experiments to try",
        },
        {
          studentName: "Alaa Kamal",
          rating: 4,
          comment:
            "I never used to enjoy science, but Ms. Asmaa’s lessons changed that. She is kind, patient, and always ready to answer our questions.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/GvQN2dxM/Mohanad.jpg",
      name: "Mohanad Soliman",
      subject: "History",
      gradeLevel: "Preparatory and Secondary",
      rating: 5,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 80,
      sessions: 20,
      earning: 5000,
      firstLessonFree: true,
      overview:
        "Mohannad Soliman is an experienced history teacher for both middle and high school levels. He is dedicated to bringing history to life through engaging stories, interactive discussions, and critical thinking activities. His teaching helps students understand the past, connect it to the present, and develop a deeper appreciation for historical events and their impact on the world.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Mostafa saber",
          rating: 4.2,
          comment:
            "Mr. Mohannad Soliman makes history exciting and easy to follow. His way of telling stories keeps the whole class interested from start to finish.",
        },
        {
          studentName: "Aya Kamal",
          rating: 3.4,
          comment:
            "I used to think history was boring, but Mr. Mohannad’s lessons changed my mind. He explains events clearly and helps us understand why they matter today.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/dwcvFR36/Mona.jpg",
      name: "Mona Waheed",
      subject: "geography",
      gradeLevel: "Preparatory and Secondary",
      rating: 4.6,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 100,
      sessions: 150,
      earning: 30000,
      firstLessonFree: true,
      overview:
        "Mona Waheed is a dedicated geography teacher for both middle and high school students. She has a talent for making geography engaging by connecting lessons to real-world examples and current events. Her teaching style encourages curiosity, critical thinking, and a deeper understanding of the world’s landscapes, cultures, and environments.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Menna Ahmed",
          rating: 4.5,
          comment:
            "Ms. Mona Waheed makes geography fun and interesting. She always explains things in a way that is easy to understand and uses great examples from real life",
        },
        {
          studentName: "Ahmed Mohamed",
          rating: 3.5,
          comment:
            "I enjoy Ms. Mona’s classes because she makes learning about different countries and cultures exciting. She inspires us to explore and learn more about the world",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/gZvSDftB/Yasser.jpg",
      name: "Yasser Yahia",
      subject: "Chemistry",
      gradeLevel: "Secondary",
      rating: 5,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 120,
      sessions: 70,
      earning: 20000,
      firstLessonFree: false,
      overview:
        "Yasser Yehia is a skilled high school chemistry teacher with a passion for simplifying complex scientific concepts. He uses clear explanations, experiments, and real-life applications to help students understand chemistry and develop strong problem-solving skills. His lessons inspire curiosity and a deeper appreciation for the subject.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Nelly Mahrous",
          rating: 5,
          comment:
            "Mr. Yasser Yehia explains chemistry in a way that makes it easy to understand. His experiments are always fun and help us remember the lessons better.",
        },
        {
          studentName: "Faiza Ahmed",
          rating: 4,
          comment:
            "I used to struggle with chemistry, but Mr. Yasser’s clear teaching style and patience helped me improve a lot. Now I actually enjoy the subject.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/whddXF7J/Marawan.jpg",
      name: "Marawan Abdekader",
      subject: "Physics",
      gradeLevel: "Secondary",
      rating: 4.8,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 150,
      sessions: 40,
      earning: 10000,
      firstLessonFree: false,
      overview:
        "Marwan Abdelkader is a dedicated high school physics teacher who excels at making challenging concepts clear and engaging. He uses practical examples, demonstrations, and problem-solving exercises to help students grasp the principles of physics and apply them in real-life situations. His approach encourages analytical thinking and a genuine interest in science.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Belal Ahmed",
          rating: 4.2,
          comment:
            "Mr. Marwan Abdelkader makes physics easier to understand. His examples and explanations help me remember the lessons clearly.",
        },
        {
          studentName: "Mohamed Mahmoud",
          rating: 5,
          comment:
            "I enjoy physics now because Mr. Marwan shows us how it relates to everyday life. His classes are always interesting and motivating.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/20xNbRmm/Abdelrahman.jpg",
      name: "Abdelrahman Gamal",
      subject: "French",
      gradeLevel: "Secondary",
      rating: 4,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 80,
      sessions: 70,
      earning: 8000,
      firstLessonFree: true,
      overview:
        "Abdelrahman Gamal is a passionate high school French teacher who is committed to helping students master the language with confidence. He combines grammar, vocabulary, and conversation practice with engaging cultural insights, making learning both enjoyable and effective. His teaching style encourages active participation and continuous improvement.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Nada Adel",
          rating: 4.2,
          comment:
            "Mr. Abdelrahman Gamal makes learning French fun and interactive. His way of teaching helps me speak and understand the language better.",
        },
        {
          studentName: "Alaa Kamal",
          rating: 4,
          comment:
            "I like Mr. Abdelrahman’s classes because he explains everything clearly and always encourages us to practice. My French has improved a lot thanks to him.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/Jjw7HX3n/Yasser.jpg",
      name: "Yasser Ibrahim",
      subject: "Biology",
      gradeLevel: "Preparatory and Secondary",
      rating: 3.9,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 110,
      sessions: 100,
      earning: 20000,
      firstLessonFree: false,
      overview:
        "Yasser Ibrahim is a dedicated biology teacher for both middle and high school students. He has a talent for making the subject engaging by connecting biological concepts to everyday life and the natural world. Through clear explanations, visuals, and interactive activities, he inspires students to explore science with curiosity and enthusiasm.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
        { date: "2025-09-06", time: "18:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Sawsan",
          rating: 4.2,
          comment:
            "Mr. Yasser Ibrahim makes biology lessons exciting and easy to understand. His explanations help me remember the topics better.",
        },
        {
          studentName: "Nermin Maher",
          rating: 4,
          comment:
            "I enjoy Mr. Yasser’s classes because he uses real-life examples and makes learning about nature and the human body very interesting.",
        },
      ],
    },
    {
      Image: "https://i.ibb.co/HL8657ww/Afnan.jpg",
      name: "Afnan Elgendy",
      subject: "English",
      gradeLevel: "Preparatory",
      rating: 4.1,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 100,
      sessions: 30,
      earning: 5000,
      firstLessonFree: true,
      overview:
        "Afnan El Gendy is a passionate middle school English teacher who focuses on building her students’ confidence in speaking, reading, and writing. She uses interactive activities, engaging materials, and clear explanations to make learning English enjoyable and effective. Her supportive teaching style encourages students to express themselves freely.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
        { date: "2025-09-06", time: "18:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Shereen Ahmed",
          rating: 4.2,
          comment:
            "Ms. Afnan El Gendy makes English lessons fun and easy to follow. She always helps us when we don’t understand something.",
        },
        {
          studentName: "Fawaz Alaa",
          rating: 4,
          comment:
            "I have improved a lot in English because of Ms. Afnan’s teaching. She is patient, kind, and always encourages us to do our best.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/zhnHp01x/Ahmed.jpg",
      name: "Ahmed Elnagar",
      subject: "Sychology",
      gradeLevel: "Secondary",
      rating: 5,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 90,
      sessions: 20,
      earning: 4000,
      firstLessonFree: true,
      overview:
        "Ahmed El Nagar is a dedicated high school psychology teacher who is passionate about helping students understand human behavior and mental processes. He presents psychological concepts in an engaging and relatable way, encouraging critical thinking and self-awareness. His lessons inspire curiosity and a deeper interest in the subject.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
        { date: "2025-09-06", time: "18:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Malk Adel",
          rating: 4.2,
          comment:
            "Mr. Ahmed El Nagar explains psychology in a clear and interesting way. His examples help me understand the concepts better.",
        },
        {
          studentName: "Reda Kamal",
          rating: 4,
          comment:
            "I enjoy Mr. Ahmed’s classes because they make me think differently about people and behavior. He is patient and always answers our questions.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/NgKgvHJ6/Aya.jpg",
      name: "Aya Ahmed",
      subject: "Biology",
      gradeLevel: "Preparatory",
      rating: 4,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 100,
      sessions: 70,
      earning: 20000,
      firstLessonFree: false,
      overview:
        "Aya Ahmed is a passionate middle school biology teacher who brings science to life through engaging explanations and practical examples. She helps students understand complex concepts by connecting them to everyday life, fostering curiosity and a love for learning about the natural world.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
        { date: "2025-09-06", time: "18:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Nada Adel",
          rating: 4.2,
          comment:
            "Ms. Aya Ahmed makes biology fun and easy to understand. She always explains things in a simple way that helps me remember the lessons.",
        },
        {
          studentName: "Alaa Kamal",
          rating: 4,
          comment:
            "I enjoy Ms. Aya’s classes because she uses real-life examples and makes learning about plants, animals, and the human body exciting.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/QvWcdDtc/Samira.jpg",
      name: "Samira Noureldin",
      subject: "Italy",
      gradeLevel: "Secondary",
      rating: 5,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 85,
      sessions: 90,
      earning: 10000,
      firstLessonFree: true,
      overview:
        "Samira Nour El Din is a dedicated high school Italian teacher who combines language learning with cultural exploration. She uses interactive activities, conversation practice, and engaging materials to help students build strong speaking, reading, and writing skills. Her lessons make learning Italian both enjoyable and effective.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
        { date: "2025-09-06", time: "18:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Nada Yossry",
          rating: 4.1,
          comment:
            "Ms. Samira Nour El Din makes learning Italian interesting and fun. She always encourages us to speak and practice in class.",
        },
        {
          studentName: "Ahmed Kamal",
          rating: 3.5,
          comment:
            "I have improved a lot in Italian thanks to Ms. Samira’s clear explanations and friendly teaching style. She makes every lesson enjoyable.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/hFfwjpbK/Mostafa.jpg",
      name: "Mostafa Anwar",
      subject: "Maths",
      gradeLevel: "Preparatory and Secondary",
      rating: 4.5,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 100,
      sessions: 70,
      earning: 9000,
      firstLessonFree: true,
      overview:
        "Mostafa Anwar is a skilled mathematics teacher for both middle and high school levels. He is dedicated to helping students understand mathematical concepts with clarity and confidence. Using step-by-step explanations, practical examples, and problem-solving exercises, he makes math engaging and accessible for learners of all abilities.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
        { date: "2025-09-06", time: "18:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Nada Adel",
          rating: 4.2,
          comment:
            "Mr. Mostafa Anwar explains math in a way that is easy to follow. His clear steps help me solve problems with confidence.",
        },
        {
          studentName: "Alaa Kamal",
          rating: 4,
          comment:
            "I used to find math difficult, but Mr. Mostafa’s teaching style made it much easier for me. His classes are always well-organized and interesting.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/1Yytn3jQ/Hassan.jpg",
      name: "Hassan Elgammal",
      subject: "Chemistry",
      gradeLevel: "Secondary",
      rating: 5,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 110,
      sessions: 100,
      earning: 15000,
      firstLessonFree: false,
      overview:
        "Hassan El Gammal is a dedicated high school chemistry teacher who is passionate about making complex scientific concepts easy to understand. He uses clear explanations, engaging experiments, and real-life applications to help students connect with the subject and develop strong problem-solving skills.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
        { date: "2025-09-06", time: "18:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Sara Ahmed",
          rating: 4.2,
          comment:
            "Mr. Hassan El Gamal makes chemistry interesting and easy to learn. His experiments help me remember the lessons better.",
        },
        {
          studentName: "Kareem",
          rating: 4,
          comment:
            "I enjoy Mr. Hassan’s classes because he explains everything clearly and is always ready to answer our questions.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/VY7r9vdd/Hazem.jpg",
      name: "Hazem Kassem",
      subject: "Science",
      gradeLevel: "Secondary",
      rating: 4.1,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 150,
      sessions: 100,
      earning: 22000,
      firstLessonFree: true,
      overview:
        "Hazem Kassem is a passionate high school science teacher who is committed to making learning engaging and meaningful. He explains scientific concepts clearly and uses real-life examples, experiments, and discussions to help students understand and apply their knowledge. His teaching inspires curiosity and a love for science.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
        { date: "2025-09-06", time: "18:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Adel",
          rating: 4.2,
          comment:
            "Mr. Hazem Kassem makes science lessons exciting and easy to understand. His experiments are always fun and help us learn better.",
        },
        {
          studentName: "Amira",
          rating: 4,
          comment:
            "I enjoy Mr. Hazem’s classes because he explains topics clearly and connects them to real life, which makes learning more interesting.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/W4dx7RYk/Ayman.jpg",
      name: "Ayman Hafez",
      subject: "History",
      gradeLevel: "Preparatory and Secondary",
      rating: 3.8,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 80,
      sessions: 40,
      earning: 9000,
      firstLessonFree: true,
      overview:
        "Ayman Hafez is an experienced history teacher for both middle and high school levels. He brings the past to life through engaging storytelling, interactive discussions, and clear explanations. His lessons help students understand historical events, their causes, and their impact on the world, encouraging critical thinking and a deeper appreciation for history.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
        { date: "2025-09-06", time: "18:00" },
      ],
      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],

      reviews: [
        {
          studentName: "Mourad",
          rating: 4.2,
          comment:
            "Mr. Ayman Hafez makes history interesting and easy to follow. His storytelling keeps me engaged throughout the lesson",
        },
        {
          studentName: "Omar Magdy",
          rating: 5,
          comment:
            "I used to find history boring, but Mr. Ayman’s way of teaching made me enjoy it. He explains events clearly and shows why they are important today.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/yFLw9g5k/Maria.jpg",
      name: "Maria Elgendy",
      subject: "Psychology",
      gradeLevel: "Preparatory",
      rating: 4.1,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 100,
      sessions: 70,
      earning: 8000,
      firstLessonFree: true,
      overview:
        "Maria El Gendy is a dedicated high school psychology teacher who is passionate about helping students explore the science of the mind and behavior. She presents psychological concepts in a clear, engaging way, encouraging self-reflection, critical thinking, and active class participation. Her lessons inspire curiosity and a deeper understanding of human nature.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
        { date: "2025-09-06", time: "18:00" },
      ],

      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Nada Adel",
          rating: 4.2,
          comment:
            "Ms. Maria El Gendy makes psychology interesting and easy to understand. Her examples help me connect the lessons to real life",
        },
        {
          studentName: "Alaa Kamal",
          rating: 4,
          comment:
            "I enjoy Ms. Maria’s classes because she encourages us to think deeply and share our opinions. She makes learning psychology fun and engaging.",
        },
      ],
    },

    {
      Image: "https://i.ibb.co/SD6146sP/Omar.jpg",
      name: "Omar El Attar",
      subject: "Geography",
      gradeLevel: "Preparatory",
      rating: 5,
      averageRating: null,
      lessonType: "Online",
      hourlyRate: 90,
      sessions: 50,
      earning: 7000,
      firstLessonFree: true,
      overview:
        "Omar El Attar is a passionate middle school geography teacher who makes learning about the world exciting and accessible. He uses maps, visuals, and real-life examples to help students understand geographical concepts and connect them to everyday life. His engaging teaching style encourages curiosity and exploration.",
      availableDates: [
        { date: "2025-08-30", time: "19:00" },
        { date: "2025-09-04", time: "08:00" },
        { date: "2025-09-04", time: "10:00" },
        { date: "2025-09-06", time: "18:00" },
      ],

      availableGroupDates: [
        { date: "2025-09-05", time: "10:00" },
        { date: "2025-09-05", time: "17:00" },
        { date: "2025-09-06", time: "10:00" },
      ],
      reviews: [
        {
          studentName: "Maram",
          rating: 4.2,
          comment:
            "Mr. Omar El Attar makes geography lessons fun and easy to understand. I always look forward to his classes.",
        },
        {
          studentName: "Youssef",
          rating: 4,
          comment:
            "I enjoy Mr. Omar’s teaching because he uses great examples and explains everything clearly. Geography has become one of my favorite subjects.",
        },
      ],
    },
  ];
  teachers.forEach((teacher, index) => {
    const teacherRef = doc(db, "teachers", `teacher_${index + 1}`);
    batch.set(teacherRef, teacher, {merge: true});
  });

  try {
    await batch.commit();
    console.log("Teachers batch write completed!");
  } catch (error) {
    console.error("Error writing teachers batch:", error);
  }
}

addTeachers();

//  availableDates: [
//       { day: "Saturday", time: "5:00", period: "PM" },
//       { day: "Sunday", time: "8:00", period: "AM" },
//       { day: "Wednesday", time: "7:30", period: "PM" },
//       { day: "Friday", time: "10:00", period: "AM" }
//     ],
