"use client"
import { useState, useEffect } from 'react'
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"
import {db} from '../firebaseConfig'
import { collection,addDoc } from 'firebase/firestore'
import React from 'react'
import Navbar from '../components/navbar.js'
import Footer from '../components/footer.js'
const issues = ["Radiant Cooling ","House Keeping", "Plumbing Issues", "Mess", "Water supply", "Hot water ", "Washing machine", "Electrical", "Drinking Water", "Others"]
const hostels = [
  "Charaka",
  "Susruta",
  "Kautilya",
  "Vyasa",
  "Brahmagupta",
  "Varahamihira",
  "Ramanuja",
  "Vivekananda",
  "SN Bose",
  "Ramanujan",
  "Raman",
  "Kalam",
  "Bhabha",
  "Sarabhai",
  "Visweswaraya",
  "Kapila",
  "Aryabhatta",
  "Bhaskara",
  "Maitreyi",
  "Gargi",
  "Kalpana Chawla",
  "Anandi",
  "Sarojini Naidu"
];
async function addDataToFireStore(name,email,hostelName, hostelRoom, description,issue) {
  try{
    const docRef = await addDoc(collection(db,"complaints"),{
      name : name,
      email : email,
      hostelName : hostelName,
      hostelRoom: hostelRoom,
      description: description,
      issue: issue,
    });
    console.log("Document written with ID:",docRef.id);
    return true; // for adding data successfully
  } catch (error)
  {
    console.log("Erroe encountered while adding document to Database ", error);
    return false; // to indicate that the data was not added successfully
  }
}
const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({name:"",email:"",hostelName:"",hostelRoom:"",description:"",issue:""})
  const [complaints, setComplaints] = useState([])
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleAdd = async (e) => {
    e.preventDefault();
    const added = await addDataToFireStore(form.name,form.email,form.hostelName,form.hostelRoom,form.description,form.issue);
    if(added)
    {
      setForm({name:"",email:"",hostelName:"",hostelRoom:"",description:"",issue:""});
      alert("Complaint has been logged!");
    }
  }
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] position-relative">
      <Navbar />
      <div className='flex flex-col justify-center items-center'>
        <form className="flex flex-col gap-4 mt-10 items-start " onSubmit={handleAdd}>
          <div className="flex gap-2 text-2xl items-start">
            <label className="w-50" htmlFor="issue">Hostel Name:</label>
            <select
              className="w-xl ml-2 border-2 border-l-white max-h-10 overflow-y-auto"
              id="hostelName"
              name="hostelName"
              value={form.hostelName}
              required
              onChange={handleChange}
            >
              <option value="">Select the hostel name</option>
              {hostels.map((hostel, index) => (
                <option className=" max-h-10" key={index} value={hostel}>
                  {hostel}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 text-2xl items-start">
            <label className="w-50" htmlFor="room number">Room Number:</label>
            <input
              className="w-xl ml-2 border-2 border-l-white "
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              id="hostelRoom"
              name="hostelRoom"
              value={form.hostelRoom}
              placeholder='Enter your room number'
              required
              onChange={handleChange}
            />

          </div>
          <div className="flex gap-2 text-2xl items-start">
            <label className="w-50" htmlFor="issue">Issue Type:</label>
            <select
              className="w-xl ml-2 border-2 border-l-white"
              id="issue"
              name="issue"
              value={form.issue}
              required
              onChange={handleChange}
            >
              <option value="">Select an issue type</option>
              {issues.map((issue, index) => (
                <option key={index} value={issue}>
                  {issue}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 text-2xl ">
            <label className="w-50" htmlFor="other-issue">Any other issue:</label>
            <textarea
              className="border-2 border-l-white h-48 p-2 w-xl "
              id="description"
              name="description"
              value={form.description}
              placeholder="Any other issue..."
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="self-center relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Submit
            </span>
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}
export default Dashboard
