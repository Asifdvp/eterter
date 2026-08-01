import Link from "next/link";
import Image from "next/image";
import ArrowIcon from "@/assets/icons/right-arrow.svg";

interface IProps {
  iconUrl: string;
  name: string;
  text: string;
  link: string;
}

const DepartmentCard = ({ iconUrl, name, text, link }: IProps) => {
  return (
    <div className="bg-white py-5 px-4 md:px-6 rounded-lg h-full border border-primary/12">
      <div className="p-4.5 w-18 h-18 rounded-[36px] flex justify-center items-center bg-background overflow-hidden">
        {iconUrl ? (
          <div className="relative w-10 h-10">
            <Image
              src={iconUrl}
              alt={name}
              fill
              className="object-contain"
              sizes="40px"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/12" />
        )}
      </div>
      <div className="mb-7 mt-3">
        <h3 className="text-base leading-6 font-medium text-black mb-1 md:text-[20px] md:leading-7">
          {name}
        </h3>
        <p className="text-sm leading-5 font-normal text-text">{text}</p>
      </div>
      <div className="w-8 h-8 rounded-4xl flex justify-center items-center bg-primary">
        <Link
          href={link}
          className="[&_svg_path]:fill-white"
          aria-label={`${name} haqqında ətraflı`}
        >
          <ArrowIcon aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default DepartmentCard;
