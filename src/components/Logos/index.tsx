"use client";
import Image from "next/image";


export default function Logos() {
    return (
        <section className="py-12 bg-gray-100">
            <div className="flex flex-wrap justify-center items-center gap-x-50 gap-y-10 px-4">
                <Image src="/logo1.png" alt="Logo 1" width={100} height={100} className="grayscale-100 hover:grayscale-0 transition duration-300" />
                <Image src="/logo2.png" alt="Logo 2" width={75} height={100} className="grayscale-100 hover:grayscale-0 transition duration-300" />
                <Image src="/logo3.png" alt="Logo 3" width={75} height={100} className="grayscale-100 hover:grayscale-0 transition duration-300" />
                <Image src="/logo4.png" alt="Logo 4" width={75} height={100} className="grayscale-100 hover:grayscale-0 transition duration-300" />
            </div>
        </section>
    );
}