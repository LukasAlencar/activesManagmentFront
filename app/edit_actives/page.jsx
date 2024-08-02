'use client'

import { useState } from "react";
import { Navbar } from "../components/Navbar";
import TableManagment from "../components/TableManagment";


export default function RegisterActives() {

  const [actives, setActives] = useState(
    {
      hostname: "",
      equipmentType: "",
      model: "",
      manufacturer: "",
      serialNumber: "",
      userName: "",
      status: "",
    }
  )

  

  return (
    <>
      <Navbar register={false} />
      <div className="flex-1 flex flex-col items-center justify-center h-full gap-9 mt-[-25px]">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold text-[#FA226A]">Editar</h1>
        </div>
        <TableManagment />
      </div>
    </>
  );
}
