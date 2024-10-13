TODO: 
- [ ] Propagate cloudinary error to user
- [ ] Check cloudinary image restriction based on size (check if we can resize on the server)
- [x] Use SWR library for completed and in-progress prediction pages (https://swr.vercel.app/docs/with-nextjs)
- [ ] Add reset tab functionality
- [ ] Add delete image functionality
- [ ] Add canny feature request (https://canny.io/use-cases/feature-request-management)
- [ ] Add more options for image enhancements (https://replicate.com/philz1337x/clarity-upscaler/versions/dfad41707589d68ecdccd1dfa600d55a208f9310748e44bfe35b4a6291453d5e/api)
- [ ] Make better video recording for product demo using (https://www.screen.studio/)

//

      {/* <section className="hero grid lg:grid-cols-2 grid-cols-1 mt-6 gap-10 lg:gap-0">
        <div className="hero-text h-full flex flex-col justify-center lg:pl-6">
          <h1 className="text-6xl lg:text-7xl font-bold flex flex-col flex-wrap gap-2">
            <span>
              Bring your <span className="inline text-purple">old,</span>
            </span>
            <span>
              and <span className="inline text-purple">blurry</span> photos
            </span>
            <span>back to life</span>
            <span>
              with <span className="inline text-purple">AI</span>.
            </span>
          </h1>
          <h2 className="text-base mt-3 sm:max-w-[80%] lg:max-w-[60%] flex flex-col gap-3">
            <p>
              Restore blurry faces, enhance the quality of an old image, or even
              sharpen blurry texts. Our AI models can handle it all.
            </p>
          </h2>
          <div className="mt-5">
            <Button
              className="p-8 text-xl"
              href={links.studio.path}
              withFancyGradient
            >
              Get Started
            </Button>
          </div>
        </div>

        <div className="hero-image grid grid-cols-2 lg:gap-4 gap-2">
          <div className="relative w-full lg:h-[600px] h-[50vh]">
            <ImageContainer src={ClearParrot} alt="Clear Parrot" withGradient />
            <div className="absolute hidden lg:block top-4 left-[-22%] transform rotate-12">
              <div className="w-[4.5rem]">
                <CurvedArrow />
                <p className={clsx(HandwritingFont.className, "text-xl")}>
                  Enhanced by Unblur Photos 🔥
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:h-[600px] h-[50vh]">
            <ImageContainer
              src={BlurryParrot}
              alt="Blurry Parrot"
              withGradient
            />
          </div>
        </div>
      </section> */}