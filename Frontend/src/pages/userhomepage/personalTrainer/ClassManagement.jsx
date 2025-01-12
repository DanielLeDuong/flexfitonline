import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddClass from './AddClass';
import ClassCard from './ClassCard';
import ClassDetail from './ClassDetail';

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [showAddClass, setShowAddClass] = useState(false);
  const [formData, setFormData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const classSubjects = [
    "Yoga",
    "Pilates",
    "HIIT (High-Intensity Interval Training)",
    "Cardio",
    "Strength Training",
    "Boxing/Kickboxing",
    "CrossFit",
    "Stretching/Flexibility"
  ];
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
          const accessToken = localStorage.getItem('accessToken');
          const response = await axios.get('http://localhost:3000/classes/owned', {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          });
          setClasses(response.data);
      } catch (err) {
          console.error('Error fetching classes:', err);
          setError('Error fetching classes');
      }
    };

    fetchClasses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update formData with specific constraint for classType
    setFormData((prev) => {
      if (name === 'classType' && value === '1') {
        return {
          ...prev,
          [name]: value,
          maxAttender: '1', // Set maxAttender to 1 for One-on-One
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };


  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  //Add Class handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const data = new FormData();
    data.append('className', formData.className);
    data.append('classDescription', formData.classDescription);
    data.append('classType', formData.classType);
    data.append('fee', formData.fee);
    data.append('startDate', formData.startDate);
    data.append('endDate', formData.endDate);
    if (formData.file) data.append('file', formData.file);
    data.append('maxAttender', formData.maxAttender); // Add maxAttender
    data.append('classSubject', formData.classSubject);

    try {
      const response = await axios.post('http://localhost:3000/classes/create', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setClasses((prev) => [...prev, response.data]);
      setShowAddClass(false);
    } catch (err) {
      console.error('Error creating class:', err);
      setError('Error creating class');
    }
  };

  const toggleForm = () => setShowAddClass(!setShowAddClass);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Thêm hàm handleAddClass mới
  const handleAddClass = (newClass) => {
    setClasses((prev) => [...prev, newClass]);
    setShowAddClass(false);
  };

  // Khi click vào một class
  const handleClassClick = async (classItem) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(
        `http://localhost:3000/classes/${classItem.class_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSelectedClass(response.data);
    } catch (error) {
      console.error('Error fetching class details:', error);
      // Có thể thêm xử lý lỗi ở đây
    }
  };

  // Thay đổi logic hiển thị có điều kiện
  if (showAddClass) {
    return <AddClass 
      onClassAdded={handleAddClass} 
      onCancel={() => setShowAddClass(false)} 
    />;
  }

  if (selectedClass) {
    return <ClassDetail 
      classItem={selectedClass}
      onBack={() => setSelectedClass(null)}
    />;
  }

  // Tính toán các classes sẽ hiển thị cho trang hiện tại
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentClasses = classes.slice(indexOfFirstCard, indexOfLastCard);

  // Tính tổng số trang
  const totalPages = Math.ceil(classes.length / cardsPerPage);

  // Tạo mảng số trang để hiển thị
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {error && (
        <p className="text-red-600 font-bold mb-4">{error}</p>
      )}
      
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Class List
      </h2>
      
      <button 
        onClick={() => setShowAddClass(true)}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        Add Class
      </button>

      {/* Grid hiển thị các card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentClasses.map((classItem) => (
          <ClassCard
            key={classItem.class_id}
            classItem={classItem}
            onCardClick={(classItem) => handleClassClick(classItem)}
          />
        ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === number
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassList;