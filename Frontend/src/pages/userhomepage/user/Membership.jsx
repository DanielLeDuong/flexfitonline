import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Membership = () => {
    const [membershipData, setMembershipData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMembershipStatus = async () => {
            try {
                // Lấy access token từ localStorage
                const accessToken = localStorage.getItem('accessToken');
                
                if (!accessToken) {
                    setError('Bạn chưa đăng nhập');
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                    return;
                }

                const response = await axios.get('http://localhost:3000/payment/membership-status', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                setMembershipData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching membership:', err);
                if (err.response?.status === 401) {
                    setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
                    setTimeout(() => {
                        localStorage.removeItem('accessToken');
                        navigate('/login');
                    }, 2000);
                } else {
                    setError('Không thể tải thông tin membership. Vui lòng thử lại sau');
                }
                setLoading(false);
            }
        };

        fetchMembershipStatus();
    }, [navigate]);

    if (loading) return <div className="text-center">Đang tải...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!membershipData) return <div className="text-center">Không có dữ liệu membership</div>;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Thông tin Membership</h2>
            
            <div className="space-y-4">
                <div className="flex justify-between p-4 bg-gray-50 rounded">
                    <span className="font-semibold">Trạng thái Membership:</span>
                    <span className={`${membershipData.isActive ? 'text-green-500' : 'text-red-500'}`}>
                        {membershipData.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
                    </span>
                </div>

                {membershipData.hasMembership && membershipData.membershipDetails && (
                    <>
                        <div className="flex justify-between p-4 bg-gray-50 rounded">
                            <span className="font-semibold">Loại Membership:</span>
                            <span>Gói {membershipData.membershipDetails.membership_type}</span>
                        </div>

                        <div className="flex justify-between p-4 bg-gray-50 rounded">
                            <span className="font-semibold">Ngày bắt đầu:</span>
                            <span>{formatDate(membershipData.membershipDetails.start_date)}</span>
                        </div>

                        <div className="flex justify-between p-4 bg-gray-50 rounded">
                            <span className="font-semibold">Ngày kết thúc:</span>
                            <span>{formatDate(membershipData.membershipDetails.end_date)}</span>
                        </div>

                        <div className="flex justify-between p-4 bg-gray-50 rounded">
                            <span className="font-semibold">Số ngày còn lại:</span>
                            <span className="text-blue-500 font-bold">{membershipData.daysRemaining} ngày</span>
                        </div>

                        <div className="flex justify-between p-4 bg-gray-50 rounded">
                            <span className="font-semibold">Giá:</span>
                            <span>{formatPrice(membershipData.membershipDetails.price)}</span>
                        </div>

                        <div className="flex justify-between p-4 bg-gray-50 rounded">
                            <span className="font-semibold">Phương thức thanh toán:</span>
                            <span className="capitalize">{membershipData.membershipDetails.payment_method}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Membership; 