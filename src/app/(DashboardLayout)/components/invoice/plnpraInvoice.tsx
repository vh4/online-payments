"use client";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/index";
import { SlPrinter } from "react-icons/sl";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import PageContainer from "../container/PageContainer";
import DashboardCard from "../shared/DashboardCard";
import { Grid } from "@mui/material";

export default function InvoicePLNPra() {
  const PaymentData = useSelector((state: RootState) => state.payment);
  const [isLoading, setDataLoaded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDataLoaded(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = (url: string) => {
    const printWindow = window.open(url, "_blank", "width=800,height=600");
    if (printWindow) {
      printWindow.focus();
      printWindow.onload = () => printWindow.print();
    } else {
      console.error("Failed to open print window");
    }
  };

  return (
    <PageContainer title="PLN Prepaid Detail Payment" description="PLN Prepaid Detail Payment">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="PLN Prepaid Detail Payment">
          <div className="px-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse mb-8 min-w-[600px]">
                  <thead>
                    <tr className="border-b bg-gray-100">
                      {[
                        "",
                        "Nomor Meter",
                        "Nama",
                        "Tarif / Daya",
                        "No.Reference",
                        "Token",
                        "Jumlah Kwh",
                        "#",
                      ].map((heading, i) => (
                        <th
                          key={i}
                          className="py-2 px-4 text-sm font-medium text-gray-600"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 px-4">
                        {isLoading ? (
                          <Skeleton width={80} />
                        ) : (
                          <div className="flex items-center space-x-2 p-2 rounded-full bg-green-500">
                            <IoCheckmarkCircle
                              className="text-white"
                              size={20}
                            />
                            <span className="text-sm text-white">Success</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {isLoading ? (
                          <Skeleton width={100} />
                        ) : (
                          PaymentData.nomormeter || "N/A"
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {isLoading ? (
                          <Skeleton width={150} />
                        ) : (
                          PaymentData.namapelanggan || "N/A"
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {isLoading ? (
                          <Skeleton width={120} />
                        ) : (
                          `${PaymentData.subscribersegmentation} / ${parseInt(
                            PaymentData.powerconsumingcategory
                          )}` || "N/A"
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {isLoading ? (
                          <Skeleton width={80} />
                        ) : (
                          PaymentData.ref2 || "N/A"
                        )}
                      </td>
                      <td className="py-4 px-4 font-bold text-md">
                        {isLoading ? (
                          <Skeleton width={80} />
                        ) : (
                          PaymentData.tokenpln || "N/A"
                        )}
                      </td>
                      <td className="py-4 px-4 font-bold text-md">
                        {isLoading ? (
                          <Skeleton width={80} />
                        ) : (
                          (parseInt(PaymentData.purchasedkwhunit) / 100)
                            .toFixed(2)
                            .replace(".", ",") || "N/A"
                        )}
                      </td>
                      <td
                        className="py-4 px-4 cursor-pointer"
                        onClick={() =>
                          handlePrint(
                            `${process.env.NEXT_PUBLIC_RB_STRUK}/index.php/service?id=${PaymentData.ref2}`
                          )
                        }
                      >
                        <SlPrinter size={18} className="text-gray-600" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Summary Section */}
              <div className="flex justify-end">
                <div className="w-full max-w-sm space-y-4">
                  <SummaryRow
                    label="Subtotal"
                    value={PaymentData.nominal}
                    isLoading={isLoading}
                  />
                  <SummaryRow
                    label="Admin"
                    value={PaymentData.admin}
                    isLoading={isLoading}
                  />
                  <div className="flex justify-between py-2 font-bold border-t">
                    <span className="text-gray-600">Total Paid</span>
                    <span className="text-gray-800">
                      {isLoading ? (
                        <Skeleton width={80} />
                      ) : (
                        `Rp ${parseInt(
                          PaymentData.total_bayar || "0"
                        ).toLocaleString()}`
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

const SummaryRow = ({
  label,
  value,
  isLoading,
}: {
  label: string;
  value: string | undefined;
  isLoading: boolean;
}) => (
  <div className="flex justify-between py-2">
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-800">
      {isLoading ? (
        <Skeleton width={80} />
      ) : (
        `Rp ${parseInt(value || "0").toLocaleString()}`
      )}
    </span>
  </div>
);
