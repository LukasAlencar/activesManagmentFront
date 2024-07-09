'use client'

import { useEffect, useState } from "react";
import { Navbar } from "../../../components/Navbar";
import { useParams } from "next/navigation";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiCheckCircle, FiAlertOctagon } from "react-icons/fi";
import { Loading } from "@/app/components/Loading";
import { loading } from '@/lib/Lottie/loading.json';

export default function OpenEditActives() {

    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        title: "",
        description: "",
        status: ""
    })

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

    const handleChange = (event) => {
        setActives({ ...actives, [event.target.name]: event.target.value });
    };

    const handleEditActive = (e) => {
        e.preventDefault();
        setLoading(true)

        axios.put(`http://localhost:3001/update_active/${id}`, actives)
            .then((res) => {
                setAlert({ title: 'Sucesso!', description: 'Ativo editado com sucesso!', status: 'success' })
                resertAlert()
            })
            .catch((err) => {
                setAlert({ title: 'Error!', description: 'Não foi possível editar o ativo', status: 'error' })
                resertAlert()
            })
            .finally(() => {
                setLoading(false)
            })

    }

    useEffect(() => {
        setLoading(true)

        axios.get(`http://localhost:3001/get_actives/${id}`)
            .then((res) => {
                setActives(res.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar os dados: ", error);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])


    const resertAlert = () => {
        setTimeout(() => {
            setAlert({
                title: "",
                description: "",
                status: ""
            });
        }, 3000)
    }

    return (
        <>
            {loading && <Loading />}
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
            <Navbar register={false} />
            <form className="flex-1 flex flex-wrap content-center gap-9">
                <div className="w-full text-center">
                    <h1 className="text-3xl font-bold text-[#FA226A]">Editar</h1>
                </div>
                <div className="flex w-full justify-center space-x-10">
                    <div className="flex flex-col">
                        <label className="ml-4 mb-2" htmlFor="hostname">Hostname *</label>
                        <input name="hostname" id="hostname" className="text-center w-[20rem] h-14 rounded-[25px] border border-black" value={actives.hostname} onChange={handleChange} placeholder="Hostname" />
                    </div>
                    <div className="flex flex-col">
                        <label className="ml-4 mb-2" htmlFor="equipmentType">Tipo de Equipamento *</label>
                        {/* <input name="equipmentType" id="equipmentType" className="text-center h-14 rounded-[25px] border border-black" value={actives.equipmentType} onChange={handleChange} placeholder="Tipo de Equipamento" /> */}
                        <select name="equipmentType" className="text-center bg-white w-[20rem] h-14 rounded-[25px] border border-black" value={actives.equipmentType} onChange={handleChange}>
                            <option disabled defaultValue={''}></option>
                            <option value={'Notebook'}>Notebook</option>
                            <option value={'Monitor'}>Monitor</option>
                            <option value={'Desktop'}>Desktop</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="ml-4 mb-2" htmlFor="model">Modelo *</label>
                        <input name="model" id="model" className="text-center h-14 w-[20rem] rounded-[25px] border border-black" value={actives.model} onChange={handleChange} placeholder="Modelo" />
                    </div>
                </div>
                <div className="flex w-full justify-center space-x-10 ">
                    <div className="flex flex-col">
                        <label className="ml-4 mb-2" htmlFor="manufacturer">Fabricante *</label>
                        <input name="manufacturer" id="manufacturer" className="text-center h-14 w-[31.5rem] rounded-[25px] border border-black" value={actives.manufacturer} onChange={handleChange} placeholder="Fabricante" />
                    </div>
                    <div className="flex flex-col">
                        <label className="ml-4 mb-2" htmlFor="serialNumber">Serial Number *</label>
                        <input name="serialNumber" id="serialNumber" className="text-center h-14 w-[31.5rem] rounded-[25px] border border-black" value={actives.serialNumber} onChange={handleChange} placeholder="Número de Série" />
                    </div>
                </div>
                <div className="flex w-full justify-center space-x-10">
                    <div className="flex flex-col">
                        <label className="ml-4 mb-2" htmlFor="userName">Nome Usuário *</label>
                        <input name="userName" id="userName" className="text-center h-14 w-[40rem] rounded-[25px] border border-black" value={actives.userName} onChange={handleChange} placeholder="Nome do Usuário" />
                    </div>
                    <div className="flex flex-col">
                        <label className="ml-4 mb-2" htmlFor="status">Status *</label>
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
                    <button onClick={handleEditActive} className="h-14 w-1/4 mr-6 bg-[#FA226A] rounded-[25px] text-white">Editar</button>
                </div>
            </form>
        </>
    );
}
