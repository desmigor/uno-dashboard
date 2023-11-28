import React from "react";
import MenuIcon from "../../../../assets/images/dashboard/icon/more_vertical.svg";
import AddIcon from "../../../../assets/images/dashboard/icon/add-circle.svg";

export default function PackageConfigurations() {
  const packageSizes = [
    {
      title: "Cute Box",
      description:
        "20cm × 40cm X 40cm or less and 5kg or less. Your package can fit in a closed box on motorbike.",
      basePrice: 6.0,
      first10km: 60.0,
      next15km: 45.0,
      next25km: 112.5,
      nextNkm: 0.6,
    },
    {
      title: "Small Box",
      description:
        "30cm × 40cm X 40cm or less and 10kg or less. Your package can fit in a closed box on motorbike. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      basePrice: 8.0,
      first10km: 80.0,
      next15km: 60.0,
      next25km: 150.0,
      nextNkm: 0.8,
    },
    {
      title: "Medium Box",
      description:
        "40cm × 40cm X 40cm or less and 15kg or less. Your package can fit in a closed box on motorbike.",
      basePrice: 10.0,
      first10km: 100.0,
      next15km: 75.0,
      next25km: 187.5,
      nextNkm: 1.0,
    },
    {
      title: "Large Box",
      description:
        "50cm × 50cm X 50cm or less and 20kg or less. Your package can fit in a closed box on motorbike.",
      basePrice: 12.0,
      first10km: 120.0,
      next15km: 90.0,
      next25km: 225.0,
      nextNkm: 1.2,
    },
    {
      title: "Extra Large Box",
      description:
        "60cm × 60cm X 60cm or less and 25kg or less. Your package can fit in a closed box on motorbike.",
      basePrice: 14.0,
      first10km: 140.0,
      next15km: 105.0,
      next25km: 262.5,
      nextNkm: 1.4,
    },
    {
      title: "Extra Extra Large Box",
      description:
        "70cm × 70cm X 70cm or less and 30kg or less. Your package can fit in a closed box on motorbike.",
      basePrice: 16.0,
      first10km: 160.0,
      next15km: 120.0,
      next25km: 300.0,
      nextNkm: 1.6,
    },
  ];

  const packageAddOns = [
    {
      title: "Fragile",
      description: "Your package is fragile and needs extra care.",
      price: 2.0,
    },
    {
      title: "Heavy",
      description: "Your package is heavy and needs extra care.",
      price: 2.0,
    },
    {
      title: "Large",
      description: "Your package is large and needs extra care.",
      price: 2.0,
    },
    {
      title: "Extra Large",
      description: "Your package is extra large and needs extra care.",
      price: 2.0,
    },
    {
      title: "Extra Extra Large",
      description: "Your package is extra extra large and needs extra care.",
      price: 2.0,
    },
  ];

  return (
    <div className="flex flex-col gap-6 overflow-auto">
      <div className="w-[100%] h-[100%] relative bg-white rounded-lg p-6">
        <div className="flex flex-row justify-between pb-2">
          <div className="text-zinc-800 text-lg font-semibold font-rubik ">
            Package sizes
          </div>
          <div className="h-10 px-[30px] py-[15px] bg-red-800 rounded-lg justify-center items-center gap-2.5 inline-flex">
            <div className="text-center text-white text-sm font-normal font-rubik leading-tight">
              Add Size
            </div>
            <div className="w-5 h-5 justify-center items-center flex">
              <div className="w-5 h-5 relative">
                <img src={AddIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {packageSizes.map((item, index) => (
            <div
              key={index}
              className="w-[350px] h-[200px] relative bg-white rounded-xl shadow border border-gray-100"
            >
              <div className="w-4 h-4 left-[324px] top-[10px] absolute">
                <div className="left-[-2.67px] top-[-2.67px] absolute">
                  <img src={MenuIcon} alt="" className="h-4" />
                </div>
              </div>
              <div className="left-[16px] top-[16px] absolute flex-col justify-start items-start gap-3 inline-flex">
                <div className="flex-col justify-start items-start gap-1.5 flex">
                  <div className="text-zinc-800 text-sm font-semibold font-rubik] leading-tight">
                    {item.title}
                  </div>
                  <div className="w-[318px] h-[35px] text-gray-400 text-[13px] font-normal font-rubik] leading-tight overflow-auto">
                    {item.description}
                  </div>
                </div>
                <hr className="w-[318px] border border-gray-200 border-solid " />
                <div className="flex-col justify-start items-start gap-1.5 flex">
                  <div className="w-[318px] justify-between items-start inline-flex">
                    <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                      Base Price
                    </div>
                    <div className="text-right text-red-800 text-xs font-semibold font-rubik] leading-none">
                      ${item.basePrice}
                    </div>
                  </div>
                  <div className="w-[318px] justify-between items-start inline-flex">
                    <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                      First 10km
                    </div>
                    <div className="text-right text-zinc-800 text-xs font-normal font-rubik] leading-none">
                      ${item.first10km}
                    </div>
                  </div>
                  <div className="w-[318px] justify-between items-start inline-flex">
                    <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                      Next 15km
                    </div>
                    <div className="text-right text-zinc-800 text-xs font-normal font-rubik] leading-none">
                      ${item.next15km}
                    </div>
                  </div>
                  <div className="w-[318px] justify-between items-start inline-flex">
                    <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                      Next 25km
                    </div>
                    <div className="text-right text-zinc-800 text-xs font-normal font-rubik] leading-none">
                      ${item.next25km}
                    </div>
                  </div>
                  <div className="w-[318px] justify-between items-start inline-flex">
                    <div className="text-gray-400 text-xs font-normal font-rubik] leading-none">
                      Next n-km
                    </div>
                    <div className="text-right text-zinc-800 text-xs font-normal font-rubik] leading-none">
                      n x ${item.nextNkm}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[100%] h-[100%] relative bg-white rounded-lg p-6">
        <div className="flex flex-row justify-between pb-2">
          <div className="text-zinc-800 text-lg font-semibold font-rubik ">
            Package add-ons
          </div>
          <div className="h-10 px-[30px] py-[15px] bg-red-800 rounded-lg justify-center items-center gap-2.5 inline-flex">
            <div className="text-center text-white text-sm font-normal font-rubik leading-tight">
              Add add-on
            </div>
            <div className="w-5 h-5 justify-center items-center flex">
              <div className="w-5 h-5 relative">
                <img src={AddIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          {packageAddOns.map((item, index) => (
            <div
              key={index}
              className="w-[350px] h-[126px] relative bg-white rounded-xl shadow border border-gray-100"
            >
              <div className="w-4 h-4 left-[324px] top-[10px] absolute">
                <div className="w-[21.33px] h-[21.33px] left-[-2.67px] top-[-2.67px] absolute"></div>
              </div>
              <div className="left-[16px] top-[16px] absolute flex-col justify-start items-start gap-2 inline-flex">
                <div className="flex-col justify-start items-start gap-1.5 flex">
                  <div className="text-zinc-800 text-sm font-semibold font-rubik leading-tight">
                    {item.title}
                  </div>
                  <div className="w-[318px] text-gray-400 text-sm font-normal font-rubik leading-tight">
                    {item.description}
                  </div>
                </div>
                <div className="text-red-800 text-sm font-semibold font-rubik leading-tight">
                  ${item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
