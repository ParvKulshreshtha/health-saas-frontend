import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { Patient, Appointment } from "@/types/index.type";

const getDb = () => {
  if (!db) throw new Error("Firestore not initialized. Check your .env.local file.");
  return db;
};

export const fetchPatients = async (doctorId: string): Promise<Patient[]> => {
  const snap = await getDocs(query(collection(getDb(), "patients"), where("doctorId", "==", doctorId)));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Patient));
};

export const fetchPatientById = async (patientId: string): Promise<Patient | null> => {
    if(!patientId) return null
  const snap = await getDoc(doc(getDb(), "patients", patientId));
  return snap.exists() ? { id: snap.id, ...snap.data() } as Patient : null;
};

export const fetchPatientAppointments = async (patientId: string): Promise<Appointment[]> => {
  const snap = await getDocs(query(collection(getDb(), "appointments"), where("patientId", "==", patientId)));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Appointment));
};