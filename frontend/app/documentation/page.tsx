"use client";

import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from 'next/image';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
// const apiUrl = 'http://localhost:5000/api';


export default function Documentation() {
    const [files, setFiles] = useState<string[]>([]);
    const [filteredFiles, setFilteredFiles] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const docRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch(`${apiUrl}/documentation/files`)
            .then((res) => res.json())
            .then((data) => {
                const mdFiles = data.filter((file: string) => file !== 'img');
                setFiles(mdFiles);
                setFilteredFiles(mdFiles);
                console.log(`les datas sont la ${filteredFiles}`);
            })
            .catch(err => console.error("Erreur lors de la récupération des fichiers :", err));
    }, []);

    const fetchFileContent = (filename: string) => {
        fetch(`${apiUrl}/documentation/${filename}`)
            .then((res) => res.text())
            .then((data) => {
                setSelectedFile(filename);
                setContent(data);
            });
    };

    useEffect(() => {
        if (selectedFile && docRef.current) {
            setTimeout(() => {
                // Vérifier si l'élément est bien chargé avant de scroller
                if (docRef.current) {
                    docRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.scrollTo({ top: docRef.current.offsetTop - 20, behavior: "smooth" });
                }
            }, 100);
        }
    }, [selectedFile]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
        if (searchValue === "") {
            setFilteredFiles(files);
        } else {
            setFilteredFiles(files.filter(file => file.toLowerCase().includes(searchValue)));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50  flex flex-col items-center p-6">
            <header className="w-full max-w-5xl bg-white  shadow-lg p-6 rounded-lg flex justify-between items-center">
                <h1 className="text-4xl font-extrabold text-gray-900  flex items-center gap-2">
                    📖 Documentations
                </h1>
            </header>

            <div className="w-full max-w-5xl bg-white shadow-md p-6 mt-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                        📂 Liste des documents :
                    </h2>
                    <input
                        type="text"
                        placeholder="🔍 Rechercher..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-64 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFiles.length > 0 ? (
                        filteredFiles.map((file) => (
                            <button
                                key={file}
                                onClick={() => fetchFileContent(file)}
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-green-600 transition text-left w-full"
                            >
                                {file}
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center">
                            Aucun document trouvé.
                        </p>
                    )}
                </div>
            </div>

            {selectedFile && (
                <div ref={docRef} className="w-full max-w-5xl bg-white  shadow-lg p-8 mt-8 rounded-lg">
                    <h2 className="text-3xl font-bold text-blue-600 flex items-center gap-2 border-b-2 border-gray-300 pb-2 mb-4">
                        📄 {selectedFile}
                    </h2>
                    <div className="mt-4 prose prose-lg  max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                img: ({ ...props }) => (
                                    <Image
                                        alt={props.alt ?? "Image"}
                                        width={600}
                                        height={400}
                                        src={props.src ?? ""}
                                        style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
                                    />
                                )
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}
