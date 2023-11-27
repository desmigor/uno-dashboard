import { React, useEffect } from "react";
import Dashcard from "../../../../components/ui/dashcard";
import Profile from "../../../../assets/images/dashboard/icon/profile.svg";
import People from "../../../../assets/images/dashboard/icon/people.svg";
import BoxDashboard from "../../../../assets/images/dashboard/icon/Dashboardbox.svg";
import TickCircle from "../../../../assets/images/dashboard/icon/tick-circle.svg";
import TableCard from "../../../../components/ui/tableCard";
import NameComponent from "../../../../components/ui/NameComponent";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { fetchPendingAction } from "../../../../redux/actions/fetchPendingAction";
import { fetchTotalsAction } from "../../../../redux/actions/fetchTotalsAction";
import {fetchPackagesAction, fetchPackagesOngoingAction,  fetchPackagesCompletedAction, fetchPackagesCanceledAction} from "../../../../redux/actions/fetchPackagesAction";
import { fetchCouriersAction, fetchCouriersLocationsAction } from "../../../../redux/actions/fetchCouriersAction";

function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const { resolutionPackages } = useSelector((state) => state.fetchPending);
  const { totals } = useSelector((state) => state.fetchTotals);
  const { packages } = useSelector((state) => state.fetchPackages);
  const { couriers } = useSelector((state) => state.fetchCouriers);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTotalsAction());
    dispatch(fetchPendingAction());
    dispatch(fetchPackagesAction());
    dispatch(fetchPackagesOngoingAction(1, 5));
    dispatch(fetchPackagesCompletedAction(1, 5));
    dispatch(fetchPackagesCanceledAction(1, 5));
    dispatch(fetchCouriersAction());
    dispatch(fetchCouriersLocationsAction());
  }, []);



  return (
    <div className="bg-[#F8F9FA] h-screen w-full pb-20 px-10 p-6 overflow-auto">
      <NameComponent
        name={userInfo?.full_name?.split(" ")[0]}
        date={`Today, ${moment().format("DD MMMM YYYY")}`}
      />
      <div className="w-full mx-auto mt-[24px] gap-5 flex flex-row">
        <Dashcard
          icon={Profile}
          number={totals?.total_couriers?.total_count}
          percentage={totals?.total_couriers?.total_rate.toFixed(3)}
          down={totals?.total_couriers?.percentage < 0 ? true : false}
          text={"Total Couriers"}
          iconBgColor={"bg-[#F4E7E7]"}
        />
        <Dashcard
          icon={People}
          number={totals?.total_customers?.total_count}
          percentage={totals?.total_customers?.total_rate.toFixed(3)}
          down={totals?.total_customers?.percentage < 0 ? true : false}
          text={"Total Customers"}
          iconBgColor={"bg-[#e1f1e6]"}
        />
        <Dashcard
          icon={BoxDashboard}
          number={totals?.total_orders?.total_count}
          percentage={totals?.total_orders?.total_rate.toFixed(3)}
          down={totals?.total_orders?.percentage < 0 ? true : false}
          text={"Total Orders"}
          iconBgColor={"bg-[#cbe8f6]"}
        />
        <Dashcard
          icon={TickCircle}
          number={totals?.delivered_packages?.total_count}
          percentage={totals?.delivered_packages?.total_rate.toFixed(3)}
          down={totals?.delivered_packages?.percentage < 0 ? true : false}
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
