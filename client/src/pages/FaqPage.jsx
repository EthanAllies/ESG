import { useState } from 'react';

export default function FaqPage() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqs = [
        {
            question: "What resources are available for science students?",
            answer: "The guide provides access to academic journals, study groups, tutoring services, and online learning platforms."
          },
          {
            question: "How do I access tutoring services?",
            answer: "Tutoring services can be accessed through the student portal or by visiting the tutoring center on campus."
          },
          {
            question: "What are the best ways to prepare for exams?",
            answer: "Effective preparation includes reviewing lecture notes, using flashcards, forming study groups, and practicing past exam questions."
          },
          {
            question: "How can I stay organized during the semester?",
            answer: "Using planners, digital tools like Google Calendar, and following time management techniques such as the Pomodoro Method are great ways to stay organized."
          },
          {
            question: "Where can I find information about internships?",
            answer: "Internship opportunities are listed on the career services website and can also be found through networking events or your academic advisor."
          },
          {
            question: "How do I get involved in research projects?",
            answer: "You can reach out to professors, attend research fairs, or check with your department's office for available opportunities."
          }
        
       
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
