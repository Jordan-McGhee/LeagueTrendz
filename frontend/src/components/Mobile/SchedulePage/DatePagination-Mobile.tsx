import React from "react";

// type import
import { DatePaginationProps } from "@/types";

// utils import

// component import
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "../../ui/pagination";
import { Calendar } from "../../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { Button } from "../../ui/button"
import { CalendarIcon } from "@radix-ui/react-icons";

// date function import
import { format, addDays, subDays, isSameDay } from 'date-fns';


const DatePaginationMobile: React.FC<DatePaginationProps> = ({ selectedDate, onDateChange }) => {

    const getDaysArray = () => {
        const daysArray = [];
        for (let i = -1; i <= 1; i++) {
            daysArray.push(addDays(selectedDate, i));
        }
        return daysArray;
    };

    const weekDates = getDaysArray();

    const changeWeek = (direction: 'prev' | 'next') => {
        const newDate = direction === 'next' ? addDays(selectedDate, 3) : subDays(selectedDate, 3);
        onDateChange(newDate);
    };

    return (
        <div className="mx-auto">
            <Pagination>

                <PaginationContent className=" w-full flex justify-between">

                    {/* back */}
                    <PaginationItem className="hover:cursor-pointer">
                        <PaginationPrevious onClick={() => changeWeek('prev')} className="p-1" />
                    </PaginationItem>

                    {weekDates.map((date, index) => (
                        <PaginationItem key={date.toString()} className="hover:cursor-pointer">
                            <PaginationLink
                                onClick={() => onDateChange(date)}
                                isActive={isSameDay(date, selectedDate)}
                                className="text-xs flex flex-col px-8 py-6 items-center uppercase"
                            >
                                <div className="font-bold">{format(date, 'EEE')}</div>
                                <div className="text-xs">{format(date, 'MMM dd')}</div>

                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* forward */}
                    <PaginationItem className="hover:cursor-pointer">
                        <PaginationNext onClick={() => changeWeek('next')} className="p-1" />
                    </PaginationItem>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="px-2 py-1">
                                <CalendarIcon className="size-5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && onDateChange(date)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                </PaginationContent>

            </Pagination>
        </div>
    )
}

export default DatePaginationMobile