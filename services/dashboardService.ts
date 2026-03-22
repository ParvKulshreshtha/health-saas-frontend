import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { DashboardStats, Appointment } from "@/types/index.type";

export const fetchDashboardStats = async (doctorId: string): Promise<DashboardStats> => {
  const [pSnap, aSnap] = await Promise.all([
    getDocs(query(collection(db, "patients"),     where("doctorId", "==", doctorId))),
    getDocs(query(collection(db, "appointments"), where("doctorId", "==", doctorId))),
  ]);

  const activePatients        = pSnap.docs.filter(d => d.data().status === "active").length;
  const upcomingAppointments  = aSnap.docs.filter(d => d.data().status === "scheduled").length;
  const completedAppointments = aSnap.docs.filter(d => d.data().status === "completed").length;

  return { totalPatients: pSnap.size, activePatients, upcomingAppointments, completedAppointments };
};

export const fetchUpcomingAppointments = async (doctorId: string): Promise<Appointment[]> => {
  const snap = await getDocs(
    query(collection(db, "appointments"), where("doctorId", "==", doctorId), where("status", "==", "scheduled"))
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Appointment));
};

export const fetchAppointmentsForAnalytics = async (doctorId: string): Promise<Appointment[]> => {
  const snap = await getDocs(query(collection(db, "appointments"), where("doctorId", "==", doctorId)));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Appointment));
};