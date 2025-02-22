import { useState, useRef } from "react";
import { DateObject } from "react-multi-date-picker";
import dynamic from "next/dynamic";
import { usePlanner } from "@/provider/DataCalProvider";

const DatePicker = dynamic(
  () => import("react-multi-date-picker").then((a) => a.default),
  { ssr: false },
);

interface DatePickerComponentProps {
  dateRange: { from: Date | null; to: Date | null };
  handleDateChange: (dates: DateObject[]) => void;
}

export default function DatePickerComponent({
  dateRange,
  handleDateChange,
}: DatePickerComponentProps) {
  const datePickerRef = useRef<{ openCalendar: () => void } | null>(null);
  const { calendar } = usePlanner();

  function selector() {
    datePickerRef.current?.openCalendar();
  }

  function isHoliday(dateobj: DateObject) {
    if (!calendar) return false;
    const date = dateobj.format("DD");
    const monthIndex = dateobj.monthIndex % 5;

    const day = calendar?.[monthIndex]?.days?.find(
      (day) => day.date.padStart(2, "0") === date,
    );

    if (day) {
      return day.dayOrder === "-";
    }

    return false;
  }

  return (
    <div className="relative flex items-center gap-4">
      <DatePicker
        ref={datePickerRef}
        value={[
          new DateObject(dateRange.from || new Date()),
          new DateObject(dateRange.to || new Date()),
        ]}
        onChange={handleDateChange}
        range
        minDate={
          new DateObject(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
            ),
          )
        }
        maxDate={
          new DateObject(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 4,
              new Date().getDate(),
            ),
          )
        }
        mapDays={({ date }) => {
          if (isHoliday(date)) {
            return {
              className:
                "text-light-error-color dark:text-dark-error-color opacity-60 cursor-not-allowed",
              disabled: true,
            };
          }
        }}
        numberOfMonths={1}
      />
      <div className="absolute left-0 flex animate-fastfade items-center gap-4 rounded-full text-light-accent dark:text-dark-accent">
        <button
          onClick={selector}
          className="flex w-fit items-center justify-center rounded-xl bg-light-button px-5 py-1 text-sm font-medium text-light-accent transition-all duration-300 hover:scale-105 hover:opacity-80 dark:bg-dark-button dark:text-dark-accent"
        >
          Predict
        </button>
      </div>
    </div>
  );
}
