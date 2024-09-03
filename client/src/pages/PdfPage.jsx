import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PdfPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const pdfs = [
        { id: 1, title: 'Many students experience culture shock in the UCT environment. What is culture, and why can UCT’s culture cause an identity crisis or the feeling that you’re an imposter? This chapter will help you understand and start to manage your UCT experience. And, if you’re not experiencing these things, then this chapter is a window to understanding those who are.', imgSrc: 'Chapter1.png' },
        { id: 2, title: 'Surviving the first semester at UCT has been an incredible journey thus far, but the challenge isnt over yet. Writing your exams is the final challenge that you will need to conquer. To succeed, careful planning and diligent preparation is key. This chapter is your guide to what you can expect from your first UCT exam season.', imgSrc: 'Chapter2.png' },
        { id: 3, title: 'Welcome to the exciting realm of university tests, where things are different from what youre used to in school. This chapter is your guide to what you can expect in these tests, packed with study tips and test strategies. Its time to level up your study skills to ace those first university tests!', imgSrc: 'Chapter3.png' },
        { id: 4, title: 'UCT is a tough environment. Don’t fall into the trap of thinking that you already have this time management thing down. The time management skills that you developed at school will probably not be sufficient. You need to take your time management skills to the next level if you want to do well at UCT.', imgSrc: 'Chapter4.png' },
        { id: 5, title: 'With exams drawing to a close, what are your hopes and fears for the vac? This chapter contains essential information about what you must do during the vac. We also have suggestions to help you make the most of the vac. Read this before going home, so that you download what you need, before you leave.', imgSrc: 'Chapter5.png' },
        { id: 6, title: 'Your ability to study successfully depends on your health and well-being. To have a successful year, you need to adopt a holistic approach, in which you pay attention to your physical, mental, spiritual, financial and academic well-being.', imgSrc: 'Chapter6.png' },
        { id: 7, title: 'Your ability to study successfully depends on your health and well-being. To have a successful year, you need to adopt a holistic approach, in which you pay attention to your physical, mental, spiritual, financial and academic well-being.', imgSrc: 'Chapter7.png' },
        { id: 8, title: 'Now is a good time to do some metacognition, i.e. to pause and think about what you did in the first quarter and what you want to do in the second quarter. By re-aligning yourself with your goals and values, you can be the best version of yourself for the rest of the year. In this chapter, we share some useful metacognition tools.', imgSrc: 'Chapter8.png' },
    ];

    const filteredPdfs = pdfs.filter(pdf =>
        pdf.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col w-full h-full p-4 bg-white">
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search PDFs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredPdfs.map(pdf => (
                    <div
                        key={pdf.id}
                        className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
                    >
                        <img src={pdf.imgSrc} alt={pdf.title} className="w-full h-32 object-cover rounded mb-2" />
                        <h3 className="text-center font-semibold">{pdf.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}