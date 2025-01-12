import axios from 'axios';

// Tạo một instance mới của axios với cấu hình riêng
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    }
});

// Thêm interceptor để xử lý token và timestamp
axiosInstance.interceptors.request.use(
    (config) => {
        // Thêm token vào header
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Thêm timestamp vào URL để tránh cache
        const timestamp = new Date().getTime();
        config.url = `${config.url}${config.url.includes('?') ? '&' : '?'}_t=${timestamp}`;
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Kiểm tra xung đột lịch học
 * @param {Object} scheduleData
 * @param {number} scheduleData.user_id - ID của user
 * @param {string} scheduleData.days - Ngày học
 * @param {string} scheduleData.start_hour - Giờ bắt đầu
 * @param {string} scheduleData.end_hour - Giờ kết thúc
 * @returns {Promise<{isAvailable: boolean, conflictingClasses: Array}>}
 */
const checkScheduleConflict = async (scheduleData) => {
    try {
        console.log('Sending schedule check request with data:', scheduleData);
        
        const response = await axiosInstance.post(
            '/schedule/check-schedule-conflict', 
            scheduleData
        );

        // Xử lý và lọc dữ liệu trước khi trả về
        if (response.data.conflictingClasses) {
            // Tạo Set để lưu các lớp đã xử lý
            const processedClasses = new Set();
            
            // Lọc bỏ các lớp trùng lặp và lớp hiện tại
            const uniqueClasses = response.data.conflictingClasses.filter(cls => {
                // Tạo key duy nhất cho mỗi lớp
                const classKey = `${cls.class_id}-${cls.schedule_time?.start_hour}-${cls.schedule_time?.end_hour}`;
                
                // Kiểm tra nếu là lớp hiện tại
                if (cls.class_id === scheduleData.class_id) {
                    return false;
                }
                
                // Kiểm tra nếu lớp đã được xử lý
                if (processedClasses.has(classKey)) {
                    return false;
                }
                
                // Thêm lớp vào Set đã xử lý
                processedClasses.add(classKey);
                return true;
            });

            const result = {
                isAvailable: uniqueClasses.length === 0,
                conflictingClasses: uniqueClasses
            };

            console.log('Schedule check response (processed):', result);
            return result;
        }

        return response.data;
    } catch (error) {
        console.error('Schedule check error:', error);
        throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi kiểm tra lịch học');
    }
};

/**
 * Kiểm tra xung đột lịch học cho lớp và PT
 * @param {Object} scheduleData
 * @param {number} scheduleData.class_id - ID của lớp học
 * @param {string} scheduleData.days - Ngày học
 * @param {string} scheduleData.start_hour - Giờ bắt đầu
 * @param {string} scheduleData.end_hour - Giờ kết thúc
 * @param {number} scheduleData.pt_id - ID của PT
 * @returns {Promise<{hasConflicts: boolean, conflictingUsers: Array}>}
 */
const checkClassScheduleConflict = async (scheduleData) => {
    try {
        console.log('Kiểm tra xung đột lịch học với dữ liệu:', scheduleData);
        
        const response = await axiosInstance.post(
            '/schedule/check-class-schedule-conflict', 
            scheduleData
        );
        
        console.log('Kết quả kiểm tra lịch học:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi kiểm tra lịch học:', error);
        throw new Error(
            error.response?.data?.message || 
            'Có lỗi xảy ra khi kiểm tra xung đột lịch học'
        );
    }
};

// Không cần hàm clearCache nữa vì không sử dụng cache
export {
    checkScheduleConflict,
    checkClassScheduleConflict
};
