import Link from "next/link"
import pcImage from "@/public/pc.png"
import Image from "next/image"

export const Navbar = ({register}) => {
    return (
        <div className="w-full bg-[#FA226A] max-h-20 flex items-center p-5 flex-1">
            <ul className="flex gap-8 items-center text-white">
                <li>
                    <Link href={'/'}>
                        <Image className="w-14" src={pcImage} alt="Home" />
                    </Link>
                </li>
                <li className={`text-lg ${register && 'font-bold'}`}>
                    <Link href={'/'}>Cadastrar</Link>
                </li>
                <li className={`text-lg ${!register && 'font-bold'}`}>
                    <Link href={'/edit_actives'}>Editar</Link>
                </li>
            </ul>
        </div>
    )
}