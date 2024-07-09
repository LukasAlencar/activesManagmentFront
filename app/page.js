'use client'

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiCheckCircle, FiAlertOctagon } from "react-icons/fi";
import { Loading } from "./components/Loading";

export default function Home() {

  const [alert, setAlert] = useState({
    title: "",
    description: "",
    status: ""
  })

  const [loading, setLoading] = useState(false);

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
  const resertAlert = () => {
    setTimeout(() => {
      setAlert({
        title: "",
        description: "",
        status: ""
      });
    }, 3000)
  }

  const reseteActive = () => {
    setActives({
      hostname: "",
      equipmentType: "",
      model: "",
      manufacturer: "",
      serialNumber: "",
      userName: "",
      status: "",
    })
  }

  const handleChange = (event) => {
    setActives({ ...actives, [event.target.name]: event.target.value });
  };

  const handleRegisterActive = (e) => {
    setLoading(true)

    e.preventDefault()
    axios.post('http://localhost:3001/register_actives', actives)
      .then((res) => {
        setAlert({ title: 'Sucesso!', description: 'Ativo cadastrado com sucesso!', status: 'success' })
        resertAlert()
        reseteActive()
      })
      .catch((err) => {
        setAlert({ title: 'Error!', description: 'Não foi possível cadastrar o ativo!', status: 'error' })
        resertAlert()
      })
      .finally(() => {
        setLoading(false)
      })

  }

  return (
    <>
      {loading && <Loading/>}
      {alert?.title != '' &&
        <Alert className="w-72 absolute bottom-5 left-5 bg-[#FA226A] text-white">
          <AlertTitle className="flex gap-1 items-center">
            {alert.title}
            {alert.status == 'success' &&
              <span>
                <FiCheckCircle className="text-white" size={20} />
              </span>
            }
            {alert.status == 'error' &&
              <span>
                <FiAlertOctagon className="text-white" size={20} />
              </span>
            }
          </AlertTitle>
          <AlertDescription>
            {alert.description}
          </AlertDescription>
        </Alert>
      }
      <Navbar register={true} />
      <form className="flex-1 flex flex-wrap content-center gap-9 ">
        <div className="w-full text-center">
          <h1 className="text-3xl font-bold text-[#FA226A]">Cadastrar</h1>
        </div>
        <div className="flex w-full justify-center space-x-10">
          <div className="flex flex-col">
            <label className="ml-4 mb-2" for="hostname">Hostname *</label>
            <input name="hostname" id="hostname" maxLength={255} className="text-center w-[20rem] h-14 rounded-[25px] border border-black" value={actives.hostname} onChange={handleChange} placeholder="Hostname" />
          </div>
          <div className="flex flex-col">
            <label className="ml-4 mb-2" for="equipmentType">Tipo de Equipamento *</label>
            {/* <input name="equipmentType" id="equipmentType" className="text-center h-14 rounded-[25px] border border-black" value={actives.equipmentType} onChange={handleChange} placeholder="Tipo de Equipamento" /> */}
            <select name="equipmentType" className="text-center bg-white w-[20rem] h-14 rounded-[25px] border border-black" value={actives.equipmentType} onChange={handleChange}>
              <option disabled defaultValue={''}></option>
              <option value={'notebook'}>Notebook</option>
              <option value={'monitor'}>Monitor</option>
              <option value={'desktop'}>Desktop</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="ml-4 mb-2" for="model">Modelo *</label>
            <input name="model" id="model" maxLength={255} className="text-center h-14 w-[20rem] rounded-[25px] border border-black" value={actives.model} onChange={handleChange} placeholder="Modelo" />
          </div>
        </div>
        <div className="flex w-full justify-center space-x-10 ">
          <div className="flex flex-col">
            <label className="ml-4 mb-2" for="manufacturer">Fabricante *</label>
            <input name="manufacturer" maxLength={255} id="manufacturer" className="text-center h-14 w-[31.5rem] rounded-[25px] border border-black" value={actives.manufacturer} onChange={handleChange} placeholder="Fabricante" />
          </div>
          <div className="flex flex-col">
            <label className="ml-4 mb-2" for="serialNumber">Serial Number *</label>
            <input name="serialNumber" maxLength={255} id="serialNumber" className="text-center h-14 w-[31.5rem] rounded-[25px] border border-black" value={actives.serialNumber} onChange={handleChange} placeholder="Número de Série" />
          </div>
        </div>
        <div className="flex w-full justify-center space-x-10">
          <div className="flex flex-col">
            <label className="ml-4 mb-2" for="userName">Nome Usuário *</label>
            <input name="userName" id="userName" maxLength={50} className="text-center h-14 w-[40rem] rounded-[25px] border border-black" value={actives.userName} onChange={handleChange} placeholder="Nome do Usuário" />
          </div>
          <div className="flex flex-col">
            <label className="ml-4 mb-2" for="status">Status *</label>
            {/* <input name="status" id="status" className="text-center h-14 rounded-[25px] w-[23rem] border border-black" value={actives.status} onChange={handleChange} placeholder="Status" /> */}
            <select name="status" id="status" className="text-center h-14 bg-white rounded-[25px] w-[23rem] border border-black" value={actives.status} onChange={handleChange} placeholder="Status">
              <option disabled defaultValue={''}></option>
              <option value={'using'}>Em uso</option>
              <option value={'stock'}>Em estoque</option>
              <option value={'maintenance'}>Em manutenção</option>
            </select>
          </div>
        </div>
        <div className="flex w-full justify-center space-x-10">
          <button onClick={handleRegisterActive} className="h-14 w-1/4 bg-[#FA226A] rounded-[25px] text-white">Cadastrar</button>
        </div>
      </form>
    </>
  );
}
