import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FiCheckCircle, FiAlertOctagon } from "react-icons/fi";
import { Loading } from '../Loading';
import { Modal } from '../Modal';

const TableManagment = () => {
    const [obj, setObj] = useState();

    const [loading, setLoading] = useState(false);

    const [modal, setModal] = useState(
        {
            hostname: '',
            equipmentType: '',
            model: '',
            manufacturer: '',
            serialNumber: '',
            userName: '',
            status: ''
        }
    );

    const [alert, setAlert] = useState({
        title: "",
        description: "",
        status: ""
    })


    const resertAlert = () => {
        setTimeout(() => {
            setAlert({
                title: "",
                description: "",
                status: ""
            });
        }, 3000)
    }

    useEffect(() => {
        setLoading(true)

        axios.get('http://localhost:3001/get_actives')
            .then((res) => {
                setObj(res.data);
            })
            .catch((error) => {
                setAlert({ title: 'Error!', description: 'Não foi possível buscar o ativo!', status: 'error' })
                resertAlert()
            })
            .finally(() => {
                setLoading(false)
            })
    }, []);

    const handleDelete = (id) => {
        setLoading(true)

        axios.delete(`http://localhost:3001/delete_active/${id}`)
            .then((res) => {
                setAlert({ title: 'Sucesso!', description: 'Ativo deletado com sucesso!', status: 'success' })
                axios.get('http://localhost:3001/get_actives')
                    .then((res) => {
                        setObj(res.data);
                        resertAlert()
                    })
                    .catch((error) => {
                        setAlert({ title: 'Error!', description: 'Não foi possível buscar o ativo!', status: 'error' })
                        resertAlert()
                    });
            })
            .catch((error) => {
                setAlert({ title: 'Error!', description: 'Não foi possível buscar o ativo!', status: 'error' })
                resertAlert()
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleDeleteModal = (act) => {
        setModal(act)
    }

    const handleCloseModal = () => {
        setModal(
            {
                hostname: '',
                equipmentType: '',
                model: '',
                manufacturer: '',
                serialNumber: '',
                userName: '',
                status: ''
            }
        )
    }


    if (loading) {
        return (
            <Loading />
        )
    }

    if (obj?.length > 0) {
        return (<>
            {modal.hostname != '' && <Modal handleDelete={handleDelete} active={modal} handleCloseModal={handleCloseModal} />}
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
            <div className='w-5/6 overflow-x-hidden max-h-[70%] overflow-y-auto border-2 border-black rounded-lg flex flex-col '>
                <div className='flex justify-around border-b-2 border-black py-5 items-center pr-0 bg-[#FFCDCD]'>
                    <div className='w-[12.5%] text-center border-r-2 border-black overflow-auto'>Hostname</div>
                    <div className='w-[17.5%] text-center border-r-2 border-black overflow-auto'>Tipo de Equipamento</div>
                    <div className='w-[12.5%] text-center border-r-2 border-black overflow-auto'>Modelo</div>
                    <div className='w-[12.5%] text-center border-r-2 border-black overflow-auto'>Fabricante</div>
                    <div className='w-[12.5%] text-center border-r-2 border-black overflow-auto'>Serial Number</div>
                    <div className='w-[12.5%] text-center border-r-2 border-black overflow-auto'>Nome Usuário</div>
                    <div className='w-[10%] text-center border-r-2  border-black overflow-auto'>Status</div>
                    <div className='w-[10%] text-center'></div>
                </div>
                {obj?.map((active, index) => {
                    return (
                        <div key={active._id} className={`flex justify-around border-b-2 py-5 items-center `}>
                            <div className='w-[12.5%] text-center border-r-2 overflow-auto'>{active.hostname}</div>
                            <div className='w-[17.5%] text-center border-r-2 overflow-auto'>{active.equipmentType.charAt(0).toUpperCase() + active.equipmentType.substring(1)}</div>
                            <div className='w-[12.5%] text-center border-r-2 overflow-auto'>{active.model}</div>
                            <div className='w-[12.5%] text-center border-r-2 overflow-auto'>{active.manufacturer}</div>
                            <div className='w-[12.5%] text-center border-r-2 overflow-auto'>{active.serialNumber}</div>
                            <div className='w-[12.5%] text-center border-r-2 overflow-auto'>{active.userName}</div>
                            <div className='w-[10%] text-center border-r-2 overflow-auto'>{`${active.status == 'using' ? 'Em uso' : ''} ${active.status == 'stock' ? 'Em estoque' : ''} ${active.status == 'maintenance' ? 'Em manutenção' : ''}`}</div>
                            <div className='w-[10%] text-center flex justify-center space-x-2'>
                                <div>
                                    <Link href={`/edit_actives/${active._id}`}>
                                        <FiEdit className='hover:text-[#FA226A] hover:cursor-pointer' size={24} />
                                    </Link>
                                </div>
                                <div>
                                    <FiTrash onClick={() => handleDeleteModal(active)} className='hover:text-[#FA226A] hover:cursor-pointer' size={24} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </>
        );
    } else {
        return (
            <div className='flex flex-col items-center'>
                <h1>
                    Nenhum ativo cadastrado!
                </h1>
                <Link className='text-blue-600 hover:text-blue-900' href={'/'}>Cadastrar ativo</Link>
            </div>
        )
    }
};

export default TableManagment;
