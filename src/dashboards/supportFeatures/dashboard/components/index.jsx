import { React, useEffect } from "react";
import Dashcard from "../../../../components/ui/dashcard";
import Profile from "../../../../assets/images/dashboard/icon/profile.svg";
import People from "../../../../assets/images/dashboard/icon/people.svg";
import BoxDashboard from "../../../../assets/images/dashboard/icon/Dashboardbox.svg";
import TickCircle from "../../../../assets/images/dashboard/icon/tick-circle.svg";
import TableCard from "../../../../components/ui/tableCard";
import { couriers, packages, pending } from "../../../../data";
import NameComponent from "../../../../components/ui/NameComponent";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { fetchPendingAction } from "../../../../redux/actions/fetchPendingAction";

function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const { resolutionPackages } = useSelector((state) => state.fetchPending);
  const dispatch = useDispatch();
  useEffect(() =>  {
    console.log('fetching pending')
    dispatch(fetchPendingAction());
  },[]);



  console.log({
    resolutionPackages
  })

  return (
    <div className="bg-[#F8F9FA] h-screen w-full pb-20 px-10 p-6 overflow-auto">
      <NameComponent
        name={userInfo?.full_name?.split(" ")[0]}
        date={`Today, ${moment().format("DD MMMM YYYY")}`}
      />
      <div className="w-full mx-auto mt-[24px] gap-5 flex flex-row">
        <Dashcard
          icon={Profile}
          number={"222"}
          percentage={"16"}
          text={"Total Couriers"}
          iconBgColor={"bg-[#F4E7E7]"}
        />
        <Dashcard
          icon={People}
          number={"13,239"}
          percentage={"16"}
          text={"Total Customers"}
          iconBgColor={"bg-[#e1f1e6]"}
        />
        <Dashcard
          icon={BoxDashboard}
          number={"1233"}
          percentage={"12"}
          down={true}
          text={"Total Orders"}
          iconBgColor={"bg-[#cbe8f6]"}
        />
        <Dashcard
          icon={TickCircle}
          number={"292"}
          percentage={"16"}
          text={"Delivered Packages"}
          iconBgColor={"bg-[#fee6da]"}
        />
      </div>
      <div className="w-full mt-[20px] mx-auto flex flex-row gap-5">
        <TableCard
          data={resolutionPackages}
          type={"pending"}
          name={"Pending resolution"}
        />
        <TableCard data={packages} type={"ongoing"} name={"Ongoing Packages"} />
      </div>
      <div className="w-full mt-[20px] mx-auto flex flex-row gap-5">
        <TableCard
          data={couriers}
          type={"courier"}
          name={"Available Courier"}
        />
        <TableCard type={"map"} name={"Availability Map"} />
      </div>
    </div>
  );
}

export default Dashboard;
