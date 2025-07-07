import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentTestBoard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const navigate = useNavigate();

  // Sample test questions - you can replace with actual questions from your backend
  const questions = [
    {
      id: 1,
      question: "What is your primary area of interest?",
      type: "multiple-choice",
      options: [
        "Science and Technology",
        "Arts and Literature",
        "Business and Commerce",
        "Social Sciences",
        "Healthcare and Medicine"
      ]
    },
    {
      id: 2,
      question: "Which type of work environment do you prefer?",
      type: "multiple-choice",
      options: [
        "Office-based work",
        "Field work/Outdoor",
        "Laboratory/Research",
        "Creative studio",
        "Remote/Work from home"
      ]
    },
    {
      id: 3,
      question: "What motivates you the most?",
      type: "multiple-choice",
      options: [
        "Financial success",
        "Helping others",
        "Creative expression",
        "Problem solving",
        "Leadership and influence"
      ]
    },
    {
      id: 4,
      question: "How do you prefer to work?",
      type: "multiple-choice",
      options: [
        "Independently",
        "In small teams",
        "In large groups",
        "Leading others",
        "Following instructions"
      ]
    },
    {
      id: 5,
      question: "What is your strongest skill?",
      type: "multiple-choice",
      options: [
        "Analytical thinking",
        "Communication",
        "Creativity",
        "Technical skills",
        "Leadership"
      ]
    }
  ];

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = () => {
    // Here you would typically send the answers to your backend
    console.log("Test answers:", answers);
    setTestCompleted(true);
  };

  const handleGoToDashboard = () => {
    navigate("/student");
  };

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Test Completed!</h1>
            <p className="text-gray-600">
              Thank you for completing the career assessment test. Your responses have been recorded and will be analyzed to provide you with personalized career recommendations.
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">What's Next?</h3>
            <p className="text-blue-700 text-sm">
              Our counselors will review your responses and provide detailed career guidance. You can access your results and recommendations from your dashboard.
            </p>
          </div>

          <button
            onClick={handleGoToDashboard}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-center mb-4">Career Assessment Test</h1>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <p className="text-center text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          {/* Question Card */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-6">{currentQ.question}</h2>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name={`question-${currentQ.id}`}
                    value={option}
                    checked={answers[currentQ.id] === option}
                    onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                    className="mr-3"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <button
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? "Submit Test" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTestBoard;
