import Lottie from "react-lottie"
import loading from "@/lib/Lottie/loading.json"

export const Loading = () => {
    const defaulConfig = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (

        <div className="bg-black/60 h-screen w-screen flex justify-center items-center absolute top-0 left-0">
            <Lottie
                options={defaulConfig}
                width={150}
                height={150}
            />
        </div>
    )
}