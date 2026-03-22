export interface Patient {
  id: string;
  doctorId: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  condition: string;
  status: "active" | "inactive";
  phone: string;
  email: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  type: "Consultation" | "Follow-up" | "Check-up" | "Emergency";
  status: "scheduled" | "completed" | "cancelled";
}

export interface DashboardStats {
  totalPatients: number;
  activePatients: number;
  upcomingAppointments: number;
  completedAppointments: number;
}