import { collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export const seedDoctorData = async (doctorId: string) => {
  // Clear existing data for this doctor
  const pSnap = await getDocs(query(collection(db, "patients"), where("doctorId", "==", doctorId)));
  const aSnap = await getDocs(query(collection(db, "appointments"), where("doctorId", "==", doctorId)));
  await Promise.all([...pSnap.docs, ...aSnap.docs].map(d => deleteDoc(d.ref)));

  const patients = [
    { doctorId, name: "Aarav Sharma",  age: 34, gender: "Male",   condition: "Hypertension", status: "active",   phone: "+91 98765 43210", email: "aarav@email.com",  createdAt: "2026-01-05" },
    { doctorId, name: "Priya Mehta",   age: 28, gender: "Female", condition: "Diabetes",      status: "active",   phone: "+91 91234 56789", email: "priya@email.com",  createdAt: "2026-01-12" },
    { doctorId, name: "Rohit Verma",   age: 52, gender: "Male",   condition: "Arthritis",     status: "inactive", phone: "+91 99887 76655", email: "rohit@email.com",  createdAt: "2026-01-18" },
    { doctorId, name: "Sneha Patel",   age: 41, gender: "Female", condition: "Asthma",        status: "active",   phone: "+91 88776 65544", email: "sneha@email.com",  createdAt: "2026-02-02" },
    { doctorId, name: "Karan Singh",   age: 29, gender: "Male",   condition: "Migraine",      status: "active",   phone: "+91 77665 54433", email: "karan@email.com",  createdAt: "2026-02-10" },
    { doctorId, name: "Anjali Nair",   age: 63, gender: "Female", condition: "Osteoporosis",  status: "inactive", phone: "+91 66554 43322", email: "anjali@email.com", createdAt: "2026-02-14" },
    { doctorId, name: "Vikram Iyer",   age: 47, gender: "Male",   condition: "Hypertension",  status: "active",   phone: "+91 55443 32211", email: "vikram@email.com", createdAt: "2026-02-20" },
    { doctorId, name: "Meera Reddy",   age: 35, gender: "Female", condition: "Thyroid",       status: "active",   phone: "+91 44332 21100", email: "meera@email.com",  createdAt: "2026-03-01" },
    { doctorId, name: "Dev Chopra",    age: 58, gender: "Male",   condition: "Diabetes",      status: "active",   phone: "+91 33221 10099", email: "dev@email.com",    createdAt: "2026-03-05" },
    { doctorId, name: "Riya Kapoor",   age: 24, gender: "Female", condition: "Anemia",        status: "active",   phone: "+91 22110 09988", email: "riya@email.com",   createdAt: "2026-03-10" },
  ];

  const patientDocs = await Promise.all(patients.map(p => addDoc(collection(db, "patients"), p)));

  const appointments = [
    { doctorId, patientId: patientDocs[0].id, patientName: "Aarav Sharma", date: "2026-03-21", time: "10:00 AM", type: "Follow-up",    status: "scheduled"  },
    { doctorId, patientId: patientDocs[1].id, patientName: "Priya Mehta",  date: "2026-03-21", time: "11:30 AM", type: "Consultation", status: "scheduled"  },
    { doctorId, patientId: patientDocs[4].id, patientName: "Karan Singh",  date: "2026-03-22", time: "09:00 AM", type: "Check-up",     status: "scheduled"  },
    { doctorId, patientId: patientDocs[3].id, patientName: "Sneha Patel",  date: "2026-03-22", time: "02:00 PM", type: "Follow-up",    status: "scheduled"  },
    { doctorId, patientId: patientDocs[6].id, patientName: "Vikram Iyer",  date: "2026-03-23", time: "03:30 PM", type: "Consultation", status: "scheduled"  },
    { doctorId, patientId: patientDocs[7].id, patientName: "Meera Reddy",  date: "2026-03-20", time: "10:00 AM", type: "Check-up",     status: "completed"  },
    { doctorId, patientId: patientDocs[2].id, patientName: "Rohit Verma",  date: "2026-03-19", time: "11:00 AM", type: "Follow-up",    status: "completed"  },
    { doctorId, patientId: patientDocs[8].id, patientName: "Dev Chopra",   date: "2026-03-18", time: "09:30 AM", type: "Consultation", status: "completed"  },
    { doctorId, patientId: patientDocs[0].id, patientName: "Aarav Sharma", date: "2026-02-15", time: "10:00 AM", type: "Check-up",     status: "completed"  },
    { doctorId, patientId: patientDocs[1].id, patientName: "Priya Mehta",  date: "2026-02-20", time: "11:00 AM", type: "Follow-up",    status: "completed"  },
    { doctorId, patientId: patientDocs[9].id, patientName: "Riya Kapoor",  date: "2026-03-24", time: "01:00 PM", type: "Consultation", status: "scheduled"  },
    { doctorId, patientId: patientDocs[5].id, patientName: "Anjali Nair",  date: "2026-03-15", time: "04:00 PM", type: "Check-up",     status: "cancelled"  },
  ];

  await Promise.all(appointments.map(a => addDoc(collection(db, "appointments"), a)));
  console.log("Seeded successfully for doctor:", doctorId);
};