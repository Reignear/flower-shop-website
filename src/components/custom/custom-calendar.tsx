import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getColorFromStatus } from "@/utils/color";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
interface CalendarEvent {
  id: string;
  user: string;
  shipping_address?: string;
  date: Date;
  status: string;
}

interface CalendarProps {
  className?: string;
  onDateSelect?: (date: Date) => void;
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  events?: CalendarEvent[];
}

export function CustomCalendar({
  className,
  onDateSelect,
  initialDate = new Date(),
  minDate,
  maxDate,
  events = [],
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate year options (10 years before and after current year)
  const currentYearNum = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: 21 },
    (_, i) => currentYearNum - 10 + i,
  );

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Handle month change
  const handleMonthChange = (value: string) => {
    const monthIndex = Number.parseInt(value);
    setCurrentDate(new Date(currentYear, monthIndex, 1));
  };

  // Handle year change
  const handleYearChange = (value: string) => {
    const year = Number.parseInt(value);
    setCurrentDate(new Date(year, currentMonth, 1));
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);

    // Check if date is within min/max range
    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  // Check if a date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Check if a date is selected
  const isSelected = (day: number) => {
    return (
      selectedDate?.getDate() === day &&
      selectedDate?.getMonth() === currentMonth &&
      selectedDate?.getFullYear() === currentYear
    );
  };

  // Check if a date is disabled
  const isDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return (minDate && date < minDate) || (maxDate && date > maxDate);
  };

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      const eventDate =
        event.date instanceof Date ? event.date : new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
    });
  };

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;
    const cells = [];

    for (let i = 0; i < totalCells; i++) {
      const dayIndex = i - firstDayOfMonth + 1;

      if (dayIndex > 0 && dayIndex <= daysInMonth) {
        const dayEvents = getEventsForDay(dayIndex);
        const hasEventForDay = dayEvents.length > 0;

        cells.push(
          <div
            key={`day-container-${dayIndex}`}
            className="relative h-full"
            onMouseEnter={() => setHoveredDay(dayIndex)}
            onMouseLeave={() => setHoveredDay(null)}
          >
            <div
              className={cn(
                "h-full w-full rounded-md p-2 text-sm font-normal",
                "transition-colors duration-200",
                isToday(dayIndex) && "bg-muted text-foreground",
                isSelected(dayIndex) && "bg-gray-800 text-white",
                isDisabled(dayIndex) &&
                  "text-muted-foreground cursor-not-allowed opacity-50",
                !isToday(dayIndex) &&
                  !isSelected(dayIndex) &&
                  !isDisabled(dayIndex) &&
                  "hover:bg-muted/80 cursor-pointer",
                hasEventForDay &&
                  !isSelected(dayIndex) &&
                  "border-l-4 border-blue-500",
              )}
              onClick={() =>
                !isDisabled(dayIndex) && handleDateSelect(dayIndex)
              }
            >
              <div className="flex h-full flex-col items-center justify-center">
                <span className="text-base">{dayIndex}</span>
                {hasEventForDay && (
                  <div className="mt-1 flex gap-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={`event-dot-${event.id}`}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          getColorFromStatus(event.status) || "bg-blue-500",
                        )}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-xs">+{dayEvents.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Event hover popup */}
            {hoveredDay === dayIndex && hasEventForDay && (
              <div className="border-border fixed z-50 w-64 rounded-md border bg-white p-3 shadow-lg dark:bg-gray-800">
                <h4 className="mb-2 font-medium">
                  Delivery date on {monthNames[currentMonth]} {dayIndex}
                </h4>
                <div className="max-h-48 space-y-1 overflow-y-auto">
                  {dayEvents.map((event) => (
                    <Link
                      to={`/admin/order/${event.status}/${event.id}`}
                      key={event.id}
                      className="hover:bg-muted rounded-md p-2 text-sm  duration-150 block hover:scale-102 transition-all"
                    >
                      <div className="hover:bg-muted rounded-md p-2 text-sm transition-colors duration-150">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-3 w-3 rounded-full",
                              getColorFromStatus(event.status) || "bg-blue-500",
                            )}
                          />
                          <p className="font-medium">{event.user}</p>
                        </div>
                        {event.shipping_address && (
                          <p className="text-muted-foreground ml-5 text-xs">
                            {event.shipping_address}
                          </p>
                        )}
                      </div>{" "}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>,
        );
      } else {
        cells.push(<div key={`empty-${i}`} className="h-full" />);
      }
    }

    return cells;
  };

  return (
    <div className={cn("flex h-full w-full flex-col space-y-4 p-4", className)}>
      {/* Calendar header with month/year selection */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="hidden text-xl font-medium sm:block">
            {monthNames[currentMonth]} {currentYear}
          </h2>

          <div className="flex items-center gap-2 sm:ml-4">
            <Select
              value={currentMonth.toString()}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="w-32.5">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {monthNames.map((month, index) => (
                  <SelectItem key={month} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={currentYear.toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-25">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMonth}
            className="transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            className="transition-colors duration-200"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-muted-foreground p-2 text-sm font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid flex-1 grid-cols-7 gap-1">
        {generateCalendarGrid()}
      </div>
    </div>
  );
}
