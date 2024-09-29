import BlurryParrot from "@/assets/1-before.png";
import ClearParrot from "@/assets/1-after.png";
import Image from "next/image";
import { Reenie_Beanie } from "next/font/google";
import { clsx } from "@/utils/clsx";

const HandwritingFont = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400"
});

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20">
      <section className="hero grid lg:grid-cols-2 grid-cols-1">
        <div className="hero-text h-full">
          <h1 className="text-7xl font-bold p-3 grid place-content-center h-full">
            <div className="flex flex-col gap-2">
              <span>
                Bring your <span className="inline text-purple">old,</span>
              </span>
              <span>
                and <span className="inline text-purple">blurry</span> photos
              </span>
              <span>back to life.</span>
            </div>
          </h1>
        </div>

        <div className="hero-image grid grid-cols-2 lg:gap-4 gap-2">
          <div className="relative w-full lg:h-[600px] h-[50vh]">
            <Image
              src={ClearParrot}
              alt="Clear Parrot"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100%, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background opacity-100"></div>

            <div className="absolute hidden lg:block top-4 left-[-22%] transform rotate-12">
              <div className="max-w-[4rem]">
                <svg
                  className="w-full h-auto"
                  viewBox="0 0 121 130"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: "rotateY(0deg)" }}
                >
                  <path
                    d="M81.3062 14.9453L119.241 35.8597C119.241 35.8597 98.5269 51.9726 83.4618 58.7151"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ strokeDashoffset: 0, strokeDasharray: "none" }}
                  ></path>
                  <path
                    d="M15.846 106.943C10.38 54.5943 48.924 32.421 118.215 36.192"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ strokeDashoffset: 0, strokeDasharray: "none" }}
                  ></path>
                </svg>
                <p className={clsx(HandwritingFont.className, "text-xl")}>
                  Enhanced by Unblur Photos ;)
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:h-[600px] h-[50vh]">
            <Image
              src={BlurryParrot}
              alt="Blurry Parrot"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100%, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background opacity-100"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
