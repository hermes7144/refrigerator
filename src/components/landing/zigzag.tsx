import FeatImage01 from '/images/features-03-image-01.png';
import FeatImage02 from '/images/features-03-image-02.png';
import FeatImage03 from '/images/features-03-image-03.png';

export default function Zigzag() {
  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='py-12 md:py-20 border-t border-gray-800'>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
            <div className='inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4'>건강한 식단 관리의 시작</div>
            <h1 className='h2 mb-4'>식단 관리로 건강을 지키세요</h1>
            <p className='text-xl text-gray-400'>효율적인 식자재 관리와 맞춤형 식단으로 건강한 생활을 지원합니다.</p>
          </div>

          {/* Items */}
          <div className='grid gap-20'>
            {/* 1st item */}
            <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
              {/* Image */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1' data-aos='fade-up'>
                <img className='max-w-full mx-auto md:max-w-none h-auto' src={FeatImage01} width={540} height={405} alt='Features 01' />
              </div>
              {/* Content */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6' data-aos='fade-right'>
                <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                  <div className='font-architects-daughter text-xl text-brand mb-2'>효율적인 식자재 관리</div>
                  <h3 className='h3 mb-3'>정확한 식단 계획으로 건강 유지</h3>
                  <p className='text-xl text-gray-400 mb-4'>식자재를 효율적으로 관리하여 시간과 비용을 절약하고 건강한 식단을 유지하세요.</p>
                  <ul className='text-lg text-gray-400 -mb-2'>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>식자재 재고 관리로 낭비 최소화</span>
                    </li>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>효율적인 식자재 사용으로 비용 절감</span>
                    </li>
                    <li className='flex items-center'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>체계적인 식단 계획으로 목표 달성</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
              {/* Image */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl' data-aos='fade-up'>
                <img className='max-w-full mx-auto md:max-w-none h-auto' src={FeatImage02} width={540} height={405} alt='Features 02' />
              </div>
              {/* Content */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6' data-aos='fade-left'>
                <div className='md:pl-4 lg:pl-12 xl:pl-16'>
                  <div className='font-architects-daughter text-xl text-brand mb-2'>맞춤형 식단 제공</div>
                  <h3 className='h3 mb-3'>개인별 맞춤 식단 관리</h3>
                  <p className='text-xl text-gray-400 mb-4'>개인 맞춤형 식단을 통해 건강을 효과적으로 관리할 수 있습니다.</p>
                  <ul className='text-lg text-gray-400 -mb-2'>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>영양소 균형을 고려한 식단</span>
                    </li>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>다양한 레시피 제공</span>
                    </li>
                    <li className='flex items-center'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>건강 목표 설정과 관리</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
              {/* Image */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1' data-aos='fade-up'>
                <img className='max-w-full mx-auto md:max-w-none h-auto' src={FeatImage03} width={540} height={405} alt='Features 03' />
              </div>
              {/* Content */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6' data-aos='fade-right'>
                <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                  <div className='font-architects-daughter text-xl text-brand mb-2'>커뮤니티와의 연계</div>
                  <h3 className='h3 mb-3'>건강 관리의 새로운 접근</h3>
                  <p className='text-xl text-gray-400 mb-4'>커뮤니티와의 연계를 통해 더 많은 정보를 얻고, 식단 관리에 도움을 받을 수 있습니다.</p>
                  <ul className='text-lg text-gray-400 -mb-2'>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>사용자 리뷰 및 평가</span>
                    </li>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>커뮤니티와의 상호작용</span>
                    </li>
                    <li className='flex items-center'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>전문가의 조언</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
