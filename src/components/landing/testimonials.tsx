import TestimonialImage01 from '/images/testimonial-01.jpg';
import TestimonialImage02 from '/images/testimonial-02.jpg';
import TestimonialImage03 from '/images/testimonial-03.jpg';

export default function Testimonials() {
  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='py-12 md:py-20 border-t border-gray-800'>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
            <h2 className='h2 mb-4'>우리 고객의 소중한 피드백</h2>
            <p className='text-xl text-gray-400'>식자재와 식단 관리 플랫폼을 사용해본 실제 고객들의 이야기입니다.</p>
          </div>

          {/* Testimonials */}
          <div className='max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none'>
            {/* 1st testimonial */}
            <div className='flex flex-col h-full p-6 bg-gray-800' data-aos='fade-up'>
              <div>
                <div className='relative inline-flex flex-col mb-4'>
                  <img className='rounded-full' src={TestimonialImage01} width={48} height={48} alt='Testimonial 01' />
                  <svg className='absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-brand' viewBox='0 0 24 20' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z' />
                  </svg>
                </div>
              </div>
              <blockquote className='text-lg text-gray-400 grow'>
                — 이 플랫폼을 통해 식자재 관리가 훨씬 쉬워졌어요. 예전에는 낭비가 많았는데, 이제는 필요한 만큼만 구매할 수 있어서 비용도 절감됩니다. 정말 만족합니다!
              </blockquote>
              <div className='text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700'>
                <cite className='text-gray-200 not-italic'>김민수</cite> -{' '}
                <a className='text-brand hover:text-gray-200 transition duration-150 ease-in-out' href='#0'>
                  주방 관리자
                </a>
              </div>
            </div>

            {/* 2nd testimonial */}
            <div className='flex flex-col h-full p-6 bg-gray-800' data-aos='fade-up' data-aos-delay='200'>
              <div>
                <div className='relative inline-flex flex-col mb-4'>
                  <img className='rounded-full' src={TestimonialImage02} width={48} height={48} alt='Testimonial 02' />
                  <svg className='absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-brand' viewBox='0 0 24 20' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z' />
                  </svg>
                </div>
              </div>
              <blockquote className='text-lg text-gray-400 grow'>
                — 개인 맞춤형 식단 덕분에 건강을 더 잘 관리할 수 있게 되었어요. 영양소 균형을 맞춘 다양한 레시피 덕분에 식사 준비도 즐거워졌습니다.
              </blockquote>
              <div className='text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700'>
                <cite className='text-gray-200 not-italic'>이영희</cite> -{' '}
                <a className='text-brand hover:text-gray-200 transition duration-150 ease-in-out' href='#0'>
                  건강 코치
                </a>
              </div>
            </div>

            {/* 3rd testimonial */}
            <div className='flex flex-col h-full p-6 bg-gray-800' data-aos='fade-up' data-aos-delay='400'>
              <div>
                <div className='relative inline-flex flex-col mb-4'>
                  <img className='rounded-full' src={TestimonialImage03} width={48} height={48} alt='Testimonial 03' />
                  <svg className='absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-brand' viewBox='0 0 24 20' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z' />
                  </svg>
                </div>
              </div>
              <blockquote className='text-lg text-gray-400 grow'>— 커뮤니티와의 상호작용을 통해 더 많은 정보를 얻고 도움을 받을 수 있었습니다. 전문가의 조언도 정말 큰 도움이 되었어요.</blockquote>
              <div className='text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700'>
                <cite className='text-gray-200 not-italic'>박지훈</cite> -{' '}
                <a className='text-brand hover:text-gray-200 transition duration-150 ease-in-out' href='#0'>
                  고객
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
