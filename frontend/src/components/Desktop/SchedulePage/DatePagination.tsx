import React from "react";

// type import
import { DatePaginationProps } from "@/types";

// utils import

// component import
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "../../ui/pagination";

// date function import
import { format, addDays, subDays, isSameDay } from 'date-fns';




const DatePagination: React.FC<DatePaginationProps> = ({ selectedDate, onDateChange }) => {

    const getDaysArray = () => {
        const daysArray = [];
        for (let i = -3; i <= 3; i++) {
            daysArray.push(addDays(selectedDate, i));
        }
        return daysArray;
    };

    const weekDates = getDaysArray();

    const changeWeek = (direction: 'prev' | 'next') => {
        const newDate = direction === 'next' ? addDays(selectedDate, 7) : subDays(selectedDate, 7);
        onDateChange(newDate);
    };

    return (
        <div className="">
            <Pagination>

                <PaginationContent className="w-full flex justify-between">

                    {/* back */}
                    <PaginationItem className="hover:cursor-pointer">
                        <PaginationPrevious onClick={() => changeWeek('prev')} />
                    </PaginationItem>

                    {weekDates.map((date, index) => (
                        <PaginationItem key={date.toString()} className="hover:cursor-pointer">
                            <PaginationLink
                                onClick={() => onDateChange(date)}
                                isActive={isSameDay(date, selectedDate)}
                                className="flex flex-col px-12 py-6 items-center uppercase"
                            >
                                <div className="font-bold">{format(date, 'EEE')}</div>
                                <div className="">{format(date, 'MMM dd')}</div>

                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* forward */}
                    <PaginationItem className="hover:cursor-pointer">
                        <PaginationNext onClick={() => changeWeek('next')} />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>

                </PaginationContent>

            </Pagination>
        </div>
    )
}

export default DatePagination