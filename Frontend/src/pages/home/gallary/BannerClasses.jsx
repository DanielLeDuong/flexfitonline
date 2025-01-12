import React from 'react'
import { useNavigate } from 'react-router-dom'

const BannerClasses = () => {
    const navigate = useNavigate()
    
    const handleViewClass = () => {
        navigate('/classes')
    }

  return (
    <div className='flex gap-4'>
        <div className="max-w-[30%] mt-5 ml-5">
            <h1 className='font-extrabold text-4xl text-secondary text-justify'>CHÚNG TÔI LÀ FLEXFIT ONLINE</h1>
            <p className='font-thin italic text-justify'>Là thương hiệu về sức khỏe lớn nhất Việt Nam, 
                Flexfit Online được xây dựng để mang lại hạnh phúc và tạo ra những khoảnh khắc viên mãn cho bạn trong cuộc sống bằng việc cung cấp các dịch vụ phát triển sức khỏe thể chất, 
                dinh dưỡng và tinh thần toàn diện.
            </p>
        </div>

        <div className="flex gap-2 mt-5 max-w-[70%]">
            <div className="w-[40%] mx-auto">
                <img src="./ori-yoga.webp" alt="" />
                <h1 className='font-bold text-2xl mt-2'>LỚP HỌC YOGA NGUYÊN BẢN</h1>
                <p className='text-justify font-thin'>Thực hành chuẩn xác Yoga với sự hướng dẫn của các bậc thầy Yoga Ấn Độ. 
                    Đạt đến trạng thái cân bằng hoàn hảo bằng cách xây dựng sức mạnh, 
                    độ linh hoạt và sự uyển chuyển cơ thể trong khi thư giãn hoàn toàn mọi giác quan và giải phóng tâm trí
                </p>
                <h1 onClick={handleViewClass} className='cursor-pointer text-secondary font-bold mt-2'>Tìm hiểu thêm</h1>
            </div>
            <div className="w-[40%] mx-auto mt-[10%]">
                <img src="./PT_FAQ.jpg" alt="" />
                <h1 className='font-bold text-2xl mt-2'>CẢI THIỆN CƠ THỂ CỦA CHÍNH BẠN</h1>
                <p className='text-justify font-thin'>Thực hành chuẩn xác Yoga với sự hướng dẫn của các bậc thầy Yoga Ấn Độ. 
                    Đạt đến trạng thái cân bằng hoàn hảo bằng cách xây dựng sức mạnh, 
                    độ linh hoạt và sự uyển chuyển cơ thể trong khi thư giãn hoàn toàn mọi giác quan và giải phóng tâm trí
                </p>
                <h1 onClick={handleViewClass} className='cursor-pointer text-secondary font-bold mt-2'>Tìm hiểu thêm</h1>
            </div>
        </div>
    </div>
  )
}

export default BannerClasses