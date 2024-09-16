import { useState } from 'react';

export default function FaqPage() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqs = [
        { question: "What is your return policy?", answer: "You can return items within 30 days of purchase for a full refund." },
        { question: "How long does shipping take?", answer: "Shipping typically takes 5-7 business days." },
        { question: "Do you offer international shipping?", answer: "Yes, we offer international shipping to most countries." },
        { question: "What is your return policy?", answer: "You can return items within 30 days of purchase for a full refund." },
        { question: "How long does shipping take?", answer: "Shipping typically takes 5-7 business days." },
        { question: "Do you offer international shipping?", answer: "Yes, we offer international shipping to most countries." },
        
       
        // Add more FAQ items here
    ];

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            <h1 className="text-5xl font-semibold mb-4">FAQs</h1>
            <div className="h-5/6 w-full outline outline-gray-200 max-w-2xl mt-7 rounded-lg shadow-lg p-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-4">
                        {/* Separator Line */}
                        {index > 0 && <hr className="border-gray-300 mb-2" />}
                        
                        <button
                            onClick={() => handleToggle(index)}
                            className="w-full text-left flex items-center justify-between p-4"
                        >
                            <span className="text-lg font-medium">{faq.question}</span>
                            <span className={`transform transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}>
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </button>
                        {expandedIndex === index && (
                            <div className="p-4 ounded-b-lg">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
