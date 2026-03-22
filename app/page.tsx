import { db } from "@/services/firebase";
import { collection, getDocs } from "firebase/firestore";

const snap = await getDocs(collection(db, "test"));

export default function Home() {
  console.log(snap.docs.map(d => d.data()));
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans text-red-500">
     <h1 className="text-4xl font-bold">Hello World</h1>
     <p className="text-lg">This is a test</p>
     <button className="bg-blue-500 text-white p-2 rounded-md">Click me</button>
     <input type="text" className="border-2 border-gray-300 rounded-md p-2" />
     <select className="border-2 border-gray-300 rounded-md p-2">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
     </select>
    </div>
  );
}
