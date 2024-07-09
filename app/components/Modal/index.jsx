export const Modal = ({active, handleDelete, handleCloseModal}) => {

    const verifyTarget = (e) =>{
        if (e.target === e.currentTarget) {
            handleCloseModal()
        }
    }

    if(active.hostname != '')
        return (
            <div onClick={verifyTarget} className="bg-black/60 absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
                <div className="w-[20%] flex flex-col items-center h-auto bg-white rounded-lg drop-shadow-lg overflow-hidden">
                    <header className="p-5 w-full text-center border-b bg-[#FFCDCD]">
                        <h1>Tem certeza que deseja apagar este ativo?</h1>
                    </header>
                    <main className="p-5">
                        <ul className="flex flex-col space-y-2">
                            <li>Hostname: <span className="font-bold">{active.hostname}</span></li>
                            <li>Tipo de Equipamento: <span className="font-bold">{active.equipmentType.charAt(0).toUpperCase() + active.equipmentType.substring(1)}</span></li>
                            <li>Modelo: <span className="font-bold">{active?.model}</span></li>
                            <li>Fabricante: <span className="font-bold">{active?.manufacturer}</span></li>
                            <li>Serial Number: <span className="font-bold">{active?.serialNumber}</span></li>
                            <li>Nome Usuário: <span className="font-bold">{active?.userName}</span></li>
                            <li>Status: <span className="font-bold">{`${active.status == 'using' ? 'Em uso' : ''} ${active.status == 'stock' ? 'Em estoque' : ''} ${active.status == 'maintenance' ? 'Em manutenção' : ''}`}</span></li>
                        </ul>
                    </main>
                    <footer className="w-full flex justify-center h-24 p-5 gap-6">
                        <button onClick={handleCloseModal} className="bg-blue-500 hover:bg-blue-500/10 hover:border-2 hover:border-black  border-collapse w-24 hover:text-black text-white p-3 rounded-md" >Cancelar</button>
                        <button onClick={() => [handleDelete(active._id), handleCloseModal()]} className="bg-red-500 text-white p-3 rounded-md  hover:bg-red-500/10 hover:border-2 hover:border-black  border-collapse w-24 hover:text-black">Apagar</button>
                    </footer>
                </div>
            </div>
        )
}