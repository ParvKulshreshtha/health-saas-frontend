import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";

const snap = await getDocs(collection(db, "test"));

export default function Home() {
  console.log(snap.docs.map(d => d.data()));
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     cedc
    </div>
  );
}
