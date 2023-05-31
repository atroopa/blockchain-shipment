import { Fot1, Fot2 } from "@/components/index";
import Shiping from '../shiping.png';
import Image from "next/image";

const Footer = () => {
  const footerNav = [
    {
      href: "#",
      name: " درباره ما ",
    },
    {
      href: "#",
      name: "حریم خصوصی",
    },
    {
      href: "#",
      name: "مجوزها",
    },
    {
      href: "#",
      name: "شرایط",
    },
  ];

  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-80">
        <div className=" justify-between sm:flex sm:flex-row">
          <div className=" mt-6">
            <p className="text-gray-700 font-semibold">Get the app</p>
            <div className="flex  items-center gap-3 mt-3 sm:block">
              <a href="#">
                <Fot1 />
              </a>
              <a href="#" className="mt-0 block sm:mt-3">
                <Fot2 />
              </a>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex justify-end items-end">
            <Image
              src={Shiping}
              priority={true}
              width={42}
              height={20}
              alt="shiping logo"
              style={{ width: 'auto', height: 'auto' }}
            />
            </div>
            <p className="max-w-md text-right">
              پروژه گمرک و کشتیرانی بر بستر بلاکچین، یک طرح نوآورانه است که هدف اصلی آن بهبود فرآیندهای گمرکی و کشتیرانی با استفاده از فناوری بلاکچین است. این پروژه با استفاده از تکنولوژی بلاکچین، امکان رصد و ردیابی دقیق تراکنش‌ها و حرکت بارها را فراهم می‌کند و به ارائه اطلاعات شفاف و قابل اعتماد برای تمامی ذینفعان در زنجیره تأمین کمک می‌کند.
            </p>
            <ul className="text-right justify-end flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNav.map((item, idx) => (
                <li className="text-gray-800 hover:text-gray-500 duration-150" key={idx}>
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 py-10 border-t md:text-center">
          <p>© 2023 Omid Hajavi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
