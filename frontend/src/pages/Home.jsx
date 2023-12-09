import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <StoreFront />
      <Testimonials />
    </>
  );
}
function StoreFront() {
  return (
    <div className="relative overflow-hidden bg-blue">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-yellow-900 sm:text-6xl">
              Best Deals of The Year are Finally Here.
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Welcome to FunHub, your ultimate destination for a seamless and
              thrilling gaming shopping experience. At FunHub, we bring the
              world of gaming right to your fingertips, offering a comprehensive
              selection of the latest and greatest video games, accessories, and
              gear that every gamer dreams of.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-72 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="/images/deal1.jpg"
                          alt=""
                          className="h-full w-full object-contain object-center"
                        />
                      </div>
                      <div className="h-64 w-72 overflow-hidden rounded-lg">
                        <img
                          src="/images/deal2.jpg"
                          alt=""
                          className="h-full w-full object-contain object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        {/* <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        /> */}
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="images/deal3.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        {/* <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        /> */}
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        {/* <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        /> */}
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        {/* <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/products"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Testimonials() {
  return (
    <section className="bg-[#1C1E2D]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Testimonials
          </h2>
        </div>
        <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
          <figure className="flex flex-col justify-center items-center p-8 text-center  border-b  md:p-12 lg:border-r bg-[#151725] border-gray-700">
            <blockquote className="mx-auto mb-8 max-w-2xl text-white">
              <h3 className="text-lg font-semibold text-white">
                Speechless with how easy this was to integrate
              </h3>
              <p className="my-4">{`"I recently got my hands on Flowbite Pro, and holy crap, I'm speechless with how easy this was to integrate within my application. Most templates are a pain, code is scattered, and near impossible to theme.`}</p>
              <p className="my-4">{`Flowbite has code in one place and I'm not joking when I say it took me a matter of minutes to copy the code, customise it and integrate within a Laravel + Vue application.`}</p>
              <p className="my-4">{`If you care for your time, I hands down would go with this."`}</p>
            </blockquote>
            <figcaption className="flex justify-center items-center space-x-3">
              <img
                className="w-9 h-9 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                alt="profile picture"
              />
              <div className="space-y-0.5 font-medium text-white text-left">
                <div>Bonnie Green</div>
                <div className="text-sm font-light text-gray-400">
                  Developer at Open AI
                </div>
              </div>
            </figcaption>
          </figure>
          <figure className="flex flex-col justify-center items-center p-8 text-center bg-[#151725] border-b  md:p-12 border-gray-700">
            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-400">
              <h3 className="text-lg font-semibold text-white">
                Solid foundation for any project
              </h3>
              <p className="my-4">{`"FlowBite provides a robust set of design tokens and components based on the popular Tailwind CSS framework. From the most used UI components like forms and navigation bars to the whole app screens designed both for desktop and mobile, this UI kit provides a solid foundation for any project.`}</p>
              <p className="my-4">{`Designing with Figma components that can be easily translated to the utility classNamees of Tailwind CSS is a huge timesaver!"`}</p>
            </blockquote>
            <figcaption className="flex justify-center items-center space-x-3">
              <img
                className="w-9 h-9 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                alt="profile picture"
              />
              <div className="space-y-0.5 font-medium text-white text-left">
                <div>Roberta Casas</div>
                <div className="text-sm font-light text-white">
                  Lead designer at Dropbox
                </div>
              </div>
            </figcaption>
          </figure>
          <figure className="flex flex-col justify-center items-center p-8 text-center  border-b  lg:border-b-0 md:p-12 lg:border-r bg-[#151725] border-gray-700">
            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-400">
              <h3 className="text-lg font-semibold text-white">
                Mindblowing workflow and variants
              </h3>
              <p className="my-4">{`"As someone who mainly designs in the browser, I've been a casual user of Figma, but as soon as I saw and started playing with FlowBite my mind was 🤯.`}</p>
              <p className="my-4">{`Everything is so well structured and simple to use (I've learnt so much about Figma by just using the toolkit).`}</p>
              <p className="my-4">{`Aesthetically, the well designed components are beautiful and will undoubtedly level up your next application."`}</p>
            </blockquote>
            <figcaption className="flex justify-center items-center space-x-3">
              <img
                className="w-9 h-9 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                alt="profile picture"
              />
              <div className="space-y-0.5 font-medium text-white text-left">
                <div>Jese Leos</div>
                <div className="text-sm font-light text-white">
                  Software Engineer at Facebook
                </div>
              </div>
            </figcaption>
          </figure>
          <figure className="flex flex-col justify-center items-center p-8 text-center  md:p-12 bg-[#151725] border-gray-700">
            <blockquote className="mx-auto mb-8 max-w-2xl text-gray-400">
              <h3 className="text-lg font-semibold text-white">
                Efficient Collaborating
              </h3>
              <p className="my-4">{`"This is a very complex and beautiful set of elements. Under the hood it comes with the best things from 2 different worlds: Figma and Tailwind.`}</p>
              <p className="my-4">{`You have many examples that can be used to create a fast prototype for your team."`}</p>
            </blockquote>
            <figcaption className="flex justify-center items-center space-x-3">
              <img
                className="w-9 h-9 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                alt="profile picture"
              />
              <div className="space-y-0.5 font-medium text-white text-left">
                <div>Joseph McFall</div>
                <div className="text-sm font-light text-gray-400">
                  CTO at Google
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
