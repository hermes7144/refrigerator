import useAuthContext from '../../context/AuthContext';

export default function Hero() {
  const { login } = useAuthContext();
//   <section className='h-96 bg-yellow-900 relative'>
//   <div className='w-full h-full bg-cover bg-banner opacity-80'></div>
//   <div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
//     <h2 className='text-6xl'>Shop With US</h2>
//     <p className='text-2xl'>Best Products, High Quality</p>
//   </div>
// </section>

  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 relative  md:bg-yellow-800'>
        {/* Illustration behind hero content */}
        <div className='absolute bg-banner'></div>
        <img src='/images/banner.jpg' className='absolute left-0 bottom-0 opacity-70 min-h-96 hidden md:block object-cover bg-cover bg-banner'></img>
        {/* Hero content */}
        <div className='relative pt-10 md:pt-48 '>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16 md:text-gray-50 drop-shadow-2xl'>
            <h1 className='text-4xl font-extrabold leading-tight tracking-tighter mb-4' data-aos='fade-up'>
              밥메이트와 함께 자유롭게 식사를 계획하고 관리
            </h1>
            <p className='text-xl font-bold mb-8' data-aos='fade-up' data-aos-delay='200'>
              편리한 식단 및 재료 관리로 더 건강한 삶을 시작하세요.
            </p>
            <div className='max-w-xs mx-auto'>
              <div data-aos='fade-up' data-aos-delay='400'>
                <a className='btn text-white bg-brand hover:bg-brand border-none hover:brightness-95 w-full mb-4 sm:mb-0' onClick={login}>
                  밥메이트와 식단 관리하기!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
